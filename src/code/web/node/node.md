---
title: Node.js
order: 1
---

Node.js 是一个基于Chrome V8引擎的JavaScript运行环境，使用了一个事件驱动、非阻塞式I/O模型, 让JavaScript 运行在服务端的开发平台。是前端学习和理解后端的一个重要知识点。

**node中文网** <https://nodejs.cn/>



## 初识node

在官网下载安装后，就可以使用。

- web核心组成： ECMAScirpt（核心），web API（DOM，BOM，定时器，AJAX，Storage .......）
- node核心组成： ECMAScirpt（核心），node API（fs，http，path，定时器，url .......）

创建一个js文件，在里面写一些JavaScript代码，之后打开终端，定位到文件夹位置，输入命令`node 文件名` 即可运行此文件。

> 由于不同项目需要的node版本有差异，建议使用nvm进行node版本管理。


## 文件系统

引入node中的 **fs模块** 进行文件的读取和写入。此外还有打开文件，创建文件等各种操作。

- 读取文件： `readFile(文件地址与名字, 编码方式?, 回调函数)`
- 写入文件： `readFile(文件地址与名字, 写入内容, 回调函数)`    会覆盖原文件内容
- 追加内容： `appendFile(文件地址与名字, 追加内容, 回调函数)`   
- 流式写入： `const ws = fs.createWriteStream('./text1.txt')   ws.write('xxx')`  适合高频次写入
- 流式读取： `const rs = fs.createReadStream('./text1.txt')   rs.on('data', chunk => {})`   读取的是buffer
- 重命名文件：  `rename(旧文件路径, 新文件路径, 回调函数)`   还可以移动文件位置
- 删除文件：  `unlink(文件路径, 回调函数)`   =  `rm(文件路径, 回调函数)`
- 创建文件夹： `mkdir(文件夹路径, 回调函数)`   可以传入第二个参数`{recursive: true}` 递归创建
- 读取文件夹： `readdir(文件路径, 回调函数)`
- 删除文件夹：  `rmdir(文件路径, 回调函数)`     可以传入第二个参数`{recursive: true}`递归删除
- 查看文件状态：   `stat(文件路径, 回调函数)`   

```js
const fs = require('fs')

// 参数：文件位置 编码方式（可选） 回调函数      readFileSync 同步版本
fs.readFile('./01.hello.js', 'utf8',function (err,res) {
  console.log(err);   //读取成功为null
  console.log(res);
})

// 参数：文件位置 写入内容 回调函数            writeFileSync 同步版本
fs.writeFile('./01.hello.js','11111',function (err) {
    //读取成功为null
    if (err !== null) {
      console.log(err); 
    } else {
      console.log('写入成功'); 
    }
})
```

此外需要注意的是相对路径是以命令行的当前路径为基准的，并不是代码书写的文件，所以可能会出现问题；我们可以使用 `__dirname` 获取到**当前文件所在目录的的绝对路径**，再拼接上文件名就可以避免文件操作失败。

```js
const fs = require('fs')

fs.readFile( __dirname + '/01.hello.js', 'utf8',function (err,res) {
  console.log(err);   //读取成功为null
  console.log(res);
})
```



## 工具模块

Node.js 模块库中有很多好用的模块。包括OS模块，path模块，net模块等等

下面简单介绍一下用于**处理文件路径的path模块的几个方法**。

- `path.resolve(绝对路径, 相对路径)`      路径拼接,使用此方法拼接路径而不要用 `+` 拼接 
- `path.basename(p)`     获取路径中的文件名
- `path.extname(p)`      获取路径中的文件后缀名



## Web模块

Node.js 提供了 http 模块，http 模块主要用于搭建 HTTP 服务端和客户端。

```js
// 一个最简单的服务端
const http = require('http')

const server = http.createServer()
server.on('request',(req,res)=>{
  // console.log(req);
  res.statusCode = 404
  res.statusMessage = 'not found'
  //设置响应头，解决中文乱码的问题
  res.setHeader('Content-type','text/html;charset=utf-8')
  res.write('我是返回内容') // json格式
  res.end(); // 结束返回
})

server.listen(8000,()=>{
  console.log('服务器已经启动，8000端口监听中...');
})
```



## 模块系统

Node.js 是依据**CommonJS规范**，提供了 `module.exports` 和 `require` 两个对象，其中 exports 是模块公开的接口，require 用于从外部获取一个模块的接口。

此外，现在也可以使用ES6模块化的导入导出了，但是需要先在package.json中添加一个字段 `"type": "module"` 才可。并且需要注意路径后缀也需要。

```js
//引入模块的时候会自动执行一次模块内部的代码
const hello = require('./01.hello')
//模块内部的变量和方法是有作用域的，只有暴露出去才能访问到
console.log(hello.first);
```


