import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "正の博客",
  description: "这是我的博客",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
