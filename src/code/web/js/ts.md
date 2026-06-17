---
title: TypeScript
order: 2
---



## 初识Typescript

当我们学习过JavaScript后，我们已经知道它是一种弱类型语言，即我们在创建变量时不需要去指定类型，编译器会自动帮我们指定，虽然这种模式可以让我们在初期学习是获得便利，不需要过多的关注类型，但随着不断的深入学习，这种模式的弊端也逐渐显露出来：**一个变量会在不同类型之间来回切换，造成类型混乱；对象身上的属性不明确，不利于项目维护等** 这些问题对一个编程语言来说都是影响不小的。


TypeScript 是 JavaScript 的超集，扩展了 JavaScript 的语法，TypeScript 通过** 类型注解** 提供编译时的静态类型检查。

想在本地书写并编译ts文件，需要全局安装， 然后就可以使用 `tsc` 命令编译指定的ts文件

**typescript中文网** <https://ts.nodejs.cn/>

```bash
npm install -g typescript
```



## 基本数据类型

typescript对数据类型进行约束的书写方式是声明变量时在变量名后面加上 **:类型**。一旦对声明的变量进行了类型约束，就不能在重新赋为其他类型的值，不过相同类型的值任然可以。

```typescript
let isDone: boolean = false;                //声明一个布尔值
let age: number = 20;                        //声明一个数值，支持二进制等写法
let name: string = "bob";                   //声明一个字符串（可以使用模板字符串）

let notSure: any = 4;                       //任意值,表示目前还不清楚类型的变量，可以自由赋予不同类型值
let notKnow: unknown = {};                  //同样表达任意值，但unknown类型是不可以调用属性和方法的，相当于父类。更加安全
let unusable: void = undefined;             //空值，表示没有任何类型，如函数没有返回值，只能赋予undefined和null
let u: undefined = undefined;               //单独类型undefined，所有类型的子类型，可以直接赋给其他类型
let n: null = null;                         //单独类型null，所有类型的子类型，可以直接赋给其他类型

let list1: number[] = [1, 2];                    //声明数组方式1
let list2: Array<number> = [1, 2];               //声明数组方式2 (数组泛型)
let list3: number[][] = [[1,2], [3,4]]                        //声明多维数组方式1
let list4: Array< Array<number> > = [[5,6], [7,8]]            //声明多维数组方式2
let tuple: [string, number] = ['abc', 10];      //声明元组，表示一个已知元素数量和类型的数组
enum Color {Red, Green = 3, Blue};              //声明枚举，使用枚举类型可以为一组数值赋予友好的名字

let s:symbol = Symbol('666')                    //symbol类型，表示唯一值（内存地址唯一）

// 最后还有一个never类型，表示永不存在的值的类型，一般适用于那些抛出异常的函数。
```

ts 对于直接声明赋值的变量会对其进行类型推论，当变化其类型时就会报错。

```typescript
let str = 'hello'       // 类型推论为string类型
str = 123               //error, string类型的变量无法赋得数值

let abc                 //声明但未赋值的变量会推论为any类型
```

## 函数

为函数定义参数类型和返回值类型

```typescript
//定义函数类型签名
function add(x: number, y: number): number
```

可选参数与默认参数, 默认参数默认可选, 可传可不传

```typescript
function buildName(firstName: string, lastName?: string) {      //可选参数
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}

function buildName(firstName: string, lastName = "Smith") {       //默认参数
    // ...
}

// 也可以为函数设置调用签名，即为函数增加一些属性（函数的本质还是对象）
type DescFun = {
    desc: string
    (str: string): string[]
}
```

函数重载

相同函数根据传入不同的参数而返回不同类型的数据。

```typescript
function makeData(timestamp: number): Date
function makeData(y: number, m: number, d: number): Date
// 实现
function makeData(yOrTimestamp: number, m?: number, d?: number): Date {
    if (m !== undefined && d !== undefined) return new Date(yOrTimestamp, m, d)
    else return new Date(yOrTimestamp)
}
```


## 类型别名

使用 type 关键字可以声明类型别名

```typescript
type MyType = string | number
let aaa: MyType = '123'

type MySex = '男' | '女'      //字面量类型别名，值只能是对应的

type MoreType = MyType | booean // 可以继续扩展类型别名
```

## 接口

使用接口可以规范声明以及传参的**属性格式**。并且类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。

接口的定义使用 **interface 关键字** 来声明。

