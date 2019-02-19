import React from 'react';

export default {
    'zh-cn': {
        brand: {
            brandName: 'TX-LCN分布式事务框架',
            briefIntroduction: 'LCN并不生产事务，LCN只是本地事务的协调工',
            buttons: [
                {
                    text: '立即开始',
                    link: '/zh-cn/docs/demo/env.html',
                    type: 'primary',
                },
                {
                    text: '查看Github',
                    link: 'https://github.com/codingapi/tx-lcn',
                    type: 'normal',
                },
            ],
        },
        introduction: {
            title: '高性能的分布式事务框架',
            desc: '兼容dubbo、springcloud框架，支持RPC框架拓展，支持各种ORM框架、NoSQL、负载均衡、事务补偿',
            img: '/img/architecture.png',
        },
        features: {
            title: '特性一览',
            list: [
                {
                    img: '/img/feature_transpart.png',
                    title: '一致性',
                    content: '通过TxManager协调控制与事务补偿机制确保数据一致性',
                },
                {
                    img: '/img/feature_loadbalances.png',
                    title: '高可用',
                    content: '项目模块不仅可高可用部署，事务协调器也可集群化部署',
                },
                {
                    img: '/img/feature_service.png',
                    title: '易用性',
                    content: '仅需要在业务方法上添加@TxTransaction注解即可',
                },
                {
                    img: '/img/feature_hogh.png',
                    title: '扩展性',
                    content: '支持各种RPC框架扩展，支持通讯协议与事务模式扩展',
                },
            ],
        },
        start: {
            title: '快速开始',
            desc: <p><br/> 简单加几个注解在协作的微服务上，即可享受TXLCN带来的好处！ <br/> <br/></p>,
            img: '/img/quick_start.png',
            button: {
                text: '好了，开始吧',
                link: '/zh-cn/docs/start.html',
            },
        },
        users: {
            title: '用户',
            desc: <span>目前采用的客户</span>,
            list: [
                '/img/users_alibaba.png', '/img/users_alibaba.png',
            ],
        },
    },
    'en-us': {
        brand: {
            brandName: 'Best framework of distributed transaction - LCN',
            briefIntroduction: 'Coordinate these local transactions by TM magic.',
            buttons: [
                {
                    text: 'Quick Start',
                    link: '/en-us/docs/demo/env.html',
                    type: 'primary',
                },
                {
                    text: 'Github',
                    link: 'https://github.com/codingapi/tx-lcn',
                    type: 'normal',
                },
            ],
        },
        introduction: {
            title: 'The best distributed transaction framework and at least in China.',
            desc: 'Easy playing with SpringCloud、Dubbo and other RPC frameworks by useful rpc extensions，and support any JDBC transaction.',
            img: '/img/architecture.png',
        },
        features: {
            title: 'Features',
            list: [
                {
                    img: '/img/feature_transpart.png',
                    title: 'Consistency',
                    content: '通过TxManager协调控制与事务补偿机制确保数据一致性',
                },
                {
                    img: '/img/feature_loadbalances.png',
                    title: 'High Availability',
                    content: '项目模块不仅可高可用部署，事务协调器也可集群化部署',
                },
                {
                    img: '/img/feature_service.png',
                    title: 'High Accessibility',
                    content: '仅需要在业务方法上添加@TxTransaction注解即可',
                },
                {
                    img: '/img/feature_hogh.png',
                    title: 'High Expansibility',
                    content: '支持各种RPC框架扩展，支持通讯协议与事务模式扩展',
                },
            ],
        },
        start: {
            title: 'Get started!',
            desc: <p><br/> Add LCN annotations to your micro services, and have tea the rest of the time. <br/> <br/></p>,
            img: '/img/quick_start.png',
            button: {
                text: 'TRY IT NOW',
                link: '/en-us/docs/start.html',
            },
        },
        users: {
            title: '用户',
            desc: <span>目前采用的客户</span>,
            list: [
                '/img/users_alibaba.png', '/img/users_alibaba.png',
            ],
        },
    },
};
