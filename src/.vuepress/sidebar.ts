import { sidebar } from "vuepress-theme-hope";

export default sidebar({
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
      text: "文章",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    {
      text: "前端开发",
      icon: "code",
      prefix: "webDev/",
      children: [
        {
          text: "基础",
          icon: "laptop-code",
          prefix: "basic/",
          link: "/webDev/basic/",
        },
        {
          text: "进阶",
          prefix: "corge/",
          children: [
            "fred.md" /* /corge/fred.html */,
            "grault.md" /* /corge/grault.html */,
          ],
        },
      ],
    },
    "intro",
  ],
  "/webDev/basic/": [
    "" /* /foo/ */,
    "HTML" /* /foo/one.html */,
  ],
});
