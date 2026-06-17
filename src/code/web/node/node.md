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



## Express框架

Express 是一个简洁而灵活的 node.js Web应用框架, 提供了一系列强大特性帮助你创建各种 Web 应用，和丰富的 HTTP 工具。

使用时需要安装：`npm install express --save`



### 请求参数获取

```js
const express = require('express')
const app = express()

//get请求,获取query参数与响应
app.get('/info?id=xxx',(req,res)=>{
  console.log(req.query);
  // console.log(req.path);
  // console.log(req.ip);
  res.send({
    name:'za',
    age: 18
  })
})

//get请求,动态获取params参数与响应
app.get('/user/:id',(req,res)=>{
  console.log(req.params);
  // express 设置响应
  res.status(200)
  res.set('aaa', 'bbb')
  
  res.send({
    name:'za',
    age: 18
  })
})

// post请求，获取请求体
app.use(express.json()) // 解析application/json格式请求体
app.use(express.urlencoded({ extended: false })) // 解析urlencoded格式请求体
app.post('/user',(req,res)=>{
  console.log(req.body);
  res.send('post请求成功')
})


app.listen(8000,()=>{
  console.log('express服务器启动，8000端口监听中...');
})
```



### 设置响应内容

```js
app.get('/user',(req,res)=>{
  // express 设置响应, 支持链式调用
  res.status(200)
  res.set('aaa', 'bbb') // 响应头
  // res.redirect('http://baidu.com') // 跳转响应 重定向 302
  // res.download(path.resolve(__dirname, './package.json')) // 下载响应
  // res.sendFile(path.resolve(__dirname, './package.json')) // 响应文件内容
  
  res.json({name:'za',age: 18}) // 响应json内容
})
```



### 跨域处理

因为浏览器同源政策的限制，跨域情况可能存在，我们可以借助cors库实现跨域相关的配置。

```js
// yarn add cors
const express = require('express')
const cros = require('cors')

const app = express()
const port = 3000

// 配置跨域设置 默认允许所有跨域请求
app.use(cros())
```

当然express原生也支持通过全局中间件配置，不过细致处理较为复杂

```js
const express = require('express')
const app = express()

// 全局路由中间件，配置跨域校验
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', '*')
    next()
})
```





### 托管静态资源

使用 `express.static()` 方法可以托管静态资源，让请求直接访问获取相应资源, 如果静态资源中存在index.html,则在请求 `/` 默认路径时会自动匹配这个index页面

```js
const express = require('express')
const app = express()

//express.static方法托管静态资源（访问路径不需要带有./public）
app.use(express.static('./publicA'))

//挂载路径前缀，（访问路径需要带有/public）
app.use('/public',express.static('./publicB'))

app.listen(8000,()=>{
  console.log('express服务器已启动，8000端口监听中。。。');
})
```



### 模块化路由

事实上我们不应该将所有的路由都直接挂载到全局的app实例上。我们应该创建模块化路由再统一挂载。

```js
const express = require('express')

//创建路由对象
const router = express.Router()

//挂载具体的路由
router.get('/user/list',(req,res)=>{
  res.send('路由get请求')
})
router.post('/user/add',(req,res)=>{
  res.send('路由post请求')
})

//向外导出路由对象
module.exports = router
```

```js
const express = require('express')
const app = express()

//导入模块路由
const router = require('./09.express模块化路由')
//直接注册路由
// app.use(router)

//注册路由，添加路由前缀，访问路径需要带有/api
app.use('/api',router)

app.listen(8000,()=>{
  console.log('express服务器启动，8000端口监听中...');
})
```



### 中间件

中间件函数是可以访问请求对象 `（req）`，响应对象`（res）`以及应用程序的请求 - 响应周期中的下一个中间件函数的函数。中间件可以分为下面五种：

- **应用程序级中间件**
- **路由器级中间件**
- **错误处理中间件**
- **内置中间件**
- **第三方中间件**

```js
const express = require('express')
const app = express()
const router = express.Router()

//创建一个中间件函数
const mw =(req,res,next)=>{
  let time = Date.now()
  //上游中间件添加数据给下游使用
  req.startTime = time;
  console.log('中间件函数会有next函数进行放行');
  next();
}

//1应用级别的中间件（包括全局和局部中间件），中间件绑定到了app实例上
/* app.use((req,res,next)=>{
  console.log('应用级别的中间件');
  console.log('中间件函数会有next函数进行放行');
  next();
}) */

//2路由级别的中间件，中间件绑定到了router实例上
// 对于只针对单个路由的中间件，可以作为路由的第二个参数传递
/* router.use((req,res,next)=>{
  console.log('路由级别的中间件');
  next();
}) */
/* app.get('/home', myMiddleware, (req, res) => {
    // ...
}) */

//3错误级别的中间件,用于捕获项目错误
/* app.use((err,req,res,next)=>{
  console.log(err.message);
  res.send('错误级别的中间件,用于捕获项目错误')
}) */

//4内置的中间件
//express.static()中间件托管静态资源
// app.use(express.static('./public'))

//express.json()中间件解析post请求的json数据   application/json
// app.use(express.json())

//express.urlencoded()中间件解析post请求的键队数据   application/x-www-form-urlencoded
// app.use(express.urlencoded({extended: false}))


//5  第三方中间件
const parser = require('body-parser')
app.use(parser.urlencoded({extended: false}))


app.listen(8000,()=>{
  console.log('express服务器启动，8000端口监听中...');
})
```