interface 和 type 都可以定义类型，但interface可以重复定义，编译器会自动继承扩展，而 type 重复定义则会报错。

**对象类型**

```typescript
interface SquareConfig {
  width: number;              //直接书写的属性为必需属性
  color?: string;             //在属性名后加一个? 表示非必需，可选属性
  [propName: string]: any;    //索引签名，表示后面还有一些不确定类型的属性
}

typeof A = SquareConfig['width'] // number 使用中括号可以获取到接口中的类型

interface Point {
    readonly x: number;       //使用 rreadonly关键字 表示只读属性，一旦赋值无法修改
    readonly y: number;
}

let ro: ReadonlyArray<number> = [1, 2, 3, 4];     //ReadonlyArray<T> 只读属性的数组，一旦创建无法修改
```


**可索引类型**

与数组形式差不多，但索引标签可以为数值或字符串。可索引类型具有一个索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。（感觉类似一个map数据类型）

```typescript
interface NumberDictionary {
  [index: string]: number;
  length: number;    // 可以，length是number类型
  name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
}
```

**继承接口**

使用 **extends关键字**  实现接口的继承，继承会将多个接口的内容合并。

```typescript
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}
```



## 类型断言，联合与交叉类型

使用类型断言可以告诉编辑器自己知道这个数据类型是哪一种，让编辑器不在进行相关检查，减少编译耗时。

```typescript
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;         //“尖括号”语法,放在变量前
let strLength: number = (someValue as string).length;       //as语法
```

使用交叉类型 & 可以将两个声明的接口合并为一个

- 当使用type类型别名进行交叉时总是允许合并，冲突时产生 never，不报错；
- 当使用interface接口进行&交叉时(不推荐)，等同于type交叉，接口推荐使用extends进行继承实现合并，冲突时会提示。

```typescript
type Pople = {
  name:string,
  age:number
}
type Man = {
  sex:number
}

const xiaoming (man:Pople & Man):void => console.log(man)
```

使用联合类型 |  可以声明可能是多类型的变量

```typescript
let mayChange: string | number = '123'
```

## 枚举

使用枚举我们可以定义一些有名字的数字常量或其他字符串。 枚举通过 **enum关键字** 来定义。

```typescript
enum Direction {              //普通枚举，转js后编译为对象类型
    Up = 1,
    Down = 2,
    Left = 3,
    Right = 'goRight'
}
```

**反向映射**：可以通过枚举类型的value获取对应的key（仅限数字枚举，字符串枚举不行）

```typescript
enum Direction {
    Up = 1,
    Down
    Left
    Right
}

let num: number = Direction.Left    // 3

console.log( Direction[3] )       // Left
```

## 类型缩小

ts中当我们使用if等语句去判断一个变量的类型时，ts会自动的缩小这个变量的类型，从而实现更加智能的类型检测。

```typescript
function test1(str: string[] | string) {
    if (typeof str === 'object') return str.join('')
    else return str
}

function test2(str: string[] | null | undefined) {
    if (!str) return '--'
    else return str.join('')
}
```

使用 in 关键字可以直接判断某一个某个字段名是否在另一个对象内。

```typescript
function canFly(animal: {fly: () => void}) {
    if ('fly' in animal) return 'yes'
    else return 'no'
}
```

使用 is 类型谓词可以直接告诉编译器如果函数返回 true，则参数一定是特定类型

```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
 
const test: unknown = "hello";
if (isString(test)) {
  // 在此块中，TypeScript 知道 test 是 string 类型
  console.log(test.toUpperCase()); // 安全调用
}


// 使用一般boolean 决定函数返回类型，则无法正常识别，除非直接断言为string类型
function isStringSimple(value: unknown): boolean {
  return typeof value === 'string';
}
 
const test: unknown = "hello";
if (isStringSimple(test)) {
  // 这里 test 仍然是 unknown 类型
  console.log(test.toUpperCase()); // 错误！
}
```


## 泛型

使用泛型可以帮我们确定暂时未知的变量类型, 一旦确定了这个类型,那么这个泛型就指代向相同的类型.

```typescript
// 函数泛型
function identity<T>(arg: T): T {       //使用<T>创建一个泛型
  return arg;
}
identity(123)         //此时泛型就指向为number类型


// 变量泛型，用泛型获取参数的类型
function loggingIdentity<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}

```

**泛型接口和泛型类**

