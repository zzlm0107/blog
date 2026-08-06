---
title: NestJS
---

Nest（NestJS）是一个用于构建高效、可扩展的 Node.js 服务端应用的框架。其底层代码运用了 express 和 Fastify 并在他们的基础上提供了一定程度的抽象，同时也将其 API 直接暴露给开发人员。这样可以轻松使用每个平台的无数第三方模块，学习 Nest 可以帮我们方便的搭建后端应用，并了解工程化后端的开发流程和结构模式。

学习nestjs，需要了解其核心概念：

- 模块 (Modules)：是组织代码的基本单元。一个NestJS应用至少有一个根模块 (AppModule)。
- 控制器 (Controllers)：负责处理具体的路由请求（如 /users）并返回响应。
- 提供者 (Providers)：这是实现业务逻辑的地方。通常把提供者定义为 “服务” (Services)。
- 装饰器 (Decorators)：用于给类和类成员添加元数据，定义它们的作用。
- DTO (Data Transfer Object)：数据传输对象，用于定义请求和响应的数据结构，类似ts中的interface接口。
- 实体类 (Entity)：与数据库表/文档对应的实体类，用于映射数据库表结构和字段类型等信息。

以及其设计模式：

- 控制反转（IOC）：这是设计原则，意思是高层实例不在其内部创建依赖，而是统一将依赖的创建权转移到框架，框架负责创建、管理对象的生命周期。
- 依赖注入（DI）：是控制反转原则的一种实现方式，通过框架容器来创建管理每个对象的依赖，初始时就会创建好全部的依赖（单例），后续在需要时直接从容器中获取即可。

