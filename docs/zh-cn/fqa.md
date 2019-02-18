# FQA

## 1. TxManager配置分布式事务时间的作用是？为什么？
> 自动补偿机制会自动修复在分布式事务时间后系统存在的可修复异常。为什么是`a >= 2c + (b + c + d) * (e - 1) - Δ`？
一次分布式事务下，事务发起方两次与TM的RPC（创建和通知事务组， 2c）, 事务参与方一次与TM的RPC（加入事务组，1c）, TxManager会RPC通知所有事务参与方(通知事务单元，1b),
再加上微服务间RPC，综合调用链长度，即为上面的计算方法。

## 2. 为什么配置上TX-LCN不起作用？

A:
 首先建议尽量采用最新的版本。请按照以下步骤逐步排查：
 1. 确认Tx-client(TC)与Tx-manager(TM)的版本是完全一致的。
 2. 确认TC与TM的配置都没有问题，并确认TM是启动状态，可访问后台(默认密码：codingapi)。
 3. 检测TM下TC在线模块是否正常对应。
 4. 当以上都没有问题的时候，检查能否进入了`DataSourceAspect`的拦截,在开发工具的debug下环境下断点确认。   
    若没有进入拦截器，可能存在两种情况。   
    一：确认Datasource 是否为spring的bean对象，若非spring对象，请先处理成spring对象。    
    二：若是spring对象，但是无法进入拦截。可以自行添加切面的方式进入拦截。    
    该org.apache.tomcat.jdbc.pool.DataSourceProxy.getConnection方法就不能进入DataSource的拦截，可自行添加如下所示：    
```java
@Component
@Aspect
@Slf4j
public class TomcatDataSourceAspect implements Ordered {

    @Autowired
    private DTXResourceWeaver dtxResourceWeaver;//TX-LCN 资源切面处理对象

    @Around("execution(public java.sql.Connection org.apache.tomcat.jdbc.pool.DataSourceProxy.getConnection(..) )")
    public Object around(ProceedingJoinPoint point) throws Throwable {
        log.info("proxy my aspect..");
        return dtxResourceWeaver.getConnection(() -> (Connection) point.proceed());
    }

    @Override
    public int getOrder() {
        return 0;
    }
}

```

* 若以上几点都无法解决您的问题，请将你的问题以issue的方式整理发给我们。

## 3. 如何在springboot 1.5 版本下使用TX-LCN

A:   
在5.0.1.RELEASE版本以后开始支持了springboot 1.5版本。使用步骤    
1. 导入5.0.1.RELEASE版本的pom。
2. 在properties下设置txlcn-org.springframework.cloud.commons.version版本到1.3.5.RELEASE。 
```java
       <properties>
            <codingapi.txlcn.version>5.0.1.RELEASE</codingapi.txlcn.version>   
            <txlcn-org.springframework.cloud.commons.version>1.3.5.RELEASE</txlcn-org.springframework.cloud.commons.version>
        </properties>
```

demo参考见https://github.com/codingapi/txlcn-demo 1.5.boot分支

 
             