import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  // 主导航页侧边栏
  "/": [
    // "",
    // {
    //   text: "如何使用",
    //   icon: "laptop-code",
    //   prefix: "demo/",
    //   link: "demo/",
    //   children: "structure",
    // },
    {
      text: "代码笔记",
      icon: "write",
      prefix: "code/",
      link: "code/",
    },
    {
      text: "计算机基础",
      icon: "computer",
      prefix: "code/computer/",
      link: "code/computer/",
    },
    {
      text: "前端开发",
      icon: "code",
      prefix: "code/webDev/",
      link: "code/webDev/",
      children: [
        {
          text: "基础入门",
          icon: "back-stage",
          prefix: "basic/",
          link: "basic/",
        },
        {
          text: "JS 教程",
          icon: "javascript",
          prefix: "javascript/",
          link: "javascript/"
        },
        {
          text: "TS 教程",
          icon: "typescript",
          prefix: "typescript/",
          link: "typescript/"
        },
        {
          text: "Node.js",
          icon: "nodeJS",
          prefix: "node/",
          link: "node/"
        },
        {
          text: "Vue.js",
          icon: "vue",
          prefix: "vue/",
          link: "vue/"
        },
        {
          text: "React",
          icon: "react",
          prefix: "react/",
          link: "react/"
        },
        {
          text: "小程序",
          icon: "mini-app",
          prefix: "mini-app/",
          link: "mini-app/"
        },
        {
          text: "Webpack",
          icon: "webpack",
          prefix: "webpack/",
          link: "webpack/"
        },
        {
          text: "Vite",
          icon: "vite",
          prefix: "vite/",
          link: "vite/"
        },
        {
          text: "第三方库",
          icon: "npm",
          prefix: "npm/",
          link: "npm/",
        },
      ],
    },
    // "intro",
  ],

  // /code/computer/ 侧边栏重定义
  "/code/computer/": [
    {
      text: "计算机基础",
      icon: "computer",
      link: "/code/computer/",
    },
    {
      text: "HTTP",
      icon: "http",
      link: "http.md",
    },
    {
      text: "Git",
      icon: "git",
      link: "git.md",
    },
    {
      text: "Markdown",
      icon: "markdown",
      link: "markdown.md",
    },
  ],

  // 对 /code/webDev/basic/ 侧边栏重定义
  "/code/webDev/basic/": [
    {
      text: "基础入门",
      icon: "back-stage",
      link: "/code/webDev/basic/",
    },
    {
      text: "HTML",
      icon: "html",
      link: "html.md",
    },
    {
      text: "CSS",
      icon: "css",
      link: "css.md",
    },
    {
      text: "Flex 弹性布局",
      icon: "flex",
      link: "flex.md",
    },
    {
      text: "Grid 网格布局",
      icon: "grid",
      link: "grid.md",
    },
    {
      text: "Less 预处理器",
      icon: "less",
      link: "less.md",
    },
    {
      text: "Sass 预处理器",
      icon: "sass",
      link: "sass.md",
    },
  ],

  // 对 /webDev/javascript/ 路径下的侧边栏重新定义
  "/code/webDev/javascript/": [
    {
      text: "JS 教程",
      icon: "javascript",
      link: "/code/webDev/javascript/",
    },
    {
      text: "JS 基础",
      icon: "jichu",
      link: "js基础.md",
    },
    {
      text: "JS 进阶",
      icon: "jinjie",
      link: "js进阶.md",
    },
    {
      text: "DOM 相关",
      icon: "dom",
      link: "dom.md",
    },
    {
      text: "BOM 相关",
      icon: "bom",
      link: "bom.md",
    },
    {
      text: "ES6 +",
      icon: "es6",
      link: "es6+.md",
    },
    {
      text: "Ajax 学习",
      icon: "ajax",
      link: "ajax.md",
    }
  ],

  // 对 /webDev/typescript/ 路径下的侧边栏重新定义
  "/code/webDev/typescript/": [
    {
      text: "TS 教程",
      icon: "typescript",
      link: "/code/webDev/typescript/",
    },
    {
      text: "TS 基础",
      icon: "jichu",
      link: "ts基础.md",
    },
  ],

  // 对 /webDev/vue/ 路径下的侧边栏重新定义
  "/code/webDev/vue/": [
    {
      text: "Vue.js 介绍",
      icon: "vue",
      link: "/code/webDev/vue/",
    },
    {
      text: "Vue2 笔记",
      icon: "vue",
      link: "vue2.md",
    },
    {
      text: "Vuex",
      icon: "state",
      link: "vuex.md",
    },
    {
      text: "Vue Router",
      icon: "router",
      link: "vue-router.md",
    },
    {
      text: "Vue3 笔记",
      icon: "vue",
      link: "vue3.md",
    },
    {
      text: "Pinia",
      icon: "state",
      link: "pinia.md",
    }
  ],

  // 对 /webDev/mini-app/ 路径下的侧边栏重新定义
  "/code/webDev/mini-app/": [
    {
      text: "小程序介绍",
      icon: "mini-app",
      link: "/code/webDev/mini-app/",
    },
    {
      text: "uni-app 基础",
      icon: "jichu",
      link: "uniapp基础.md",
    },
    {
      text: "uni-app 云开发",
      icon: "jinjie",
      link: "uniapp云开发.md",
    },
  ],

  // 对 /webDev/react/ 路径下的侧边栏重新定义
  "/code/webDev/react/": [
    {
      text: "React 介绍",
      icon: "react",
      link: "/code/webDev/react/",
    },
    {
      text: "React 基础",
      icon: "react",
      link: "react基础.md",
    },
    {
      text: "Redux",
      icon: "state",
      link: "redux.md",
    },
    {
      text: "React Router",
      icon: "router",
      link: "react-router-dom.md",
    },
    {
      text: "Hooks 进阶",
      icon: "jinjie",
      link: "hooks进阶.md",
    }
  ],

  "/code/webDev/npm/": [
    {
      text: "npm与第三方包",
      icon: "npm",
      link: "/code/webDev/npm/",
    },
    {
      text: "Bootstrap5",
      icon: "bootstrap",
      link: "bootstrap5.md",
    },
    {
      text: "Axios 使用",
      icon: "any",
      link: "axios.md",
    },
    {
      text: "Three.js",
      icon: "model",
      link: "threejs.md",
    }
  ],
});