文档请参考：[NestJS 中文文档](https://docs.nestjs.cn/introduction)

创建第一个 NestJS 应用

```bash
npm i -g @nestjs/cli
nest new project-name
```

## 装饰器

要理解nestjs的装饰器功能实现原理，就必须要先知道 TS 中的原生装饰器语法与装饰器工厂和 reflect-metadata 库：

1. **TS 原生装饰器**

ts原生装饰器本质上就是一个函数，且只能与类绑定使用；它会在类、类方法、类属性或参数被定义时被调用，并接收关于目标（target）的元数据。

装饰器类似一个编译时的hook，会在代码编译时自动执行，但原生装饰器不会改变类的行为，只能拿到被标记的类/属性/方法的相关信息。

```ts
// 1. 这是一个纯TS装饰器函数
function MyTag(target: any, propertyKey: string) {
    console.log('装饰器执行了！');
    console.log('正在处理的目标类：', target.constructor.name);
    console.log('被标记的属性名：', propertyKey);
}

class User {
    @MyTag // 2. 使用这个纯TS装饰器
    name: string = 'Alice';
}

// 3. 关键点：此时我们甚至还没有 new User()，也没有调用任何东西
// 但控制台会立刻输出：
// "装饰器执行了！"
// "正在处理的目标类： User"
// "被标记的属性名： name"
```

ts 装饰器也支持工厂方式， 通过传入一些参数，返回一个标准的装饰器函数。

```ts
function MyTagFactory(value: string) {
    // 可以获取到value做一些事情
    return function (target: any, propertyKey: string) {
        console.log('装饰器执行了！');
        console.log('正在处理的目标类：', target.constructor.name);
        console.log('被标记的属性名：', propertyKey);
    };
}
```

2. **reflect-metadata 库**

原生装饰器想要发挥真正作用，必须搭配ts官方人员开发的 reflect-metadata 库，这个库给装饰器增加了一个核心能力：在类、方法、参数上挂载“元数据映射表”，这个映射表的唯一键（Key）是由 目标对象 + 属性键 + 元数据键 三个部分组合而成的。

```ts
import 'reflect-metadata'; // 引入这个库

function MyTag(target: any, propertyKey: string) {
    // 注意这一行：我们在给 User 类的 name 属性设置一个隐藏的元数据
    // 入参  元数据key 元数据value 目标对象  属性键
    Reflect.defineMetadata('custom:type', '这是用户名', target, propertyKey);
}

class User {
    @MyTag
    name: string = 'Alice';
}

// 读取元数据映射表中的值
const metadata = Reflect.getMetadata('custom:type', User.prototype, 'name');
console.log(metadata); // 输出："这是用户名"
```

通过这种方式，我们可以在使用ts装饰器时挂载一些参数，这样这些参数可以在运行时被读取到进而根据入参做一些额外操作。

3. **NestJS 装饰器**

NestJS 定义了大量的装饰器工厂方法，根据传入的参数，借助 reflect-metadata 库在代码编译时就可以做到记录元数据，在应用启动运行时可以读取到这些元数据并根据元数据做一些额外的操作。例如 @Controller() 标记了类为一个控制器，@Get()标记了方法为一个GET请求； 这样编译时 NestJS内部就可以借助 express 创建一个对应的路由。

NestJS通过装饰器这种方式，让开发者只需方便的声明合适的装饰器即可，其内部会自动实现对应的创建路由功能。

```ts
@Controller('/hello')
export class AppController {
    @Get()
    getHello(): string {
        return 'Hello World!';
    }
}
```

## 控制器

控制器（Controller）负责设置路由、处理请求参数、返回响应等，控制器通过 @Controller() 装饰器定义，其中可以直接传入字符串参数，标识对应的路由路径前缀，具体的路由路径在方法上使用装饰器定义。

下面是一些常用的获取请求参数的装饰器：

| 装饰器                  | 底层表达式                      | 含义                                       |
| ----------------------- | ------------------------------- | ------------------------------------------ |
| @Request(), @Req()      | req                             | 获取请求对象，包含请求的所有信息           |
| @Response(), @Res()\*   | res                             | 获取响应对象，用于发送响应给客户端         |
| @Next()                 | next                            | 获取下一个中间件函数，用于继续处理请求流程 |
| @Session()              | req.session                     | 获取会话对象，用于存储会话相关的数据       |
| @Param(key?: string)    | req.params / req.params[key]    | 获取路由参数对象，用于获取路由参数值       |
| @Body(key?: string)     | req.body / req.body[key]        | 获取请求体对象，用于获取请求体值           |
| @Query(key?: string)    | req.query / req.query[key]      | 获取查询参数对象，用于获取查询参数值       |
| @Headers(name?: string) | req.headers / req.headers[name] | 获取请求头对象，用于获取请求头值           |
| @Ip()                   | req.ip                          | 获取客户端IP地址                           |
| @HostParam()            | req.hosts                       | 获取主机参数                               |

下面是一个基础控制器的示例：

```ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Post()
    create(@Body() createBookDto: CreateBookDto) {
        return this.bookService.create(createBookDto);
    }

    @Get()
    findAll() {
        return this.bookService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.bookService.findOne(+id);
    }
}
```

## 提供者

提供者（Provider）负责提供服务，封装对应方法给控制器使用。提供者通过 @Injectable() 装饰器定义，该装饰器将元数据附加到类上，表明该类是一个可以由 Nest IoC 容器管理的类。

下面是一个基础提供者的示例：

```ts
import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
    create(createBookDto: CreateBookDto) {
        return 'This action adds a new book';
    }

    findAll() {
        return `This action returns all book`;
    }

    findOne(id: number) {
        return `This action returns a #${id} book`;
    }
}
```

## 模块

每个 Nest 应用程序至少有一个模块，即根模块。可以通过 @Module() 装饰器定义。 可以把每个模块看成是一个功能集合，模块中主要导入该功能集合下的控制器、提供者等。 模块可以互相导入，最终汇总到根模块中。

模块主要包括下面4中配置：

- providers 将由 Nest 注入器实例化,且至少可在本模块内共享的提供者
- controllers 本模块中定义的需要实例化的控制器集合
- imports 导入模块的列表，这些模块导出了本模块所需的提供者
- exports 本模块提供的 providers 子集，这些提供者可以被其他模块导入使用。

下面是一个基础模块的示例：

```ts
import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';

@Module({
    controllers: [BookController],
    providers: [BookService],
})
export class BookModule {}
```

**全局模块**

全局公共模块可以使用 @Global() 装饰器定义，全局模块在其他模块中无需手动声明imports导入，其他模块可以直接使用其exports的 服务。

```ts
import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Global()
@Module({
    controllers: [CatsController],
    providers: [CatsService],
    exports: [CatsService],
})
export class CatsModule {}
```

**动态模块**

动态模块是指在运行时根据条件动态配置的模块,通过配置 forRoot() 方法接收参数实现。动态模块返回的属性会扩展 （而非覆盖）@Module() 装饰器中定义的基础模块元数据。

```ts
import { Module, DynamicModule } from '@nestjs/common';
import { createDatabaseProviders } from './database.providers';
import { Connection } from './connection.provider';