可以利用泛型暂时不确定接口和类相关参数的类型，等到真正使用时在进行声明

```typescript
// 泛型接口
interface WidthType<T> {
    width: T;
}

// 泛型类
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>();
```



**泛型约束**

可以通过继承接口的方式约束泛型的内容；也可以用 keyof 获取泛型的键从而进行约束

```typescript
//泛型约束 继承接口
interface Lengthwise {
    length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {       //泛型继承了接口,约束了传参对象里有length属性
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}

// 泛型约束 keyof关键字
//keyof关键字获取到了泛型对象的所有键，返回一个联合类型，k继承了这个联合类型，所以约束了k只能是子类型，避免产生问题
function prop<T,K extends keyof T>(obj:T,key:K){
  return obj[key]
}
let o = {a:1,b:2,c:3}
```


## 类

使用 **class关键字**  创建一个类，类同样可以使用 **extends关键字**  实现继承，继承会将父类的内容合并到子类上，如果属性/方法名重复，以子类为准，这也就是 **属性/方法重写** 。

子类的构造函数里一定要调用 **super() 方法**，它会执行一次父类的构造函数。并且在子类构造函数里访问this的属性之前，我们一定要调用super()。

```typescript
class Animal {
    name: string;
    constructor(theName: string) { 
      this.name = theName; 
    }
    move(distance: number = 0) {
      console.log(`${this.name} moved ${distance}m.`);
    }
}

// 子类实现继承
class Snake extends Animal {
    constructor(name: string) { 
      super(name);                        //调用父类构造函数，name属性通过继承得到 
    }
    move(distance = 5) {                  //重写了父类里的方法
        console.log("Slithering...");
        super.move(distance);             //使用super关键字调用父类里的方法
    }
}
```

**类的属性/方法修饰符**

*(下面的修饰符都是针对类的实例成员的，也就是那些那些仅当类被实例化的时候才会被初始化的属性)*

**public：**公共的，在类里和实例上都可见，没有明确修饰符的类成员默认为public修饰。

**private：**私有的，只能在类里被访问到，实例上不可见。

**protected：**受保护的，可以在类里和**继承的子类中**被访问到，但实例上仍不可见。构造函数也可以用 protected 修饰，表示这个类不能被实例化，但继承的子类却可以。（直接实例化相当于在类外调用构造函数，并不允许）

**readonly：**只读的，只读属性必须在声明时或构造函数里被初始化。

**参数属性**：在构造函数传参时就指定参数类型。

```typescript
class Animal {
    // private name: string;
    constructor(private name: string) {               //直接在传参时确定属性类型，相当于声明在类里
      //this.name = name;
    }
    move(distance: number) {
        console.log(`${this.name} moved ${distance}m.`);
    }
}
```

**存取器getters/setters**

避免直接对类中属性的操作, 同时在操作时也可以用setter进行参数检查等操作, 确保安全性.

```typescript
class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string, password: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}
```

**静态属性/方法**

静态属性/方法存在于类本身上面而不是类的实例上,无需对类实例化就可以直接访问.  静态属性/方法使用 **static关键字** 修饰, 使用 **类名.属性名/方法名** 形式访问.

静态方法可以访问类的静态属性，但无法访问类的其他属性；并且静态方法之间可以互相调用。

**抽象类**

 使用  **abstract关键字**  定义抽象类和在抽象类内部定义抽象方法。

抽象类不能被实例化,只能被子类继承; 而抽象方法没有函数体,必须被子类重写.

```typescript
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log('roaming the earch...');
    }
}
```

## d.ts 声明文件

.d.ts 文件是声明文件（Declaration File），只包含类型信息，不产生任何 .js 输出，纯粹用于静态类型检查；主要适用于在 TypeScript 项目中使用纯 JavaScript 编写的第三方库时，TS 无法自动推断这些 JS 代码的类型，而 .d.ts 声明文件可以为这些 JS API 提供类型信息。

> 注意不要随意使用全局声明，优先用模块导入导出，以避免全局污染

**存放位置**

1. 放在 src/types 目录里，适用于存放项目内自定义的公共类型、接口、工具类型等，创建后需要在 tsconfig.json 中配置,如果不配typeRoots，只要 .d.ts 文件位于 include 范围中，TypeScript 都能正确识别

```json
{
  "compilerOptions": {
    "typeRoots": ["./node_modules/@types", "./src/types"]
  },
  "include": ["src"]
}
```

