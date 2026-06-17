---
title: JavaScript
order: 1
---


## 初识JS

JavaScript负责页面中的的行为。是一门运行在浏览器端的脚本语言。

JS可以直接写在HTML文件内部的 **script标签** 中，也可以在外部创建一个js文件然后利用script标签的src属性引入（这样这个script标签内部不能在编写代码）。

学习网站：[MDN](https://developer.mozilla.org/zh-CN/)



## 数据类型

JS目前共有8种数据类型：number、string、boolean、null、undefined、object、symbol、bigInt。

我们可以使用 **typeof运算符** 来检查数据类型。 `typeof xxx` 会返回变量的数据类型。（但需要注意的是 `typeof null` 返回的是 object，这是js的历史遗留问题，用 `xxx === null` 代替判断）

- **基本数据类型:** 除 object 以外的其他7种类型都是。
- **引用数据类型：** object，其内部包含 Array，Function， Date。



## 类型转换

- **转string类型：** （前两个为强制类型转换，第三个是隐式转换）
  - `xxx.toString()` 方法。**强制转换** 但不适用于null和undefined，因为他们自身上没有方法。
  - `String(xxx)` **强制转换** 对自身上有 `toString()` 的会直接调用。null直接返回"null",undefined直接返回"undefined"。
  - `xxx + ''` 任意的数据类型 + "". **隐式转换** 隐式的将整体转换为字符串

- **转number类型：**
  - `Number(xxx)` **强制转换** 纯数字的字符串会正常转换，非纯数字字符串或undefined转为 **NaN**。空串或null转为 0，布尔值true为 1，false为 0.
  - `parseInt(xxx)` 或 `parseFloat(xxx)` **强制转换** 可以将**一个字符串中的头部有效的整数位**提取出来，并转换为Number。 非string会先转为string再执行。

- **转boolean类型：**
  - `Boolean(xxx)` **强制转换 ** 除了空串， 0， NaN, undefined， null会转为false，其余都是true。



## 基础语法

关于流程控制，判断，循环，遍历等不再记录笔记，各种语言都是相通的。

关于字符串，数组，对象的常用方法，参考 MDN 相关模块即可。




## 作用域问题

JS的作用域可以分为两种：全局作用域和函数作用域。

- **全局作用域：** 全局作用域中只有一个全局对象即window实例。在全局作用域中创建的变量和函数最后都会挂载到window对象上，并且可以在在页面的任意位置访问。

- **函数作用域：** 函数执行时创建的作用域，在函数执行完毕就会销毁。内部创建的变量不能在外部访问。变量寻找机制是先找当前内部自身的，找不到就层层向上寻找，直到找到全局作用域。

初期JS只能用 `var` 声明变量，没有块级作用域。ES6新引入的 `let` 和 `const` 声明的变量具有块级作用域。所以现在更推荐使用 `let` 声明变量。



## this指向问题

this指上下文对象，根据函数的调用方式不同会执向不同的对象。

- 全局函数的直接调用，this是window
- 以对象方法的形式调用，this是调用的对象
- 以构造函数的形式调用时，this是创建的那个对象
- 使用call和apply调用时，this是指定的那个对象

更改this指向的三个方法：

- `Function.prototype.call(thisArg, arg1, arg2, ...)`  立即执行，第一个参数为修改的this指向，后面的都是函数的参数。
- `Function.prototype.apply(thisArg, arr)`  立即执行，第一个参数为修改的this指向，后面是一个数组，里面存放着函数的参数，调用时会将数组元素提取出来传入。
- `Function.prototype.bind(thisArg，arg1, arg2, ...)` 返回一个新方法，即修改this指向后的方法。
- 后面的参数会以默认参数的形式放到新数组中。



## 闭包

**闭包**（closure）是一个函数以及其捆绑的周边环境状态的引用的组合。

使用闭包主要是利用内部函数访问外部函数的作用域。在js中，当函数执行完毕后，其内部声明的变量会检查是否存在引用关系使得该变量需要被继续使用，这种情况下即使函数执行完毕也不会立刻销毁变量。

```js
function makeFunc() {
    var name = "Mozilla";
    function displayName() {
        alert(name);
    }
    return displayName;
}

// 闭包函数 函数以及其创建时捆绑的周边环境状态的引用的组合。
var myFunc = makeFunc();
myFunc();
```

**优点：**

- 可以读取函数内部变量，从而**创建私有变量**，只能通过暴露出去的方法访问。
- **延长变量的生命周期**，词法环境被引用使得函数执行完毕不会立刻销毁其内部的变量。

**缺点：**

- **内存泄漏** 闭包会一直保持对变量的引用而不销毁，过多的使用会导致占用大量内存空间。



## 防抖与节流

**防抖：** 触发 n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时

```js
// 1.防抖： 每次触发事件后间隔一段时间才执行回调函数，在间隔时间内重复触发会重置间隔时间
  function debounce(fun, delay) {
    let timer = null
    
    return function(...args) {
      if(timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fun.apply(this, args)
      }, delay)
    }
  }

/* 防抖立即执行版本 */
function debounce(fun, delay = 1000) {
  let timer = null
  let flag = true

  return function (...args) {
    if (timer) clearTimeout(timer)
    if (flag) {
      fun.apply(this, args);
      flag = false
    }
    timer = setTimeout(() => {
      flag = true
    }, delay)
  }
}
```

**节流：** n 秒内只运行一次，若在 n 秒内重复触发，只有第一次生效

```js
// 2.节流： 每次触发事件后间隔一段时间才执行回调函数，在间隔时间内重复触发会合并到最新一次的触发
  function throttle(fun, delay) {
    let timer = null
    
    return function(...args) {
      if(!timer) {
        timer = setTimeout(() => {
          clearTimeout(timer)
          fun.apply(this, args)
        }, delay)
      }
    }
  }
```

防抖场景：

1. 登录，短信验证等用户可能不小心点击了多次按钮，避免短时间内向后台请求多次。
2. resize事件，通常会短时间内触发多次，使用防抖将最后一次触发的一段时间后再修改窗口尺寸，避免性能浪费。
3. 文本编辑器实时保存，只有在用户停止输入一段后才进行保存操作。

节流场景:

1. 浏览器播放事件,每隔一秒计算一次进度信息等
2. input 框实时搜索并发送请求展示下拉列表，每隔一秒发送一次请求，（或防抖用户停止输入1s后发送请求）



## 浅拷贝与深拷贝

浅拷贝就是对于对象类型的数据只会拷贝其指针，修改拷贝后的数据也会影响原数据。

深拷贝就是对于对象类型的数据彻底开辟新的内存空间存储另一份。修改拷贝后的数据不会影响原数据。

**浅拷贝方法：**

- `Object.assign(target, source)` 将源对象属性添加到目标对象上，相同的键会被覆盖。
- 数组上的`slice(), concat()`
- 拓展运算符

**深拷贝方法：**

- lodash的`cloneDeep(obj)`

- `JSON.parse( JSON.stringify(obj) )` 但会忽略undefined、symbol和函数

- webAPI方法 `structuredClone(value)`  会克隆可序列化对象，但如Function，dom节点，原型链等无法复制

- 手写递归循环深拷贝(简单版)
  
  ```js
  function deepClone (source) {
      //判断source是不是对象
      if (source instanceof Object === false) return source;
  
      //根据source类型初始化结果变量
      let target = Array.isArray(source) ? [] : {};
  
      for (let i in source) {
          // 判断是否是自身属性
          if (source.hasOwnProperty(i)) {
              //判断数据i的类型
              if (typeof source[i] === 'object') {
                  target[i] = deepClone(source[i]);
              } else {
                  target[i] = source[i];
              }
          }
      }
      return target;
  }
  ```



## new/构造函数创建流程

1.创建一个新的空对象

2.将这个空对象的 原型`__proto__` 指向构造函数的 原型对象`prototype`

3.将构造函数的this指向这个空对象,然后执行构造函数中的代码，向空对象中添加属性和方法

4.如果该函数没有返回或者返回的是基本数据类型，则没有效果，会默认返回this，此时this指代的就是新对象；如果返回的是对象类型，则就是返回指定对象。

```js
var obj = new Person()

/* new操作符具体就做了三件事 */

// 1.创建一个新的空对象
var obj  = {}
// 2.将这个空对象的 原型 指向构造函数的 原型对象
obj.__proto__ = Person.prototype
// 3.将构造函数的this指向这个空对象, 并执行构造函数中的代码，向空对象添加属性和方法
Person.call(obj)
```



## 原型与原型链

1. 一个函数被创建后，**解析器会默认在函数中添加一个属性`prototype`**，这个属性指向函数的原型对象。

2. 当函数作为构造函数使用，**它所创建的实例中都会有一个隐含的属性 `__proto__` 获取到该构造函数的原型对象。** 这个属性被称为创建对象的隐式原型。

3. 如果我们向构造函数的原型对象`prototype`上添加属性和方法。那么它创建的实例就可以通过他的隐式原型`__proto__` 获取到构造函数的原型对象，进而获取到里面的属性和方法，这一过程是隐式且自动的。

4.构造函数的原型对象本质上也是一个对象，它也是由object构造函数创建的。

至此，原型链诞生了：（此图选自他人文章，仅借鉴学习使用）

<img src="https://pic4.zhimg.com/80/v2-923a4b2f1f88c93eeec301cec81bf03b_720w.webp" alt="原型链图" />

当我们用构造函数创建一个实例后，我们想要找该对象身上的一个方法，先找对象自身内部；没有找到就通过 `p.__proto__` 找构造函数的原型对象内部；还没有找到就继续向父类上层查找 ,直到找到object的原型对象内部，还没有再往上就是null，就会返回undefined表示找不到。整个结构就是原型链，对象属性方法的查找机制也是顺着原型链查找的。

**利用原型链实现继承**

通过手动设置子构造函数的 `prototype` 为父构造函数的实例，可以实现原型链继承：

下面的原型链：`c → Child.prototype（Parent实例）→ Parent.prototype → Object.prototype → null`

```js
function Parent() { this.name = 'parent'; }
Parent.prototype.say = function() { console.log(this.name); };

function Child() { this.name = 'child'; }
// 将 Child.prototype 指向 Parent 的实例，形成原型链 
Child.prototype = new Parent();
// 或使用 Object.create(proto) 创建一个新对象，新对象的的原型对象即为 入参proto
// Child.prototype = Object.create(Parent.prototype)

// 如果需要子构造函数继承父构造函数的静态方法，则下面这步也需要手动指定
// Child.__proto__ = Parent;

const c = new Child();
c.say(); // 'child'（调用继承自 Parent.prototype 的方法）
```

**原型链继承与 Class extends 继承的区别**

- `class` 实际上是一个特殊的函数，它拥有 `prototype` 属性，与构造函数一样，实例的隐式原型就是指向class的prototype。且class为函数的话它也是由Function构造函数创建的实例，所有它也有隐式原型proto。

- 区别与构造函数需要手动绑定实现原型链继承，Class extends 会自动完成继承关系，它会进行如下操作

  ```js
  // 1.将子类原型对象的隐式原型指向父类的原型对象，实现属性与方法的继承
  Child.prototype.__proto__ = Parent.prototype
  // 2.将子类自身的隐式原型指向父类，实现 static 静态方法的继承（静态方法只能类自己调用）
  Child.__proto__ = Parent
  ```



## 事件循环

**进程：** 程序执行需要占据一定的内存空间，这块空间就可以理解为进程，一个应用至少占据一个进程，且进程之间互相独立，通信也需要经过同意。

**线程：** 线程是代码执行的区域，一个进程至少有一个线程，所以在进程开始后会自动创建一个线程来运行代码，这个线程就是主线程。如果程序需要同步执行多块代码，则主线程会启动更多的线程来执行代码，所以一个进程中可以包含多个线程。

**如何理解JS的异步？**
JS是一门单线程的语言，这是因为它运行在浏览器的渲染主线程中，而渲染主线程只有一个，且承担着诸多的工作，渲染页面、执行JS都在其中运行。如果使用同步的方式，就极有可能导致主线程产生阻塞，从而导致消息队列中的很多其他任务无法得到执行。

所以浏览器采用异步的方式来避免。具体做法是当某些任务发生时，比如计时器、网络、事件监听，主线程将任务交给其他线程去处理，自身立即结束任务的执行，转而执行后续代码。当其他线程解析执行完成时，将事先传递的回调函数包装成任务，加入到消息队列的未尾排队，等待主线程调度执行在这种异步模式下，浏览器永不阻塞，从而最大限度的保证了单线程的流畅运行。

由于JS是单线程语言，即一段时间内只能做一件事，所以对于一些异步的任务并不会持续等待，而是将其推入异步任务队列等待执行，由此产生了js的执行机制探讨。

1. 所有的任务可以分为**同步任务和异步任务**， 同步任务立即执行，异步任务推入异步任务队列等待同步任务执行完毕后再执行。

2. 异步任务队列中又细分为**微任务队列和其他类型队列**（过去主要说明为宏任务队列，但随浏览器复杂化现在已不再满足），**微任务队列具备最高优先级**，在当前任务执行过程中遇到微任务就会将其推入到微任务队列，每次任务执行完毕，就会依次将微任务队列里的微任务提到主线程开始执行，直到清空微任务队列。才开始读取其它类型队列（同样有优先级之分）的下一个任务继续循环，直到所有任务队列都清空。**（即每次读取新异步任务前都要清空微任务队列）**

**同步和异步任务分别进入不同的执行环境，同步的进入主线程，即主执行栈，异步的进入任务队列。主线程内的任务执行完毕为空，会去任务队列读取对应的任务，推入主线程执行。 上述过程的不断重复就是我们说的 Event Loop (事件循环)。**

- 宏任务主要包含：script(整体代码)、setTimeout、setInterval、I/O、UI 交互事件、setImmediate(Node.js 环境)

- 微任务主要包含：Promise、MutaionObserver、process.nextTick(Node.js 环境)



## 正则表达式

两种方式创建：前面是匹配规则，后面是匹配模式。

```js
var reg = new RegExp("[A-Z]{6,8}",'g')

var reg = /[A-Z]{6,8}/g
```

**匹配模式：**

i:忽略大小写（ignore）

g:全局搜索（global 将默认只匹配1次变为全局搜索匹配）

**匹配规则：**

1. **字符组：**对于一定范围内的顺序字符匹配，全部书写比较麻烦，就可以使用字符组。例如：
   
   `[abc1-9]` 表示匹配 a 或 b 或 c 以及 1 至 9 两个范围内的任意一个字符。

2. **排除字符组**： 与字符组相反，用于匹配一定范围内的非内容的字符。 例如：
   
   `[^abc]` 表示匹配任意的一个非 a 或 b 或 c 的字符。
   
    并且由此衍生出了一些快捷的书写方式：

| 书写形式 | 表示内容           | 含义                                         |
| ---- | -------------- | ------------------------------------------ |
| \d   | [0-9]          | 数字字符,即英文digit（数字）的缩写                       |
| \D   | [^0-9]         | 非数字字符                                      |
| \w   | [0-9a-zA-Z_]   | 单词字符。表示数字、大小写字母或下划线，即word的简写               |
| \W   | [^0-9a-zA-Z_]  | 非单词字符                                      |
| \s   | [ \t\v\n\r\f]  | 空白符，包括空格、水平制表符、垂直制表符、换行符、回车符、换页符。即space的缩写 |
| \S   | [^ \t\v\n\r\f] | 非空白符                                       |

3. **量词：** 用来指定匹配字符需要连续出现的次数。
   
   - `{m,n}`  表示出现次数在m次到n次之间（包含）
   
   - `{m,}`  表示至少出现m次
   
   - `{m}` 等价于`{m,m}`，表示正好出现m次
   
   - `?` 等价于`{0,1}`，表示出现或者不出现。
   
   - `+ ` 等价于`{1,}`，表示出现至少一次。
   
   - `*` 等价于`{0,}`，表示出现任意次，有可能不出现。

4. **多选分支：** 用`|`（管道符）分隔，表示其中任何之一都可以。例如
   
   `/abc|cde/` 既可以匹配 abc 也可以匹配 cde ，两种都是符合正则的

**指定位置匹配**

*注意字符与字符之间也是有位置的，只是这个位置是'',即空位置，但在匹配时是可以匹配到的*

- `^`（脱字符）匹配开头，在多行匹配中匹配行开头
- `$`（美元符号）匹配结尾，在多行匹配中匹配行结尾
- `\b`是单词边界，具体就是`\w`和`\W`之间的位置，也包括`\w`和`^`之间的位置，也包括`\w`和`$`之间的位置。
- `\B`是非单词边界。具体说来就是`\w`与`\w`、`\W`与`\W`、`^`与`\W`，`\W`与`$`之间的位置。
- `(?=p)`，其中`p`是一个子模式，即`p`前面的位置。
- `(?!p)`, 即`p`前面的所有位置

**校验字符串**

`regexp.test(str)` 查看正则表达式与指定的字符串是否匹配。返回一个Boolean

`regexp.exec(str)` 在指定字符串中执行一个搜索匹配。返回一个结果数组或 null