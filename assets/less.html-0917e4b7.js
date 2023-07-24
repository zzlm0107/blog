import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as t,c as l,a as s,b as n,e as i,d as c}from"./app-d41615b3.js";const o={},u=s("p",null,"Less是一个css预处理器，利用提供的特定语法帮助我们更方便的书写css代码。",-1),d=s("p",null,"学习网站参考：",-1),r=s("strong",null,"Less中文网",-1),v={href:"https://less.bootcss.com/",target:"_blank",rel:"noopener noreferrer"},k=c(`<h2 id="less学习" tabindex="-1"><a class="header-anchor" href="#less学习" aria-hidden="true">#</a> Less学习</h2><h3 id="注释" tabindex="-1"><a class="header-anchor" href="#注释" aria-hidden="true">#</a> 注释</h3><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token comment">/* 这种类型的注释会保留到编译的css文件中 */</span>
<span class="token comment">// 而这种类型则不会出现在编译的css文件中</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="嵌套" tabindex="-1"><a class="header-anchor" href="#嵌套" aria-hidden="true">#</a> 嵌套</h3><p>less的嵌套语法可以在父元素的样式里继续书写子元素的样式，一级一级向下嵌套，简化了css选择器每次从上向下选中的过程，使用起来非常方便。</p><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token selector">.dad</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span>30px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
  <span class="token selector">.son</span><span class="token punctuation">{</span>
    <span class="token property">border-radius</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="父元素选择器" tabindex="-1"><a class="header-anchor" href="#父元素选择器" aria-hidden="true">#</a> 父元素选择器&amp;</h3><p>less的&amp;符号用来指代 **当前代码块里 **作用的选择器，通常配合伪类和伪元素使用。</p><p>（指代的是此代码块前的所有父元素）</p><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token selector">a</span><span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span>#333<span class="token punctuation">;</span>
  <span class="token selector">&amp;:hover</span><span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span>blue<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果在当前的选择器名字后面写&amp;，就会将当前的选择器提取到父级。</p><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token comment">/* less */</span>
<span class="token selector">.contain</span><span class="token punctuation">{</span>
  <span class="token selector">h1 &amp;</span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span>200px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span>300px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* css */</span>
<span class="token selector">h1 .contain</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="运算" tabindex="-1"><a class="header-anchor" href="#运算" aria-hidden="true">#</a> 运算</h3><p>less中的计算可以自动转换并推断数值单位，单位无法转换时以左侧第一个单位为准。</p><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token selector">.contain</span><span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span>3px<span class="token operator">+</span>20<span class="token operator">*</span>2<span class="token punctuation">;</span> <span class="token comment">// 43px</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="变量" tabindex="-1"><a class="header-anchor" href="#变量" aria-hidden="true">#</a> 变量</h3><p>**变量的加载：**变量存在声明提升，less中定义的变量也可以在使用之后声明；并且变量存在作用域，查找规则从内到外。</p><p>less中变量的定义语法为 <strong>@变量名：值</strong> 。需要使用时直接在css值的位置写 <strong>@变量名</strong> 即可</p><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token variable">@bgColor<span class="token punctuation">:</span></span>white<span class="token punctuation">;</span>
<span class="token selector">.contain</span><span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token variable">@bgColor</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而对于选择器名称、属性名称、url和@import使用变量时，变量必须以插值即 <strong>@{变量名}</strong> 的形式使用。</p><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token comment">/* less */</span> 
<span class="token variable">@myChoose<span class="token punctuation">:</span></span>one<span class="token punctuation">;</span>
<span class="token variable">@myColor<span class="token punctuation">:</span></span>color<span class="token punctuation">;</span>
<span class="token variable">@images<span class="token punctuation">:</span></span> <span class="token string">&quot;../img&quot;</span><span class="token punctuation">;</span>

<span class="token selector">.@{myChoose}</span> <span class="token punctuation">{</span>
  <span class="token property">@{myColor}</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">&quot;@{images}/bg.png&quot;</span><span class="token punctuation">)</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* css */</span> 
<span class="token selector">.one</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">&quot;../img/bg.png&quot;</span><span class="token punctuation">)</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="混合" tabindex="-1"><a class="header-anchor" href="#混合" aria-hidden="true">#</a> 混合</h3><p>使用混合可以将一系列样式从一个规则引入（“混合”）到另一个样式规则集，充分发挥复用性。<br> 可以直接将一个样式集混合到另一个样式集中，也可以在混合的类名后面加上一个<strong>小括号</strong>可以阻止混合类样式的编译。</p><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token selector">.bor()</span> <span class="token punctuation">{</span>     <span class="token comment">//不编译此样式块                </span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> aqua<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 32rpx<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.poop</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> white<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span>white<span class="token punctuation">;</span>
  <span class="token mixin-usage function">.bor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>带参数的混合</strong>：可以在混合时传递参数，当然参数可以设定一个默认值。</p><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token selector">.son(<span class="token variable">@width</span>:200px)</span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span><span class="token variable">@width</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.dad</span><span class="token punctuation">{</span>
    <span class="token mixin-usage function">.son</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>多个形参要以分号分隔，当一个形参里有几个部分时就以逗号分隔，不过还是多写几个形参比较好。</p><p>**arguments变量 **表示可变参数，意思是形参从先到后的顺序。</p><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token comment">/* less */</span> 
<span class="token selector">.son(<span class="token variable">@dd1</span>:20px;<span class="token variable">@dd2</span>:solid;<span class="token variable">@dd3</span>:white)</span><span class="token punctuation">{</span>
    <span class="token property">border</span><span class="token punctuation">:</span><span class="token variable">@arguments</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.father</span> <span class="token punctuation">{</span>
  <span class="token mixin-usage function">.son</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* css */</span>
<span class="token selector">.father</span> <span class="token punctuation">{</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 20px solid white<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="导入与导出" tabindex="-1"><a class="header-anchor" href="#导入与导出" aria-hidden="true">#</a> 导入与导出</h3><p>使用 <strong>@import</strong> 导入我们需要的全局less文件。</p><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token variable">@import<span class="token punctuation">:</span></span> <span class="token string">&#39;../assets/style/less/common.less&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在less文件的第一行通过添加一行注释实现导出为css文件。</p><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token comment">// out:../assets/style/css/             //导出编译的css文件到指定文件夹</span>
<span class="token comment">// out: false                           //禁止导出</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,34);function m(b,h){const a=p("ExternalLinkIcon");return t(),l("div",null,[u,d,s("ul",null,[s("li",null,[r,n(),s("a",v,[n("https://less.bootcss.com/"),i(a)])])]),k])}const f=e(o,[["render",m],["__file","less.html.vue"]]);export{f as default};
