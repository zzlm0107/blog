---
title: 归纳与总结
order: 1
---

在此对平时项目和日常学习中遇到的一些问题和解决方法进行归纳整理，方便后续直接查阅。

## 404页面匹配路由

在项目中加入404页面：注意404匹配一定要放在路由规则的最后，因为只有当前面的路径都没有匹配上才走404，放在前面直接走404后面的就不会匹配了。

```typescript
{
  path: '/404',
  component: () => import('@/views/error/page-404.vue'),
  meta: { hiddenNav: true }
},
{ // 匹配前面未定义的路由，重定向到404
  path: '/:pathMatch(.*)*',
  redirect: '/404'
}
```

## scss文件全局引入与动态标题

只需在vue.cnfig.js里配置：

```javascript
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 是否生成map文件
  productionSourceMap: process.env.NODE_ENV !== 'production',
  css: {
    loaderOptions: {
      sass: {
        // 支持多个scss样式文件，
        // eslint-disable-next-line quotes
        additionalData: `@import '@/styles/mixin.scss'; @import '@/styles/variables.scss';`
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = process.env.VUE_APP_TITLE
        return args
      })
  },
  devServer: {
    host: '0.0.0.0',
    port: process.env.VUE_APP_PORT,
    open: false
  }
})
```

## 动态引入组件

动态引入组件就意味着我们不确定需要哪个组件，组件路径是动态的，无法使用 `import A from './components/A.vue' ` 这种形式来引入，此时就需要借助**import方法**来实现, *异步组件是懒加载的，只有触发时才会去导入渲染。*：

1. 手动导入

```ts
// 由于响应式变量只会进行一次赋值操作，vue推荐我们使用shallowRef节省性能
const asyncComponent = shallowRef()

// 侦听数据变化，请求返回工具id后就可引入对应组件
watch(() => PageInfo.taskInfo.toolId, () => {
  const fileName: string = 'ToolDrawForm' + PageInfo.taskInfo.toolId
  // import方法动态引入组件，res为module模块，.defalut才是对应组件
  import('./components/' + fileName + '.vue')
    .then(res => {
      asyncComponent.value = res.default
    })
    .catch(error => {
      asyncComponent.value = ErrorComponent
      console.log(error)
    })
})
```

然后在模板处只需要用component组件绑定即可：

```vue
<component :is="asyncComponent" :taskInfo="taskInfo"></component>
```

2. defineAsyncComponent API

```js
// 简单语法,vue3
const component = defineAsyncComponent(() => {
    return import('./Foo.vue')
})


// 拼接字符串确定引入文件名
let asyncComponent: unknown
watch(() => PageInfo.taskInfo.toolsId, () => {
  const filename: string = 'Tool' + PageInfo.taskInfo.toolsId + 'Input.vue'
  asyncComponent = defineAsyncComponent({
    // 加载函数,动态拼接文件名加载组件
    loader: () => import('./components/' + filename),
    // 加载失败后展示的组件，失败组件不能用import动态引入
    errorComponent: ErrorComponent
  })
})
```

## 首屏加载动画

vue构成的单页面（spa）应用，首屏加载时间比较长。因为首次加载需要向服务器请求全局公用的各种库和文件以及进行渲染，必然会加载缓慢。常见优化方式包括资源用cdn加载、路由懒加载、gzip压缩代码等。

这里主要介绍在首次打开时呈现一个css的加载动画，使用css动画是因为在页面index.html呈现时内部css就会直接编译。

```css
/* index.html的head标签内部 */
<style type="text/css">
  #Loading {
        top:50% ;
        left:50%;
        position: absolute;
        transform: translateY(-50%) translateX(-50%);
        z-index:100;
  }

  @keyframes ball-beat {
      50% {
          opacity: 0.2;
          transform: scale(0.75);
      }
      100% {
          opacity: 1;
          transform: scale(1);
      }
  }

  .loader-inner > div {
      background-color: #4999ff;
      width: 10px;
      height: 10px;
      border-radius: 100% !important;
      margin: 2px;
      animation-fill-mode: both;
      display: inline-block;
      animation: ball-beat 0.7s 0s infinite linear;
    }

  .loader-inner > div:nth-child(2n-1) {
      animation-delay: 0.35s !important;
  }
</style>
```

```html
/* index.html的body标签结构 */
<body >
    <div id="Loading">
      <div class="loader-inner ball-beat">
         <div></div>
         <div></div>
         <div></div>
      </div>
    </div>

    <div id="app"></div>
</body>
```

之后我们只需要在App.vue中的setup标签中移除Loading结构即可，当App.vue中的setup标签开始编译运行时，说明此时各种资源都已请求完毕开始渲染了，白屏已经结束，所以这时移除就大功告成咯。

```vue
/* App.vue */
<script setup lang="ts">
// 页面加载成功时移除index.html的白屏加载动画
document.getElementById('Loading')?.remove()
</script>
```

## 请求过快导致loading闪烁

**前言**：当我们在写项目发起请求时，我们可能会习惯于在请求过程中数据还未返回时展示一个loading组件，请求结束后就隐藏loading，渲染数据。这是没有问题的，不过目前网速越来越快，请求都十分迅速，经常会导致loading组件刚呈现数据就已经返回了，导致loading组件闪烁，十分影响用户体验，但若是不用loading若部分用户网速不行，也会导致请求的长时间白屏问题，同样影响用户体验。所以就需要一个两全其美的方法。

**1.Promise.all() 解决**

我们可以利用定时器在固定时间后将一个promise状态改为成功，然后将这个promise与axios请求放入`Promise.all()`中,那么只有当两个promise都成功时才渲染数据，从而实现当请求过快时也能展示固定时间的loading效果。