@Module({
    providers: [Connection],
    exports: [Connection],
})
export class DatabaseModule {
    static forRoot(entities = [], options?): DynamicModule {
        const providers = createDatabaseProviders(options, entities);
        return {
            module: DatabaseModule,
            providers: providers,
            exports: providers,
        };
    }
}
```

## 中间件

与 Express 中间件类似，NestJS 中间件主要也用于在请求处理过程中做一些预处理或后处理的工作。中间件通过 @Injectable() 装饰器的类定义，且该类需要实现 NestMiddleware 接口，即必须包含 use(req, res, next) 方法。

> 中间件函数可以执行以下任务：
>
> - 执行任意代码。
> - 修改请求和响应对象。
> - 结束请求-响应周期。
> - 调用堆栈中的下一个中间件函数。如果当前中间件函数没有结束请求-响应周期，它必须调用 next() 将控制权传递给下一个中间件函数。否则，请求将被挂起。

下面是一个基础中间件的示例：

```ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Request...');
        next();
    }
}
```

如果想要使用该中间件，需要在模块中导入该中间件，使用模块类的 configure() 方法内来通过apply() 方法应用并通过forRoutes() 方法指定中间件作用的路由，包含中间件的模块必须实现 NestModule 接口。

下面是一个包含中间件的模块的示例：

```ts
import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';

@Module({
    imports: [CatsModule],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // consumer.apply(LoggerMiddleware).forRoutes('cats'); // 应用的路由路径
        // consumer.apply(LoggerMiddleware).forRoutes({ path: 'cats', method: RequestMethod.GET }); // 应用的路由路径和请求方法
        // consumer.apply(LoggerMiddleware).forRoutes(CatsController); // 甚至应用控制器

        // 排除指定路由
        consumer
            .apply(LoggerMiddleware)
            .exclude(
                { path: 'cats', method: RequestMethod.GET },
                { path: 'cats', method: RequestMethod.POST },
                'cats/{*splat}',
            )
            .forRoutes('cats');
    }
}
```

**全局中间件**

通过使用 INestApplication 实例提供的 use() 方法，进行全局中间件的注册，即在app实例上注册中间件。

```ts
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(process.env.PORT ?? 3000);
```

## 管道

管道是一个使用 @Injectable() 装饰器注解的类，管道需要实现 PipeTransform 接口，即必须包含 transform() 方法，方法接收两个参数，value 参数是当前处理的方法参数（在被路由处理方法接收之前），metadata 是当前处理的方法参数的元数据。。管道主要包括两个作用：

- 转换：将输入数据转换为所需的形式（例如，从字符串转换为整数）
- 验证：评估输入数据，如果有效，则原样传递；否则，抛出异常

**内置管道**

Nest 提供了几个开箱即用的管道：

- ValidationPipe
- ParseIntPipe
- ParseFloatPipe
- ParseBoolPipe
- ParseArrayPipe
- ParseUUIDPipe
- ParseEnumPipe
- DefaultValuePipe
- ParseFilePipe
- ParseDatePipe

要使用内置管道很简单，只需要导入并在参数装饰器上使用即可。

```ts
import { ParseIntPipe, ParseUUIDPipe } from '@nestjs/common';

// 直接传入 内置管道类， 实例化通过框架依赖注入
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}

// 也可以传入管道实例，通过 new 关键字实例化并传入相关参数，可以控制管道的内部行为
@Get(':uuid')
async findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
  return this.catsService.findOne(uuid);
}
```

**自定义管道验证DTO**

上面的内置管道大部分都是用来验证基本数据类型的参数，而使用ValidationPipe管道则用来验证对象类型参数的结构是否符合规则。

我们需要安装两个辅助库以便使用其提供的各种验证装饰器：

```bash
npm i --save class-validator class-transformer
```

之后在我们定义类类型DTO时，就可以使用 class-validator 库提供的装饰器来定义验证规则,然后绑定ValidationPipe管道应用入口实现全局挂载即可。

```ts
// create-cat.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateCatDto {
    @IsNotEmpty() //验证是否为空
    @IsString({ message: '用户名必须是字符串' })
    name: string;

    @IsNotEmpty()
    age: number;
}

// cats.controller.ts
@Post()
async create(@Body() createCatDto: CreateCatDto) {
 this.catsService.create(createCatDto);
}
```

全局挂载：

```ts
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // 全局注册官方 ValidationPipe
    app.useGlobalPipes(
        new ValidationPipe({
            // 1. 自动剥离 DTO 中未定义的属性（防止用户传多余字段）
            whitelist: true,

            // 2. 如果用户传了未定义的属性，直接抛出 400 错误（更严格）
            forbidNonWhitelisted: false,

            // 3. 自动将传入的普通 JS 对象转换为 DTO 类的实例（支持类型自动转换）
            transform: true,
        }),
    );
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

