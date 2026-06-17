---
title: Ajax
---

## 请求概述

**常见请求方式**

1. `GET`:从服务器读取数据 查(R)
2. `post`：向服务器添加新的数据 增
3. `put`: 更新服务器端已存在的数据 
4. `delete`：删除服务器的数据 删



**请求参数**

`query参数` 参数包含在请求地址中 格式为/xxxx?name=tom&age=18
`param参数` 参数包含在请求地址中 格式为 /xxxx/tom/18
`请求体参数` 参数包含在请求体中 ，注意*get请求没有请求体*

请求体参数格式包括urlencoded格式, 键值对形式name=tom&age=18（对应请求头：Content-Type:application/x-www-form-urlencoded）  
json格式（对应请求头：Content-Type:application/json）两种。



**请求的分类**

http请求可以分为**一般请求**和**ajax请求**。

- 一般请求:浏览器一般会直接显示响应体数据,也就是我们常说的刷新/跳转页面
- ajax请求:浏览器不会对界面进行任何更新操作,只是调用监视的回调函数并传入响应相关数据 （ajax实例，fetch）



## 预检请求

cors，把请求分为2种

- 普通请求（simple request）
- 预检请求 （preflight request），请求方法是`OPTIONS`，用于传输数据前先测试连接是否正常

那什么样的条件下不会触发预检请求呢？ 如下：

- 请求的方法只能是`GET`, `POST`, `HEAD`的一种
- 请求的header的只能是`Accept`，`Accept-Language`, `Content-Language`，`Content-Type`这些字段，不能超出这些字段，也没有自定义请求头
- 对于请求的header的 `Content-Type`字段，只能是以下值
  - `text/plain`
  - `multipart/form-data`
  - `application/x-www-form-urlencoded`

都满足以上条件的就是简单请求，否则就是复杂请求，会触发预检请求。

比如我们经常使用的`Content-Type:application/json; charset=utf-8`，这个请求就是非简单请求



**对于简单请求会直接发出，而非简单请求会先发出一个预检请求，检查当前请求是否符合服务器的cors配置，如果符合，则再发出真正的请求。如果不符合，则直接返回跨域报错。**





## Ajax相关

Ajax是前后端用来进行交互的一种主流方式，其实现主要是通过创建 **XMLHttpRequest实例** 来发送 HTTP 请求。

```js
// ajax简单使用
const xhr = new XMLHttpRequest(); // 创建实例

xhr.open('GET','http://www.example.org/example.txt'); // 确定请求方法和地址
xhr.send();	// 发送，此处若是post请求可放请求体数据

xhr.onreadystatechange = function() { // 监听状态变化，接收返回
    if(xhr.readyState === 4){
        if(xhr.status >= 200 && xhr.status < 300){
            console.log(xhr.response);
        }
    }
}
```



### 实例上的相关属性

创建的实例xhr上具有许多的属性，大部分都是和返回内容相关。下面是一些常用的：

- xhr.**status**  		响应数字状态码
- xhr.**readyState**      实例当前状态
- xhr.**response**        返回响应的正文
- xhr.**responseType**    返回响应的类型，可以修改（'arraybuffer','blob','json','text'等）
- xhr.**timeout**         请求发送前设置超时时间，超时就停止请求



### readyState属性

实例上的readyState属性返回一个 XMLHttpRequest 代理当前所处的状态，当状态码等于4时，表示请求返回内容已经可以读取到，可以在此时查看内容。

| 状态值 |     描述  |
|-------|-----------|
|  0    | 代理被创建，但尚未调用 open() 方法。|
|  1    |open() 方法已经被调用。|
|  2    |send() 方法已经被调用，并且头部和状态已经可获得。|
|  3    |下载中；responseText 属性已经包含部分数据。|
| 4   |下载操作已完成。|



### 解决浏览器缓存问题

当我们使用ajax发送请求时，如果多次对一个地址获取数据，即url没有改变，那么每次获取到的数据都相同。那是因为ajax为了提高效率，会缓存请求数据，当检测到二次发送相同地址的请求时，就会直接读取缓存数据导致每次数据都一样。

解决办法：

- 在`ajax`发送请求前加上 `xhr.setRequestHeader("Cache-Control","no-store")`
- 在url地址上拼接一个随机数或时间戳，使每次地址都不同



### 请求的超时，终止，异常

ajax实例上存在许多方法，调用他们可以控制请求。下面是一些常用的：

- **load事件**：请求完成时会触发
- **error事件**：请求出错时会触发
- **abort事件**：请求中止时会触发，调用xhr.abort()主动终止请求
- **readyStateChange事件**：请求的状态变化时会触发
- **timeout事件**：请求超时时触发



## fetch方法

除了创建Ajax实例，浏览器还提供了fetch方法来发送请求，fetch发送的也是Ajax请求。此方法会返回一个 promise，这个 promise 会在请求响应后被 resolve，并传回 [`Response`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response) 对象。

`Promise<Response> fetch(url[, init])`

第二个参数是一个可选的配置对象，包括`method`,`headers`，`body`等对请求的配置。

具体相关知识请查阅 [MDN-fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/fetch)
