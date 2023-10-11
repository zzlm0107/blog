import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as l,c as s,a as e,b as t,d as r,e as c}from"./app-3f51fd7d.js";const h={},_=c('<h2 id="服务端渲染" tabindex="-1"><a class="header-anchor" href="#服务端渲染" aria-hidden="true">#</a> 服务端渲染</h2><p>传统的单页面网站，开发简便，目前的前端主流开发框架如vue和react，构建项目都是依靠一个根页面，然后里面的组件及样式等通过请求框架编译好的js文件然后渲染出来，即页面初次打开时的html是没有任何页面内容的，真正的内容需要通过js文件获取到然后解析渲染出来。</p><p>但有两个重要问题就是SEO优化和首页加载问题。</p><ul><li>SEO是依靠爬取页面上的html等内容，实现搜索引擎的权重提高，但由于单页应用初始时只有一个空的html，无法获取到网站的内容，这也就导致seo优化的问题；</li><li>单页面应用都是依靠根页面为基础向外扩展的，这样导致的问题就是首次打开页面时会大量请求页面关联的各种文件，然后再进行渲染展示，这样会花费大量的时间，展示较长时间的白屏，是不利于用户体验的，所以首屏加载问题也是单页应用的一大缺点。</li></ul><p>由此诞生出来的解决方案就是<strong>服务端渲染</strong>。</p><p>服务端渲染就是当用户打开网页时，服务器先把首页所需要的所有资源都获取到，拼接成一个完整的html文件，然后把这个html文件返回给用户。网页也能正常打开。并且由于返回的是有内容的html，seo优化也可以；此外整个文件是在服务端组装好，免去了传统客户端渲染的请求步骤，对首屏加载也十分的友好。</p>',6),i={href:"https://zhuanlan.zhihu.com/p/357538660",target:"_blank",rel:"noopener noreferrer"},p={href:"https://nuxt.com.cn/",target:"_blank",rel:"noopener noreferrer"},d={href:"https://www.nextjs.cn/",target:"_blank",rel:"noopener noreferrer"};function m(u,f){const n=a("ExternalLinkIcon");return l(),s("div",null,[_,e("p",null,[t("关于客户端渲染和服务端渲染的详细区别可以看 "),e("a",i,[t("这篇文章"),r(n)])]),e("p",null,[t("vue一派的服务端渲染框架叫 "),e("strong",null,[e("a",p,[t("Nuxt"),r(n)])]),t("; react一派的服务端渲染框架叫 "),e("strong",null,[e("a",d,[t("Next"),r(n)])]),t("。")])])}const k=o(h,[["render",m],["__file","index.html.vue"]]);export{k as default};
