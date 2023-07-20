import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as e,o as p,c as o,a as n,b as s,d as l,f as i}from"./app-c3cb1ad7.js";const c={},u=n("p",null,[n("strong",null,"vue-router"),s(" 是vue官方提供的用来实现SPA 路由跳转的插件。")],-1),r={href:"http://router.vuejs.org/zh-cn/",target:"_blank",rel:"noopener noreferrer"},d=i(`<h2 id="路由基本使用" tabindex="-1"><a class="header-anchor" href="#路由基本使用" aria-hidden="true">#</a> 路由基本使用</h2><ol><li>安装vue-router，命令：<code>npm i vue-router</code></li><li>应用插件：<code>Vue.use(VueRouter)</code></li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> Router <span class="token keyword">from</span> <span class="token string">&#39;vue-router&#39;</span>
Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Router<span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">new</span> <span class="token class-name">Router</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// 多个配置项</span>
  <span class="token literal-property property">routes</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token comment">// 一般路由</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> home<span class="token punctuation">,</span>
      <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/home&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">component</span><span class="token operator">:</span> Home，
      children： <span class="token punctuation">[</span> <span class="token comment">// 嵌套路由</span>
      	<span class="token punctuation">{</span>
      		<span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;about&#39;</span><span class="token punctuation">,</span>
      		<span class="token literal-property property">component</span><span class="token operator">:</span> About，
    		<span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token comment">// 自动跳转路由</span>
      <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">redirect</span><span class="token operator">:</span> <span class="token string">&#39;/home&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> router <span class="token keyword">from</span> <span class="token string">&#39;./router&#39;</span>
<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// 注册路由</span>
	router
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>&lt;router-link&gt;</code>: 用来生成路由链接； <code>&lt;router-view&gt;</code>形成路由出口</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/xxx<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Go to XXX<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-view</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="路由传参" tabindex="-1"><a class="header-anchor" href="#路由传参" aria-hidden="true">#</a> 路由传参</h2><p><strong>路由的query参数</strong></p><ol><li>传递参数</li></ol><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code> <span class="token comment">&lt;!-- 跳转并携带query参数，to的字符串写法 --&gt;</span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">:to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/home/message/detail?id=666&amp;title=你好<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>跳转<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">&gt;</span></span>

 <span class="token comment">&lt;!-- 跳转并携带query参数，to的对象写法 --&gt;</span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> 
  <span class="token attr-name">:to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{
    path:&#39;/home/message/detail&#39;,
    query:{
       id:666,
       title:&#39;你好&#39;
    }
  }<span class="token punctuation">&quot;</span></span>
 <span class="token punctuation">&gt;</span></span>跳转<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>接收参数：</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>   <span class="token keyword">this</span><span class="token punctuation">.</span>$route<span class="token punctuation">.</span>query<span class="token punctuation">.</span>id
   <span class="token keyword">this</span><span class="token punctuation">.</span>$route<span class="token punctuation">.</span>query<span class="token punctuation">.</span>title
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在路由表里提前给对应路由指明 name属性，可以形成命名路由，并简化跳转方式</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token comment">&lt;!--简化前，需要写完整的路径 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/demo/test/welcome<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>跳转<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!--简化后，直接通过名字跳转 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">:to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{name:&#39;hello&#39;}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>跳转<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!--简化写法配合传递参数 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> 
  <span class="token attr-name">:to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{
    name:&#39;hello&#39;,
    query:{
       id:666,
       title:&#39;你好&#39;
    }
  }<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">&gt;</span></span>跳转<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>路由的params参数</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 提前在路由表声明接收params参数</span>
<span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;home&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;home/:id/:title&#39;</span><span class="token punctuation">,</span> <span class="token comment">//使用占位符声明接收params参数</span>
  <span class="token literal-property property">component</span><span class="token operator">:</span>Home
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>传递参数</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code> <span class="token comment">&lt;!-- 跳转并携带params参数，to的字符串写法 --&gt;</span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">:to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/home/message/detail/666/你好<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>跳转<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">&gt;</span></span>

 <span class="token comment">&lt;!-- 跳转并携带params参数，to的对象写法 --&gt;</span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> 
  <span class="token attr-name">:to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{
    name:&#39;xiangqing&#39;,
    params:{
       id:666,
       title:&#39;你好&#39;
    }
  }<span class="token punctuation">&quot;</span></span>
 <span class="token punctuation">&gt;</span></span>跳转<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>特别注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置！</p></blockquote><ol><li>接收参数：</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span>$route<span class="token punctuation">.</span>params<span class="token punctuation">.</span>id
<span class="token keyword">this</span><span class="token punctuation">.</span>$route<span class="token punctuation">.</span>params<span class="token punctuation">.</span>title
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="编程式路由导航" tabindex="-1"><a class="header-anchor" href="#编程式路由导航" aria-hidden="true">#</a> 编程式路由导航</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code> <span class="token comment">//$router的两个API</span>
 <span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;xiangqing&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">query</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span>xxx<span class="token punctuation">,</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span>xxx
  <span class="token punctuation">}</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span>

 <span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;xiangqing&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">params</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span>xxx<span class="token punctuation">,</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span>xxx
  <span class="token punctuation">}</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span>
 <span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">forward</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//前进</span>
 <span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">back</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//后退</span>
 <span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//可前进也可后退</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="缓存路由组件" tabindex="-1"><a class="header-anchor" href="#缓存路由组件" aria-hidden="true">#</a> 缓存路由组件</h2><ol><li>作用：让不展示的路由组件保持挂载，不被销毁。</li><li>具体编码：</li></ol><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>keep-alive</span> <span class="token attr-name">include</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>News<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span> 
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-view</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>keep-alive</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="路由组件的生命周期" tabindex="-1"><a class="header-anchor" href="#路由组件的生命周期" aria-hidden="true">#</a> 路由组件的生命周期</h2><ol><li>作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态。</li><li>具体名字： <ol><li><code>activated</code>路由组件被激活时触发。</li><li><code>deactivated</code>路由组件失活时触发。</li></ol></li></ol><h2 id="路由守卫" tabindex="-1"><a class="header-anchor" href="#路由守卫" aria-hidden="true">#</a> 路由守卫</h2><ol><li>作用：对路由进行权限控制</li><li>分类：全局守卫、独享守卫、组件内守卫</li></ol><p><strong>全局守卫:</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code> <span class="token comment">//全局前置守卫：初始化时执行、每次路由切换前执行</span>
 router<span class="token punctuation">.</span><span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span>from<span class="token punctuation">,</span>next</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>to<span class="token punctuation">.</span>meta<span class="token punctuation">.</span>isAuth<span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">//判断当前路由是否需要进行权限控制</span>
		<span class="token comment">//...</span>
  <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
    <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//放行</span>
  <span class="token punctuation">}</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span>

 <span class="token comment">//全局后置守卫：初始化时执行、每次路由切换后执行</span>
 router<span class="token punctuation">.</span><span class="token function">afterEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span><span class="token keyword">from</span></span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>to<span class="token punctuation">.</span>meta<span class="token punctuation">.</span>title<span class="token punctuation">)</span><span class="token punctuation">{</span> 
    document<span class="token punctuation">.</span>title <span class="token operator">=</span> to<span class="token punctuation">.</span>meta<span class="token punctuation">.</span>title <span class="token comment">//修改网页的title</span>
  <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
    document<span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token string">&#39;vue_test&#39;</span>
  <span class="token punctuation">}</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>独享守卫:</strong> 写在路由表里，和path等平级</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code> <span class="token function">beforeEnter</span><span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span>from<span class="token punctuation">,</span>next</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   	<span class="token keyword">if</span><span class="token punctuation">(</span>to<span class="token punctuation">.</span>meta<span class="token punctuation">.</span>isAuth<span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">//判断当前路由是否需要进行权限控制</span>
				<span class="token comment">// ...</span>
   			<span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   		<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
   			<span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">&#39;暂无权限查看&#39;</span><span class="token punctuation">)</span>
   			<span class="token comment">// next({name:&#39;guanyu&#39;})</span>
   		<span class="token punctuation">}</span>
   	<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
   		<span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   	<span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>组件内守卫</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code> <span class="token comment">//进入守卫：通过路由规则，进入该组件时被调用</span>
 <span class="token function">beforeRouteEnter</span> <span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token punctuation">}</span><span class="token punctuation">,</span>
 <span class="token comment">//离开守卫：通过路由规则，离开该组件时被调用</span>
 <span class="token function">beforeRouteLeave</span> <span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="路由模式" tabindex="-1"><a class="header-anchor" href="#路由模式" aria-hidden="true">#</a> 路由模式</h2><ol><li>对于一个url来说，什么是hash值？—— #及其后面的内容就是hash值。</li><li>hash值不会包含在 HTTP 请求中，即：hash值不会带给服务器。</li><li>hash模式： <ol><li>地址中永远带着#号，不美观 。</li><li>若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。</li><li>兼容性较好。</li></ol></li><li>history模式： <ol><li>地址干净，美观 。</li><li>兼容性和hash模式相比略差。</li><li>应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题。</li></ol></li></ol>`,38);function k(v,m){const a=e("ExternalLinkIcon");return p(),o("div",null,[u,n("p",null,[s("在线文档: "),n("a",r,[s("http://router.vuejs.org/zh-cn/"),l(a)])]),d])}const h=t(c,[["render",k],["__file","vue-router.html.vue"]]);export{h as default};
