# 尝试下简单的分布式事务

## 步骤引导

1. 准备依赖环境服务  
    JDK1.8+,Mysql5.6+,Redis3.2+,Consul(SpringCloud),ZooKeeper(Dubbo),Git,Maven
2. 初始化数据
    见下方说明
3. 启动TxManager(TM)  
    见下方说明
4. 配置微服务模块  
    见下方说明
5. 启动模块与测试  
    见下方说明

## 初始化数据

TM数据初始化   
TxManager(TM)依赖tx-manager数据库(MariaDB 、MySQL)建表语句如下:      
```$xslt
DROP TABLE IF EXISTS `t_tx_exception`;
CREATE TABLE `t_tx_exception`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `group_id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `unit_id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `mod_id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `transaction_state` tinyint(4) NULL DEFAULT NULL,
  `registrar` tinyint(4) NULL DEFAULT NULL COMMENT '-1 未知 0 Manager 通知事务失败， 1 client询问事务状态失败2 事务发起方关闭事务组失败',
  `ex_state` tinyint(4) NULL DEFAULT NULL COMMENT '0 待处理 1已处理',
  `create_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 967 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

```

TC数据初始化
微服务演示Demo依赖txlcn-demo数据库(MariaDB 、MySQL)建表语句如下:            
```$xslt
DROP TABLE IF EXISTS `t_demo`;
CREATE TABLE `t_demo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `kid` varchar(45) DEFAULT NULL,
  `demo_field` varchar(255) DEFAULT NULL,
  `group_id` varchar(64) DEFAULT NULL,
  `unit_id` varchar(32) DEFAULT NULL,
  `app_name` varchar(32) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
```
## 启动TxManager(TM)

### TM下载与配置

`git clone https://github.com/codingapi/tx-lcn.git `

修改配置信息(txlcn-tm\src\main\resources\application.properties)

```
spring.application.name=tx-manager
server.port=7970

spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/tx-manager?characterEncoding=UTF-8
spring.datasource.username=root
spring.datasource.password=root

mybatis.configuration.map-underscore-to-camel-case=true
mybatis.configuration.use-generated-keys=true

#tx-lcn.logger.enabled=true
# TxManager Host Ip
#tx-lcn.manager.host=127.0.0.1
# TxClient连接请求端口
#tx-lcn.manager.port=8070
# 心跳检测时间(ms)
#tx-lcn.manager.heart-time=15000
# 分布式事务执行总时间
#tx-lcn.manager.dtx-time=30000
#参数延迟删除时间单位ms
#tx-lcn.message.netty.attr-delay-time=10000
#tx-lcn.manager.concurrent-level=128
# 开启日志
#tx-lcn.logger.enabled=true
#logging.level.com.codingapi=debug
#redisIp
#spring.redis.host=127.0.0.1
#redis\u7AEF\u53E3
#spring.redis.port=6379
#redis\u5BC6\u7801
#spring.redis.password=


```
* `#`给出信息都是默认值

关于详细配置说明见 [manager](setting/manager.md)

### TM编译与启动

编译  
进入到txlcn-tm路径下。 执行 `mvn clean  package '-Dmaven.test.skip=true'`   
启动  
进入target文件夹下。执行 `java -jar txlcn-tm-5.0.0.jar `

启动TxManager
![tx-manager](../../../img/docs/tx_manager.png)


## 配置微服务模块 

Dubbo Demo见[Dubbo-Demo](dubbo.html)

SpringCloud Demo见[SpringCloud-Demo](springcloud.html)


## 启动模块与测试  
（1）正常提交事务

访问 发起方提供的Rest接口 `/txlcn?value=the-value`。发现事务全部提交  
![result](../../../img/docs/result.png)

（2）回滚事务

修改微服务 发起方Client 业务，在返回结果前抛出异常，再请求Rest接口。发现发起方由于本地事务回滚，而参与方D、E，由于TX-LCN的协调，数据也回滚了。  
![error_result](../../../img/docs/error-result.png)
