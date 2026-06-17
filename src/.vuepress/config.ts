import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/blog/",

  lang: "zh-CN",
  title: "张正的博客",
  description: "学习笔记",

  // 配置 Algolia 搜索
  head: [
    ["meta", { name: "algolia-site-verification", content: "C890951457106007" }],
  ],

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
