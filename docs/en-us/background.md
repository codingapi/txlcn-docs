# Background

The first version of the LCN framework was released in June 2017, from 1.0 to 5.0.
LCN is named by the earlier version of the LCN framework. When designing the 1.0-2.0 version of the framework at the beginning, 
the steps of the framework design are as follows.

1. Locking transaction unit（lock）  
2. Confirmation of transaction module status (confirm)    
3. Notify transaction (notify)     
  
The name is obtained by taking its initials.

Since 5.0, the framework has compatible with three transaction modes: LCN, TCC and TXC. 
In order to distinguish the LCN mode, the LCN distributed transaction is renamed TX-LCN distributed transaction framework.

## Location of TX-LCN

> LCN并不生产事务，LCN只是本地事务的协调工

TX-LCN is positioned as a transaction coordination framework. The framework itself does not operate transactions, but is based on transaction coordination to achieve transaction consistency.


## TX-LCN Solution
&nbsp;&nbsp;&nbsp;&nbsp;在一个分布式系统下存在多个模块协调来完成一次业务。那么就存在一次业务事务下可能横跨多种数据源节点的可能。TX-LCN将可以解决这样的问题。

&nbsp;&nbsp;&nbsp;&nbsp;例如存在服务模块A 、B、 C。A模块是mysql作为数据源的服务，B模块是基于redis作为数据源的服务，C模块是基于mongo作为数据源的服务。若需要解决他们的事务一致性就需要针对不同的节点采用不同的方案，并且统一协调完成分布式事务的处理。


![](../../img/docs/abc.png)


方案：    

&nbsp;&nbsp;&nbsp;&nbsp;若采用TX-LCN分布式事务框架，则可以将A模块采用LCN模式、B/C采用TCC模式就能完美解决。