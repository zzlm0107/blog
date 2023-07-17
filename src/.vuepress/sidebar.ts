import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  // 一级侧边栏
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

  // 对 /webDev/basic/ 路径下的侧边栏重新定义
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
});
