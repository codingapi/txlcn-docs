# TxManager配置说明

## application.properties
```properties

spring.application.name=tx-manager
server.port=7970

#mysql 配置
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/tx-manager?characterEncoding=UTF-8
spring.datasource.username=root
spring.datasource.password=root
        
mybatis.configuration.map-underscore-to-camel-case=true
mybatis.configuration.use-generated-keys=true


# TxManager Host Ip 默认为 127.0.0.1
tx-lcn.manager.host=127.0.0.1
# TxClient连接请求端口 默认为 8070
tx-lcn.manager.port=8070
# 心跳检测时间(ms) 默认为 300000
tx-lcn.manager.heart-time=300000
# 分布式事务执行总时间(ms) 默认为36000
tx-lcn.manager.dtx-time=36000
#参数延迟删除时间单位ms  默认为dtx-time值
tx-lcn.message.netty.attr-delay-time=36000
#事务处理并发等级 默认为128
tx-lcn.manager.concurrent-level=128

#后台登陆密码，默认值为codingapi
tx-lcn.manager.admin-key=codingapi
#分布式事务锁超时时间 默认为-1，当-1时会用tx-lcn.manager.dtx-time的时间
tx-lcn.manager.dtx-lock-time=-1
#雪花算法的sequence位长度，默认为12位.
tx-lcn.manager.seq-len=12
#异常回调开关
tx-lcn.manager.ex-url-enabled=false
# 事务异常通知（任何http协议地址。未指定协议时，为TxManager提供的接口）
tx-lcn.manager.ex-url=/provider/email-to/***@**.com



# 开启日志,默认为false
tx-lcn.logger.enabled=true
logging.level.com.codingapi=debug
#redis 的设置信息
spring.redis.host=127.0.0.1
spring.redis.port=6379
spring.redis.password=


```

----------------
`注意（NOTE）`   

(1) TxManager所有配置均有默认配置，请按需覆盖默认配置。  

(2) *特别注意* TxManager进程会监听两个端口号，一个为`TxManager端口`，另一个是`事务消息端口`。TxClient默认连接`事务消息端口`是`8070`，
所以，为保证TX-LCN基于默认配置运行良好，请设置`TxManager端口`号为`8069` 或者指定`事务消息端口`为`8070`  

(3) `分布式事务执行总时间 a` 与 `TxClient通讯最大等待时间 b`、`TxManager通讯最大等待时间 c`、`微服务间通讯时间 d`、`微服务调用链长度 e` 几个时间存在着依赖关系。
`a >= 2c + (b + c + d) * (e - 1)`, 特别地，b、c、d 一致时，`a >= (3e-1)b`。你也可以在此理论上适当在减小a的值，发生异常时能更快得到自动补偿，即 `a >= (3e-1)b - Δ`（[原因](../fqa.html)）。
最后，调用链小于等于3时，将基于默认配置运行良好

(4) 若用`tx-lcn.manager.ex-url=/provider/email-to/xxx@xx.xxx` 这个配置，配置管理员邮箱信息(如QQ邮箱)：
```properties
spring.mail.host=smtp.qq.com
spring.mail.port=587
spring.mail.username=xxxxx@**.com
spring.mail.password=*********
```
 
----------------