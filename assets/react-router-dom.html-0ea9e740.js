const e=JSON.parse('{"key":"v-4119a150","path":"/code/webDev/react/react-router-dom.html","title":"React Router 笔记","lang":"zh-CN","frontmatter":{"title":"React Router 笔记","icon":"router","date":"2023-04-20T00:00:00.000Z","category":["React","工具库"],"tag":["路由"],"description":"路由 什么是路由? 一个路由就是一个映射关系(key: value) key为路径, value可能是function或component 后端路由 理解： value是function, 用来处理客户端提交的请求。 注册路由： router.get(path, function(req, res)) 工作过程：当node接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来处理请求, 返回响应数据","head":[["meta",{"property":"og:url","content":"https://zzlm0107.github.io/blog/blog/code/webDev/react/react-router-dom.html"}],["meta",{"property":"og:site_name","content":"正の博客"}],["meta",{"property":"og:title","content":"React Router 笔记"}],["meta",{"property":"og:description","content":"路由 什么是路由? 一个路由就是一个映射关系(key: value) key为路径, value可能是function或component 后端路由 理解： value是function, 用来处理客户端提交的请求。 注册路由： router.get(path, function(req, res)) 工作过程：当node接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来处理请求, 返回响应数据"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-20T08:07:46.000Z"}],["meta",{"property":"article:author","content":"正"}],["meta",{"property":"article:tag","content":"路由"}],["meta",{"property":"article:published_time","content":"2023-04-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-07-20T08:07:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"React Router 笔记\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-04-20T00:00:00.000Z\\",\\"dateModified\\":\\"2023-07-20T08:07:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"正\\",\\"url\\":\\"https://github.com/zzlm0107\\"}]}"]]},"headers":[{"level":2,"title":"路由","slug":"路由","link":"#路由","children":[{"level":3,"title":"5版本的使用","slug":"_5版本的使用","link":"#_5版本的使用","children":[]},{"level":3,"title":"路由刷新样式丢失问题","slug":"路由刷新样式丢失问题","link":"#路由刷新样式丢失问题","children":[]},{"level":3,"title":"BrowserRouter与HashRouter的区别","slug":"browserrouter与hashrouter的区别","link":"#browserrouter与hashrouter的区别","children":[]},{"level":3,"title":"6版本的使用","slug":"_6版本的使用","link":"#_6版本的使用","children":[]}]}],"git":{"createdTime":1689840466000,"updatedTime":1689840466000,"contributors":[{"name":"zzlm0107","email":"zzlm0107@163.com","commits":1}]},"readingTime":{"minutes":7.11,"words":2134},"filePathRelative":"code/webDev/react/react-router-dom.md","localizedDate":"2023年4月20日","excerpt":"<h2> 路由</h2>\\n<p><strong>什么是路由?</strong></p>\\n<ol>\\n<li>一个路由就是一个映射关系(key: value)</li>\\n<li>key为路径, value可能是function或component</li>\\n</ol>\\n<p><strong>后端路由</strong></p>\\n<ol>\\n<li>理解： <strong>value是function</strong>, 用来处理客户端提交的请求。</li>\\n<li>注册路由： <code>router.get(path, function(req, res))</code></li>\\n<li>工作过程：当<code>node</code>接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来处理请求, 返回响应数据</li>\\n</ol>","autoDesc":true}');export{e as data};
