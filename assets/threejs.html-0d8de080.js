const e=JSON.parse('{"key":"v-1f821ffb","path":"/code/webDev/npm/threejs.html","title":"Three.js 笔记","lang":"zh-CN","frontmatter":{"title":"Three.js 笔记","icon":"model","date":"2023-06-18T00:00:00.000Z","category":["第三方库"],"tag":["模型"],"description":"初识Three.js 在认识Three.js前，先简单了解一下Web 3D的一些前置概念： OpenGL： OpenGL是开放式图形标准，跨编程语言、跨平台，Javascript、Java 、C、C++ 、 python 等都能支持OpenGL ，OpenGL的Javascript实现就是 。OpenGL ES 2.0是OpenGL的子集，针对手机、游戏主机等嵌入式设备而设计。 WebGL： WebGL是一种Javascript的3D图形接口，把JavaScript和OpenGL ES 2.0结合在一起。 Canvas： Canvas是HTML5的画布元素，在使用Canvas时，需要用到Canvas的上下文，可以用2D上下文绘制二维的图像，也可以使用3D上下文绘制三维的图像，其中3D上下文就是指WebGL。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/code/webDev/npm/threejs.html"}],["meta",{"property":"og:site_name","content":"正の博客"}],["meta",{"property":"og:title","content":"Three.js 笔记"}],["meta",{"property":"og:description","content":"初识Three.js 在认识Three.js前，先简单了解一下Web 3D的一些前置概念： OpenGL： OpenGL是开放式图形标准，跨编程语言、跨平台，Javascript、Java 、C、C++ 、 python 等都能支持OpenGL ，OpenGL的Javascript实现就是 。OpenGL ES 2.0是OpenGL的子集，针对手机、游戏主机等嵌入式设备而设计。 WebGL： WebGL是一种Javascript的3D图形接口，把JavaScript和OpenGL ES 2.0结合在一起。 Canvas： Canvas是HTML5的画布元素，在使用Canvas时，需要用到Canvas的上下文，可以用2D上下文绘制二维的图像，也可以使用3D上下文绘制三维的图像，其中3D上下文就是指WebGL。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-20T08:07:46.000Z"}],["meta",{"property":"article:author","content":"正"}],["meta",{"property":"article:tag","content":"模型"}],["meta",{"property":"article:published_time","content":"2023-06-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-07-20T08:07:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Three.js 笔记\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-06-18T00:00:00.000Z\\",\\"dateModified\\":\\"2023-07-20T08:07:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"正\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":2,"title":"初识Three.js","slug":"初识three-js","link":"#初识three-js","children":[]},{"level":2,"title":"基础使用","slug":"基础使用","link":"#基础使用","children":[]},{"level":2,"title":"物体移动,旋转与缩放","slug":"物体移动-旋转与缩放","link":"#物体移动-旋转与缩放","children":[]},{"level":2,"title":"requestAnimationFrame跟踪时间","slug":"requestanimationframe跟踪时间","link":"#requestanimationframe跟踪时间","children":[]},{"level":2,"title":"Clock跟踪时间","slug":"clock跟踪时间","link":"#clock跟踪时间","children":[]},{"level":2,"title":"自适应画面","slug":"自适应画面","link":"#自适应画面","children":[]},{"level":2,"title":"画布全屏与退出","slug":"画布全屏与退出","link":"#画布全屏与退出","children":[]},{"level":2,"title":"变量控制库dat.gui","slug":"变量控制库dat-gui","link":"#变量控制库dat-gui","children":[]},{"level":2,"title":"几何体和材质","slug":"几何体和材质","link":"#几何体和材质","children":[]},{"level":2,"title":"纹理/贴图","slug":"纹理-贴图","link":"#纹理-贴图","children":[{"level":3,"title":"纹理加载事件","slug":"纹理加载事件","link":"#纹理加载事件","children":[]},{"level":3,"title":"纹理偏移，旋转与重复","slug":"纹理偏移-旋转与重复","link":"#纹理偏移-旋转与重复","children":[]},{"level":3,"title":"透明材质与透明纹理","slug":"透明材质与透明纹理","link":"#透明材质与透明纹理","children":[]}]},{"level":2,"title":"标准网格材质与光源","slug":"标准网格材质与光源","link":"#标准网格材质与光源","children":[]},{"level":2,"title":"位移，粗糙度，金属和法线贴图","slug":"位移-粗糙度-金属和法线贴图","link":"#位移-粗糙度-金属和法线贴图","children":[]},{"level":2,"title":"环境贴图","slug":"环境贴图","link":"#环境贴图","children":[]},{"level":2,"title":"阴影","slug":"阴影","link":"#阴影","children":[]}],"git":{"createdTime":1689840466000,"updatedTime":1689840466000,"contributors":[{"name":"zzlm0107","email":"zzlm0107@163.com","commits":1}]},"readingTime":{"minutes":12.86,"words":3858},"filePathRelative":"code/webDev/npm/threejs.md","localizedDate":"2023年6月18日","excerpt":"<h2> 初识Three.js</h2>\\n<p>在认识Three.js前，先简单了解一下Web 3D的一些前置概念：</p>\\n<ul>\\n<li><strong>OpenGL：</strong> OpenGL是开放式图形标准，跨编程语言、跨平台，Javascript、Java 、C、C++ 、 python 等都能支持OpenGL ，OpenGL的Javascript实现就是 。OpenGL ES 2.0是OpenGL的子集，针对手机、游戏主机等嵌入式设备而设计。</li>\\n<li><strong>WebGL：</strong> WebGL是一种Javascript的3D图形接口，把JavaScript和OpenGL ES 2.0结合在一起。</li>\\n<li><strong>Canvas：</strong> Canvas是HTML5的画布元素，在使用Canvas时，需要用到Canvas的上下文，可以用2D上下文绘制二维的图像，也可以使用3D上下文绘制三维的图像，其中3D上下文就是指WebGL。</li>\\n</ul>","autoDesc":true}');export{e as data};