### 文件上传与处理

1. 对于页面提交文件，需要构建FormData对象，将文件放在这个里面，提交时将FormData实例放到请求体里即可。

2. 后台处理文件，可以借助 `formidable` 这个第三方库：

   ```js
   // yarn add formidable   下载包
   const express = require('express')
   const { formidable } = require('formidable')
   const path = require('path')
   
   const router = express.Router()
   
   router.post('/file', (req, res, next) => {
     console.log(req.body)
     // 创建表单解析对象
     const form = formidable({
       uploadDir: path.resolve(__dirname, '../img'), // 设置保存目录
       keepExtensions: true, // 保留文件后缀
     }); 
   
     // 解析客户端传递过来的请求体
     form.parse(req, (err, fields, files) => {
       if (err) {
         next(err);
         return;
       }
   
       // 记录保存的文件路径，返回前端
       let url = '/img/' + files.file[0].newFilename
       res.json({ url });
     });
   })
   ```

   



### 连接数据库

express还可以用来连接数据库。

先安装一个mySql数据库： `npm install mysql`

```js
//导入mysql模块
const mysql = require('mysql')
//与数据库建立连接关系
const db = mysql.createPool({
  host: '127.0.0.1',      //数据库的ip地址
  user: 'root',
  password: 'admin123',
  database: 'my_db_01'    //指定要操作的数据库
})

//查询数据库数据,查询语句返回的是数组
db.query('select * from users',(err,res)=>{
  if (err !== null) {
    console.log(err.message);
  } else {
    console.log(res);
  }
})

//向数据库中插入数据
let user = {username: 'spiderman', password: '666666'}
//定义一条sql语句，?占位
let sqlStr = 'insert into users (username,password) values (?,?)'

db.query(sqlStr, [user.username,user.password], (err,res)=>{
  if (err !== null) {
    console.log(err.message);
  } 
  if (res.affectedRows === 1) {
    console.log('插入数据成功');
  }
})
//快捷插入数据（数据对象的每个属性与数据表一一对应）
let user = {username: 'spiderman-2', password: '888888'}
let sqlStr = 'insert into users set ?'
db.query(sqlStr, user, (err,res)=>{
  if (err !== null) {
    console.log(err.message);
  } 
  if (res.affectedRows === 1) {
    console.log('插入数据成功');
  }
})

//更新数据
let user = {id: 6, username: 'aaa', password: '789789'}
let sqlStr = 'update users set username=?, password=? where id=?'
db.query(sqlStr, [user.username, user.password, user.id], (err,res)=>{
  if (err !== null) {
    console.log(err.message);
  } 
  if (res.affectedRows === 1) {
    console.log('更新数据成功');
  }
})

//删除数据
let sqlStr = 'delete from users where id=?'
db.query(sqlStr, 6, (err,res)=>{
  if (err !== null) {
    console.log(err.message);
  } 
  if (res.affectedRows === 1) {
    console.log('删除数据成功');
  }
})
```



### 身份认证

目前常用的身份认证方式包括**cookie认证**， **session认证** 和 **token认证** 三种。



**Cookie**

cookie是服务端发送给客户端并保存在客户端的一小段数据，cookie的特点就是当浏览器向服务端发送请求时，会自动在请求头中设置当前域名下的可用cookie，然后传递给服务器。

特点：

- 用户信息明文存储在客户端，不安全
- cookie每次请求都会携带，当体积过大时会影响传输效率
- 浏览器限制单个cookie不能超过4k，单域名存储数量也有限制
- 简单方便，客户端全程不用操作

```js
router.get('/', async (req, res) => {
  // 设置cookie和失效时间,不设置失效时间时会在浏览器关闭时自动清除
  res.cookie('name', 'zhangsan', { maxAge: 1000 * 60 * 60 * 24 * 7 })
  res.cookie('age', 18, { maxAge: 1000 * 60 * 60 * 24 * 1 })
    
  // 后台主动清除cookie
  // res.clearCookie('key')
    
  // 原生 获取请求中携带的cookie   name=zhangsan; age=18
  // console.log(req.headers.cookie)
  res.sendFile(path.resolve(__dirname, '../static/home.html'));
})
```