## 守卫

守卫是一个用 @Injectable() 装饰器注解的类，它实现了 CanActivate 接口。守卫的主要作用是验证请求是否符合预期，例如检查用户是否已登录、是否有权限访问该资源等。守卫需要包含 canActivate() 方法，该方法接收一个 ExecutionContext 实例作为参数，返回一个 `Promise<boolean>` 或 boolean。

守卫在所有中间件之后执行，但在任何拦截器或管道之前执行。

下面是一个简单的守卫示例：

```ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        return validateRequest(request); // 具体的验证部分
    }
}
```

可以把守卫挂载到控制器路由上或是全局注册。

```ts
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Controller('cats')
@UseGuards(AuthGuard)
export class CatsController {}

// 全局挂载
// app.useGlobalGuards(new AuthGuard());
```

## 拦截器

拦截器是一个用 @Injectable() 装饰器注解并实现了 NestInterceptor 接口的类。即必须包含 intercept() 方法，

拦截器拥有一系列受面向切面编程 (AOP)技术启发的实用功能，它们能够实现：

- 在方法执行前后绑定额外逻辑
- 转换函数返回的结果
- 转换函数抛出的异常
- 扩展基础函数行为
- 根据特定条件完全重写函数（例如出于缓存目的）

## 数据库

以 mysql 数据库为例， 需要安装 mysql2（mysql驱动库）， typeorm（数据库对象关系映射器框架）， @nestjs/typeorm（nestjs的typeorm模块）。

```bash
npm install --save @nestjs/typeorm typeorm mysql2
```

1. 创建数据库连接配置并在AppModule中导入

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entity/cat';

@Module({
    imports: [
        // 配置数据库连接
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'test',
            entities: [Cat], // 实体类数组
            // autoLoadEntities: true, // 自动加载实体类
            // synchronize: true,
        }),
    ],
})
export class AppModule {}
```

2. 定义表实体类，就是声明表结构，一般会在与表功能相关的模块下的entity目录下。实体类定义完成后，需要在上一步的数据库连接entities中添加该实体类。

```ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cat {
    @PrimaryGeneratedColumn() // 主键，自增
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;
}
```

3. 在需要使用这个实体类的模块，通过 `TypeOrmModule.forFeature` 注册对应的实体类

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entity/cat';

@Module({
    imports: [
        TypeOrmModule.forFeature([Cat]), // 注册实体类
    ],
})
export class CatsModule {}
```

4. 在需要使用这个实体类的提供者service中，通过 `InjectRepository` 装饰器注入对应的仓库（Repository），之后就可以在service中进行数据库操作了。

```ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './entity/cat';

@Injectable()
export class CatsService {
    constructor(
        @InjectRepository(Cat)
        private catsRepository: Repository<Cat>, // TypeORM提供的操作类，封装了CRUD方法
    ) {}

    findAll(): Promise<Cat[]> {
        return this.catsRepository.find();
    }

    findOne(id: number): Promise<Cat | null> {
        return this.catsRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.catsRepository.delete(id);
    }
}
```

5. 如果想直接执行sql语句，一种方式是直接调用 `Repository` 中的 `query` 方法，不过这种方式不支持事务；

```ts
const result = await this.catsRepository.query('SELECT * FROM cat WHERE id = $1', [id]);
```

6. 而使用 DataSource 创建 queryRunner 是一种支持事务的方式。

```ts
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class CatsService {
    constructor(@InjectDataSource() private dataSource: DataSource) {}

    async complexTransaction(id: number) {
        // 1. 创建 QueryRunner 实例
        const queryRunner = this.dataSource.createQueryRunner();

        // 2. 连接到数据库并开启事务
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // 3. 使用 queryRunner.manager 执行所有操作
            await queryRunner.manager.query(`UPDATE cats SET status = 'active' WHERE id = $1`, [id]);

            await queryRunner.manager.query(`INSERT INTO cat_audit (cat_id, action) VALUES ($1, 'activated')`, [id]);

            // 4. 所有操作成功，提交事务
            await queryRunner.commitTransaction();
        } catch (error) {
            // 5. 发生错误，回滚事务
            await queryRunner.rollbackTransaction();
            throw error; // 重新抛出异常
        } finally {
            // 6. 释放 QueryRunner
            await queryRunner.release();
        }
    }
}
```
