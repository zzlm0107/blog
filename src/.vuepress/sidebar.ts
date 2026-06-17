import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  // "/code/": "structure",
  "/code/": [
    {
      text: "代码笔记",
      link: "/code/"
    },
    {
      text: "计算机通识",
      prefix: "common/",
      collapsible: true,
      children: "structure"
    },
    {
      text: "前端开发",
      prefix: "web/",
      collapsible: true,
      expanded: true,
      children: [
        {
          text: "基础",
          icon: "fa-solid fa-code fa-xs",
          prefix: "basic/",
          link: "basic/flex.md",
        },
        {
          text: "JavaScript",
          icon: "fa-brands fa-square-js",
          prefix: "js/",
          link: "js/js.md",
        },
        {
          text: "Vue",
          icon: "fa-brands fa-vuejs",
          prefix: "vue/",
          link: "vue/vue2.md",
        },
        {
          text: "React",
          icon: "fa-brands fa-react",
          prefix: "react/",
          link: "react/react.md",
        },
        {
          text: "小程序",
          icon: "fa-brands fa-fedora",
          prefix: "mini-app/",
          link: "mini-app/uniapp.md",
        },
        {
          text: "服务端渲染",
          icon: "fa-solid fa-passport fa-sm",
          prefix: "ssr/",
          link: "ssr/nuxt.md",
        },
        {
          text: "Vite",
          icon: "fa-brands fa-vimeo-v",
          prefix: "vite/",
          link: "vite/vite.md",
        },
        {
          text: "第三方库",
          icon: "fa-solid fa-box-open fa-xs",
          prefix: "npm/",
          link: "npm/axios.md",
        },
        {
          text: "Electron",
          icon: "fa-solid fa-atom",
          prefix: "electron/",
          link: "electron/electron.md",
        },
        {
          text: "Node.js",
          icon: "fa-brands fa-node fa-sm",
          prefix: "node/",
          link: "node/node.md",
        },
        {
          text: "归纳与总结",
          icon: "fa-solid fa-clipboard-list",
          prefix: "summary/",
          link: "summary/summary.md",
        },
      ]
    },
  ],

  "/code/web/basic/": "structure",
  "/code/web/js/": "structure",
  "/code/web/vue/": "structure",
  "/code/web/react/": "structure",
  "/code/web/npm/": "structure",
  "/code/web/node/": "structure",
  "/code/web/summary/": "structure",
});
