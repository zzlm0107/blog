import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  // 主导航页侧边栏
  "/": [
    // "",
    {
      text: "如何使用",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "笔记导航",
      icon: "write",
      prefix: "webDev/",
      link: "webDev/",
    },
    {
      text: "前端开发",
      icon: "code",
      children: [
        {
          text: "基础入门",
          icon: "back-stage",
          prefix: "basic/",
          link: "/webDev/basic/",
        },
        {
          text: "JS 教程",
          icon: "javascript",
          prefix: "javascript/",
          link: "/webDev/javascript/"
        },
        {
          text: "TS 教程",
          icon: "typescript",
          prefix: "typescript/",
          link: "/webDev/typescript/"
        },
        {
          text: "Node.js",
          icon: "nodeJS",
          prefix: "node/",
          link: "/webDev/node/"
        },
        {
          text: "Vue.js",
          icon: "vue",
          prefix: "vue/",
          link: "/webDev/vue/"
        },
        {
          text: "React",
          icon: "react",
          prefix: "react/",
          link: "/webDev/react/"
        },
        {
          text: "小程序",
          icon: "mini-app",
          prefix: "mini-app/",
          link: "/webDev/mini-app/"
        },
      ],
    },
    "intro",
  ],

  // 对 /webDev/basic/ 基础入门 路径下的侧边栏重新定义
  "/webDev/basic/": [
    {
      text: "基础入门",
      icon: "back-stage",
      link: "/webDev/basic/",
    },
    {
      text: "HTML",
      icon: "html",
      prefix: "html/",
      link: "/webDev/basic/html/",
    },
    {
      text: "CSS",
      icon: "css",
      prefix: "css/",
      link: "/webDev/basic/css/",
    },
  ],

  // 对 /webDev/javascript/ JS教程 路径下的侧边栏重新定义
  "/webDev/javascript/": [
    {
      text: "JS 教程",
      icon: "javascript",
      link: "/webDev/javascript/",
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
    },
    {
      text: "Axios 使用",
      icon: "any",
      link: "axios.md",
    },
  ],

  // 对 /webDev/vue/ vue 路径下的侧边栏重新定义
  "/webDev/vue/": [
    {
      text: "Vue.js 介绍",
      icon: "vue",
      link: "/webDev/vue/",
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
});
