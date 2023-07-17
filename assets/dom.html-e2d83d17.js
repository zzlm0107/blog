const e=JSON.parse('{"key":"v-3ef453f8","path":"/webDev/javascript/dom.html","title":"DOM 相关","lang":"zh-CN","frontmatter":{"title":"DOM 相关","icon":"dom","date":"2022-10-20T00:00:00.000Z","category":["JS","浏览器"],"tag":["dom"],"description":"Document Object Model 文档对象模型，通过DOM可以来任意来修改网页中各个内容 网页中浏览器已经为我们提供了document对象，它代表的是整个网页，它是window对象的属性，可以在页面中直接使用。 元素 查找 下面是一些查找全局元素的方式： 获取HTML元素： document.documentElement 获取body元素： document.body 根据id获取元素： document.getElementById(\\"id属性值\\") 根据标签名获取元素数组： document.getElementsByTagName(\\"标签名\\") 根据类名获取元素数组：document.getElementsByClassName(\\"类名\\") 自定义查找第一个匹配元素： document.querySelector(\\"名称\\") 名称规则与css选择器相同 自定义查找全部匹配元素： document.querySelectorAll(\\"名称\\") 名称规则与css选择器相同","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/webDev/javascript/dom.html"}],["meta",{"property":"og:site_name","content":"正の博客"}],["meta",{"property":"og:title","content":"DOM 相关"}],["meta",{"property":"og:description","content":"Document Object Model 文档对象模型，通过DOM可以来任意来修改网页中各个内容 网页中浏览器已经为我们提供了document对象，它代表的是整个网页，它是window对象的属性，可以在页面中直接使用。 元素 查找 下面是一些查找全局元素的方式： 获取HTML元素： document.documentElement 获取body元素： document.body 根据id获取元素： document.getElementById(\\"id属性值\\") 根据标签名获取元素数组： document.getElementsByTagName(\\"标签名\\") 根据类名获取元素数组：document.getElementsByClassName(\\"类名\\") 自定义查找第一个匹配元素： document.querySelector(\\"名称\\") 名称规则与css选择器相同 自定义查找全部匹配元素： document.querySelectorAll(\\"名称\\") 名称规则与css选择器相同"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-17T08:43:59.000Z"}],["meta",{"property":"article:author","content":"正"}],["meta",{"property":"article:tag","content":"dom"}],["meta",{"property":"article:published_time","content":"2022-10-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-07-17T08:43:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"DOM 相关\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-10-20T00:00:00.000Z\\",\\"dateModified\\":\\"2023-07-17T08:43:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"正\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":2,"title":"元素","slug":"元素","link":"#元素","children":[{"level":3,"title":"查找","slug":"查找","link":"#查找","children":[]},{"level":3,"title":"修改","slug":"修改","link":"#修改","children":[]},{"level":3,"title":"增加","slug":"增加","link":"#增加","children":[]},{"level":3,"title":"删除","slug":"删除","link":"#删除","children":[]},{"level":3,"title":"自定义属性","slug":"自定义属性","link":"#自定义属性","children":[]},{"level":3,"title":"元素偏移量 offset","slug":"元素偏移量-offset","link":"#元素偏移量-offset","children":[]},{"level":3,"title":"元素可视区 client","slug":"元素可视区-client","link":"#元素可视区-client","children":[]},{"level":3,"title":"元素滚动 scroll","slug":"元素滚动-scroll","link":"#元素滚动-scroll","children":[]}]},{"level":2,"title":"事件","slug":"事件","link":"#事件","children":[{"level":3,"title":"事件绑定","slug":"事件绑定","link":"#事件绑定","children":[]},{"level":3,"title":"事件对象","slug":"事件对象","link":"#事件对象","children":[]},{"level":3,"title":"事件委派","slug":"事件委派","link":"#事件委派","children":[]},{"level":3,"title":"事件传播机制","slug":"事件传播机制","link":"#事件传播机制","children":[]},{"level":3,"title":"鼠标事件","slug":"鼠标事件","link":"#鼠标事件","children":[]},{"level":3,"title":"键盘事件","slug":"键盘事件","link":"#键盘事件","children":[]}]}],"git":{"createdTime":1689583439000,"updatedTime":1689583439000,"contributors":[{"name":"zzlm0107","email":"zzlm0107@163.com","commits":1}]},"readingTime":{"minutes":6.6,"words":1981},"filePathRelative":"webDev/javascript/dom.md","localizedDate":"2022年10月20日","excerpt":"<p>Document Object Model 文档对象模型，通过DOM可以来任意来修改网页中各个内容</p>\\n<p>网页中浏览器已经为我们提供了<strong>document对象</strong>，<strong>它代表的是整个网页，它是window对象的属性，可以在页面中直接使用。</strong></p>\\n<h2> 元素</h2>\\n<h3> 查找</h3>\\n<p>下面是一些查找全局元素的方式：</p>\\n<ul>\\n<li>\\n<p>获取HTML元素： <code>document.documentElement</code></p>\\n</li>\\n<li>\\n<p>获取body元素： <code>document.body</code></p>\\n</li>\\n<li>\\n<p>根据id获取元素： <code>document.getElementById(\\"id属性值\\")</code></p>\\n</li>\\n<li>\\n<p>根据标签名获取元素数组： <code>document.getElementsByTagName(\\"标签名\\")</code></p>\\n</li>\\n<li>\\n<p>根据类名获取元素数组：<code>document.getElementsByClassName(\\"类名\\")</code></p>\\n</li>\\n<li>\\n<p>自定义查找第一个匹配元素： <code>document.querySelector(\\"名称\\")</code> 名称规则与css选择器相同</p>\\n</li>\\n<li>\\n<p>自定义查找全部匹配元素： <code>document.querySelectorAll(\\"名称\\")</code> 名称规则与css选择器相同</p>\\n</li>\\n</ul>","autoDesc":true}');export{e as data};
