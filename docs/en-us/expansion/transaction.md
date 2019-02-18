# 事务模式扩展

TX-LCN不仅仅支持LCN TXC TCC模式，也可以由开发者自定义符合TX-LCN控制原理的请求事务模型。


## 事务模式的接口定义

1. 增加一种新的事务模式名称，不能与已有的模式重名,例如test模式。

在使用新的模式时，只需要在业务上标准类型即可。如下：

```

    @TxTransaction(type = "test")
    @Transactional
    public void test(){

    }

```


2. 实现`TransactionResourceExecutor`接口，处理db资源。

```
public interface TransactionResourceProxy {

    /**
     * 获取资源连接
     *
     * @param connectionCallback Connection提供者
     * @return  Connection Connection
     * @throws Throwable Throwable
     */
    Connection proxyConnection(ConnectionCallback connectionCallback) throws Throwable;

}


```


3. 实现不同状态下的事务控制 实现`DTXLocalControl` 接口处理业务。

```
public interface DTXLocalControl {

    /**
     * 业务代码执行前
     *
     * @param info info
     * @throws  TransactionException TransactionException
     */
    default void preBusinessCode(TxTransactionInfo info) throws TransactionException {

    }

    /**
     * 执行业务代码
     *
     * @param info info
     * @return  Object Object
     * @throws Throwable Throwable
     */
    default Object doBusinessCode(TxTransactionInfo info) throws Throwable {
        return info.getBusinessCallback().call();
    }


    /**
     * 业务代码执行失败
     *
     * @param info info
     * @param throwable throwable
     */
    default void onBusinessCodeError(TxTransactionInfo info, Throwable throwable) throws TransactionException {

    }

    /**
     * 业务代码执行成功
     *
     * @param info info
     * @param result result
     * @throws TransactionException TransactionException
     */
    default void onBusinessCodeSuccess(TxTransactionInfo info, Object result) throws TransactionException {

    }

    /**
     * 清场
     *
     * @param info info
     */
    default void postBusinessCode(TxTransactionInfo info) {

    }
}
```


例如 LCN starting状态下的处理实现,bean name `control_lcn_starting`是标准规范，control_+模式名称+状态名称:

```
@Service(value = "control_lcn_starting")
@Slf4j
public class LcnStartingTransaction implements DTXLocalControl {

    private final TransactionControlTemplate transactionControlTemplate;


    @Autowired
    public LcnStartingTransaction(TransactionControlTemplate transactionControlTemplate) {
        this.transactionControlTemplate = transactionControlTemplate;
    }

    @Override
    public void preBusinessCode(TxTransactionInfo info) throws TransactionException {
        // create DTX group
        transactionControlTemplate.createGroup(
                info.getGroupId(), info.getUnitId(), info.getTransactionInfo(), info.getTransactionType());

        // lcn type need connection proxy
        DTXLocalContext.makeProxy();
    }

    @Override
    public void onBusinessCodeError(TxTransactionInfo info, Throwable throwable) {
        DTXLocalContext.cur().setSysTransactionState(0);
    }

    @Override
    public void onBusinessCodeSuccess(TxTransactionInfo info, Object result) {
        DTXLocalContext.cur().setSysTransactionState(1);
    }

    @Override
    public void postBusinessCode(TxTransactionInfo info) {
        // RPC close DTX group
        transactionControlTemplate.notifyGroup(
                info.getGroupId(), info.getUnitId(), info.getTransactionType(), DTXLocalContext.transactionState());
    }
}

```


说明：

若增加的新的模式最好创建一个新的模块，然后调整pom增加该模块的支持即可。