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

安装node，会自动安装npm。npm是node的包管理器，用于安装和管理node的模块；先使用`npm init -y` 初始化项目，会自动创建一个package.json文件，用于记录项目依赖的模块，npm下载的依赖包都会放到`node_modules`文件夹中，下面是一些常用的npm命令：

- npm init：初始化一个新的 npm 项目，创建 package.json 文件。
- npm install：安装 package.json 文件中指定的依赖包。
- npm install <package-name>：安装指定的包。
- npm install <package-name> --save：安装指定的包，并将其添加到 package.json 文件中的依赖列表中。
- npm install <package-name> --save-dev：安装指定的包，并将其添加到 package.json 文件中的开发依赖列表中。
- npm install -g <package-name>：全局安装指定的包。
- npm update <package-name>：更新指定的包。
- npm uninstall <package-name>：卸载指定的包。
- npm run <script-name>：执行 package.json 文件中定义的脚本命令。

关于package.json文件中相关的字段含义，部分字段解释如下：

- name：项目名称，必须是唯一的字符串，通常采用小写字母和连字符的组合。
- version：项目版本号，通常采用语义化版本号规范，即三段式版本号，一般是1.0.0 大版本号 次版本号 修订号。
- description：项目描述。
- main：项目的主入口文件路径，通常是一个 JavaScript 文件。
- dependencies：项目所依赖的包的列表，这些包会在项目运行时自动安装。
- devDependencies：项目开发过程中所需要的包的列表，这些包不会随项目一起发布，而是只在开发时使用。
- scripts：定义了一些脚本命令，比如启动项目、运行测试等，相关的执行脚本放在node_modules/.bin 或 直接在 node_modules 目录下。
- repository：项目代码仓库的信息，包括类型、网址等。
- bugs：项目的 bug 报告地址。
- homepage：项目的官方网站地址或者文档地址。

> 当我们全局安装了某个包后，我们就可以直接全局执行这个包的相关命令了，如果我们不想全局安装，可以直接使用 `npx <package-name> <command>` 来先在项目目录下载执行这个包然后再执行这个包  的相关命令。


此外， 就像window对象在浏览器中可以挂载全局变量一样，node.js中也有global对象，用于全局变量的存储和访问比较常见的有：`__filename`、`__dirname`、`process`等。

```js
// 注意  __dirname __filename 只能在cjs使用 esm规范没有这两个全局变量
console.log(__filename) // 当前文件的绝对路径
console.log(__dirname)  // 当前文件所在目录的绝对路径


// 如果想在ESM下使用这两个变量，需要手动转换
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
// import.meta.url  返回当前模块文件的绝对路径，格式为 file:// URL
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
console.log(__filename)
console.log(__dirname)

// 在node 20.11.0后加入了以下变量，可以直接获取
import.meta.filename
import.meta.dirname
```



## 模块系统

Node.js 早期仅支持CommonJS规范，提供了 `module.exports` 和 `require` 两个对象，其中 exports 是模块公开的接口，require 用于从外部获取一个模块的接口。

后续随着ES6模块化的 import导入 export导出 即ESM规范发布，Node也进行了跟进支持；但是需要先在package.json中添加一个字段 `"type": "module"` 才可。并且需要注意路径后缀也需要。

**CommonJS规范**

1. 导入： 使用`require`对象，支持导入node内置模块与下载的第三方模块，以及项目相对路径下的自定义模块。
2. 导出： 使用`module.exports`对象，将模块内部的变量和方法暴露出去。

```js
const fs = require('node:fs');  // 导入核心模块
const express = require('express');  // 导入 node_modules 目录下的模块
const myModule = require('./myModule.js');  // 导入相对路径下的模块

// 导出
module.exports = {
  hello: function() {
    console.log('Hello, world!');
  }
};
```

**ESM规范**

1. 导入： 使用`import`语句，且需要写在头部，动态导入需要使用`import()`函数。
2. 导出： 使用`export`语句，将模块内部的变量和方法暴露出去。

```js
import fs from 'node:fs' // 导入整个模块， 对应模块有默认导出
import { createServer } from 'http' // 只导入特定变量方法，对应模块有具名导出的同名变量或方法
import * as all from 'xxx.js' // 导入整个模块，如果对应模块是分开导出的，可以使用 * 整合所有的导出对象

export const a = 1 // 具名导出
export default myModule // 默认导出，只能有一个默认导出
```

**二者的差异**

1. Cjs是基于运行时的同步加载，esm是基于编译时的异步加载
2. Cjs是可以修改值的，esm值不可修改（可读的）
3. Cjs不可以tree shaking，esm支持tree shaking
4. commonjs中顶层的this指向这个模块本身，而ES6中顶层this指向undefined


