import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/blog/",

  lang: "zh-CN",
  title: "正の博客",
  description: "这是我的博客",

  theme,

  plugins: [
    searchProPlugin({
      // // 索引全部内容
      indexContent: false,
      autoSuggestions: false,
      // // 为分类和标签添加索引
      customFields: [
        {
          getter: (page) => page.frontmatter.category as string[] | string,
          formatter: "分类：$content",
        },
        {
          getter: (page) => page.frontmatter.tag  as string[] | string,
          formatter: "标签：$content",
        },
      ],
    }),
  ],

  // Enable it with pwa
  // shouldPrefetch: false,
});