```ts
const reolvePromise = (reolveTime: number): Promise<unknown> => { // 指定时间后返回状态成功的promise
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`在${reolveTime}ms后返回成功Promise`)
    }, reolveTime)
  })
}

loading.value = true // 发送请求时开启
Promise.all([ajaxRequest(), reolvePromise(200)])
  .then((res) => { // Promise.all执行结果返回的数组顺序是按传入顺序决定的
    console.log(res[0])
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    loading.value = false
  })
```

虽然使用`Promise.all()`看起来很美好，但网速快请求迅速也要等待loading展示结束，这就有些强行展示loading的感觉了。

**2.Promise.race() 解决**

另外一种新方式是利用`Promise.race()`。同样利用定时器，在固定时间后将一个promise状态改为失败，然后将这个promise与axios请求放入`Promise.race()`中，这意味着在固定时间内请求返回就直接渲染数据，而超出固定时间才展示loading效果。

```ts
const rejectPromise = (rejectTime: number): Promise<unknown> => { // 指定时间后返回状态失败的promise
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`在${rejectTime}ms后返回失败Promise`))
    }, rejectTime)
  })
}

const request = ajaxRequest() // 记录请求的状态
Promise.race([request, rejectPromise(1000)])
  .then((res) => {
    // 成功意味着请求在固定时间内返回
  })
  .catch((err) => { // 超时，整体变成onrejected，展示loading并继续等待返回
    loading.value = true
    console.log(err.message)
    request
      .then((res) => {
        // 请求终于成功了，渲染数据
      })
      .finally(() => {
        loading.value = false
      })
  })
```

虽然使用`Promise.race()`看起来更美好了，但依然存在问题，如果规定1000ms是超时时间，若请求在1100ms时返回，则loading只会展示100ms，依然会出现闪烁现象，所以如果用此方法解决需要估算每个请求的平均花费时间，不要让超时时间十分靠近请求的平均花费时间。

**3.Promise.all() 搭配 Promise.race() 终极解决方式**

终极解决方式是将 `Promise.all()` 和 `Promise.race()` 搭配使用。先利用`Promise.race()`约束请求在超时时间内返回时就直接渲染，否则就固定展示一段时间的loading动画再渲染数据。即请求如果没有在 500ms 内返回则固定展示 1500ms 的loading，这样才十分完美。

```ts
function reqData (): void {
  const axiosRequest = ajaxRequest() // 记录请求的状态
  Promise.race([axiosRequest, rejectPromise(500)])
  .then((res) => {
    // 成功意味着请求在固定时间内返回
  })
  .catch((err) => { // 超时，整体变成onrejected，展示loading
    loading.value = true
    console.log(err.message)
    Promise.all([axiosRequest, reolvePromise(1500)])
      .then((res) => { // Promise.all执行结果返回的数组顺序是按传入顺序决定的
        console.log(res[0])
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        loading.value = false
      })
  })
}
```

## 文件下载及形成压缩包

总结一下前端实现文件下载的方式

第一种：使用 a 标签下载，当给a标签添加download属性时就可以下载对应文件

```javascript
// 创建a标签
let a = document.createElement('a');
// 定义下载名称(跨域修改会失效)
a.download = 'input.txt';
// 隐藏标签
a.style.display = 'none';
// 设置文件路径
a.href = '';
// 将创建的标签插入dom
document.body.appendChild(a);
// 点击标签，执行下载
a.click();
// 将标签从dom移除
document.body.removeChild(a);
```

第二种：使用window.open( url ) 方式下载，但实测会有闪动，不推荐。

第三种：使用 FileSaver库 实现，第一个参数表示它支持 Blob/File/Url 三种类型，第二个参数表示文件名（可选），而第三个参数表示配置对象（可选）。

```javascript
FileSaver saveAs(Blob/File/Url, filename, optional Object { autoBom })
```

有时候当我们需要下载多个文件并打包形成压缩包时，就可以使用 jszip 和 FileSaver 搭配实现。

```javascript
// 引入实现下载压缩包的两个库
import JSZip from 'jszip';
import FileSaver from 'file-saver';
// 引入请求模块
import axios from 'axios'


// 实现下载压缩包按钮的方法
downloadZip(){
  const zip = new JSZip();
  const promises = [];  //用于存储多个promise
  this.fileArr.forEach( item => { 
    const promise = new Promise((resolve, reject) => {
      // 实现下载单个文件
      axios ({
        url: item.fileUrl,
        method: 'GET',
        responseType: 'blob'
      }).then((res) => {          //request请求的状态
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    }).then((res) => {            
      // 单个文件下载成功，拿到内容命名后转为二进制存储
      let fileName = item.fileName;
      // 在此处可以设置压缩包文件夹  zip.file(文件夹名/文件名, 文件内容 ,{配置项});
      zip.file(fileName, res.data ,{binary: true});
    })
    // 将单个promise存到数组中，后续使用promise.all判断整体状态
    promises.push(promise);
  })

  Promise.all(promises).then(() => {
    // 将压缩包里的文件压缩，返回一个promise实例，成功结果res返回的就是压缩包
    zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",  // STORE：默认不压缩 DEFLATE：需要压缩
      compressionOptions: {
        level: 9               // 压缩等级1~9    1压缩速度最快，9最优压缩方式
      }
    }).then((res) => {
      FileSaver.saveAs(res, "结果压缩包.zip") // 利用file-saver保存文件
    })
  })
}
```

## 上传图片并预览

前言：前端经常会遇到上传图片的功能，下面我们就来看看如何上传一张图片到后台。

首先当然是需要一个输入框选择图片文件,一个img标签展示预览图片

```html
<input type="file" accept="image/jpg,image/png" v-model="fileList" @change="fileChange">
<img ref="previewAvatar" :src="userAvatar" class="avatar">
```

当我们选择完图片后，我们是希望将这张图片展示出来的，我们可以通过URL.createObjectURL 或是 FileReader 预览实现预览。下面就介绍使用 URL.createObjectURL 实现

```javascript
// 实现预览功能
fileChange() {
  let file = this.fileList[0]
  this.$refs.previewAvatar.src = URL.createObjectURL(file.raw)
}
```

