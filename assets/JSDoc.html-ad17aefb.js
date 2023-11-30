import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as l,a as n,b as s,d as i,e}from"./app-6422d99d.js";const r={},d=n("h2",{id:"jsdoc简介",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#jsdoc简介","aria-hidden":"true"},"#"),s(" JSDoc简介")],-1),u={href:"https://www.jsdoc.com.cn/",target:"_blank",rel:"noopener noreferrer"},k=e(`<p>如果使用过ts，并且规范化书写各种参数的类型，那么当我们使用时就会发现ts会给我们许多智能化代码提示，这极大的提高了我们的开发效率；但是面对没有使用ts的老项目，<br> 以及还没有学习过ts相关知识，我们就可以使用 JSDoc 来达到类似ts的代码提示，只需要我们在书写时多增加一些<strong>特殊的代码注释</strong>即可。</p><p>在 VS Code 编辑器中，我们在js文件中输入 <code>/**</code> 就会出现，回车换行即可，然后就可以愉快的写注释了</p><p><strong>注意，JSDoc注释必须写在需要提示代码的正上方。</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="常用标记" tabindex="-1"><a class="header-anchor" href="#常用标记" aria-hidden="true">#</a> 常用标记</h2><p>下面是一些常见的标记关键字：</p>`,6),m=n("strong",null,"描述相关",-1),v=n("br",null,null,-1),b=n("code",null,"@description xxx",-1),y=n("br",null,null,-1),x=n("code",null,"@since 1.2.0",-1),g=n("br",null,null,-1),w=n("code",null,"@version 1.1.0",-1),_=n("br",null,null,-1),h=n("code",null,"@deprecated",-1),f=n("br",null,null,-1),j=n("code",null,"@todo xxx",-1),S=n("br",null,null,-1),D=n("code",null,"@alias xxx",-1),J=n("br",null,null,-1),V=n("code",null,"{@link xxx}",-1),q=n("br",null,null,-1),C=n("code",null,"@see {@link xxx}",-1),I=e(`<p><strong>变量与对象相关</strong><br><code>@type {number}</code> 提供一个类型<br><code>@typedef {(number|string)} mytype</code> 描述一个自定义类型，并可以给定一个名称方便在其他地方引用<br><code>@constant/@const {number} xxx</code> 标记一个常量，可以提供类型和说明<br><code>@default</code> 标记默认值，主要用于生成文档<br><code>@global</code> 标记全局变量<br><code>@readonly</code> 标记只读变量</p><p><code>@namespace xxx</code> 标记对象为其成员创建命名空间，主要用于生成文档<br><code>@memberof xxx</code> 描述成员隶属于哪一个父级标识符，主要用于生成文档<br><code>@property/@prop {number} data - xxx</code> 提供类、命名空间或其他对象的属性/方法的 类型、名称和描述</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@readonly</span>
 * <span class="token keyword">@default</span>
 * <span class="token keyword">@global</span>
 * <span class="token keyword">@constant</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> 圆周率常量
 */</span>
<span class="token keyword">const</span> <span class="token constant">PI</span> <span class="token operator">=</span> <span class="token number">3.14</span>

<span class="token doc-comment comment">/** <span class="token keyword">@type</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token punctuation">(</span>string<span class="token operator">|</span><span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span> */</span>
<span class="token keyword">let</span> name <span class="token operator">=</span> <span class="token string">&#39;andy&#39;</span>


<span class="token doc-comment comment">/**
 * 使用typedef自定义类型， 相当于ts的interface
 * <span class="token keyword">@typedef</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token punctuation">{</span>
 <span class="token operator">*</span>  name<span class="token operator">:</span> string<span class="token punctuation">,</span>
 <span class="token operator">*</span>  age<span class="token operator">:</span> number
 <span class="token operator">*</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span> <span class="token class-name">Person</span>
 * <span class="token keyword">@see</span> <span class="token class-name"><span class="token punctuation">{</span>@link https<span class="token operator">:</span>//www<span class="token punctuation">.</span>jsdoc<span class="token punctuation">.</span>com<span class="token punctuation">.</span>cn/tags-type<span class="token punctuation">}</span></span>
 */</span>

<span class="token doc-comment comment">/** <span class="token keyword">@type</span> <span class="token class-name"><span class="token punctuation">{</span>Person<span class="token punctuation">}</span></span> */</span>
<span class="token keyword">let</span> per <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;lucky&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span>
<span class="token punctuation">}</span>


<span class="token doc-comment comment">/**
 * 也可以这样定义对象
 * <span class="token keyword">@typedef</span> <span class="token class-name">Obj</span>
 * <span class="token keyword">@type</span> <span class="token class-name"><span class="token punctuation">{</span>object<span class="token punctuation">}</span></span>
 * <span class="token keyword">@property</span> <span class="token class-name"><span class="token punctuation">{</span>string<span class="token punctuation">}</span></span> <span class="token parameter">id</span> - an ID.
 * <span class="token keyword">@property</span> <span class="token class-name"><span class="token punctuation">{</span>string<span class="token punctuation">}</span></span> <span class="token parameter">name</span> - your name.
 * <span class="token keyword">@property</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">age</span> - your age.
 */</span>

<span class="token doc-comment comment">/** <span class="token keyword">@type</span> <span class="token class-name"><span class="token punctuation">{</span>Obj<span class="token punctuation">}</span></span> */</span>
<span class="token keyword">var</span> props<span class="token punctuation">;</span>


<span class="token doc-comment comment">/**
 * 这样来定义嵌套对象
 * <span class="token keyword">@namespace</span>
 * <span class="token keyword">@property</span> <span class="token class-name"><span class="token punctuation">{</span>string<span class="token punctuation">}</span></span>  <span class="token optional-parameter"><span class="token punctuation">[</span><span class="token parameter">level</span><span class="token punctuation">]</span></span>                - 可选属性
 * <span class="token keyword">@property</span> <span class="token class-name"><span class="token punctuation">{</span>object<span class="token punctuation">}</span></span>  <span class="token parameter">defaults</span>               - The default values for parties.
 * <span class="token keyword">@property</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span>  <span class="token parameter">defaults<span class="token punctuation">.</span>players</span>       - The default number of players.
 * <span class="token keyword">@property</span> <span class="token class-name"><span class="token punctuation">{</span>object<span class="token punctuation">}</span></span>  <span class="token parameter">defaults<span class="token punctuation">.</span>treasure</span>      - The default treasure.
 * <span class="token keyword">@property</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span>  <span class="token parameter">defaults<span class="token punctuation">.</span>treasure<span class="token punctuation">.</span>gold</span> - How much gold the party starts with.
 */</span>
<span class="token keyword">var</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">level</span><span class="token operator">:</span>   <span class="token string">&#39;beginner&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">defaults</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">players</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token literal-property property">treasure</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">gold</span><span class="token operator">:</span> <span class="token number">0</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>类相关</strong><br><code>@class/@constructor</code> 标记为一个类或构造函数，需要用new来实例化<br><code>@classdesc xxx</code> 提供类的描述说明，更加语义化<br><code>@abstract</code> 标记这个成员必须在继承的子类中重写<br><code>@static</code> 标记为一个静态成员<br><code>@private</code> 标记为一个私有成员<br><code>@protected</code> 标记为一个受保护成员<br><code>@public</code> 标记为一个公共成员</p><p><strong>方法相关</strong><br><code>@function/@method</code> 标记为一个函数<br><code>@param/@argument {number} data - xxx</code> 提供函数参数的类型、名称和描述<br><code>@returns/@return {number} xxx</code> 提供返回值的类型和描述<br><code>@example xxx</code> 提供如何使用的示例。此标记后面的文本将显示为突出显示的代码<br><code>@callback xxx</code> 描述一个回调函数，不需要有实例，说明的类型可以被其他函数引用</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 这是一个普通的求和函数
 * <span class="token keyword">@function</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">a</span> - 一个数字
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">b</span> - 另一个数字
 * <span class="token keyword">@returns</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> 两个参数的和
 * <span class="token keyword">@example</span>
 <span class="token example">* <span class="token code language-javascript"><span class="token comment">// 这是一个示例</span></span>
 * <span class="token code language-javascript"><span class="token keyword">let</span> sum <span class="token operator">=</span> <span class="token function">fu</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span></span>
 * <span class="token code language-javascript">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span> <span class="token comment">// 9</span></span></span>
 */</span>
<span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>


<span class="token doc-comment comment">/**
 * ajax请求完成需要执行的回调函数
 * <span class="token keyword">@callback</span> requestCallback
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">code</span> 
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>string<span class="token punctuation">}</span></span> <span class="token parameter">meg</span> 
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token keyword">void</span><span class="token punctuation">}</span></span>
 */</span>

<span class="token doc-comment comment">/**
 * 封装一个ajax
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>requestCallback<span class="token punctuation">}</span></span> <span class="token parameter">cb</span>
 */</span>
<span class="token keyword">function</span> <span class="token function">myAjax</span><span class="token punctuation">(</span><span class="token parameter">cb</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// code</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>文件与模块相关</strong><br><code>@file xxx</code> 提供文件的说明，放在在文件开头的 JSDoc 注释部分<br><code>@author xxx</code> 提供这个成员的作者，后面可以补充尖括号括起来的电子邮件地址<br><code>@copyright xxx</code> 描述一个文件的版权信息，搭配 file 标识使用放在文件开头<br><code>@module xxx</code> 描述一个模块的名称<br><code>@requires xxx</code> 描述当前模块需要的依赖的其他模块<br><code>@exports</code> 描述除了 exports 或 module.exports 属性外导出的任何内容</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@file</span> 这是一个测试文件
 * <span class="token keyword">@author</span> me &lt;me@163.com&gt;
 * <span class="token keyword">@copyright</span> 随便用
 * 
 * <span class="token keyword">@module</span> testModule
 * <span class="token keyword">@requires</span> otherModule
 */</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8);function L(N,a){const p=o("ExternalLinkIcon");return c(),l("div",null,[d,n("p",null,[n("a",u,[s("JSDoc"),i(p)]),s("是记录代码和给编写的代码添加注释的一种方式，通过规范的代码注释，我们就能收获到不一样的开发体验。")]),k,n("p",{onLink:a[0]||(a[0]=()=>{})},[m,v,b,s(" 提供这个成员的描述说明"),y,x,s(" 描述这个成员加入的版本，一般是指项目版本"),g,w,s(" 描述这个成员的版本信息，一般是指成员修改的版本"),_,h,s(" 标记已被弃用，后面可以补充一些文本说明原因"),f,j,s(" 描述需要完成的任务"),S,D,s(" 描述成员的别名，主要用于生成文档"),J,V,s(" 创建指向指定的 namepath 或 URL 的链接"),q,C,s(" 描述可以参考其他相关文档，后面可以补充一些文字或")],32),I])}const E=t(r,[["render",L],["__file","JSDoc.html.vue"]]);export{E as default};
