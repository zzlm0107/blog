const e=JSON.parse('{"key":"v-6e27b6f7","path":"/code/webDev/react/react%E5%9F%BA%E7%A1%80.html","title":"React 基础","lang":"zh-CN","frontmatter":{"title":"React 基础","icon":"react","date":"2023-04-15T00:00:00.000Z","category":["React","前端框架"],"tag":["react"],"description":"初识React 中文文档 https://zh-hans.react.dev/ 使用React的好处： 采用组件化模式、声明式编码，提高开发效率及组件复用率 在 React Native中可以使用React语法进行移动端开发 使用虚拟DOM+Diff算法，尽量减少与真实DOM的交互","head":[["meta",{"property":"og:url","content":"https://zzlm0107.github.io/blog/blog/code/webDev/react/react%E5%9F%BA%E7%A1%80.html"}],["meta",{"property":"og:site_name","content":"正の博客"}],["meta",{"property":"og:title","content":"React 基础"}],["meta",{"property":"og:description","content":"初识React 中文文档 https://zh-hans.react.dev/ 使用React的好处： 采用组件化模式、声明式编码，提高开发效率及组件复用率 在 React Native中可以使用React语法进行移动端开发 使用虚拟DOM+Diff算法，尽量减少与真实DOM的交互"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-24T03:20:43.000Z"}],["meta",{"property":"article:author","content":"正"}],["meta",{"property":"article:tag","content":"react"}],["meta",{"property":"article:published_time","content":"2023-04-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-07-24T03:20:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"React 基础\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-04-15T00:00:00.000Z\\",\\"dateModified\\":\\"2023-07-24T03:20:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"正\\",\\"url\\":\\"https://github.com/zzlm0107\\"}]}"]]},"headers":[{"level":2,"title":"初识React","slug":"初识react","link":"#初识react","children":[]},{"level":2,"title":"JSX语法","slug":"jsx语法","link":"#jsx语法","children":[]},{"level":2,"title":"组件化编程","slug":"组件化编程","link":"#组件化编程","children":[]},{"level":2,"title":"组件实例核心属性","slug":"组件实例核心属性","link":"#组件实例核心属性","children":[{"level":3,"title":"state属性（类式）","slug":"state属性-类式","link":"#state属性-类式","children":[]},{"level":3,"title":"props属性(类式)","slug":"props属性-类式","link":"#props属性-类式","children":[]},{"level":3,"title":"ref属性（类式）","slug":"ref属性-类式","link":"#ref属性-类式","children":[]}]},{"level":2,"title":"事件处理","slug":"事件处理","link":"#事件处理","children":[]},{"level":2,"title":"收集表单数据","slug":"收集表单数据","link":"#收集表单数据","children":[{"level":3,"title":"非受控组件","slug":"非受控组件","link":"#非受控组件","children":[]},{"level":3,"title":"受控组件","slug":"受控组件","link":"#受控组件","children":[]}]},{"level":2,"title":"高阶函数和函数柯里化","slug":"高阶函数和函数柯里化","link":"#高阶函数和函数柯里化","children":[]},{"level":2,"title":"组件生命周期","slug":"组件生命周期","link":"#组件生命周期","children":[{"level":3,"title":"旧版生命周期","slug":"旧版生命周期","link":"#旧版生命周期","children":[]},{"level":3,"title":"新版生命周期","slug":"新版生命周期","link":"#新版生命周期","children":[]}]},{"level":2,"title":"DOM的diffing算法","slug":"dom的diffing算法","link":"#dom的diffing算法","children":[]},{"level":2,"title":"脚手架","slug":"脚手架","link":"#脚手架","children":[]},{"level":2,"title":"样式的模块化","slug":"样式的模块化","link":"#样式的模块化","children":[]},{"level":2,"title":"原生父子通信","slug":"原生父子通信","link":"#原生父子通信","children":[]},{"level":2,"title":"代理跨域","slug":"代理跨域","link":"#代理跨域","children":[]},{"level":2,"title":"PubSub 消息订阅与发布","slug":"pubsub-消息订阅与发布","link":"#pubsub-消息订阅与发布","children":[]},{"level":2,"title":"扩展","slug":"扩展","link":"#扩展","children":[{"level":3,"title":"类式组件中setState更新状态的异步性","slug":"类式组件中setstate更新状态的异步性","link":"#类式组件中setstate更新状态的异步性","children":[]},{"level":3,"title":"组件优化","slug":"组件优化","link":"#组件优化","children":[]},{"level":3,"title":"render props","slug":"render-props","link":"#render-props","children":[]},{"level":3,"title":"错误边界","slug":"错误边界","link":"#错误边界","children":[]}]}],"git":{"createdTime":1689840466000,"updatedTime":1690168843000,"contributors":[{"name":"zzlm0107","email":"zzlm0107@163.com","commits":2}]},"readingTime":{"minutes":21.16,"words":6349},"filePathRelative":"code/webDev/react/react基础.md","localizedDate":"2023年4月15日","excerpt":"<h2> 初识React</h2>\\n<p><strong>中文文档</strong> <a href=\\"https://zh-hans.react.dev/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://zh-hans.react.dev/</a></p>\\n<p>使用React的好处：</p>\\n<ol>\\n<li>采用<strong>组件化模式</strong>、<strong>声明式编码</strong>，提高开发效率及组件复用率</li>\\n<li>在 React Native中可以使用React语法进行<strong>移动端开发</strong></li>\\n<li>使用<strong>虚拟DOM</strong>+<strong>Diff算法</strong>，尽量减少与真实DOM的交互</li>\\n</ol>","autoDesc":true}');export{e as data};