之后就可以提交了（此处是el-upload的上传方法）

```javascript
<el-upload
  class="avatar-uploader"
  action="#"
  :headers="{'Content-Type': 'multipart/form-data'}"
  :auto-upload="false"
  :multiple="false"
  :show-file-list="false"
  :on-change="handleChange"
  :before-upload="beforeAvatarUpload">
  <img ref="previewAvatar" :src="userAvatar" class="avatar">
</el-upload>

// 提交文件
submitAvatar() {
  let param = new FormData();
  param.append("avatarfile", this.fileList[0].raw)

  reqUploadAvatar(param).then((result) => {
    if (result.code === 200) {
      // ...
  })
```

此外还有使用 FileReader 实现转化为base64格式，再实现预览和上传的（这样上传就不用创建formData）

```javascript
file.onchange = function() {
    //获取到一个FileList对象中的第一个文件( File 对象),是我们上传的文件
    var fileData = this.files[0];
    var reader = new FileReader();
    //异步读取文件内容，结果用data:url的字符串形式表示
    reader.readAsDataURL(fileData);
    /*当读取操作成功完成时调用*/
    reader.onload = function() {
        //要的数据 这里的this指向FileReader（）对象的实例reader
        console.log(this.result);
        this.$refs.previewAvatar.src= this.result
    }
}
```

## 图片懒加载

**前言: **当一个页面的图片内容较多时,一次性请求过多的图片就会导致页面载入渲染缓慢,所以就需要进行图片懒加载.我们可以使用自定义指令来实现.

事实上图片懒加载本质就是在img标签先不写src,,请求得到数据后先不赋值给src属性,只有当图片进入可视区才进行赋值操作.

此功能需要用到一个WebAPI, 即通过**IntersectionObserver** 构造函数创建实例observer, 之后调用实例的observe方法开始观察,通过**isIntersecting 属性**判断观测元素是否进入可视区,之后就可以赋值给src属性了

```javascript
import defaultImg from '@/assets/images/200.png'

// 图片懒加载指令
  app.directive('lazy', {
    // 原理:先存储图片地址不赋给src属性,只有当图片进入可视区,才将地址赋值
    mounted (el, binding) {
      const observer = new IntersectionObserver((entries) => {
        // entries是我们传递的需要侦听的元素数组，由于我们指令只绑定一个元素，所以0下标的目标元素
        if (entries[0].isIntersecting) {
          // 进入可视区后就停止观察,防止多次触发
          observer.unobserve(el)
          el.onerror = () => {
            el.src = defaultImg
          }
          el.src = binding.value
        }
      }, 
      // 配置参数
      {
        // threshold 容器和可视区交叉的占比 0 (只要刚出现在可视区) ~ 1 (完全出现在可视区)
        threshold: 0
      })
      observer.observe(el)
    }
  })
```

## v-model语法糖的实现原理

v-model是vue提供的一种实现数据双向绑定的语法糖。可以作用表单元素，也可以作用自定义组件。

**作用表单元素：**当其作用于表单元素时，vue会根据作用的表单元素类型而生成合适的属性和事件。

text 和 textarea 元素使用 value property 和 input 事件；
checkbox 和 radio 使用 checked property 和 change 事件；
select 字段将 value 作为 prop 并将 change 作为事件。

**vue2作用自定义组件：**默认情况下，它会在自定义组件上生成一个value属性和input事件。v-model绑定的变量通过自定义属性value传递给组件props接收，完成子与父同步；而当子组件内数据变化就用emit触发传来的input事件，将变化后的值通过事件参数传回父组件，实现父与子同步，完成双向绑定。

```html
<HelloWorld v-model="inputVal" />
// 等效于
<HelloWorld :value="inputVal" @input="inputVal = backValue" />
```

虽然官方固定将属性和事件命名为value和input，但我们可以通过组件的model配置来改变生成的属性和事件。

```js
props: {
  number: Number,
},
model: {
  prop: "number", // 默认为 value
  event: "change", // 默认为 input
},
```

**vue3作用自定义组件：**默认情况下，它会生成一个**modelValue**属性和**@update:modelValue**事件。实现方法与vue2的原理相同。在组件中接收此modelValue属性（避免修改props），和在合适时机触发事件回传值给父组件。

vue3如果写成 **v-model:ABC= xxx** 绑定组件，则会生一个ABC属性和@update:ABC事件。即vue2.0的 **: xxx.sync** 语法糖解析。

## vue2函数式调用组件

**前言：**当一个组件在项目的多处都需要使用时，虽然可以全局注册再在页面上使用，但仍然有些繁琐，像是一些消息提示组件如果可以采用函数调用的方式直接创建，那就十分方便了。

因此，我们可以创建一个方法，将组件在合适时机渲染到一个虚拟节点内，需要时再直接调用这个方法，从而实现函数式调用组件。

```javascript
/* src/components/library/Message.js */

// 实现使用函数调用message组件的逻辑
import { createVNode, render } from 'vue'
import Message from './message.vue'

// 准备dom容器
const div = document.createElement('div')
div.setAttribute('class', 'message-container')
document.body.appendChild(div)
// 定时器标识
let timer = null

export default ({ type, text }) => {
  // 实现：根据message.vue渲染消息提示
  // 1. 导入组件
  // 2. 根据组件创建虚拟节点
  const vnode = createVNode(Message, { type, text })
  // 3. 准备一个DOM容器
  // 4. 把虚拟节点渲染DOM容器中
  render(vnode, div)
  // 5. 开启定时，移出DOM容器内容
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, div)
  }, 3000)
}
```

现在这个方法就可以直接引入使用了， 不过我们更希望将其挂载到全局的app实例上

