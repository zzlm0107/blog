const n=JSON.parse(`{"key":"v-18f7208e","path":"/code/webDev/vue/vuex.html","title":"Vuex 笔记","lang":"zh-CN","frontmatter":{"title":"Vuex 笔记","icon":"vue","date":"2022-12-25T00:00:00.000Z","category":["Vue","工具库"],"tag":["状态管理"],"description":"在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。 官方文档 https://vuex.vuejs.org/zh-cn/ 基本使用 \\t/* store/index.js */ const actions = { //响应组件中加的动作 \\tjia(context,value){ \\t\\t// console.log('actions中的jia被调用了',miniStore,value) \\t\\tcontext.commit('JIA',value) \\t}, } const mutations = { //执行加 \\tJIA(state,value){ \\t\\t// console.log('mutations中的JIA被调用了',state,value) \\t\\tstate.sum += value \\t} } const getters = { \\tbigSum(state){ \\t\\treturn state.sum * 10 \\t} } //初始化数据 const state = { sum:0 } //创建并暴露store export default new Vuex.Store({ \\tactions, \\tmutations, \\tstate, getters })","head":[["meta",{"property":"og:url","content":"https://zzlm0107.github.io/blog/blog/code/webDev/vue/vuex.html"}],["meta",{"property":"og:site_name","content":"正の博客"}],["meta",{"property":"og:title","content":"Vuex 笔记"}],["meta",{"property":"og:description","content":"在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。 官方文档 https://vuex.vuejs.org/zh-cn/ 基本使用 \\t/* store/index.js */ const actions = { //响应组件中加的动作 \\tjia(context,value){ \\t\\t// console.log('actions中的jia被调用了',miniStore,value) \\t\\tcontext.commit('JIA',value) \\t}, } const mutations = { //执行加 \\tJIA(state,value){ \\t\\t// console.log('mutations中的JIA被调用了',state,value) \\t\\tstate.sum += value \\t} } const getters = { \\tbigSum(state){ \\t\\treturn state.sum * 10 \\t} } //初始化数据 const state = { sum:0 } //创建并暴露store export default new Vuex.Store({ \\tactions, \\tmutations, \\tstate, getters })"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-04T07:20:14.000Z"}],["meta",{"property":"article:author","content":"正"}],["meta",{"property":"article:tag","content":"状态管理"}],["meta",{"property":"article:published_time","content":"2022-12-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-08-04T07:20:14.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Vuex 笔记\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-12-25T00:00:00.000Z\\",\\"dateModified\\":\\"2023-08-04T07:20:14.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"正\\",\\"url\\":\\"https://github.com/zzlm0107\\"}]}"]]},"headers":[{"level":2,"title":"基本使用","slug":"基本使用","link":"#基本使用","children":[]},{"level":2,"title":"映射仓库","slug":"映射仓库","link":"#映射仓库","children":[]},{"level":2,"title":"模块化与命名空间","slug":"模块化与命名空间","link":"#模块化与命名空间","children":[]}],"git":{"createdTime":1689840466000,"updatedTime":1691133614000,"contributors":[{"name":"zzlm0107","email":"zzlm0107@163.com","commits":3}]},"readingTime":{"minutes":2.82,"words":846},"filePathRelative":"code/webDev/vue/vuex.md","localizedDate":"2022年12月25日","excerpt":"<p>在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。</p>\\n<p><strong>官方文档</strong> <a href=\\"https://vuex.vuejs.org/zh-cn/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://vuex.vuejs.org/zh-cn/</a></p>\\n<h2> 基本使用</h2>\\n<div class=\\"language-javascript line-numbers-mode\\" data-ext=\\"js\\"><pre class=\\"language-javascript\\"><code>\\t<span class=\\"token comment\\">/* store/index.js */</span>\\n   <span class=\\"token keyword\\">const</span> actions <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n       <span class=\\"token comment\\">//响应组件中加的动作</span>\\n   \\t<span class=\\"token function\\">jia</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">context<span class=\\"token punctuation\\">,</span>value</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n   \\t\\t<span class=\\"token comment\\">// console.log('actions中的jia被调用了',miniStore,value)</span>\\n   \\t\\tcontext<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">commit</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">'JIA'</span><span class=\\"token punctuation\\">,</span>value<span class=\\"token punctuation\\">)</span>\\n   \\t<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n   <span class=\\"token punctuation\\">}</span>\\n   \\n   <span class=\\"token keyword\\">const</span> mutations <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n       <span class=\\"token comment\\">//执行加</span>\\n   \\t<span class=\\"token constant\\">JIA</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">state<span class=\\"token punctuation\\">,</span>value</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n   \\t\\t<span class=\\"token comment\\">// console.log('mutations中的JIA被调用了',state,value)</span>\\n   \\t\\tstate<span class=\\"token punctuation\\">.</span>sum <span class=\\"token operator\\">+=</span> value\\n   \\t<span class=\\"token punctuation\\">}</span>\\n   <span class=\\"token punctuation\\">}</span>\\n   \\n   <span class=\\"token keyword\\">const</span> getters <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n   \\t<span class=\\"token function\\">bigSum</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">state</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n   \\t\\t<span class=\\"token keyword\\">return</span> state<span class=\\"token punctuation\\">.</span>sum <span class=\\"token operator\\">*</span> <span class=\\"token number\\">10</span>\\n   \\t<span class=\\"token punctuation\\">}</span>\\n   <span class=\\"token punctuation\\">}</span>\\n   \\n   <span class=\\"token comment\\">//初始化数据</span>\\n   <span class=\\"token keyword\\">const</span> state <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n      <span class=\\"token literal-property property\\">sum</span><span class=\\"token operator\\">:</span><span class=\\"token number\\">0</span>\\n   <span class=\\"token punctuation\\">}</span>\\n   \\n   <span class=\\"token comment\\">//创建并暴露store</span>\\n   <span class=\\"token keyword\\">export</span> <span class=\\"token keyword\\">default</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Vuex<span class=\\"token punctuation\\">.</span>Store</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">{</span>\\n   \\tactions<span class=\\"token punctuation\\">,</span>\\n   \\tmutations<span class=\\"token punctuation\\">,</span>\\n   \\tstate<span class=\\"token punctuation\\">,</span>\\n    getters\\n   <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{n as data};
