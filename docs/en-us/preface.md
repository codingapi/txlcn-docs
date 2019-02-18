# Preface
With the spread of interconnection, various projects are gradually transforming to distributed services. 
Nowadays, micro-services are ubiquitous, and local transactions can not satisfy the distributed requirements, so the distributed transaction problem arises. 
Distributed transaction is known as a worldwide problem. At present, there are two theoretical bases for distributed transaction: CAP law BASE theory.

## CAP's law
The content of this theorem is that in a distributed system, Consistency, Availability and Partition Tolerance can not be combined.


### Consistency（C）
Whether all data backups in a distributed system have the same value at the same time. (equal to all nodes accessing the same latest copy of data)

### Availability（A）
Whether the whole cluster can respond to the client's read and write requests after some nodes fail in the cluster. (High availability for data updates)

### Partition tolerance（P）
In practical terms, partitioning is equivalent to the time limit requirement for communication. 
If the system can not achieve data consistency within the time limit, it means that partitioning has occurred, and the current operation must be chosen between C and A.



## BASE's theory
BASE is the abbreviation of three phrases: Basically Available, Soft state and Eventually consistent. 
BASE theory is the result of the trade-off between consistency and availability in CAP. 
It comes from the summary of the distributed practice of large-scale Internet systems and is based on the gradual evolution of CAP theorem. 
The core idea of BASE theory is that every application can adopt appropriate ways to achieve the final consistency according to its own business characteristics, even if it can not achieve strong consistency.

### Basically Available
Basic availability means that distributed systems are allowed to lose part of their availability when unpredictable failures occur - note that this is by no means equivalent to system unavailability. 
For example:

(1) Loss of response time. Normally, an online search engine needs to return the corresponding query results to the user within 0.5 seconds, 
but the response time of the query results increases by 1-2 seconds due to the failure.

(2) Functional loss of the system: Normally, when shopping on an e-commerce website, consumers can almost complete every order smoothly, 
but in some Festival shopping rush, due to the surge in consumer shopping behavior, in order to protect the stability of the shopping system, 
some consumers may be guided to a degraded page.


### Soft State
Soft state means that the data in the system is allowed to exist in the intermediate state, 
and it is considered that the existence of the intermediate state will not affect the overall availability of the system, 
that is to say, there is a delay in the process of allowing the system to synchronize data among the replicas of different nodes.

### Eventually Consistent
Ultimate consistency emphasizes that all data replicas can eventually achieve a consistent state after a period of synchronization. 
Therefore, the essence of final consistency is that the system is required to ensure that the final data can be consistent, 
rather than real-time guarantee of strong consistency of system data.
