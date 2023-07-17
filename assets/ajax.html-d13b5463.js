import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as e,o,c as p,a as n,b as a,d as c,f as r}from"./app-cf9b6551.js";const l={},i=r(`<h2 id="ajax初识" tabindex="-1"><a class="header-anchor" href="#ajax初识" aria-hidden="true">#</a> Ajax初识</h2><p>Ajax是前后端用来进行交互的一种主流方式，其实现主要是通过创建 <strong>XMLHttpRequest实例</strong> 来发送 HTTP 请求。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// ajax简单使用</span>
<span class="token keyword">const</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 创建实例</span>

xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">&#39;GET&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;http://www.example.org/example.txt&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 确定请求方法和地址</span>
xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">// 发送，此处若是post请求可放请求体数据</span>

xhr<span class="token punctuation">.</span><span class="token function-variable function">onreadystatechange</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 监听状态变化，接收返回</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>readyState <span class="token operator">===</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>status <span class="token operator">&gt;=</span> <span class="token number">200</span> <span class="token operator">&amp;&amp;</span> xhr<span class="token punctuation">.</span>status <span class="token operator">&lt;</span> <span class="token number">300</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实例上的相关属性" tabindex="-1"><a class="header-anchor" href="#实例上的相关属性" aria-hidden="true">#</a> 实例上的相关属性</h2><p>创建的实例xhr上具有许多的属性，大部分都是和返回内容相关。下面是一些常用的：</p><ul><li>xhr.<strong>status</strong> 响应数字状态码</li><li>xhr.<strong>readyState</strong> 实例当前状态</li><li>xhr.<strong>response</strong> 返回响应的正文</li><li>xhr.<strong>responseType</strong> 返回响应的类型，可以修改（&#39;arraybuffer&#39;,&#39;blob&#39;,&#39;json&#39;,&#39;text&#39;等）</li><li>xhr.<strong>timeout</strong> 请求发送前设置超时时间，超时就停止请求</li></ul><h2 id="readystate属性" tabindex="-1"><a class="header-anchor" href="#readystate属性" aria-hidden="true">#</a> readyState属性</h2><p>实例上的readyState属性返回一个 XMLHttpRequest 代理当前所处的状态，当状态码等于4时，表示请求返回内容已经可以读取到，可以在此时查看内容。</p><table><thead><tr><th>状态值</th><th>描述</th></tr></thead><tbody><tr><td>0</td><td>代理被创建，但尚未调用 open() 方法。</td></tr><tr><td>1</td><td>open() 方法已经被调用。</td></tr><tr><td>2</td><td>send() 方法已经被调用，并且头部和状态已经可获得。</td></tr><tr><td>3</td><td>下载中；responseText 属性已经包含部分数据。</td></tr><tr><td>4</td><td>下载操作已完成。</td></tr></tbody></table><h2 id="解决浏览器缓存问题" tabindex="-1"><a class="header-anchor" href="#解决浏览器缓存问题" aria-hidden="true">#</a> 解决浏览器缓存问题</h2><p>当我们使用ajax发送请求时，如果多次对一个地址获取数据，即url没有改变，那么每次获取到的数据都相同。那是因为ajax为了提高效率，会缓存请求数据，当检测到二次发送相同地址的请求时，就会直接读取缓存数据导致每次数据都一样。</p><p>解决办法：</p><ul><li>在<code>ajax</code>发送请求前加上 <code>xhr.setRequestHeader(&quot;If-Modified-Since&quot;,&quot;0&quot;)</code></li><li>在<code>ajax</code>发送请求前加上 <code>xhr.setRequestHeader(&quot;Cache-Control&quot;,&quot;no-cache&quot;)</code></li><li>在url地址上拼接一个随机数或时间戳，使每次地址都不同</li></ul><h2 id="请求的超时-终止-异常" tabindex="-1"><a class="header-anchor" href="#请求的超时-终止-异常" aria-hidden="true">#</a> 请求的超时，终止，异常</h2><p>ajax实例上存在许多方法，调用他们可以控制请求。下面是一些常用的：</p><ul><li><strong>load事件</strong>：请求完成时会触发</li><li><strong>error事件</strong>：请求出错时会触发</li><li><strong>abort事件</strong>：请求中止时会触发，调用xhr.abort()主动终止请求</li><li><strong>readyStateChange事件</strong>：请求的状态变化时会触发</li><li><strong>timeout事件</strong>：请求超时时触发</li></ul><h2 id="fetch方法" tabindex="-1"><a class="header-anchor" href="#fetch方法" aria-hidden="true">#</a> fetch方法</h2>`,17),d={href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Response",target:"_blank",rel:"noopener noreferrer"},u=n("code",null,"Response",-1),h=n("p",null,[n("code",null,"Promise<Response> fetch(url[, init])")],-1),k=n("p",null,[a("第二个参数是一个可选的配置对象，包括"),n("code",null,"method"),a(","),n("code",null,"headers"),a("，"),n("code",null,"body"),a("等对请求的配置。")],-1);function m(x,b){const s=e("ExternalLinkIcon");return o(),p("div",null,[i,n("p",null,[a("除了创建Ajax实例，浏览器还提供了fetch方法来发送请求，fetch发送的也是Ajax请求。此方法会返回一个 promise，这个 promise 会在请求响应后被 resolve，并传回 "),n("a",d,[u,c(s)]),a(" 对象。")]),h,k])}const g=t(l,[["render",m],["__file","ajax.html.vue"]]);export{g as default};