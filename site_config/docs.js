export default {
    'en-us': {
        sidemenu: [
            {
                title: 'User Guide',
                children: [
                    {
                        title: 'Preface',
                        link: '/en-us/docs/preface.html',
                        opened: true,
                    },
                    {
                        title: 'Background',
                        link: '/en-us/docs/background.html',
                        opened: true,
                    },
                    {
                        title: 'Quick Start',
                        link: '/en-us/docs/start.html',
                    },
                    {
                        title: 'Dependencies',
                        link: '/en-us/docs/dependencies.html',
                    },
                    {
                        title: 'Demos',
                        children: [
                            {
                                title: 'DTX Demo',
                                link: '/en-us/docs/demo/env.html',
                            },
                            {
                                title: 'Dubbo of TC',
                                link: '/en-us/docs/demo/dubbo.html',
                            },
                            {
                                title: 'Springcloud of TC',
                                link: '/en-us/docs/demo/springcloud.html',
                            },
                        ],
                    },
                    {
                        title: 'In-depth TXLCN',
                        children: [
                            {
                                title: 'Explain',
                                link: '/en-us/docs/principle/control.html',
                            },
                            {
                                title: 'LCN Transaction Mode',
                                link: '/en-us/docs/principle/lcn.html',
                            },
                            {
                                title: 'TCC Transaction Mode',
                                link: '/en-us/docs/principle/tcc.html',
                            },
                            {
                                title: 'TXC Transaction Mode',
                                link: '/en-us/docs/principle/txc.html',
                            },
                        ],
                    },
                    {
                        title: 'Settings',
                        children: [
                            {
                                title: 'TC Settigns',
                                link: '/en-us/docs/setting/client.html',
                            },
                            {
                                title: 'TM Settings',
                                link: '/en-us/docs/setting/manager.html',
                            },
                            {
                                title: 'LoadBalance and TM Cluster',
                                link: '/en-us/docs/setting/distributed.html',
                            },
                        ],
                    },
                    {
                        title: 'Extensions',
                        children: [
                            {
                                title: 'Transaction Mode',
                                link: '/en-us/docs/expansion/transaction.html',
                            },
                            {
                                title: 'TXMSG\'s Protocol',
                                link: '/en-us/docs/expansion/message.html',
                            },
                            {
                                title: 'TXMSG',
                                link: '/en-us/docs/expansion/rpc.html',
                            },
                        ],
                    },
                    {
                        title: 'Command of TXMSG',
                        link: '/en-us/docs/communication.html',
                    },
                    {
                        title: 'TM guide',
                        link: '/en-us/docs/manageradmin.html',
                    },
                    {
                        title: 'When troubles',
                        link: '/en-us/docs/debug.html',
                    },
                    {
                        title: 'Test report',
                        link: '/en-us/docs/test.html',
                    },
                    {
                        title: 'Developers',
                        link: '/en-us/docs/developer.html',
                    },
                    {
                        title: 'FQA',
                        link: '/en-us/docs/fqa.html',
                    },
                ],
            },
        ],
        barText: 'Documents',
    },
    'zh-cn': {
        sidemenu: [
            {
                title: '用户文档',
                children: [
                    {
                        title: '入门',
                        link: '/zh-cn/docs/preface.html',
                        opened: true,
                    },
                    {
                        title: '背景',
                        link: '/zh-cn/docs/background.html',
                        opened: true,
                    },
                    {
                        title: '快速开始',
                        link: '/zh-cn/docs/start.html',
                    },
                    {
                        title: '依赖',
                        link: '/zh-cn/docs/dependencies.html',
                    },
                    {
                        title: '示例',
                        children: [
                            {
                                title: '分布式事务示例',
                                link: '/zh-cn/docs/demo/env.html',
                            },
                            {
                                title: 'TC之Dubbo',
                                link: '/zh-cn/docs/demo/dubbo.html',
                            },
                            {
                                title: 'TC之SpringCloud',
                                link: '/zh-cn/docs/demo/springcloud.html',
                            },
                        ],
                    },
                    {
                        title: '原理介绍',
                        children: [
                            {
                                title: '控制原理',
                                link: '/zh-cn/docs/principle/control.html',
                            },
                            {
                                title: 'LCN模式',
                                link: '/zh-cn/docs/principle/lcn.html',
                            },
                            {
                                title: 'TCC模式',
                                link: '/zh-cn/docs/principle/tcc.html',
                            },
                            {
                                title: 'TXC模式',
                                link: '/zh-cn/docs/principle/txc.html',
                            },
                        ],
                    },
                    {
                        title: '配置手册',
                        children: [
                            {
                                title: 'TC配置',
                                link: '/zh-cn/docs/setting/client.html',
                            },
                            {
                                title: 'TM配置',
                                link: '/zh-cn/docs/setting/manager.html',
                            },
                            {
                                title: '集群与负载',
                                link: '/zh-cn/docs/setting/distributed.html',
                            },
                        ],
                    },
                    {
                        title: '扩展支持',
                        children: [
                            {
                                title: '事务模式扩展',
                                link: '/zh-cn/docs/expansion/transaction.html',
                            },
                            {
                                title: '通讯协议扩展',
                                link: '/zh-cn/docs/expansion/message.html',
                            },
                            {
                                title: 'RPC框架扩展',
                                link: '/zh-cn/docs/expansion/rpc.html',
                            },
                        ],
                    },
                    {
                        title: '通讯指令手册',
                        link: '/zh-cn/docs/communication.html',
                    },
                    {
                        title: 'TM管理手册',
                        link: '/zh-cn/docs/manageradmin.html',
                    },
                    {
                        title: '问题排查手册',
                        link: '/zh-cn/docs/debug.html',
                    },
                    {
                        title: '性能测试报告',
                        link: '/zh-cn/docs/test.html',
                    },
                    {
                        title: '开发者',
                        link: '/zh-cn/docs/developer.html',
                    },
                    {
                        title: 'FQA',
                        link: '/zh-cn/docs/fqa.html',
                    },
                ],
            },
        ],
        barText: '文档',
    },
};