```javascript
import Message from '@/components/library/Message'

Message({ type: 'error', text: '登录失败' })


## 路由动态权限

一般来说，路由权限可以分为前端控制和后端控制。

**前端控制**：

原理：根据用户的角色信息，隐藏掉不允许访问的侧边栏和按钮等，然后在**路由表的meta对象里标识该页面可访问的角色**。然后在全局前置路由守卫里根据角色信息，判断用户是否可以进入对应页面（路由守卫判断主要是防止用户直接输入url访问）

缺点：必须提前维护好每个页面的可访问角色，每次修改都需要重新打包部署等，而且对于用户无权访问的路由，理论上就不应该挂载。

**后端控制**：

原理：由后端维护不同角色的权限，返回角色的权限路由表；前端定义好静态路由和全部权限路由，再根据后端返回的**角色权限路由表**与前端的**全部权限路由**比对，再将权限路由添加到真实路由里。

缺点：整套流程较为繁琐（但安全性更高，是业内常用的方式）

重点说一下后端控制：

1. 将前端页面的所有路由进行拆分暴露，分为**静态路由**（所有人都可以访问）；**异步路由**（需要权限才能访问）；以及**任意路由**（将匹配不到的路由重定向到404，由于需要放到最后，所以也需要拆分出来）
2. 静态路由直接挂载即可，异步路由需要在**获取到用户的可访问路由权限表**后进行过滤，得到属于用户自己的**个人异步路由表**。然后遍历进行`addRoute()`添加即可

```js
// pinia user仓库，存储请求到的用户信息
import { constantRoutes, asyncRoutes, anyRoutes } from '@/router/routes'

/**
 * 根据用户异步路由表过滤异步路由展示，routes即用户可访问的路由页面名
 */
function filterAsyncRoutes(asyncRoutes: RouteRecordRaw[], routes: string[]) {
  return asyncRoutes.filter(item => {
    if (routes.includes(item.name as string)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoutes(item.children, routes)
      }
      return true
    }
  })
}


/**
 * 通过token获取用户信息方法
 */
