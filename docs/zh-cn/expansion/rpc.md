# RPC框架扩展

RPC扩展主要是指在分布式事务框架下对传递控制参数的支持、与负载均衡的扩展控制。   

下面以dubbo框架为例讲解扩展的过程。


1. 传递控制参数的支持

dubbo参数传递可以通过隐形传参的方式来完成。参数传递分为传出与接受两块。下面分别展示代码说明。

dubbo传出参数的filter：

```java
@Activate(group = Constants.CONSUMER)
public class DubboRequestInterceptor implements Filter {

    @Override
    public Result invoke(Invoker<?> invoker, Invocation invocation) throws RpcException {
        //判断是否存在事务
        if (TracingContext.tracing().hasGroup()) {
            //设置传递的参数信息
            RpcContext.getContext().setAttachment(TracingConstants.HEADER_KEY_GROUP_ID, TracingContext.tracing().groupId());
            RpcContext.getContext().setAttachment(TracingConstants.HEADER_KEY_APP_MAP, TracingContext.tracing().appMapBase64String());
        }
        return invoker.invoke(invocation);
    }
}

```

dubbo传入参数的filter:

```java

@Activate(group = {Constants.PROVIDER})
public class TracingHandlerInterceptor implements Filter {

    @Override
    public Result invoke(Invoker<?> invoker, Invocation invocation) throws RpcException {
        //接受参数
        String groupId = invocation.getAttachment(TracingConstants.HEADER_KEY_GROUP_ID, "");
        String appList = invocation.getAttachment(TracingConstants.HEADER_KEY_APP_MAP, "");
        //设置参数
        TracingContext.tracing().init(Maps.newHashMap(TracingConstants.GROUP_ID, groupId, TracingConstants.APP_MAP, appList));
        return invoker.invoke(invocation);
    }
}

```




 2. 负载均衡的扩展控制(仅限于LCN模式下)
 
 控制的效果：负载均衡扩展主要为了做到在同一次分布式事务中相同的模块重复调用在同一个模块下。   
 
 为什么仅限于LCN模式？   
 
 当存在这样的请求链,A模块先调用了B模块的one方法，然后在调用了two方法，如下所示：
 
 A ->B.one();
 A ->B.two();
 假如one与two方法的业务都是在修改同一条数据,假如两个方法的id相同，伪代码如下:
 ```java
 void one(id){
    execute => update demo set state = 1 where id = {id} ;
 }
 
 void two(id){
    execute => update demo set state = 2 where id = {id} ;
 }
 
```
 若B模块做了集群存在B1、B2两个模块。那么就可能出现A分别调用了B1 B2模块，如下:
 
 A ->B1.one();
 A ->B2.two();
 在这样的情况下业务方将在LCN下会因为资源占用而导致执行失败而回滚事务。为了支持这样的场景，框架提供了重写了rpc的负载模式。
 
 控制在同一次事务下同一个被负载的模块被重复调用时将只会请求到第一次被选中的模块。在采用这样的方案的时候也会提高Connection的连接使用率，会提高在负载情况下的性能。
 
 dubbo框架默认提供了四种负载策略，这里仅仅展示random的实现。
 
 ```java
public class TxlcnRandomLoadBalance extends RandomLoadBalance {

    @Override
    public <T> Invoker<T> select(List<Invoker<T>> invokers, URL url, Invocation invocation) {
        return DubboTxlcnLoadBalance.chooseInvoker(invokers, url, invocation, super::select);
    }

}

@Slf4j
class DubboTxlcnLoadBalance {

    private static final String empty = "";

    static <T> Invoker<T> chooseInvoker(List<Invoker<T>> invokers, URL url, Invocation invocation, TxLcnLoadBalance loadBalance) {

        //非分布式事务直接执行默认业务.
        if(!TracingContext.tracing().hasGroup()){
            return loadBalance.select(invokers, url, invocation);
        }
        TracingContext.tracing()
                .addApp(RpcContext.getContext().getLocalAddressString(), empty);
        assert invokers.size() > 0;
        JSONObject appMap = TracingContext.tracing().appMap();
        log.debug("invokers: {}", invokers);
        Invoker<T> chooseInvoker = null;
        outline:
        for (Invoker<T> tInvoker : invokers) {
            for (String address : appMap.keySet()) {
                if (address.equals(tInvoker.getUrl().getAddress())) {
                    chooseInvoker = tInvoker;
                    log.debug("txlcn choosed server [{}] in txGroup: {}", tInvoker, TracingContext.tracing().groupId());
                    break outline;
                }
            }
        }
        if (chooseInvoker == null) {
            Invoker<T> invoker = loadBalance.select(invokers, url, invocation);
            TracingContext.tracing().addApp(invoker.getUrl().getAddress(), empty);
            return invoker;
        }
        return chooseInvoker;
    }

    @FunctionalInterface
    public interface TxLcnLoadBalance {
        <T> Invoker<T> select(List<Invoker<T>> invokers, URL url, Invocation invocation);
    }
}
```

 