在原生中获取cookie需要在请求头中拿到，并且获取的是一个分号空格分隔的字符串，还需要额外处理，此时我们就可以借助 `cookie-parser` 库来获取:  `yarn add cookie-parser`

```js
// index.js
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser()) // 使用cookieParser中间件

app.get('/me', async (req, res) => {
  // 使用cookie-parser获取请求中携带的cookie   {name: 'zhangsan', age: '18'}
  // console.log(req.cookies)
  res.sendFile(path.resolve(__dirname, '../static/home.html'));
})

```



**Session**

Session是存放在服务器端的数据，用以记录当前访问用户的部分信息。当用户登录时，服务器会将用户信息存储到session池中并生成一个唯一的session_id，然后可以通过cookie的方式将这个id返回给客户端，这样每次请求时都能通过这个session_id到session池中拿到用户信息。

由于用户信息是存储在服务端的，所以相对于cookie直接存储用户信息来说更加的安全；但若是Session没有持久化落地存储，一旦服务器重启，Session数据就会丢失。（可以借助 `connect-mongo` 库实现session存储到mogo数据库。）

特点：

- 用户信息存储在服务端，相对安全
- 只通过cookie传递session_id，不会影响传输效率
- 相对复杂，持久化存储还要操作数据库，加重数据库负载

```js
const express = require('express')
const app = express()
// const mongoStore = require('connect-mongo')

//配置session中间件,需要下载安装
const session = require('express-session')
app.use(
  session({
    name: 'sid', // 设置cookie的name
    secret: 'hello', // 加密密钥
    resave: true, // 是否在每次请求时重新保存session，即重置过期时间
    saveUninitialized: false, // 是否为每次请求都设置一个cookie存储session_id
    // store: mongoStore.create({
    //     mongoUrl: 'mongodb://127.0.0.1:27017/session'
    // }),
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60, // 控制cookie存储的session_id 失效时间
    }
  })
)

app.use(express.urlencoded({extended:false}))

//登录，使用session中间件存储用户信息
app.post('/user/login',(req,res)=>{
  if (req.body.username !== 'admin' || req.body.password !== '111111') {
    return res.send({status: 1, msg: '登录失败'})
  }

  // 存储用户信息到session中，中间件自动设置了一条sid的cookie返回给客户端
  req.session.user = req.body;
  req.session.islogin = true;

  res.send({status: 0, msg: '登录成功'})
})

//获取用户名的接口
app.get('/user/username',(req,res)=>{
  // 中间件已经自动实现读取cookie中的sid并获取对应存储的session信息添加到req.session中
  if (!req.session.islogin) {
    return res.send({status: 1, msg: '没有登录'})
  }
  res.send({status: 0, msg: 'success', username: req.session.user.username})
})

//退出登录
app.post('/user/logout',(req,res)=>{
  //清空session信息
  req.session.destroy()
  res.send({status: 0, msg: '退出成功'})
})

app.listen(8000,()=>{
  console.log('express服务器启动，8000端口监听中...');
})
```



**Token**

Token是服务端生成的，返回给客户端的一串加密字符串，里面存储着用户信息。用户登录时用特定密钥将用户信息加密成token字符串返回给客户端，客户端请求时携带token。服务端再次拿到时使用密钥解密获取用户信息。

特点：

- 客户端只能拿到加密字符串，而密钥在服务端，更加安全
- 可以避免CSRF（跨站请求伪造）

我们可以通过 `jsonwebtoken` 库实现token相关操作。

```js
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({extended:false}))

//定义一个secret密钥
const secretKey = 'hello'

//登录，使用存储用户信息,不需要权限
app.post('/api/login',(req,res)=>{
  let userinfo = req.body;
  if (userinfo.username !== 'admin' || userinfo.password !== '111111') {
    return res.send({status: 400, msg: '登录失败'})
  }
  //生成token  三个参数  加密的信息对象，加密的密钥，配置对象（过期时间单位 秒）
  let tokenStr = jwt.sign({username:userinfo.username},secretKey,{expiresIn: 60})
  res.send({code: 200, msg: '登录成功',token:tokenStr})
})

//使用全局错误处理中间件，捕获token过期错误
app.use((err,req,res,next)=>{
  if (err.name === 'UnauthorizedError') {
    res.send({
      code:401,
      msg: '无效的token'
    })
  } else {
    res.send({
      code:500,
      msg: '未知错误'
    })
  }
})

//获取用户名。需要权限,请求头里的token需要解密
app.get('/user/username',(req,res)=>{
  // 解密token
  let data = jwt.verify(req.headers.token, secretKey)
  res.send({status: 200, msg: 'success', username: data.username})
})

app.listen(8000,()=>{
  console.log('express服务器启动，8000端口监听中...');
})
```



