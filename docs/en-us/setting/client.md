# TxClient配置说明
## 一、application.properties
```properties

# springcloud feign 下开启负载均衡时的配置。开启后同一个事务组下相同的模块会重复调用。
# 对应dubbo框架下需要设置的是 @Reference的loadbalance，有下面四种，作用都是开启后同一个事务组下相同的模块会重复调用。
#txlcn_random=com.codingapi.txlcn.tracing.dubbo.TxlcnRandomLoadBalance
#txlcn_roundrobin=com.codingapi.txlcn.tracing.dubbo.TxlcnRoundRobinLoadBalance
#txlcn_leastactive=com.codingapi.txlcn.tracing.dubbo.TxlcnLeastActiveLoadBalance
#txlcn_consistenthash=com.codingapi.txlcn.tracing.dubbo.TxlcnConsistentHashLoadBalance

tx-lcn.ribbon.loadbalancer.dtx.enabled=true
# tx-manager 的配置地址，多个用,分割。注意设置上的地址在启动的时候会检查并连接，连接不成功会启动失败。
# tx-manager 下集群策略，当增加一个新的tx-manager后，tx-manager也会通知到其他的在线模块，然后tx-client会在连接上后面加入的模块。
tx-lcn.client.manager-address=127.0.0.1:8070,127.0.0.1:8071
# 该参数是分布式事务框架存储的业务切面信息。采用的是h2数据库。该参数默认的值为{user.dir}/.txlcn/{application.name}-{application.port}
tx-lcn.aspect.log.file-path=logs/.txlcn/demo-8080
# 调用链长度等级，默认值为3.标识调用连长度为3，该参数是用于识别分布式事务的最大通讯时间。
tx-lcn.client.chain-level=3
# 该参数为tc与tm通讯时的最大超时时间，单位毫米。该参数不需要配置会在连接初始化时由tm返回。
tx-lcn.client.tm-rpc-timeout=2000
# 该参数为分布式事务的最大时间，单位毫米。该参数不需要配置会在连接初始化时由tm返回。
tx-lcn.client.dtx-time=50000
# 该参数为雪花算法的机器编号。该参数不需要配置会在连接初始化时由tm返回。
tx-lcn.client.machine-id=1
#该参数为事务方法注解切面的orderNumber，默认值为0.
tx-lcn.client.dtx-aspect-order=0
#该参数为事务连接资源方法切面的orderNumber，默认值为0.
tx-lcn.client.resource-order=0
#是否开启日志记录。当开启以后需要配置对应logger的数据库连接配置信息。
tx-lcn.logger.enabled=false

#该参数为tm下的配置，tc下忽略
tx-lcn.client.tx-manager-delay=2000
#该参数为tm下的配置，tc下忽略
tx-lcn.client.tx-manager-heart=2000


```

## 二、特别配置
### 1、微服务`集群`且用到 LCN事务模式时，为保证性能请开启TX-LCN重写的负载策略。

* Dubbo 开启
```java
@Reference(version = "${demo.service.version}",
        application = "${dubbo.application.e}",
        retries = -1,
        registry = "${dubbo.registry.address}",
        loadbalance = "txlcn_random")  // here
private EDemoService eDemoService;
```
* SpringCloud 开启 (application.properties)
```properties
tx-lcn.springcloud.loadbalance.enabled=true
```
配置详情[参见](distributed.html)

### 2、关闭业务RPC重试
* Dubbo 开启
```java
@Reference(version = "${demo.service.version}",
        application = "${dubbo.application.e}",
        retries = -1,
        registry = "${dubbo.registry.address}",
        loadbalance = "txlcn_random")  // here
private EDemoService eDemoService;
```
* SpringCloud 开启 (application.properties)
```properties
# 关闭Ribbon的重试机制
ribbon.MaxAutoRetriesNextServer=0
```


----------------

`NOTE`  
1、TxClient所有配置均有默认配置，请按需覆盖默认配置。  
2、为什么要关闭服务调用的重试。远程业务调用失败有两种可能：
（1），远程业务执行失败 （2）、远程业务执行成功，网络失败。对于第2种，事务场景下重试会发生，某个业务执行两次的问题。
如果业务上控制某个事务接口的幂等，则不用关闭重试。

----------------

### 3、通过AOP配置本地事务与分布式事务


```
@Configuration
@EnableTransactionManagement
public class TransactionConfiguration {

    /**
     * 本地事务配置
     * @param transactionManager
     * @return
     */
    @Bean
    @ConditionalOnMissingBean
    public TransactionInterceptor transactionInterceptor(PlatformTransactionManager transactionManager) {
        Properties properties = new Properties();
        properties.setProperty("*", "PROPAGATION_REQUIRED,-Throwable");
        TransactionInterceptor transactionInterceptor = new TransactionInterceptor();
        transactionInterceptor.setTransactionManager(transactionManager);
        transactionInterceptor.setTransactionAttributes(properties);
        return transactionInterceptor;
    }

    /**
     * 分布式事务配置 设置为LCN模式
     * @param dtxLogicWeaver
     * @return
     */
    @ConditionalOnBean(DTXLogicWeaver.class)
    @Bean
    public TxLcnInterceptor txLcnInterceptor(DTXLogicWeaver dtxLogicWeaver) {
        TxLcnInterceptor txLcnInterceptor = new TxLcnInterceptor(dtxLogicWeaver);
        Properties properties = new Properties();
        properties.setProperty(Transactions.DTX_TYPE,Transactions.LCN);
        properties.setProperty(Transactions.DTX_PROPAGATION, "REQUIRED");
        txLcnInterceptor.setTransactionAttributes(properties);
        return txLcnInterceptor;
    }

    @Bean
    public BeanNameAutoProxyCreator beanNameAutoProxyCreator() {
        BeanNameAutoProxyCreator beanNameAutoProxyCreator = new BeanNameAutoProxyCreator();
        //需要调整优先级，分布式事务在前，本地事务在后。
        beanNameAutoProxyCreator.setInterceptorNames("txLcnInterceptor","transactionInterceptor");
        beanNameAutoProxyCreator.setBeanNames("*Impl");
        return beanNameAutoProxyCreator;
    }
}

```
 
 ### 4、TXC模式定义表的实际主键

TXC 是基于逆向sql的方式实现对业务的回滚控制，在逆向sql操作数据是会检索对应记录的主键作为条件处理回滚业务。但是在有些情况下可能表中并没有主键字段(primary key)，仅存在业务上的名义主键，此时可通过重写`PrimaryKeysProvider`方式定义表对应的主键关系。   

如下所示:    

```java

@Component
public class MysqlPrimaryKeysProvider implements PrimaryKeysProvider {

    @Override
    public Map<String, List<String>> provide() {
        //t_demo 表的回滚主键为 kid字段
        return Maps.newHashMap("t_demo", Collections.singletonList("kid"));
    }
}

```
