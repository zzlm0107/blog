import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/blog/",

  lang: "zh-CN",
  title: "张正的博客",
  description: "学习笔记",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