## path模块

path模块是一个用于处理js文件路径的模块。下面简单介绍一下比较重要的方法使用：

```js
import path from 'node:path'

// 获取路径中的目录名(不包含文件名)
path.dirname('/aaaa/bbbb/cccc/index.html') // '/aaaa/bbbb/cccc'
// 获取路径中的文件名
path.basename('/aaaa/bbbb/cccc/index.html') // 'index.html'
// 获取路径中的文件后缀名
path.extname('/aaaa/bbbb/cccc/index.html') // '.html'
// 路径拼接 可以支持 .. ./ ../操作符
path.join('/aaaa/bbbb/cccc', 'index.html') // '/aaaa/bbbb/cccc/index.html'
// 用于将相对路径解析并且返回绝对路径
path.resolve(__dirname,'./index.js') // '/aaaa/bbbb/cccc/index.js'
```


## process对象

process对象是一个全局对象，用于获取当前进程的信息和控制进程的行为。他是挂载到globalThis下面的全局API，所以可以直接使用无需导入;下面简单介绍一下比较重要的属性和方法：

```js
process.arch // 获取当前进程的架构，例如 'x64' 或 'arm'
process.cwd() // 获取当前进程的工作目录
process.argv // 获取命令行参数数组，例如 node .\test.js --open --txt 就是可以拿到后面两个参数
process.exit() // 强制退出当前进程
process.kill(process.pid) // 强制杀掉当前进程可接受一个pid进程标识

process.env // 获取环境变量对象，例如 process.env.NODE_ENV 可以获取到当前环境变量的值
```

## 事件模型

Node.js 核心 API 都是采用异步事件驱动架构，即 发布订阅设计模式。 

```js
const EventEmitter = require('events');

const event = new EventEmitter()
//监听test
event.on('test',(data)=>{
    console.log(data)
})

event.emit('test','xmxmxmxmx') //派发事件
event.off('test') // 取消监听test事件
```

如果只想监听一次，使用`once`方法即可，如果想取消监听，使用`off`方法即可。



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

// 流式读取文件， 适合大文件读取
const readStream = fs.createReadStream('./index.txt',{
    encoding:"utf8"
})
readStream.on('data',(chunk)=>{
    console.log(chunk)
})
readStream.on('end',()=>{
    console.log('close')
})
```

## crypto模块

crypto模块的目的是为了提供通用的加密和哈希算法。

1. 对称加密: 使用相同的密钥（称为对称密钥）来进行加密和解密。

```js
const crypto = require('node:crypto');

// 生成一个随机的 16 字节的初始化向量 (IV)
const iv = Buffer.from(crypto.randomBytes(16));

// 生成一个随机的 32 字节的密钥
const key = crypto.randomBytes(32);

// 创建加密实例，使用 AES-256-CBC 算法，提供密钥和初始化向量
const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

// 对输入数据进行加密，并输出加密结果的十六进制表示
cipher.update("hello world",  "utf-8", "hex");
const result = cipher.final("hex");

// 解密
const de = crypto.createDecipheriv("aes-256-cbc", key, iv);
de.update(result, "hex");
const decrypted = de.final("utf-8");

console.log("Decrypted:", decrypted);
```

2. 非对称加密: 使用一对密钥（公钥和私钥）来进行加密和解密。发送者使用接收者的公钥进行加密，而接收者使用自己的私钥进行解密。

```js
const crypto = require('node:crypto')
// 生成 RSA 密钥对
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

// 要加密的数据
const text = 'hello world';

// 使用公钥进行加密
const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(text, 'utf-8'));

// 使用私钥进行解密
const decrypted = crypto.privateDecrypt(privateKey, encrypted);

console.log(decrypted.toString());
```

3. 哈希算法: 用于将数据转换为固定长度的字符串，无法解密，主要用于前后生成两次哈希值再对比校验数据的完整性。例如存储密码不能存储明文，只能存储哈希值，当用户登录时，需要将用户输入的密码进行哈希计算，与存储的哈希值进行对比，如果一致则登录成功。

```js
const crypto = require('node:crypto');

// 要计算哈希的数据
let text = '123456';

// 创建哈希对象，并使用 MD5 算法
const hash = crypto.createHash('md5');

// 更新哈希对象的数据
hash.update(text);

// 计算哈希值，并以十六进制字符串形式输出
const hashValue = hash.digest('hex');

console.log('Text:', text);
console.log('Hash:', hashValue);
```



## http模块

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




