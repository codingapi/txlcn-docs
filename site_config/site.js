// 全局的一些配置
export default {
  rootPath: '', // 发布到服务器的根目录，需以/开头但不能有尾/，如果只有/，请填写空字符串
  port: 8080, // 本地开发服务器的启动端口
  domain: 'txlcn.org', // 站点部署域名，无需协议和path等
  defaultSearch: 'baidu', // 默认搜索引擎，baidu或者google
  defaultLanguage: 'zh-cn',
  'en-us': {
    pageMenu: [
      {
        key: 'Home', // 用作顶部菜单的选中
        text: 'Home',
        link: '/en-us/index.html',
      },
      {
        key: 'News',
        text: 'News',
        link: 'https://bbs.txlcn.org/viewtopic.php?id=42',
      },
      {
        key: 'Forum',
        text: 'Forum',
        link: 'https://bbs.txlcn.org/',
      },
      {
        key: 'Docs',
        text: 'Docs',
        link: '/en-us/docs/preface.html',
      },
      {
        key: 'Download',
        text: 'Download',
          link: 'https://github.com/codingapi/tx-lcn/releases',
          target:'_blank',
      },
      {
        key: 'Sponsor',
        text: 'Sponsor',
        link: '/en-us/sponsor/index.html'
      },
    ],
    disclaimer: {
        title: 'Vision',
        content: 'We will devote ourselves to creating a fast, efficient and concurrent distributed transaction solution.',
    },
    documentation: {
      title: 'Navigation',
      list: [
        {
          text: 'TX-LCN Solution',
          link: '/zh-cn/docs/txlcn-arch.html',
        },
        {
          text: 'Get Started',
          link: '/zh-cn/docs/start.html',
        },
        {
          text: 'Develop Plan',
          link: '/zh-cn/docs/txlcn-mod.html',
        },
        {
          text: 'Report Bug',
          link: 'https://bbs.txlcn.org/viewforum.php?id=8',
        },
      ],
    },
    resources: {
      title: 'Friendship Link',
      list: [
        // {
        //   text: 'Blog',
        //   link: '/en-us/blog/index.html',
        // },
        {
          text: 'CodingApi',
            link: 'https://www.codingapi.com/',
            target:'_blank',
        },
      ],
    },
    copyright: 'Copyright © 2018 CodingApi',
  },
  'zh-cn': {
    pageMenu: [
      {
        key: 'home',
        text: '首页',
        link: '/zh-cn/index.html',
      },
      {
        key: '新闻',
        text: '新闻',
        link: 'https://bbs.txlcn.org/viewtopic.php?id=42',
      },
      {
        key: 'community',
        text: '社区',
        link: 'https://bbs.txlcn.org',
      },
      {
        key: 'docs',
        text: '文档',
        link: '/zh-cn/docs/preface.html',
      },
      {
        key: '下载',
        text: '下载',
        link: 'https://github.com/codingapi/tx-lcn/releases',
        target:'_blank',
      },
      {
        key: '赞助',
        text: '赞助',
        link: '/zh-cn/sponsor/index.html'
      },
    ],
    disclaimer: {
        title: '愿景',
        content: '我们将致力于打造一个快捷、高效、兼任性强的分布式事务解决方案',
    },
    documentation: {
      title: '导航',
      list: [
        {
          text: 'TX-LCN解决方案',
          link: '/zh-cn/docs/txlcn-arch.html',
        },
        {
          text: '快速上手',
          link: '/zh-cn/docs/start.html',
        },
        {
          text: '开发计划',
          link: '/zh-cn/docs/txlcn-mod.html',
        },
        {
          text: '报告Bug',
          link: 'https://bbs.txlcn.org/viewforum.php?id=8',
        },
      ],
    },
    resources: {
      title: '友情链接',
      list: [
        // {
        //   text: '博客',
        //   link: '/zh-cn/blog/index.html',
        // },
        {
          text: 'CodingApi',
            link: 'https://www.codingapi.com/',
            target:'_blank',
        },
      ],
    },
    copyright: 'Copyright © 2018-2019 CodingApi',
  },
};