2. 放在 src/@types 目录里,适合用于补充或重写第三方库的类型, 同样需要在 tsconfig.json 中配置，此时如果使用 typeRoots 配置，需要按照规范结构 `src/@types/<包名>/index.d.ts`, 否则会不生效。

**具体写法**

1. 如果需要声明项目全局变量或函数，可以在 src/types 里创建对应 .d.ts 文件，声明对应类型：

```typescript
// src/types/globals.d.ts
declare const APP_VERSION: string;
declare function showDebugInfo(): void;
```

2. 如果需要为第三方包声明类型，在 `src/@types/<包名>/index.d.ts` 创建相应文件,使用 `declare module <包名>` 可以为对应包函数创建类型声明了,声明后，当你 import { doSomething } from "my-library" 时，TS 就能提供准确的类型检查和自动补全.

```typescript
declare module "my-library" {
  export function doSomething(input: string): number;
  export const version: string;
  export interface Options {
    size: number;
    color: string;
  }
}
```

3. 如果想扩展已有模块，为现有第三方包的相关类型增加自定义字段等，也可以实现：

```typescript
// router.d.ts
import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth?: boolean;
    title?: string;
  }
}
```



## tsconfig.json文件配置

在项目初始化就会生成，也可以通过tsc --init命令生成。

```json
"compilerOptions": {
  "incremental": true, // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
  "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
  "diagnostics": true, // 打印诊断信息 
  "target": "ES5", // 目标语言的版本
  "module": "CommonJS", // 生成代码的模板标准
  "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在AMD模块中，即开启时应设置"module": "AMD",
  "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array",
  "allowJS": true, // 允许编译器编译JS，JSX文件
  "checkJs": true, // 允许在JS文件中报错，通常与allowJS一起使用
  "outDir": "./dist", // 指定输出目录
  "rootDir": "./", // 指定输出文件目录(用于输出)，用于控制输出目录结构
  "declaration": true, // 生成声明文件，开启后会自动生成声明文件
  "declarationDir": "./file", // 指定生成声明文件存放目录
  "emitDeclarationOnly": true, // 只生成声明文件，而不会生成js文件
  "sourceMap": true, // 生成目标文件的sourceMap文件
  "inlineSourceMap": true, // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中
  "declarationMap": true, // 为声明文件生成sourceMap
  "typeRoots": [], // 声明文件目录，默认时node_modules/@types
  "types": [], // 加载的声明文件包
  "removeComments":true, // 删除注释 
  "noEmit": true, // 不输出文件,即编译后不会生成任何js文件
  "noEmitOnError": true, // 发送错误时不输出任何文件
  "noEmitHelpers": true, // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
  "importHelpers": true, // 通过tslib引入helper函数，文件必须是模块
  "downlevelIteration": true, // 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现
  "strict": true, // 开启所有严格的类型检查
  "alwaysStrict": true, // 在代码中注入'use strict'
  "noImplicitAny": true, // 不允许隐式的any类型
  "strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量
  "strictFunctionTypes": true, // 不允许函数参数双向协变
  "strictPropertyInitialization": true, // 类的实例属性必须初始化
  "strictBindCallApply": true, // 严格的bind/call/apply检查
  "noImplicitThis": true, // 不允许this有隐式的any类型
  "noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
  "noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
  "noFallthroughCasesInSwitch": true, // 防止switch语句贯穿(即如果没有break语句后面不会执行)
  "noImplicitReturns": true, //每个分支都会有返回值
  "esModuleInterop": true, // 允许export=导出，由import from 导入
  "allowUmdGlobalAccess": true, // 允许在模块中全局变量的方式访问umd模块
  "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
  "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
  "paths": { // 路径映射，相对于baseUrl
    // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置
    "jquery": ["node_modules/jquery/dist/jquery.min.js"]
  },
  "rootDirs": ["src","out"], // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错
  "listEmittedFiles": true, // 打印输出文件
  "listFiles": true// 打印编译的文件(包括引用的声明文件)
}
 
// 指定一个匹配列表---进行编译（属于自动指定该路径下的所有ts相关文件）
"include": [
   "src/**/*"
],
// 指定一个排除列表---不进行编译（include的反向操作）
 "exclude": [
   "demo.ts"
],
// 指定哪些文件使用该配置（属于手动一个个指定文件）
 "files": [
   "demo.ts"
]
```
