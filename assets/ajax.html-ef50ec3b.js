const n=JSON.parse(`{"key":"v-6c46e72c","path":"/webDev/javascript/ajax.html","title":"Ajax 笔记","lang":"zh-CN","frontmatter":{"title":"Ajax 笔记","icon":"ajax","date":"2022-11-28T00:00:00.000Z","category":["JS","浏览器","HTTP"],"tag":["ajax"],"description":"Ajax初识 Ajax是前后端用来进行交互的一种主流方式，其实现主要是通过创建 XMLHttpRequest实例 来发送 HTTP 请求。 // ajax简单使用 const xhr = new XMLHttpRequest(); // 创建实例 xhr.open('GET','http://www.example.org/example.txt'); // 确定请求方法和地址 xhr.send();\\t// 发送，此处若是post请求可放请求体数据 xhr.onreadystatechange = function() { // 监听状态变化，接收返回 if(xhr.readyState === 4){ if(xhr.status &gt;= 200 &amp;&amp; xhr.status &lt; 300){ console.log(xhr.response); } } }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/webDev/javascript/ajax.html"}],["meta",{"property":"og:site_name","content":"正の博客"}],["meta",{"property":"og:title","content":"Ajax 笔记"}],["meta",{"property":"og:description","content":"Ajax初识 Ajax是前后端用来进行交互的一种主流方式，其实现主要是通过创建 XMLHttpRequest实例 来发送 HTTP 请求。 // ajax简单使用 const xhr = new XMLHttpRequest(); // 创建实例 xhr.open('GET','http://www.example.org/example.txt'); // 确定请求方法和地址 xhr.send();\\t// 发送，此处若是post请求可放请求体数据 xhr.onreadystatechange = function() { // 监听状态变化，接收返回 if(xhr.readyState === 4){ if(xhr.status &gt;= 200 &amp;&amp; xhr.status &lt; 300){ console.log(xhr.response); } } }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-17T08:43:59.000Z"}],["meta",{"property":"article:author","content":"正"}],["meta",{"property":"article:tag","content":"ajax"}],["meta",{"property":"article:published_time","content":"2022-11-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-07-17T08:43:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Ajax 笔记\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-28T00:00:00.000Z\\",\\"dateModified\\":\\"2023-07-17T08:43:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"正\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":2,"title":"Ajax初识","slug":"ajax初识","link":"#ajax初识","children":[]},{"level":2,"title":"实例上的相关属性","slug":"实例上的相关属性","link":"#实例上的相关属性","children":[]},{"level":2,"title":"readyState属性","slug":"readystate属性","link":"#readystate属性","children":[]},{"level":2,"title":"解决浏览器缓存问题","slug":"解决浏览器缓存问题","link":"#解决浏览器缓存问题","children":[]},{"level":2,"title":"请求的超时，终止，异常","slug":"请求的超时-终止-异常","link":"#请求的超时-终止-异常","children":[]},{"level":2,"title":"fetch方法","slug":"fetch方法","link":"#fetch方法","children":[]}],"git":{"createdTime":1689583439000,"updatedTime":1689583439000,"contributors":[{"name":"zzlm0107","email":"zzlm0107@163.com","commits":1}]},"readingTime":{"minutes":2.41,"words":723},"filePathRelative":"webDev/javascript/ajax.md","localizedDate":"2022年11月28日","excerpt":"<h2> Ajax初识</h2>\\n<p>Ajax是前后端用来进行交互的一种主流方式，其实现主要是通过创建 <strong>XMLHttpRequest实例</strong> 来发送 HTTP 请求。</p>\\n<div class=\\"language-javascript line-numbers-mode\\" data-ext=\\"js\\"><pre class=\\"language-javascript\\"><code><span class=\\"token comment\\">// ajax简单使用</span>\\n<span class=\\"token keyword\\">const</span> xhr <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">XMLHttpRequest</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// 创建实例</span>\\n\\nxhr<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">open</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">'GET'</span><span class=\\"token punctuation\\">,</span><span class=\\"token string\\">'http://www.example.org/example.txt'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// 确定请求方法和地址</span>\\nxhr<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">send</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\t<span class=\\"token comment\\">// 发送，此处若是post请求可放请求体数据</span>\\n\\nxhr<span class=\\"token punctuation\\">.</span><span class=\\"token function-variable function\\">onreadystatechange</span> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">function</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span> <span class=\\"token comment\\">// 监听状态变化，接收返回</span>\\n    <span class=\\"token keyword\\">if</span><span class=\\"token punctuation\\">(</span>xhr<span class=\\"token punctuation\\">.</span>readyState <span class=\\"token operator\\">===</span> <span class=\\"token number\\">4</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">if</span><span class=\\"token punctuation\\">(</span>xhr<span class=\\"token punctuation\\">.</span>status <span class=\\"token operator\\">&gt;=</span> <span class=\\"token number\\">200</span> <span class=\\"token operator\\">&amp;&amp;</span> xhr<span class=\\"token punctuation\\">.</span>status <span class=\\"token operator\\">&lt;</span> <span class=\\"token number\\">300</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n            console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>xhr<span class=\\"token punctuation\\">.</span>response<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{n as data};
