---
title: MySQL
---

## SQL简介

本文学习参考 [网上博客](https://blog.csdn.net/shanguicsdn000/article/details/142332546)  与  [在线视频](https://www.bilibili.com/video/BV1Cm421373b)

SQL是用来操作数据库的语言，可以分为多个部分：

- 数据操作语言 (DML) ：主要是操作库和表相关的指令
- 数据定义语言 (DDL) ：主要是关于数据的插入，删除和更新操作，不会影响表结构。
- 数据查询语言 (DQL) ：主要是关于数据的查询，不会影响表数据和表结构。

下面学习的这些语法主要是针对mysql数据库操作，与标准sql语句可能有一定差异。



## 库相关

create database 用于创建数据库。

```sql
create database 数据库名
create database if not exists 数据库名			# 不存在再创建库
create database 数据库名 character set 字符集		# 指定字符集
create database 数据库名 collate 排序规则			# 指定排序规则

show variables like 'character_set_database'	# 查看字符集
show variables like 'collation_database'	# 查看排序规则
```

此外还有一些库和表的命令

```sql
show databases						# 查看所有库
select database()						# 查看当前库
show tables from 数据库名				# 查看库下所有表
use 数据库名							# 切换库

drop database 数据库名				# 删除库
drop database if exists 数据库名	# 存在再删除库
```





## 表相关

CREATE TABLE 语句用于创建数据库中的表。

```sql
create table [if not exists] 表名(  
列名称1 数据类型 [列可选约束],
列名称2 数据类型 [列可选约束] [comment '列可选注释'],
列名称3 数据类型 [列可选约束] [comment '列可选注释'],
....  
) [表可选约束] [comment '表可选注释'];
```

数据类型（data_type）规定了列可容纳何种数据类型。下面的表格包含了标准SQL中最常用的数据类型：

| 数据类型 | 描述 |
| :------: | :-----------: |
| int,smallint,bigint | 仅容纳整数，使用 unsigned 后置关键字转为无符号值（从0开始计数） |
| decimal(size,d) | 容纳带有小数的数字、“size” 规定数字的最大位数、“d” 规定小数最大位数 |
| char(size) | 容纳固定长度的字符串,存储时达不到会补充空格，mysql展示时自动去除空格、在括号中规定字符串的长度 0 <= size <= 255 |
| varchar(size) | 容纳可变长度的字符串、在括号中规定字符串的最大长度，size最大16383，超大文本可以使用 text 类型，但性能较差，建议直接存成文件，数据库存文件地址 |
| year,date，datetime | 容纳日期，一种特殊的字符串类型 year建议4位制，  date 格式为 yyyy-mm-dd，datetime格式为yyyy-mm-dd hh:mm:ss |

datetime 时间类型我们可以添加约束插入时默认填充当前时间，更新时自动修改当前时间：

```sql
create table if not exists 表名(
name varchar(100),
operate_time datetime default current_timestamp on update current_timestamp,	# 插入与更新
insert_time datetime default current_timestamp,	# 插入
)
```



此外还有一些操作表与字段的命令：

```sql
# （在指定字段之前或之后）新增表字段
alter table 表名 add 字段名 字段类型 [first|after 字段名]
# 修改表字段名与类型，也可修改到指定字段之前或之后位置
alter table 表名 change 原字段名 新字段名 新字段类型 [first|after 字段名]
# 修改表字段类型
alter table 表名 modify 字段名 新字段类型 [first|after 字段名]
# 删除字段
alter table 表名 drop 字段名

# 修改表名
alter table 表名 rename 新表名
# 查看表结构
desc 表名
# 删除表
drop table [if exists] 表1 [, 表2, ...]
# 清空表数据
truncate table 表名
```







## 插入

insert into 语句用于向表格中插入新的行。

```sql
insert into 表名 values (值1, 值2,....);
# 指定所要插入数据的列
insert into 表名 (列1, 列2,...) values (值1, 值2,....);
# 同时插入多条记录
insert into 表名 (列1, 列2) values (值1, 值2),(值3, 值4)....;
```





## 删除

delete 语句用于删除表中的行。

直接执行 `DELETE FROM 表名称` 不拼接 where 子句是清除所有行，但表字段名称和类型不受影响。

```sql
delete from 表名 [where xxx]
```



DROP TABLE 语句用于删除表（表的结构、属性以及索引也会被删除）。

```sql
DROP TABLE 表名称;
```





## 更新

update 语句用于修改表中的数据。

```sql
update 表名 set 字段名 = 新值				# 修改表中所有行的指定字段
update 表名 set 字段名 = 新值 [where xxx]		# 指定条件修改
```





## 查询

select 语句用于从表中选取数据，结果被存储在一个虚拟表中（称为结果集）。

```sql
select * from 表名;			# 查询所有列 星号（*）是选取所有列
select 列1,列2 from 表名;		# 指定查询列

# 查询并给列起别名，as可以省略，别名会作用到结果集中展示，希望别名区分大小写可以给别名加双引号
select 列1 as 别名1,列2 as 别名2 from 表名;

# 查询并补充常数列,会在查询结果中增加一列固定值, 常数需要用引号，否则会被识别为表字段
select *, 'anhui' as city from 表名;

# 指定表与列，多表查询时适用
select 表1.列1,表1.列2 from 表1;

# 在 select 时我们可以使用算数运算符直接对数值列进行计算
# 可使用的运算符 + - * / %（取模） DIV（整除）
select 列1 * 3 as 别名1,列2 / 2 as 别名2 from 表名;
```

**过滤重复数据 distinct**

如果一张表中有多行重复数据，需要去重显示，可以使用 **distinct** 。

```sql
select distinct 列1[,列2...] from 表名;  
```

**条件过滤 where**

需要从表中选取指定的数据，可将 WHERE 子句添加到 SELECT 语句。

```sql
SELECT 列名称 FROM 表名称 WHERE 列 运算符 值; 
```

下面的运算符可在 WHERE 子句中使用：（当一方为数值时另一方自动转为数字比较）

| **操作符** |   **描述**   |
| :--------: | :----------: |
|     =      |     等于     |
|     <>     |    不等于    |
|     >      |     大于     |
|     <      |     小于     |
|     >=     |   大于等于   |
|     <=     |   小于等于   |
|    IS NULL    | NULL值测试 |
|    IS NOT NULL    | NOT NULL值测试 |
|  BETWEEN...AND...   | 在某个范围内 |
|  NOT BETWEEN...AND...   | 不在某个范围内 |
|  IN()   | 是否在一组值中 |
| NOT IN()   | 是否不在一组值中 |
| LIKE   | 模糊匹配 |
| NOT LIKE   | 反向模糊匹配 |

**LIKE  查找类似值**

like 操作符用于在 WHERE 子句中搜索列中的指定模式，支持 NOT 关键字反向查询。

```sql
SELECT 列名/(*) FROM 表名称 WHERE 列名称 LIKE 值;  
```

使用 “%” 用于定义通配符，匹配0到多个模糊字符， 用 "_" 匹配一个模糊字符

```sql
SELECT * FROM Persons WHERE City LIKE 'N%'		# 查询以N开头的City
SELECT * FROM Persons WHERE City LIKE '%g'		# 查询以g结尾的City
SELECT * FROM Persons WHERE City LIKE '%on%'	# 查询含有on的City
SELECT * FROM Persons WHERE City NOT LIKE '%on%'	# NOT关键字反向查询
```

**逻辑运算符**

使用逻辑运算符可以组合判断一条或多条where语句：

AND（&&）逻辑且        NOT（!）否定          OR（||）逻辑或       XOR  逻辑异或





## 函数

SQL 拥有很多可用于计数和计算的内建函数。 大致可分为单行函数和多行函数：

- 单行函数仅处理一行，输出单一值
- 多行函数聚合处理多行，输出单一值



**单行函数(常用)**

`ABS(x)`    `CEIL(x)`      `FLOOR(x)`

`ROUND(x,y)` ---- 对x四舍五入，并保留y位小数

`CHAR_LENGTH(s)`     `CONCAT(s1,s2....)`     

`SUBSTR(s,index,len)` ---- 从字符串s的index位置取len个字符

`FIND_IN_SET(s1,s2)` ---- s1在字符串s2出现的位置，s2是个以逗号分隔的字符串

`YEAR(date)`	`MONTH(date)`	`DAY(date)`	`DAYOFWEEK(date)`

`CURDATE()`  ----  当前日期，年月日

`CURTIME()`  ----  当前时间，时分秒

`NOW()` ---- 当前系统日期和时间

`DATEDIFF(date1,date2)` ----  返回date1 - date2 的间隔天数

`DATE_FORMAT(NOW(), '%Y年%m月%d日')` ---- 将标准日期格式转为特定日期格式

`TIME_FORMAT(NOW(), '%H : %i : %s')` ---- 将标准时间格式转为特定时间格式

`STR_TO_DATE('2024年04月20日', '%Y年%m月%d日')` ---- 将特定日期格式的字符串转为标准日期格式

`IF(condition, true_value, false_value)` ---- 条件函数 condition 成立返回第一个值，否则返回第二个值

`IFNULL(column, null_value)` ---- 当指定列column值为null，返回对应的值

```sql
# case 流程函数 写法1
case
	when condition1 then res1
	when condition2 then res2
	else default_res
end[ as 别名]

# case 流程函数 写法2
case 表达式/列名
	when value1 then res1
	when value2 then res2
	else default_res
end[ as 别名]
```



**多行函数(常用)**

`AVG(列名)`	`SUM(列名)`	`MIN(列名)`	`MAX(列名)`

`COUNT(列名/*/1)` ---- 计算某一列或行的记录数





## 高级查询

**分组查询**

即先将数据行，按照某一或多特性列进行分组，最后查询每组的特性。

分组查询的结果只能是分组特性列或聚合函数。

```sql
select 分组列,分组列,聚合函数
from table
[where 分组前条件]
[group by 分组列,分组列... having 分组后条件]

# 先筛选工资大于5000的，然后按性别分组查询不同性别数量和对应平均薪资
select gender, count(*), avg(salary) from tb_user where salary > 5000 group by gender
# 按性别分组后筛选平均薪资大于10000的组，查询对应组的性别和人数
select gender, count(*) from tb_user group by gender having avg(salary) > 10000
```

**排序**

ORDER BY 语句用于根据指定的列对结果集进行排序，默认按照 ASC 升序进行排序，如果希望按照降序对记录进行排序，可以使用 DESC 关键字。

```sql
select 列,列,函数
from table
[where 条件]
[order by 排序列 asc/desc,排序列 asc/desc ...]
```

**汇总**

with rollup 查询子句用于生成数据汇总行

```sql
select ifnull(note, '总量'), sum(num) from books group by note with rollup
```

**数据切割（分页查询）**

limit 语句用于指定需要返回的结果集条数（放在语句最后），offset语句用于指定跳过对应数量的条数，从对应数量之后开始返回，常用这两个语句搭配使用实现分页。

```sql
select 列,列,函数
from table
[where 条件]
limit 返回行数 offset 跳过行数

# 简化写法
select * from table limit 跳过行数, 返回行数
```





## 约束

约束属于表级别的规定，是对数据的限制语法，确保数据的准确可靠性。约束可以分为三类:

1. **域（列）约束**：只对当前列值有效

   

   - **非空约束**  `not null`  列非空约束，空字符串和 0 不算null

   ```sql
   # 建表时加
   create table 表名(
   	字段名 数据类型,
       字段名 数据类型 not null,
   )
   # 建表后改
   alter table 表名 modify 字段名 数据类型 not null
   # 删除非空约束 不加默认允许为null
   alter table 表名 modify 字段名 数据类型 [null]
   ```

   - **默认值约束**  `default`  某列默认值，不能添加到唯一或主键

   ```sql
   # 建表时加
   create table 表名(
   	字段名 数据类型 default 默认值,
       字段名 数据类型 not null default 默认值,
   )
   # 建表后改
   alter table 表名 modify 字段名 数据类型 default 默认值 [其他约束]
   # 删除默认值约束
   alter table 表名 modify 字段名 数据类型 [其他约束]
   ```

   - **检查约束**  `check`  检查某列值，但一般不建议在数据库检查，而应该在代码层面检查

   ```sql
   # 建表时加,属于表级别
   create table 表名(
   	字段名 数据类型,
       check(表达式),
   )
   # 建表后改，约束名不能重复
   alter table 表名 add constraint 约束名 check(表达式)
   # 删除
   alter table 表名 drop constraint 约束名
   ```
   
   
   
2. **实体（行）约束**：需要对比同一表中其他行数据

   - **主键约束**  `primary key`  主键唯一且不为空约束

     *每个表只能有一个主键，但主键可以有单个列或多个列构成（复合主键），主键可以优化查询效率*

   ```sql
   # 建表时加
   create table 表名(
   	字段名 数据类型 primary key,
       字段名1 数据类型,
       [constraint 约束名] primary key(字段名1, 字段名2...)
   )
   # 建表后改，字段列表可以是一个，也可以是多个
   alter table 表名 add primary key(字段列表)
   # 删除
   alter table 表名 drop primary key
   ```

   - **唯一约束**  `unique`  限制某一列值表中唯一性，但是可以为空

   ```sql
   # 建表时加
   create table 表名(
   	字段名1 数据类型 unique,
       字段名2 数据类型 unique key,
       [constraint 约束名] unique key(字段名1,字段名2...)
   )
   # 建表后改，约束名不能重复
   alter table 表名 add constraint 约束名 unique(列1,列2...)
   # 删除
   alter table 表名 drop constraint 约束名
   ```

   - **自增长约束**  `auto_increment`  数值类型字段插入数据自增长约束

     自增长约束只能添加到整数类型的主键约束列或唯一约束列，且一张表只能有一个，且维护一个最大值自增长

   ```sql
   # 建表时加
   create table 表名(
   	字段名 数据类型 primary key auto_increment,
       # 字段名 数据类型 unique key auto_increment,
   )
   # 建表后改
   alter table 表名 modify 字段名 数据类型 auto_increment
   # 删除
   alter table 表名 modify 字段名 数据类型
   ```

   

3. **引用（多表）约束**：需要对比其他表中的列数据
   
   - **参照（外键）约束**  `foreign key`  限制表中某一列，正确引用其他表中的数据值
   
     外键：引用或参照其他表主键列值的列，即为外键，外键的值范围应当对应引用的主键值范围。一个表可以有多个外键。
   
   ```sql
   # 建表时加
   create table 子表(
   	字段1 数据类型 primary key,
       外键名 数据类型(与主键保持一致),
       [constraint 外键约束名称] foreign key (外键名) references 主表名(主键名) [on update xx][on delete xx]
   )
   # 建表后改
   alter table 子表名 add [constraint 外键约束名称] foreign key (子表字段) references 主表名(主键) [on update xx][on delete xx]
   # 删除
   # alter table 表名 drop foreign key 外键约束名
   alter table 从表名 drop index 索引名
   ```
   
   ​	当主键对应列有对应操作时，外键存在update和delete的约束，即外键语句的最后部分，有如下等级：
   
   ​	`cascade`  父表 update/delete 记录时，同步操作子表匹配记录
   
   ​	`set null`  父表 update/delete 记录时，将子表匹配的记录列设为null，但注意子表外键列不能有not null 约束
   
   ​	`no action`  只要子表有对应匹配记录，不允许父表执行对应列的 update/delete 操作
   
   ​	`restrict`  默认值，同 no action
   
   ​	`set default`  父表有变更时，将子表外键列设为一个默认值，但 Innodb 不能识别

> 最好是采用 `on update cascade on delete restrict` 的方式





## 多表查询

多表之间通过 **主外键** 建立联系。多表之间可分类为一对一，一对多，多对多（需中间表建立联系）

- 一对一：主要应用于一张表中有冷热数据，冷数据不常用如果每次查询都一并查出可能会增加负担，拆分后只在需要时再关联查询提升查询性能；一对一需要子表外键唯一（子表外键增加唯一约束 或 子表主外键共用一个字段）。
- 一对多：主要应用于一个实体对应多个子元素；一对多只需要正常创建主子表并添加外键约束即可。
- 多对多：主要应用于双方数据可以互相对应；多对多需要创建中间表（包含两个外键，关联多表）建立数据之间的关联。



**合并结果集语法（垂直合并）**

只要求合并的结果集之间列数和对应列类型相同即可，不要求有主外键；

> 重复数据认定：只有一行中的所有列值都相同，才被认为是重复行。

```sql
# 去重复合并，最上面的会作为结果集列名
select 列名 from 表A  
union  
select 列名 from 表B;

# 不去重复合并
select 列名 from 表A  
union all
select 列名 from 表B;
```

**连接查询语法（水平合并）**

要求两个表必须有主外键关系，用以判断主外键相等。可以简单分为下面几种：

- 内连接： 两个表主外键相等才可查询返回。多表字段可能相等，可以使用 `表名.列名` 形式，或给表名起别名。

  *本质上就是将两张表数据互相拼接一遍（笛卡尔积），所以需要主外键相等过滤掉错误数据。*

  ```sql
  select * from 表1 [inner] join 表2 on 表1.主键 = 表2.外键     # 标准语法
  
  # 有其他的筛选条件，继续用where
  select a.name,a.age,b.country from table_a as a
  	inner join table_b as b on a.aid = b.bid where xxx;
  # 3+表连接查询
  select a.name,a.age,b.country,c.city from table_a as a
  	inner join table_b as b on a.aid = b.bid
  	inner join table_c as c on a.aid = c.cid
  ```

- 外连接：外连接于内连接不同的就是外连接除了返回主外键相等的行，还会返回未匹配的行。

  *外连接可以通过左或右指定一个逻辑主表，逻辑主表数据一定会查询到*

  ```sql
  select * from 表1 left|right [outer] join 表2 on 表1.主键 = 表2.外键     # 标准语法
  
  # 有其他的筛选条件，继续用where
  select a.name,b.country from table_a as a left outer join table_b on a.aid = b.bid where xxx;
  ```

- 自连接：一张表中就存在数据引用情况，要查询的数据关联在同一表的其他行。查询实现上就是将一张表起别名当成两张表进行关联。

  ```sql
  select a1.aid,a1.name,a2.aid,a2.name from table_a as a1
  	inner join table_a as a2 on a1.custid = a2.aid where xxx;
  ```

**子查询语法（嵌套查询）**

子查询就是在一个sql语句中嵌套另一个完整的select语句。

- 标量子查询：返回结果是单行单列，单个值，常用于条件判断
- 行子子查询：返回结果是单行多列，常用于插入数据的值，或整体对比
- 列子子查询：返回结果是多行单列，常用于条件对比，需配合 in  any  all 等关键字使用
- 表子子查询：返回结果是多行多列，不能用于条件，一般用于查询虚拟的中间表

```sql
# 标量子查询示例 查询大于平均值的所有成员
select * from t_score where score > (select avg(score) from t_score)

# 行子子查询示例  查询与张三性别和年龄相等的所有成员
select * from t_test where (gender, age) in (select gender, age from t_test where name = '张三')

# 列子子查询示例  查询与张三和李四同一年龄的成员的姓名和电话
select * from t_test where age in (select age from t_test where name in ('张三', '李四'))

# 表子子查询示例 查询所有部门的部门编号，部门名称和部门平均薪资
# 部门编号，部门名称在部门表，部门平均薪资用员工表通过分组查询得到，二者要通过外连接合并才能得到结果集
select b.bid b.name,temp.avs from t_bumen as b left join
	(select bid, avg(salary) as avs from t_user group by bid) as temp
	on b.bid = temp.bid
```





## 其他

### 数据库事务

数据库事务是一套操作数据命令的有序集合，一个不可分割的工作单位。事务中的单个命令不会立刻改变数据，而是当内部全部命令都执行成功后再统一更新数据；任一命令失败则进行状态回滚。

数据库事务 ACID 特性：

- 原子性 Automicity：指事务是一个不可分割的工作单位，事务操作要么都发生，要么都不发生。
- 一致性 Consistency：事务内部的操作的状态前后一致，成功都成功，失败都失败。
- 隔离性 Lsolation：一个事务的执行不能被其他事务干扰。
- 持久性 Durability：一个事务一旦被提交，那么对数据库中的数据改变就是永久性的。



*只要一个业务操作涉及到多条更新语句，都应该开启事务*

mysql默认自动提交事务。即单条语句执行成功后触发commit更新数据，执行失败触发rollback回滚数据。

```sql
# 关闭自动提交事务, 关闭后所有的sql都需要手动commit才生效
set autocommit = false 或 set autocommit = 0
# 查看是否自动提交
show variables like 'autocommit'
```

我们可以用 `start transaction` 主动开启一个独立事务：

```sql
start transaction; # 开启独立事务
# 多个sql命令
commit; # 最终提交 或 rollback 回滚
```

> 注意 DDL 如创建库/表，删除库/表，修改库/表 等操作不支持事务。



事务的隔离级别：

- `read-uncommitted`    有脏读情况，不能使用
- `read-committed`   无脏读，有不可重复读和幻读情况  可以使用但不符合一致性原则  Oracle默认级别
- `repeatable-read`   无脏读，无不可重复读，但有幻读情况  可以使用但不符合一致性原则  MySQL默认级别
- `serializable`  无脏读，无不可重复读和幻读情况  最严格，但性能较弱

> 脏读：一个事务读取了另一个事务的未提交数据，这应该避免；
>
> 不可重复读：一个事务对相同数据的多次读取结果不一致，因为另一个事务在两次读取间对这部分数据进行了修改提交操作；
>
> 幻读：一个事务对相同筛选范围的列表的多次读取条数不一致，，因为另一个事务在两次读取间对这部分列表进行了增加或删除然后提交操作；

```sql
# 查看隔离级别
select @@transaction_isolation;

# 修改隔离级别
set transaction_isolation = '隔离级别'
```



### 用户权限控制管理

mysql 可以使用权限控制来限制用户对数据库和表的访问。权限可控制在数据库级别，表级别或特定操作上。

```sql
# 创建用户
# 主机ip 设置localhost表示只能在本机访问，设置 % 表示可以在任意主机访问
create user '用户名'@'主机ip' identified by '密码'

# 赋予权限  数据库名或表名使用 * 表示全部
grant all privileges on 数据库名.表名 to '用户名'@'主机ip'  # all privileges 表示全部权限
grant select,insert on 数据库名.表名 to '用户名'@'主机ip'  # 赋予增，查权限

# 回收/撤销权限
revoke select,insert on 数据库名.表名 to '用户名'@'主机ip'

# 查看用户权限
show grants for '用户名'@'主机ip'
select User, Host from mysql.user  # 从mysql自带的用户表查看所有用户

# 删除用户
drop user '用户名'
```



### 数据备份与还原

全量库和表的数据的备份与还原命令需要在未连接mysql的状态下执行，即开启cmd执行

```txt
# 备份单库和单表
mysqldump -u username -p 数据库名 表名 > 目标位置\xxx.sql

# 备份单库和多表
mysqldump -u username -p 数据库名 表名1 表名2 > 目标位置\xxx.sql

# 备份单库所有表
mysqldump -u username -p 数据库名 > D:/backDatabase.sql

# 还原数据，需要提前创建库，并确保原mysql版本与当前mysql版本兼容
mysql -u username -p 数据库名 < 目标位置\xxx.sql
```



### 窗口函数

窗口函数是 mysql 8+ 新特性，允许在结果集中执行聚合，分析和排序操作，而不会改变查询结果的行数

```sql
# 窗口函数语法
原多行结果集sql语句 over (partition by 字段名 order by asc)

# 查询所有商品类别和价格，以及平均价格   --将平均价格聚合到了每行中
select id, name, price, category avg(price) over () from goods;

# 查询所有商品类别和价格，以及类别的平均价格   --将类别平均价格聚合到了每行中
select id, name, price, category avg(price) over (partition by category) from goods;
```

