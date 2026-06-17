---
title: MongoDB
---

## MongoDB 数据库

MongoDB是一个分布式文件存储的**非关系型数据库**。在非关系型数据库中属于较为热门的一个，其操作语法类似于js语法，适合于前端人员了解学习数据库操作。核心概念如下：

- 数据库（database） 数据库是一个数据仓库，数据库服务下可以创建很多数据库，数据库中可以存放很多集合。
- 集合（collection） 即数据库表，在集合中可以存储很多的文档。
- 文档（document）即数据表行，文档是最小存储单位，类似对象结构。

具体的学习文档可以参考 [菜鸟教程](https://www.runoob.com/mongodb/mongodb-tutorial.html)



### 连接

使用mongodb时，我们通常会借助 `mongoose` 库 简化数据库操作，下面是连接数据库：

```js
const mongoose = require('mongoose');
const { log } = require('@/utils/log');

async function connectDB() {
  // mongodb://user:password@127.0.0.1:27017/test  //存在账号密码时
  await mongoose.connect('mongodb://127.0.0.1:27017/myChat'); // 连接数据库
  log('mongodb 数据库连接成功', 'green');
}

connectDB().catch(() => {
  log('mongodb 数据库连接失败', 'red');
});

mongoose.connection.on('error', (err) => {
  console.log('数据库error:', err);
});

```



### 基础使用

1. 创建schema和model，相当于创建了一张表和对应的表字段格式

   ```js
   // db/bookModel.js
   const mongoose = require('mongoose');
   
   // 创建文档的结构对象 字段类型：String, Number, Boolean, Date, Buffer, ObjectId, Array ...
   let BookSchema = new mongoose.Schema({
     name: {
       type: String,
       required: true, // 设置为必填
       unique: true // 设置唯一,不可重复
     },
     author: {
       type: String,
       default: '匿名' // 设置默认值
     },
     price: Number,
     hot: Boolean,
     type: {
       type: String,
       enum: ['小说', '散文', '诗选', '随笔'], // 设置枚举类型
     }
   })
   
   // 创建模型对象(对文档操作的封装对象)   参数：1: 对应数据库集合的名称, 2: 结构对象
   const BookModel = mongoose.model('books', BookSchema)
   
   module.exports = BookModel
   ```

2. 在路由文件中对不同路由请求进行处理，过滤数据，调用 model 方法处理业务逻辑

   ```js
   // router/index.js  
   const express = require('express')
   const BookModel = require('../db/BookModel')
   
   const router = express.Router()
   
   router.get('/bookName', async (req, res) => {
     // 获取数据
     const books = await BookModel.find({name: req.query.name});
     if (!books) {
       return res.status(404).json({ error: 'book not found' });
     }
     res.json(books);
   })
   
   module.exports = router
   ```

3. 项目主文件导入数据库连接文件，文件自动执行连接数据库

   ```js
   // main.js
   require('@/mongodb/index'); // 连接数据库
   ```



### 常用命令

常用的命令行命令如下：

```shell
show dbs			# 查看当前服务下的所有数据库
use 数据库名		# 切换到指定数据库，不存在就创建一个
db					# 查看当前所在数据库
db.dropDatabase()	# 删除当前数据库

show collections					# 显示当前数据库的集合
db.createCollection('集合名称')			# 创建集合
db.集合名.drop()						# 删除某个集合
db.集合名.renameCollection('newname')		# 重命名集合
```

**注意:** *在 MongoDB 中，集合只有在内容插入后才会创建，就是说，创建集合(数据表)后要再插入一个文档(记录)，集合才会真正创建。*



### 增删改查

```bash
db.集合名.insertOne({name: 'andy', age: 18})		# 向集合插入一条文档
db.集合名.insertMany([])						# 向集合插入多条文档

db.集合名.deleteOne(查询条件对象)					# 删除集合中的匹配的第一条文档
db.集合名.deleteMany(查询条件对象, {$set: {age: 19} })	# 删除集合中的所有匹配的文档

db.集合名.updateOne(查询条件对象, {$set: {age: 19} })	# 更新集合中的匹配的第一条文档
db.集合名.updateMany(查询条件对象, {$set: {age: 19} })	# 更新集合中的所有匹配的文档
db.集合名.replaceOne(查询条件对象, 新文档)				# 将新文档替换掉查询到的第一个文档

db.集合名.find(查询条件对象, 过滤返回对象)				# 查询集合中的匹配的所有文档，并可指定返回的字段
db.集合名.findOne(查询条件对象, 过滤返回对象)			# 查询集合中的匹配的第一条文档
db.集合名.find().sort({ age: -1 });				# 查询并对返回结果排序 -1 降序 1升序
db.集合名.find().skip(5).limit(10);				# 查询然后跳过前面的条数返回指定条数 用于分页
```

比较操作符：

| `$eq`  | 等于             | `{ age: { $eq: 25 } }`            |
| ------ | ---------------- | --------------------------------- |
| `$ne`  | 不等于           | `{ age: { $ne: 25 } }`            |
| `$gt`  | 大于             | `{ age: { $gt: 25 } }`            |
| `$gte` | 大于等于         | `{ age: { $gte: 25 } }`           |
| `$lt`  | 小于             | `{ age: { $lt: 25 } }`            |
| `$lte` | 小于等于         | `{ age: { $lte: 25 } }`           |
| `$in`  | 在指定的数组中   | `{ age: { $in: [25, 30, 35] } }`  |
| `$nin` | 不在指定的数组中 | `{ age: { $nin: [25, 30, 35] } }` |

逻辑操作符：

| 操作符 | 描述                   | 示例                                                       |
| :----- | :--------------------- | :--------------------------------------------------------- |
| `$and` | 逻辑与                 | `{ $and: [ { age: { $gt: 25 } }, { city: "New York" } ] }` |
| `$or`  | 逻辑或                 | `{ $or: [ { age: { $lt: 25 } }, { city: "New York" } ] }`  |
| `$not` | 取反，不符合条件       | `{ age: { $not: { $gt: 25 } } }`                           |
| `$nor` | 逻辑或非，均不符合条件 | `{ $nor: [ { age: { $gt: 25 } }, { city: "New York" } ] }` |

元素操作符

| 操作符    | 描述             | 示例                         |
| :-------- | :--------------- | :--------------------------- |
| `$exists` | 字段是否存在     | `{ age: { $exists: true } }` |
| `$type`   | 字段的 BSON 类型 | `{ age: { $type: "int" } }`  |

数组操作符

| 操作符       | 描述                     | 示例                                                         |
| :----------- | :----------------------- | :----------------------------------------------------------- |
| `$all`       | 数组包含所有指定的元素   | `{ tags: { $all: ["red", "blue"] } }`                        |
| `$elemMatch` | 数组中的元素匹配指定条件 | `{ results: { $elemMatch: { score: { $gt: 80, $lt: 85 } } } }` |
| `$size`      | 数组的长度等于指定值     | `{ tags: { $size: 3 } }`                                     |

此外还支持正则表达式，例如

 `await BookModel.findOne({author: /吴/})` 

 `await BookModel.findOne({author: new Regexp('吴')})`



### 限制，跳过与排序

- `db.collection.find().limit(数量)`	limit方法限制返回的数量

- `db.collection.find().skip(数量)` 	skip方法跳过对应的数量，从指定数量后开始返回

- `db.collection.find().sort({ field1: 1 })` 	sort方法对返回结果进行排序， -1降序  1升序



### 索引

索引可以能够极大的提高查询的效率....



### 聚合

聚合(aggregate)主要用于处理数据(诸如统计平均值，求和等)，并返回计算后的数据结果...



### 引用

对于需要关联的数据库集合（表），经常会有需要某一个集合的文档字段中引用另一个集合中的文档；此时就需要使用DBRefs：

```shell
# $ref：集合名称     $id：引用的id    $db:数据库名称，可选参数
{ $ref : xxx, $id : xxx, $db : xxx }
```

