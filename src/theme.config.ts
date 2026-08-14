// cannot use path alias here because unocss can not resolve it
import { defineConfig } from "./toolkit/themeConfig";

export default defineConfig({

// ====================== 首页banner ======================
  siteName: "Onsaki",
  brand: {
    title: "Onsaki",
    subtitle: "一颦、一笑、一回眸，一生记念。",
    logo: "💤",
  },


// ====================== 侧边栏 Sidebar 配置 ======================
  sidebar: {
    author: "Onsaki",
    description: "路边的茶楼人影错落，街上传来两三声吆喝。人前摇扇醒木拍桌，各位看官你细听分说",

    social: {
      github: {
        url: "https://github.com/onsaki",
        icon: "i-ri-github-fill",
        color: "#191717",
      },
      bilibili: {
        url: "https://space.bilibili.com/8861811",
        icon: "i-ri-bilibili-fill",
        color: "#fb7299",
      },
      music: {
        url: "https://music.163.com/#/user/home?id=30311666",
        icon: "i-ri-music-2-fill",
        color: "#e60026",
      },
      weibo: {
        url: "https://weibo.com/u/5034008607",
        icon: "i-ri-weibo-fill",
        color: "#ea716e",
      },
      email: {
        url: "mailto:woshi@roubianqi.com",
        icon: "i-ri-mail-fill",
        color: "#55acd5",
      },
    },
  },

// ====================== 侧边栏小组件 ======================
  widgets: {
    randomPosts: true,
    recentComments: true,
  },


// ====================== 首页配置 ======================
    home: {
    pageSize: 15, // 每页显示 5 篇文章
    selectedCategories: [
      // 突出显示两个分类
      { 
        name: "关于hexo",
        cover: "/images/hexo-cover.jpg",
      },
      {
        name: "学习笔记",
        cover: "/images/bg-1.jpg",
      },
    ],
  },
  

    cover: {
    enable: true,       // 启用封面
    preload: true,      // 图片预加载（提升性能）
    fixedCover: {
      enable: true,     // 启用固定封面
      url: "/images/bg-2.jpg",   // 使用预设图片
    },
  },

// ====================== 右侧卡片布局 ======================
  layout: {
    mode: "three-column",
    rightSidebar: {
      announcement: true,  // 显示公告
      search: true,        // 显示搜索
      calendar: false,     // 隐藏日历
      recentMoments: true, // 显示最近动态
      randomPosts: false,  // 隐藏随机文章
      tagCloud: true,      // 显示标签云
    },
  },



// ====================== 导航栏 Nav 配置 ======================
  nav: [
    // 首页
    {
      text: "首页",
      href: "/",
      icon: "i-ri-home-line",
    },
    // 关于我
    {
      text: "关于",
      href: "/about/",
      icon: "i-ri-user-line",
    },
    // 文章下拉菜单（归档/分类/标签）
    {
      text: "文章",
      href: "/posts/",
      icon: "i-ri:article-line",
      dropbox: {
        enable: true,
        items: [
          {
            text: "归档",
            href: "/archives/",
            icon: "i-ri:archive-2-line",
          },
          {
            text: "分类",
            href: "/categories/",
            icon: "i-ri-layout-grid-line",
          },
          {
            text: "标签",
            href: "/tags/",
            icon: "i-ri-price-tag-3-line",
          },
        ],
      },
    },
    // 友链
    {
      text: "友链",
      href: "/friends/",
      icon: "i-ri-heart-line",
    },
    // 链接
    {
      text: "链接",
      href: "/links/",
      icon: "i-ri-link-m",
    },
    // 留言板
    {
      text: "留言",
      href: "/message/",
      icon: "i-ri-wechat-line",
    },
  ],


// ====================== 版权信息 ======================
  copyright: {
    License: "CC-BY-NC-SA-4.0", // 许可证类型
    show: true, // 是否显示版权声明
  },

// ====================== 页脚信息 ======================
    footer: {
    since: 2020, // 博客起始年份
    count: true, // 显示统计信息
  },

// ====================== 页面标题切换 ======================
  visibilityTitle: {
    enable: true,
    leaveTitle: "👀 你先忙，我等你回来~",
    returnTitle: "🎉 欢迎回来！",
    restoreDelay: 3000,
  },

//====================== 友链 ======================
  friends: {
    title: "大佬们",
    description: "管他是不是友，先把链接放上来.",
    links:[
      {
        url: "https://imba97.cn/",
        title: "imba97",
        desc: "あなた、怠惰ですねー",
        author: "imba久期",
        avatar: "https://imba97.cn/uploads/2019/08/imba97-1024-300x300.png",
        color: "#50528a",
      },

      {
        url: "https://shoka.lostyu.me",
        title: "優萌初華",
        desc: "琉璃的医学 & 编程笔记",
        author: "霜月琉璃",
        avatar: "https://cdn.jsdelivr.net/gh/amehime/shoka@latest/images/avatar.jpg",
        color: "#e9546b",
      },

      {
        url: "https://www.chiyunshe.cn/",
        title: "赤云社",
        desc: "灰昼C4D",
        author: "灰昼",
        avatar: "https://www.chiyunshe.cn/blog/wp-content/uploads/2017/02/banner6-2.jpg",
        color: "#E9364B",
      },

      {
        url: "https://www.msdmanuals.cn/",
        title: "默沙东诊疗手册",
        desc: "免费的公众服务提供给医疗专业人士和普罗大众",
        author: "默沙东诊疗手册",
        avatar: "https://edge.sitecorecloud.io/mmanual-ssq1ci05/media/manual/brand-logos/mm_logo.svg",
        color: "#E9364B",
      },
    ]
  }  

});