function getUserInfo() {
  return new Promise<userInfoType>((resolve, reject) => {
    reqUserInfo()
      .then(res => {
        if (res.data.code === 200) {
          userInfo.value = res.data.data

          // 过滤异步路由,深拷贝避免直接修改asyncRoutes，导致切换账号时异步路由变化
          const userAsyncRoutes = filterAsyncRoutes(cloneDeep(asyncRoutes), res.data.data.routes)
          menuRoutes.value = [...constantRoutes, ...userAsyncRoutes, ...anyRoutes]
          // 将异步路由动态添加到路由表上
          const addRoutes = [...userAsyncRoutes, ...anyRoutes]
          addRoutes.forEach(route => {
            router.addRoute(route)
          })

          resolve(userInfo.value)
        } else {
          reject(res.data.msg)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}
```

3. 还需要注意的一个问题是addRoute动态添加的路由并不是响应式的，需要路由刷新才可访问
   
   ```ts
   router.beforeEach(async (to, _, next) => {
     NProgress.start()
     document.title = to.meta.title ? setting.title + '-' + to.meta.title : setting.title
   
     if (userStore.token) {
       // 已登录
       if (to.path === '/login') {
         next('/home')
       } else {
         // 有用户信息且去往正常页面
         if (userStore.userInfo) {
           next()
         } else {
           // 没有用户信息，可能是刷新导致pinia仓库清空了，重新发请求获取
           try {
             await userStore.getUserInfo()
             // 这里是解决addRoute动态添加的路由已经添加上但没有响应式更新，此时直接访问导致的白屏问题
             // 让其继续重新访问原路径，相当于执行一次路由更新操作，刷新路由表，动态路由此时已经添加完毕
             next({ ...to })
           } catch (error) {
             localStorage.clear()
             userStore.$reset()
             next('/login')
           }
         }
       }
     } else {
       // 未登录
       to.path !== '/login' ? next('/login') : next()
     }
   })
   ```

## 瀑布流布局

对于图片瀑布流的布局，目前最常规的做法就是使用js设置每张图片绝对定位的位置。具体实现方式参考如下：

```js
//当页面加载的时候调用
window.onload = function () {
  //页面初始化调用
  waterFall()
  //每次页面改变大小调用
  window.onresize = waterFall
}

function waterFall() {
  // 1. 设置container盒子的宽度
  //    注意：浏览器的可视区域的宽度 / 一个item元素的宽度 = 一行的排列的元素的个数
  let container = document.getElementById("container")
  let item = document.getElementsByClassName("item")
  //获取元素的宽度，瀑布流每个元素宽度一致(含border，padding)
  let width = item[0].offsetWidth
  //获取容器的宽度，如果不给容器百分比宽度，则获取浏览器窗口宽度实现响应式
  let clientWidth = container.offsetWidth;
  // let clientWidth = document.documentElement.clientWidth;

  //计算出应该放一行应该放几个（向下取整）
  let columnCount = Math.floor(clientWidth / width)
  // 如果不给容器宽度，则通过计算赋值，实现响应式
  // container.style.width = columnCount * width + "px"

  // 2.设置每一个item元素的排列位置
  //  第一行整体的top值都是0 后面的依次找上一行高度最小的容器，在它下面进行排列
  let hrr = [] // 存储最下面一行距离最上层的高度
  for (let i = 0; i < item.length; i++) {
    //定位第一行的图片
    if (i < columnCount) {
      item[i].style.top = "0px"
      item[i].style.left = i * width + "px"
      hrr.push(item[i].offsetHeight)
    } else {
      //第一行之后的
      //选择总高度最小的列
      let min = Math.min(...hrr)
      let index = hrr.indexOf(min)
      //将每个元素定位到当前总高度最小的列下
      item[i].style.top = min + "px"
      item[i].style.left = index * width + "px"
      //当前定位的元素加入该列
      hrr[index] += item[i].offsetHeight
    }
  }
}
```



## 全屏水印

水印的实现主要是通过一个固定定位的全屏div，对其设置样式 pointerEvents 为 none 不阻止下层元素交互事件；在其内部使用js创建每个水印元素，并计算绝对定位的位置。

```js
/*水印配置*/
function watermark(firstNode, secondNode) {

    // 浏览器视口的宽高
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    console.log(windowWidth, windowHeight)

    //设置单个水印的占据区域的宽高，包括水印元素宽高和间距距离
    let intervalWidth = 400; 
    let intervalHeight = 200;
    
    // 计算水印横向和纵向个数，向上取整
    let crosswise = Math.ceil(windowWidth / intervalWidth);
    let lengthways = Math.ceil(windowHeight / intervalHeight);

    //水印默认配置
    let watermarkConfiguration = {
        watermarkFont: '微软雅黑', //水印字体
        watermarkColor: 'red', //水印字体颜色
        watermarkFontsize: '18px', //水印字体大小
        watermarkTransparency: 0.15, //水印透明度
        watermarkWidth: 240, //水印元素宽度
        watermarkHeight: 100, //水印元素高度
        watermark_angle: 0 //水印倾斜度数
    };
    // 创建文档片段(插入dom效率更高)
    let _template = document.createDocumentFragment();

    //遍历外层横向个数
    for (let i = 0; i < crosswise; i++) {
        //遍历内层纵向个数
        for (let j = 0; j < lengthways; j++) {

            // 固定定位位置
            let xaxis = intervalWidth * i;
            let yaxis = intervalHeight * j;

            //创建水印 
            let watermarkDiv = document.createElement('div');

            watermarkDiv.id = `watermarkDiv${i}-${j}`
            watermarkDiv.className = 'watermarkDiv';

            ///节点创建
            let spanFirst = document.createElement('div'); //第一个节点
            let spanSecond = document.createElement('div'); //第二个节点
            spanFirst.appendChild(document.createTextNode(firstNode));
            spanSecond.appendChild(document.createTextNode(secondNode));
            watermarkDiv.appendChild(spanFirst);
            watermarkDiv.appendChild(spanSecond);

            /*样式配置*/
            //设置水印div倾斜显示
            watermarkDiv.style.transform = "rotate(-" + watermarkConfiguration.watermark_angle + "deg)";
            watermarkDiv.style.opacity = watermarkConfiguration.watermarkTransparency; //水印透明度
            watermarkDiv.style.fontSize = watermarkConfiguration.watermarkFontsize; //水印字体大小
            watermarkDiv.style.fontFamily = watermarkConfiguration.watermarkFont; //水印字体
            watermarkDiv.style.color = watermarkConfiguration.watermarkColor; //水印颜色
            watermarkDiv.style.width = watermarkConfiguration.watermarkWidth + 'px'; //水印宽度
            watermarkDiv.style.height = watermarkConfiguration.watermarkHeight + 'px'; //水印高度
            watermarkDiv.style.position = "absolute"; //水印绝对定位
            watermarkDiv.style.left = xaxis + 'px'; //Y轴
            watermarkDiv.style.top = yaxis + 'px'; //X轴
            watermarkDiv.style.overflow = "hidden";
            watermarkDiv.style.display = "flex";
            watermarkDiv.style.flexDirection = "column";
            watermarkDiv.style.justifyContent = "center";
            watermarkDiv.style.alignItems = "center";

            _template.appendChild(watermarkDiv); // 添加到文档片段中
        }
    }

    // 创建固定定位全屏div，包裹所有水印元素
    let fullScreenDom = document.createElement('div')
    fullScreenDom.style.position = 'fixed'
    fullScreenDom.style.top = '0'
    fullScreenDom.style.left = '0'
    fullScreenDom.style.width = '100vw'
    fullScreenDom.style.height = '100vh'
    fullScreenDom.style.zIndex = "9999";
    fullScreenDom.style.pointerEvents = 'none'; // 不阻止下层元素交互事件
    fullScreenDom.appendChild(_template)

    document.body.appendChild(fullScreenDom);
}

```



## 剪切板

浏览器实现剪切板功能主要是依赖 [*clipboard* API](https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard)，用户授权后即可读取系统剪切板的内容从而实现复制和粘贴功能，注意剪切板相关的方法返回的都是一个promise。

**1.复制功能**

只复制文本，即向系统剪切板写入文本内容，可以很方便的使用 `navigator.clipboard.writeText(value)`，后面可以在then回调提示复制成功或catch回调提示剪切板功能被用户拒绝。 

如果需要复制图片等非文本数据，则需要调用 `navigator.clipboard.write(data)` ，其中参数 data 是要写入剪贴板的数据的 ClipboardItem 对象数组。关于 ClipboardItem 对象的创建，可以参考如下：

```js
let test = 'test' // 原始数据
let type = 'text/html' // 数据的类型
let blob = new Blob([`<p style="color: pink;">${test}</p>`], { type }) // 构建blob数据对象
let data = [ new ClipboardItem({ [type]: blob }) ] // 创建ClipboardItem对象数组
navigator.clipboard.write(data).then()
```

**2.粘贴功能**

只粘贴文本，即只读取剪切板文本内容，可以用 `readText` 方法异步读取文本内容后进行处理。

如果需要粘贴非文本数据，需要使用 `read` 方法异步读取到 ClipboardItem 对象数组。然后根据遍历根据 每个ClipboardItem 对象的type类型进行处理，可以参考如下：

```js
const clipboardItems = await navigator.clipboard.read()
console.log(clipboardItems)
// read方法异步读取剪切板返回 由 ClipboardItem 对象实例 构成的数组
clipboardItems.forEach((ClipboardItem) => {
  // 1. html 文本类型
  if(ClipboardItem.types.includes('text/html')) {
    // ClipboardItem.getType 返回的blob的promise
    ClipboardItem.getType('text/html').then((blob) => {
      blob.text().then(blobText => {
        console.log('text/html', blobText)
      })
    })
  }
  // 2. txt 普通文本
  if(ClipboardItem.types.includes('text/plain')) {
    ClipboardItem.getType('text/plain').then((blob) => {
      blob.text().then(blobText => {
        console.log('text/plain', blobText)
      })
    })
  }
  // 3. 图片类型
  if(ClipboardItem.types.includes('image/png')) {
    ClipboardItem.getType('image/png').then((blob) => {
      let url = URL.createObjectURL(blob)
      let img = new Image()
      img.src = url
      contentDom.appendChild(img)
    })
  }
})
```

如果想更加方便快捷的复制页面内容，也有第三方库 [clipboard.js](https://clipboard.nodejs.cn/) 可以选择，它提供了多种复制网页内容的方法， 十分轻量且文档和操作也简单。



## 文件上传

文件上传本质就是利用ajax实现数据的网络传输，通过侦听一系列事件搭配dom界面的变化实现完整的上传功能。

**1.利用file属性的input获取文件**

```html
<input type="file" id="file-input" accept="image/jpeg,image/png,.pdf,video/*" multiple>
```

`type="file"`类型的input输入框即可在点击时实现选择文件的功能，其主要的属性包括`accept`和`multiple`.

- `accept`属性规定了应该选择什么类型的文件，这个字符串是一个以逗号为分隔的[**唯一文件类型说明符**](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/file#唯一文件类型说明符)列表。
  
  *需要注意的是该属性的功能是在选择文件时在系统文件资源管理器中起到一定过滤作用，但如果用户切换为浏览全部文件，则依然可以选择其他类型的文件，所以不可用该属性作为限制文件类型的唯一手段。*

- `multiple`属性表示用户可以一次可以选择上传多个文件。

监听 **change事件** 即可在输入框内文件变化时通过**输入框的files对象**获取到用户选择的文件

```js
let fileInput = document.querySelector('#file-input')

fileInput.addEventListener('change', function () {
  if (this.files.length === 0) return
  console.log(this.files)
})
```

**2.实现图片预览**

当我们选择一些文件类型的图片时，不同于一些大文件和视频等，我们是可以提供图片预览功能的。图片预览主要是先准备一个空的img标签，获取到用户选择的图片就复制src属性即可。实现方式主要有两种：

```html
<input type="file" id="file-input" accept="image/*">
<img id="preview-img" src="" alt="" width="300px">
```

- **FileReader对象**
  
  [FileReader](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader) 对象允许读取存储在用户计算机上的文件或原始数据缓冲区的内容，使用 File 或 Blob对象指定要读取的文件或数据。
  
  由于我们希望预览图片，所以使用`readAsDataURL`方法将图片文件读取为base64格式字符串，并且由于读取过程是异步的，所以在读取完成触发load事件时进行逻辑处理，将base64格式字符串赋给img的src属性。
  
  ```js
  let fileInput = document.querySelector('#file-input')
  let previewImg = document.querySelector('#preview-img')
  
  fileInput.addEventListener('change', function () {
    if (this.files.length === 0) return
  
    let img = this.files[0]
    if (img.type !== 'image/jpeg') {
      throw new Error('选择了非规定图片文件')
    } else {
      let fileReader = new FileReader()
      // 将图片读取为base64字符串
      fileReader.readAsDataURL(img)
  
      fileReader.onload = (e) => {
        previewImg.src = e.target.result
      }
    }
  })
  ```

- **URl.createObjectURL()方法**
  
  `URL.createObjectURL()` 静态方法会创建一个表示参数File或Blob对象的 URL。这个 URL 的生命周期和创建它的窗口中的 `document` 绑定。
  
  即此方法会为参数的File或Blob对象创建一个url链接，赋给img的src属性实现预览。
  
  ```js
  fileInput.addEventListener('change', function () {
    if (this.files.length === 0) return
  
    let img = this.files[0]
    if (img.type !== 'image/jpeg') {
      throw new Error('选择了非规定图片文件')
    } else {
      // 创建url，指向传递的参数file对象，在此处即选择的图片
      let url = URL.createObjectURL(img)
      previewImg.src = url
    }
  })
  ```

**3.Ajax上传**

分析上传功能，我们需要准备一个upload函数，该函数需要接收一些参数：上传的文件，进度变化事件，上传完成事件等；在函数内部完成上传功能，并且需要向外暴露中断上传的方式。

```js
// 文件上传方法
function upload(file, onProgress, onFinish) {
  const xhr = new XMLHttpRequest()
  xhr.open('post', 'http://example.com')

  let form = new FormData()
  form.append('file', file)
  // 发送FormData对象,里面存放着文件
  xhr.send(form)

  xhr.upload.addEventListener('progress', function (e) {
    let precent = Math.floor(e.loaded / e.total * 100)
    // 获取到上传进度后触发进度事件
    onProgress(precent)
  })

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        // 获取到数据后触发完成事件
        onFinish(xhr.response)
      }
    }
  }

  // 返回中止上传的方法
  return function() {
    xhr.abort()
  }
}
```

**4.文件拖拽上传**

文件上传的本质已经概述完毕，再次补充界面实现拖拽上传的操作，主要实现方式有两种：

1. 利用原生file类型input输入框实现

事实上，原生的file类型input输入框就支持拖拽文件选择，我们只需要调整其样式不再将其隐藏，而是透明度设为0，并占满拖拽放置区域即可。

```css
input[type="file"] {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
```

2. 利用H5的拖拽API实现

由于浏览器并不允许普通div变成可放置区域，所以我们首先需要将拖拽放置区域的div变的可以放置，给其注册 `dragover` 和 `drop`事件即可让其变得可放置,并且由于div默认不支持放置，所以需要阻止默认事件。

```js
let container = document.querySelector('.file-container')

container.addEventListener('dragover', (e) => {
  e.preventDefault()
})
container.addEventListener('drop', (e) => {
  e.preventDefault()
  // 拖拽事件event中的dataTransfer里记录了在拖放交互期间传输的数据
  // 这样就获取到了本地拖拽的文件
  console.log(e.dataTransfer.files)
  // 拖拽文件的类型，以此实现文件类型判断
  console.log(e.dataTransfer.types.includes('Files'))
})
```

获取到了本地拖拽的文件后，如果仅实现拖拽上传，拿到文件就可以直接上传了，都不再需要input输入框了；如果需要兼容点击上传，则可以将该文件赋值给input输入框的文件列表，但需要注意的是，**直接赋值文件无法触发change事件**，所以我们可以把change事件回调的函数提取出来，在赋值操作后面直接调用这个函数实现上传；点击上传时触发change事件，事件回调也执行提取函数，即可兼容两种模式。



## 大文件上传

相对于小文件，大文件由于数据量庞大，直接传输容易占用tcp通道导致队头阻塞，并且可能会因为网络波动等原因导致失败十分影响体验，所以目前传输大文件都是对文件进行切片处理，并配合生成文件hash值实现文件分片传输，提升效率。

**1.文件分片**

想要传输大文件，第一步就是要对获取到的文件进行分片处理,利用 `silce方法` 将大文件截取成多个分片：

```JS
/* 文件分片方法 */
function fileSlice(file, chunkSize) {
const chunkList = [] // 片数组
let cur = 0 // 当前截取的位置
while (cur < file.size) {
  chunkList.push(file.slice(cur, cur + chunkSize))
  cur += chunkSize
}
return chunkList
}
```

**2.生成文件hash值**

在得到文件的分片数组后，就可以根据分片计算文件hash值，由于对大文件直接计算耗时较大，所以常见做法是只获取开头和结尾的分片，中间的分片依次取前中后各多个字节，最后对取出的所有字节做一次hash值计算作为整个文件的hash值

```JS
/* 根据分片数组计算整个文件hash值 */
  function calculateHash(chunkList, chunkSize) {
    // 由于fileReader读取文件的异步性，导致hash值生成也变得异步，所以用prosmise包裹在外层用await等待
    return new Promise(resolve => {
      // 第一个和最后一个切片的内容全部参与计算
      // 中间剩余的切片我们分别在前面、后面和中间取2个字节参与计算

      let buffers = [] // 存放截取文件字节的数组
      chunkList.forEach((chunk, index) => {
        if (index === 0 || index === chunkList.length - 1) {
          buffers.push(chunk)
        } else {
          buffers.push(chunk.slice(0, 2))
          buffers.push(chunk.slice(chunkSize / 2, chunkSize / 2 + 2))
          buffers.push(chunk.slice(chunkSize - 2, chunkSize))
        }
      })

      // SparkMD5 生成文件hash值
      const spark = new SparkMD5.ArrayBuffer()

      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(new Blob(buffers))
      fileReader.onload = (e) => {
        spark.append(e.target.result)
        resolve(spark.end())
      }
    })
  }
```

**3.实现秒传**

秒传的原理就是利用文件hash检测上传文件是否在服务器已经存在，如果已存在就无需再次上传，达到秒传。并且如果服务器上有该文件的hash分片的话，表示已经上传了一部分，就返回这个已上传分片hash值构成的数组，为后面断点续传做准备。

```js
/* 先上传hash值，判断服务器是否已有该文件或该文件的部分分片，从而实现秒传或断点续传 */
  function verifyUpload(hash, fileName) {
    return new Promise(resolve => {
      fetch('https://httpbin.org/post', {
        method: 'post',
        data: {
          hash,
          fileName
        }
      })
        .then(res => {
          if (res.data) {
            // 服务器标识为true，则已存在相同hash的文件
            resolve(true)
          } else {
            // 服务器标识为false,不存在完成文件，则回传 已传分片hash数组
            resolve([])
          }
        })
    })
  }
```

**4.限制并发请求数**

由于一个大文件会形成多个分片，这些分片都是需要传输的，虽然浏览器会限制开启的tcp通道的数量，如谷歌浏览器最多开启6个，但如果不加以限制并发请求数，这些请求一次性都被创建出来，也是会消耗不小的性能，并且这些分片请求会占据tcp通道，导致后续的其他请求不能及时返回，所以必须加以限制。

```js
/* 同一地址限制并发请求方法 */
  function taskPoolRequest(formDatas, max) {
    // 由于请求的异步，所以使用promise包裹，等所有结果都出来后再resolve
    return new Promise(async (resolve) => {

      let point = 0 // 指向当前待发送的分片
      const taskPool = [] // 请求池
      const result = [] // 结果数组

      while (point < formDatas.length) {
        let i = point // 记录当前请求位置，对应结果数组位置
        let task = fetch('https://httpbin.org/post', {
          method: 'post',
          headers: { 'Content-Type': 'multipart/form-data' },
          body: formDatas[i]
        })
          .then(res => {
            result[i] = res
          })
          .catch(err => {
            result[i] = err
          })
          .finally(() => {
            // 请求返回，就从请求池里移除
            taskPool.splice(taskPool.findIndex(item => item === task), 1)
          })

        taskPool.push(task) // 发送后就立刻加到请求池

        // 请求池满载就等待
        if (taskPool.length === max) {
          await Promise.race(taskPool)
        }
        point++
      }

      // 当循环结束时，所有请求都已发送，但请求池中还满载着请求，需等待完成
      await Promise.all(taskPool)
      resolve(result)
    })
  }
```

**5.发送分片，实现断点续传**

最后就是发送分片，并且在发送前根据之前服务器返回的已有分片hash数组，过滤掉已经上传过的分片，这样就实现了断点续传。

```JS
/* 上传分片 */
  function uploadChunkList(chunkList, hash, fileName, uploadedChunks) {
    // 构建需要上传的对象数组
    let data = chunkList.map((chunk, index) => {
      return {
        fileHash: hash,
        chunkHash: hash + '-' + index,
        chunk
      }
    }).filter(item => {
      // 根据已传分片hash数组，过滤出未传的文件分片，实现断点续传
      return !uploadedChunks.includes(item.chunkHash)
    })

    // 构建切片formdata对象的数组
    let formDatas = data.map(item => {
      const formData = new FormData()
      formData.append('fileHash', item.fileHash)
      formData.append('chunkHash', item.chunkHash)
      formData.append('chunk', item.chunk)
      return formData
    })

    taskPoolRequest(formDatas, 3).then(res => {
      // 全部切片上传完就告知后端合并，携带文件hash以区分切片
      fetch('https://httpbin.org/post', {
        method: 'post',
        data: {
          size: chunkSize,
          hash,
          fileName
        }
      })
        .then(res => {
          alert('上传完成')
        })
    })

  }
```

下面是按顺序调用各方法的完成时机：

```js
  const chunkSize = 1024 * 50 // 每片50KB
  let file = null


  input.addEventListener('change', (e) => {
    file = e.target.files[0]
    if (!file) {
      console.log('未选择文件')
      file = null
      return
    }
  })

  btn.addEventListener('click', async () => {
    if (!file) return

    // 文件分片
    let chunkList = fileSlice(file, chunkSize)
    // 生成文件hash
    let hash = await calculateHash(chunkList, chunkSize)

    // 验证是否已存在，实现秒传
    let res = await verifyUpload(hash, file.name)
    if (res === true) {
      console.log('文件已存在，秒传成功')
      return
    }

    // 上传分片
    uploadChunkList(chunkList, hash, file.name, res)

  })
```





## 拖拽与放置

完整的拖拽和放置相关API参考MDN [拖拽文档](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API)

| 事件                                                                                          | 触发时刻                                 |
|:------------------------------------------------------------------------------------------- |:------------------------------------ |
| [`dragstart`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragstart_event) | 当用户开始拖拽一个元素或选中的文本时触发                 |
| [`drag`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/drag_event)           | 当拖拽元素或选中的文本时触发                       |
| [`dragend`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragend_event)     | 当拖拽操作结束时触发 (比如松开鼠标按键或敲“Esc”键)        |
| [`dragenter`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragenter_event) | 当拖拽元素或选中的文本到一个可释放目标时触发,仅进入时触发一次      |
| [`dragover`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragover_event)   | 当元素或选中的文本被拖到一个可释放目标上时触发，进入后100ms触发一次 |
| [`dragleave`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragleave_event) | 当拖拽元素或选中的文本离开一个可释放目标时触发              |
| [`drop`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/drop_event)           | 当元素或选中的文本在可释放目标上被释放时触发               |

想要让一个元素变得可拖拽，我们需要给它的 `draggable属性` 设置为true，并注册 `dragstart` 事件开启拖拽；

想要让一个元素变成可放置区，我们需要给它注册 `dragover` 和 `drop`事件；并且由于浏览器默认大部分元素不支持元素放置，所以我们需要给这两个事件都使用 `e.preventDefault()` 来阻止浏览器默认事件。

下面是一个简单的示例，更多细节参考上方的官方文档。

```js
let sons = document.querySelector('.box').querySelectorAll('div')
let box2 = document.querySelector('.box2')

let select = null // 记录正在拖动的元素
let X = 0 // 记录拖动时鼠标据元素左侧的距离
let Y = 0 // 记录拖动时鼠标据元素上侧的距离

sons.forEach((son) => {
  // 设置元素的draggable属性开启可拖拽
  son.draggable = true
  // 元素开始拖动时触发dragstart事件
  son.addEventListener('dragstart', (e) => {
    select = e.target
    X = e.offsetX
    Y = e.offsetY
    e.target.style.border = '4px dashed red'
  })

  // 元素拖动过程时触发drag事件
  son.addEventListener('drag', (e) => {
    e.target.style.opacity = '0.2'
  })
  // 元素结束拖动时触发dragend事件
  son.addEventListener('dragend', (e) => {
    e.target.style.border = 'none'
    e.target.style.opacity = '1'
  })
})



// 想要让元素变成可放置区域,需要给元素添加 dragenter 或 dragover 事件
// dragenter 仅在进入时触发一次
// dragover 会在进入后持续触发
box2.addEventListener('dragover', (e) => {
  e.preventDefault()
  // e.target.style.border = '4px dashed black'
})

// 拖拽元素在可放置区域放下时触发
box2.addEventListener('drop', (e) => {
  e.preventDefault()
  e.target.appendChild(select)
  select.style.position = 'absolute'
  select.style.left = e.offsetX - X + 'px'
  select.style.top = e.offsetY - Y + 'px'
})
```

## canvas层叠效果

网页上抽奖的刮刮卡效果可以利用canvas来实现，主要是利用重叠时的显示效果模式。

```html
<div id="card">谢谢惠顾</div>
<canvas id="myCanvas" width="400" height="250">您的浏览器不支持 Canvas</canvas>

<script>
    /** @type {HTMLCanvasElement} */

    // 利用层级，实现canvas覆盖住结果部分
    var canvas = document.getElementById("myCanvas");
    var card = document.getElementById("card");
    var isDraw = false;
    var ctx = canvas.getContext("2d");

    // 绘制刮刮卡图层，有图片也可用canvas读取覆盖
    ctx.beginPath();
    ctx.fillStyle = "#ccc";
    ctx.fillRect(0, 0, 400, 250);
    ctx.closePath();

    // 将canvas层叠模式设置为 重叠部分透明，不重叠的显示
    ctx.globalCompositeOperation = "destination-out";

    canvas.addEventListener("mousedown", () => (isDraw = true));
    canvas.addEventListener("mouseup", () => (isDraw = false));
    canvas.addEventListener("mousemove", (e) => {
        if (!isDraw) return;
        // 鼠标移动时绘制圆点，滑动时就实现了刮开涂层效果
        ctx.beginPath();
        ctx.arc(e.pageX, e.pageY, 20, 0, 2 * Math.PI, true);
        ctx.fill();
        ctx.closePath();
    });

    if (Math.random() < 0.1) card.textContent = "一等奖"; 
</script>
```

