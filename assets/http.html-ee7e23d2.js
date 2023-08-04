import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as e,o as s,c as p,a as i,b as n,d as t,f as o,e as c}from"./app-8f05f71b.js";const r={},d=i("p",null,"HTTP协议（HyperText Transfer Protocol，超文本传输协议）是因特网上应用最为广泛的一种网络传输协议。",-1),u=i("p",null,"学习网站参考：",-1),h=i("strong",null,"MDN",-1),g={href:"https://developer.mozilla.org/zh-CN/docs/web/http/overview",target:"_blank",rel:"noopener noreferrer"},m=i("strong",null,"菜鸟教程",-1),k={href:"https://www.runoob.com/http/http-tutorial.html",target:"_blank",rel:"noopener noreferrer"},b=i("strong",null,"devdocs",-1),T={href:"https://devdocs.io/http/",target:"_blank",rel:"noopener noreferrer"},f=c(`<h2 id="经典五层模型" tabindex="-1"><a class="header-anchor" href="#经典五层模型" aria-hidden="true">#</a> 经典五层模型</h2><figure><img src="https://github.com/Tie-Dan/http-demo/raw/main/img/五层模型.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ol><li>应用层 <ul><li>为应用软件提供了很多服务，构建于协议之上。</li></ul></li><li>传输层 <ul><li>数据的传输都是在这层定义的，数据过大分包，分片。</li></ul></li><li>网络层 <ul><li>为数据在节点之间传输创建逻辑链路</li></ul></li><li>数据链路层 <ul><li>通讯实体间建立数据链路连接</li></ul></li><li>物理层 <ul><li>主要作用是定义物理设备如何传输数据（光缆，网线）</li></ul></li></ol><h2 id="http协议的发展历史" tabindex="-1"><a class="header-anchor" href="#http协议的发展历史" aria-hidden="true">#</a> HTTP协议的发展历史</h2><ul><li><p>http0.9 :</p><ul><li>只有一个命令GET，没有header等描述数据的信息，服务器发送完毕，就关闭tcp协议。</li></ul></li><li><p>http1.0:</p><ul><li>增加了请求命令（GET, POST 和 HEAD）</li><li>status code</li><li>header</li><li>多字符集支持</li><li>权限</li><li>缓存</li><li>内容编码</li><li>多部分发送</li></ul><p><strong>缺点：</strong></p><blockquote><p>HTTP/1.0 版的主要缺点是，每个TCP连接只能发送一个请求。发送数据完毕，连接就关闭，如果还要请求其他资源，就必须再新建一个连接。</p><p>TCP连接的新建成本很高，因为需要客户端和服务器三次握手，并且开始时发送速率较慢。所以HTTP 1.0版本的性能比较差。随着网页加载的外部资源越来越多，这个问题就愈发突出了。</p><p>为了解决这个问题，有些浏览器在请求时，用了一个非标准的Connection字段。<code>Connection: keep-alive</code></p><p>这个字段要求服务器不要关闭TCP连接，以便其他请求复用。服务器同样回应这个字段。</p><p>一个可以复用的TCP连接就建立了，直到客户端或服务器主动关闭连接。但是，这不是标准字段，不同实现的行为可能不一致，因此不是根本的解决办法。</p></blockquote></li><li><p>http1.1:</p><ul><li>增加了请求命令（OPTIONS、PUT、PATCH、DELETE、TRACE 、CONNECT）</li><li>持久连接</li><li>增加host</li></ul><p><strong>缺点:</strong></p><blockquote><p>虽然1.1版允许复用TCP连接，但是同一个TCP连接里面，所有的数据通信是按次序进行的。服务器只有处理完一个回应，才会进行下一个回应。要是前面的回应特别慢，后面就会有许多请求排队等着。这称为<strong>队头堵塞</strong></p><p>为了避免这个问题，只有两种方法：</p><ol><li>减少请求数</li><li>同时多开持久连接</li></ol><p>这导致了很多的网页优化技巧，比如合并脚本和样式表、将图片嵌入CSS代码、域名分片（domain sharding）等等。</p></blockquote></li><li><p>http2:</p><ul><li>二进制传输</li><li>信道复用</li><li>分帧传输</li><li>server push</li></ul></li></ul><h2 id="http三次握手" tabindex="-1"><a class="header-anchor" href="#http三次握手" aria-hidden="true">#</a> HTTP三次握手</h2><figure><img src="https://github.com/Tie-Dan/http-demo/raw/main/img/三次握手.png" alt="三次握手" tabindex="0" loading="lazy"><figcaption>三次握手</figcaption></figure><p>第一次握手: 发送<em>SYN</em>报文，传达信息：“你好，我想建立连接”</p><p>第二次握手: 回传SYN+ACK报文，传达信息：“好的，可以建立链接”；</p><p>第三次握手: 回传ACK报文，传到信息：“好的，我知道了，那我们连接”。然后就建立连接了</p><blockquote><p>TCP为什么要进行三次握手：</p><p>因为网络传输有延迟，客户端发送请求到服务器端要求建立连接，如果服务器端直接返回的话可能会产生丢包的情况导致客户端接收不到数据，客户端会因为超时就关闭了，可能就去发送新的请求了，然而服务端并不知道丢包导致客户端没有接收数据，服务端端口就一直开着，造成了额外的开销。所以需要三次握手确认这个过程。</p></blockquote><h2 id="http四次挥手" tabindex="-1"><a class="header-anchor" href="#http四次挥手" aria-hidden="true">#</a> HTTP四次挥手</h2><figure><img src="https://github.com/Tie-Dan/http-demo/raw/main/img/四次挥手.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>第一次挥手: 客户端 和 服务器 打电话，通话即将结束后</p><p>第二次挥手: 客户端说“我没啥要说的了”，服务器回答“我知道了”，但是 服务器 可能还会有要说的话</p><p>第三次挥手: 客户端 不能要求 服务器 跟着自己的节奏结束通话，于是 服务器 可能又巴拉巴拉说了一通，最后 服务器 说“我说完了</p><p>第四次挥手: 客户端 回答“知道了”，这样通话才算结束。</p><blockquote><p>TCP为什么要进行四次握手:</p><p>因为数据传送结束后发出连接释放的通知，待对方确认后进入半关闭状态。当另一方也没有数据再发送的时候，则发出连接释放通知，对方确认后就完全关闭了TCP连接。</p></blockquote><h2 id="http报文" tabindex="-1"><a class="header-anchor" href="#http报文" aria-hidden="true">#</a> HTTP报文</h2><ul><li><p>请求报文</p></li><li><p>响应报文</p></li></ul><figure><img src="https://github.com/Tie-Dan/http-demo/raw/main/img/http1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="http请求方法" tabindex="-1"><a class="header-anchor" href="#http请求方法" aria-hidden="true">#</a> HTTP请求方法</h3><figure><img src="https://github.com/Tie-Dan/http-demo/raw/main/img/请求方法.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ol><li><p>用来定义对于资源的操作</p></li><li><p>常用有GET、POST等</p></li><li><p>从定义上讲有各自的语义</p></li></ol><h3 id="http状态码" tabindex="-1"><a class="header-anchor" href="#http状态码" aria-hidden="true">#</a> HTTP状态码</h3><figure><img src="https://github.com/Tie-Dan/http-demo/raw/main/img/httpCode.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ol><li>定义服务器对请求的处理结果</li><li>各个区间的code有各自的语义</li><li>好的http服务可以通过status code判断结果</li></ol><p><strong>注意:</strong></p><p>​ 301 永久跳转(会走缓存)</p><p>​ 302 临时跳转</p><h2 id="跨域-cors" tabindex="-1"><a class="header-anchor" href="#跨域-cors" aria-hidden="true">#</a> 跨域(CORS)</h2><ol><li><p>什么是跨域</p><ul><li>浏览器的<strong>同源策略</strong>限制了跨域请求资源</li></ul></li><li><p>jsonp跨域</p></li><li><p>跨域的限制(请求)</p><ul><li><p>默认允许跨域的方法只有get、post、head，其它的方法不允许</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token string-property property">&#39;Access-Control-Allow-Methods&#39;</span><span class="token operator">:</span> <span class="token string">&#39;POST,PUT,DELETE&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 设置通过请求的方法</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>默认允许Content-type是以下3个，其它类型只有通过预检请求验证通过后才能发送，即下面3个类型的（简单请求）不会触发预检请求。</p><ul><li>text/plain</li><li>multipart/form-data</li><li>application/x-www-form-urlencoded</li></ul></li><li><p>请求头限制,跨域对于自定义的请求头是不允许的，预请求验证通过才能发送</p><div class="language-JS line-numbers-mode" data-ext="JS"><pre class="language-JS"><code>&#39;Access-Control-Allow-Headers&#39;:&#39;X-Test-Cors&#39;, // 设置通过自定义的请求头
&#39;Access-Control-Max-Age&#39;:&#39;1000&#39; // Methods和Headers的结果可以被缓存多久
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li></ol><h2 id="cache-control" tabindex="-1"><a class="header-anchor" href="#cache-control" aria-hidden="true">#</a> Cache-Control</h2><p><strong>通用消息头字段，被用于在 http 请求和响应中，通过指定指令来实现缓存机制。主要用来指定传递的数据在接收方的缓存配置。</strong></p><p>缓存分为两种类型：<strong>私有缓存和共享缓存</strong>。</p><p>私有缓存是绑定到特定客户端的缓存，存储的响应不与其他客户端共享。</p><p>共享缓存位于客户端和服务器之间，可以存储能在用户之间共享的响应。</p><ul><li><p>可缓存性</p><ul><li>public 任何对象都可以</li><li>private 只能被单个用户缓存，不能作为共享缓存</li><li>no-cache 去服务端验证才能使用，即协商缓存</li><li>no-store 彻底不能</li><li>no-transform 代理服务器不能改动返回内容</li></ul></li><li><p>到期时间(seconds)</p><ul><li>max-age = &lt; seconds &gt; 缓存的最大时间</li><li>s-maxage = &lt; seconds &gt; 只有在代理服务器才会生效</li><li>max-stale = &lt; seconds &gt; 表明客户端愿意接收一个已经过期的资源，只能在发起端设置 就算max-age时间过期 max-stale时间没过期也会走缓存</li></ul></li><li><p>重新验证(了解)</p><ul><li>must-revalidate 资源过期，在成功向原始服务器验证之前，缓存不能用该资源响应后续请求。</li><li>proxy-revalidate 同样用于资源过期缓存验证，但仅适用于共享缓存</li></ul></li><li><p>验证头 (不走本地缓存 发送请求带上验证头 验证决定走不走缓存 它基于no-cache<strong>协商缓存</strong>的情况）</p><ul><li><p>last-Modified</p><ul><li>配合If-Modified-Since使用</li><li>对比上次修改时间以验证资源是否需要更新</li></ul></li><li><p>Etag</p><ul><li><p>数据签名，形成hash值传给客户端，客户端在下次请求中带上，服务端再判断有无变化。</p></li><li><p>配合if-None-Match使用</p></li><li><p>对比资源的签名判断是否使用缓存</p></li></ul></li></ul></li></ul><h2 id="cookie" tabindex="-1"><a class="header-anchor" href="#cookie" aria-hidden="true">#</a> Cookie</h2><p>​ <img src="https://github.com/Tie-Dan/http-demo/raw/main/img/setCookie.png" alt="" loading="lazy"></p><h3 id="用法" tabindex="-1"><a class="header-anchor" href="#用法" aria-hidden="true">#</a> 用法：</h3><ul><li>通过Set-Cookie设置</li><li>下次请求会自动带上</li><li>键值对，可以设置多个</li></ul><h3 id="属性" tabindex="-1"><a class="header-anchor" href="#属性" aria-hidden="true">#</a> 属性：</h3><ul><li>max-age 和 expires设置过期时间</li><li>Secure只在https的时候发送</li><li>HttpOnly无法通过document.cookie访问</li></ul><h2 id="http长连接" tabindex="-1"><a class="header-anchor" href="#http长连接" aria-hidden="true">#</a> HTTP长连接</h2><ul><li>TCP connection <ul><li>Connection: keep-alive/close(开启/关闭)</li><li>HTTP2只需要建立一个TCP长连接 (同域下)</li></ul></li></ul><h2 id="数据协商" tabindex="-1"><a class="header-anchor" href="#数据协商" aria-hidden="true">#</a> 数据协商：</h2><ul><li><p>请求</p><ul><li><p>Accept 什么类型</p></li><li><p>Accept-Encoding 压缩方式</p></li><li><p>Accept-Language 语言</p></li><li><p>user-Agent 浏览器信息</p></li></ul></li><li><p>返回</p><ul><li>Content-type</li><li>Content-Encoding</li><li>Content-Language</li></ul></li></ul><h2 id="https" tabindex="-1"><a class="header-anchor" href="#https" aria-hidden="true">#</a> HTTPS</h2><ul><li><p>http 是明文传输</p></li><li><p>https 通过握手进行加密</p><ul><li>加密-公钥</li><li>解密-私钥</li></ul></li></ul><figure><img src="https://github.com/Tie-Dan/http-demo/raw/main/img/https.png" alt="https" tabindex="0" loading="lazy"><figcaption>https</figcaption></figure><ol><li>客户端请求服务器获取<code>证书公钥</code></li><li>客户端(SSL/TLS)解析证书（无效会弹出警告）</li><li>生成随机值</li><li>用<code>公钥加密</code>随机值生成<strong>密钥</strong></li><li>客户端将<code>秘钥</code>发送给服务器</li><li>服务端用<code>私钥</code>解密<code>秘钥</code>得到随机值</li><li><code>将信息和随机值混合在一起</code>进行对称加密</li><li>将加密的内容发送给客户端</li><li>客户端用<code>秘钥</code>解密信息</li></ol><h2 id="http2" tabindex="-1"><a class="header-anchor" href="#http2" aria-hidden="true">#</a> HTTP2</h2><figure><img src="https://github.com/Tie-Dan/http-demo/raw/main/img/http2.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li><p>二进制协议</p><ul><li>http1.1头信息必须是字符，数据体可以是文本,也可以是二进制</li><li>http2 全部都是二进制</li></ul></li><li><p>头信息压缩</p><ul><li>头部信息一样的变相缓存</li></ul></li><li><p>信道复用</p><ul><li>同一个连接里面发送多个请求不再需要按照顺序来</li></ul></li><li><p>数据流</p><ul><li>http1.1版取消数据流的唯一方法，就是关闭TCP连接。</li><li>http2 可以取消某一次请求，同时保证TCP连接还打开着，可以被其他请求使用。</li></ul></li><li><p>服务器推送</p><ul><li><p>Http2 服务端可以推送，主动向客户端发送请求</p><blockquote><p>http1 解析html页面里面css、js文件, 需要解析到css和js文件发送请求等数据回来渲</p><p>http2 解析html里面建立连接，如果有css、js文件，服务端会主动推送到客户端</p><p>不再发送请求获取css、js文件</p></blockquote></li><li><p>浏览器目前是必须开启https 才能使用http2</p></li></ul></li></ul><p>HTTP 和 HTTP2 对比演示的demohttps://http2.akamai.com/demo</p><h2 id="http3-了解" tabindex="-1"><a class="header-anchor" href="#http3-了解" aria-hidden="true">#</a> HTTP3（了解）</h2><figure><img src="https://github.com/Tie-Dan/http-demo/raw/main/img/了解http3.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="websocket" tabindex="-1"><a class="header-anchor" href="#websocket" aria-hidden="true">#</a> WebSocket</h2><p>WebSockets是HTML5提供的在WEB应用程序中客户端和服务器端之间进行的非HTTP的通信机制。相比于传统的http协议规定请求只能由客户端发起，服务端响应，websocket真正做到了请求的平等性，即服务端除了接收请求，也可以主动推送数据给客户端，实现了通信的双向性。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 1. 创建实例，开始建立连接</span>
<span class="token keyword">const</span> socket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WebSocket</span><span class="token punctuation">(</span><span class="token string">&#39;ws://localhost:8080&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// 2.连接成功后触发open事件</span>
socket<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;open&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;websocket连接成功&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 3. 客户端向服务器发送数据，只能发送字符串或二进制数据</span>
socket<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&#39;Hello Server!&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// 4. 接收服务器主动推送的请求 触发message事件</span>
socket<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;message&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Message from server &#39;</span><span class="token punctuation">,</span> event<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 5.连接需要主动断开</span>
socket<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Http2中也实现了 <strong>Sever Push</strong> 即服务端主动推送数据，但触发条件时客户端必须先发送一个请求。例如 http1.1 请求html页面，当客户端解析时发现里面需要css、js文件就又会再次发送请求获取。而 http2 Sever Push是当客户端请求html页面，除了返回请求数据，服务器还会推送相关的文件（推送什么文件是由后端配置的，需要前后端提前约定好），从而减少http请求数量。</p><p>二者相比，明显WebSocket更加灵活，使用起来更方便，所以目前实现服务端推送消息主流都是用WebSocket的。</p><h2 id="常见问题" tabindex="-1"><a class="header-anchor" href="#常见问题" aria-hidden="true">#</a> 常见问题</h2><ol><li><p>为什么传统上利用多个域名来提供网站资源会更有效</p></li><li><p>Long-Polling、Websockets、Server-Sent Event(SSE)、WebRTC</p></li><li><p>常见的请求头和响应头</p></li><li><p>和缓存有关的<code>HTTP</code>首部字段(非常重要)</p></li><li><p>HTTP method</p></li><li><p>HTTP 状态码</p></li><li><p>HTTPS 加密过程</p></li><li><p>HTTP2新特性（重要）</p></li><li><p>三次握手四次挥手(重要)</p></li></ol>`,65);function v(x,P){const a=e("ExternalLinkIcon");return s(),p("div",null,[d,u,i("ul",null,[i("li",null,[i("p",null,[h,n(),i("a",g,[n("https://developer.mozilla.org/zh-CN/docs/web/http/overview"),t(a)])])]),i("li",null,[i("p",null,[m,n(),i("a",k,[n("https://www.runoob.com/http/http-tutorial.html"),t(a)])])]),i("li",null,[i("p",null,[b,n(),i("a",T,[n("https://devdocs.io/http/"),t(a)])])])]),o(" more "),f])}const _=l(r,[["render",v],["__file","http.html.vue"]]);export{_ as default};