---
title: Electron
---

## electron概述

[Electron](https://www.electronjs.org/zh/docs/latest/) 是一个使用 JavaScript、HTML 和 CSS 构建桌面应用程序的框架，内嵌了 Chromium 浏览器内核和 NodeJS ，从而允许使用js进行桌面端开发。

当然对于习惯使用vue等框架进行页面开发的人来说，目前也有如 [electron-vite](https://cn.electron-vite.org/) 来实现 electron+vite 进行桌面端快速开发，并可以导入对应框架的组件库构建页面。



## 初始化项目

初始化electron项目目前常见的有三种方式：

1.  quick-start, 直接 clone 官方的初始化项目模板：

   ```bash
   git clone https://github.com/electron/electron-quick-start
   ```

2. 使用 electron forge（一个为 Electron 应用的开发、打包和分发而设计的全功能工具集）初始化：

   ```bash
   npm init electron-app <name>
   # 或
   npx creat-electron-app <name>
   # 或
   yarn create electron-app <name>
   ```

3. 直接空项目初始化, 然后参考官方文档手动编写index.html, main.js后使用命令启动项目

   ```bash
   yarn init -y
   yarn add electron --dev
   ```

   

## 进程模型

electron 将整个应用分为 **主进程** 与 **渲染进程** ，二者相互隔离，通信需要通过中间桥梁 **预加载脚本** 。

- 主进程（Main Process）： 负责整个应用程序的控制，可以调用 NodeJS API， 可以触发系统级的部分事件；
- 渲染进程（Renderer Process）：仅负责渲染页面，与传统网页开发逻辑一致，无权调用 NodeJS API ；
- 预加载脚本（preload.js）：运行在渲染进程中且先于网页内容开始运行，主要职责就是将主进程暴露的相关方法中转给页面，从而实现主进程与渲染进程之间的通信。



### 上下文隔离

这是确保主进程与渲染进程进行隔离的安全策略（默认开启），上下文隔离策略使得预加载脚本访问的 `window` 对象并不是网站所能访问的对象，而是必须要通过 **contextBridge** 中间桥梁管理进行：

```js
// prelaod.js
const { contextBridge } = require('electron')

// 向渲染进程暴露相关对象
contextBridge.exposeInMainWorld('myAPI', {
  test: 'test',
  doAThing: () => {}
})
```

```js
// index.html
console.log(window.myAPI)
```



### 进程通信

进程通信按类型可以分为两种：从渲染进程到主进程的单向通信；渲染进程和主进程之间的双向通信。

1. 从渲染进程到主进程的单向通信: 借助 **ipcRenderer.send()** 在预加载脚本中构建触发事件的方法并暴露给页面，主进程通过 **ipcMain.on()** 侦听事件，这样当页面调用预加载脚本的触发事件方法时，就会触发主进程的事件回调。

   下面是一个修改应用title的简单示例：

   ```js
   // main.js
   const { app, BrowserWindow, ipcMain } = require('electron');
   
   // ipcMain.on 侦听事件 修改标题
   ipcMain.on('change-title', (event, title) => {
     const webContents = event.sender
     const win = BrowserWindow.fromWebContents(webContents)
     win.setTitle(title)
   })
   ```

   ```js
   // preload.js
   const { contextBridge, ipcRenderer } = require('electron')
   
   // 向渲染进程暴露相关对象
   contextBridge.exposeInMainWorld('myAPI', {
     test: 'test',
     changeTitle: (newTitle) => {
       // ipcRenderer 单向通信
       ipcRenderer.send('change-title', newTitle)
     }
   })
   ```

   ```js
   // index.html
     let changeTitleBtn = document.getElementById('changeTitleBtn')
     changeTitleBtn.addEventListener('click', () => {
       window.myAPI.changeTitle('新标题')
     })
   ```

2.  渲染进程和主进程之间的双向通信：与上面类似，借助 **ipcRenderer.invoke()** 在预加载脚本中构建触发事件的方法并暴露给页面，主进程通过 **ipcMain.handle()** 侦听事件，这样当页面调用预加载脚本的触发事件方法时，就会触发主进程的事件回调。

   *注意主进程的事件回调结束需要返回信息，这样页面就可以通过await等待主进程信息返回并处理，实现  页面触发 --> 主进程处理 --> 页面接收处理结果  的双向通信。*

   下面是一个获取所选文件系统路径的简单示例：

   ```js
   // main.js
   const { app, BrowserWindow, ipcMain, dialog } = require('electron');
   
   // ipcMain.handle 返回结果
   ipcMain.handle('dialog:openFile', async () => {
     const { canceled, filePaths } = await dialog.showOpenDialog()
     if (!canceled) {
       return filePaths[0]
     }
   })
   ```

   ```js
   // preload.js
   const { contextBridge, ipcRenderer } = require('electron')
   
   // 向渲染进程暴露相关对象
   contextBridge.exposeInMainWorld('myAPI', {
     test: 'test',
     openFile: () => {
       // ipcRenderer 双向通信
       return ipcRenderer.invoke('dialog:openFile')
     },
   })
   ```

   ```js
   // index.js
   // 双向通信示例 获取文件路径
     const btn = document.getElementById('btn')
     const filePathElement = document.getElementById('filePath')
   
     btn.addEventListener('click', async () => {
       const filePath = await window.myAPI.openFile()
       filePathElement.innerText = filePath
     })
   ```

   

## 应用功能

### 夜间模式

夜间模式的主要实现原理就是 使用electron的 **nativeTheme API** 获取设置系统主题，搭配css的 `prefers-color-scheme` 媒体查询修改不同主题下的页面样式。

```js
// main.js
const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron');

// ipcMain.handle 双向通信，修改系统主题
ipcMain.handle('native-theme:toggle', async () => {
  // 判断当前主题是否为深色模式
  let theme = nativeTheme.shouldUseDarkColors ? 'light' : 'dark';
  nativeTheme.themeSource = theme;
  return theme;
});

ipcMain.handle('native-theme:system', async () => {
  nativeTheme.themeSource = 'system'
  return 'system';
});
```

```css
/* index.css */
/* 媒体查询，根据当前系统设置不同主题样式 */
@media (prefers-color-scheme: light) {
  body {
    background-color: #fff;
    color: #333;
  }
}

@media (prefers-color-scheme: dark) {
  body {
    background-color: #707070;
    color: #fff;
  }
}
```



### 应用菜单

应用菜单主要是通过 `Menu` 相关的API来实现，不过原生的菜单栏样式固定，一般应用都是在页面自定义菜单栏和右键菜单，这里简单介绍一下原生菜单如何创建：

1. 原生应用头部菜单简单实现：

```js
// mian.js
const { app, BrowserWindow, nativeTheme, Menu } = require('electron');
/* 创建应用头部菜单 */
function createAppMenu() {
  let template = [
    { label: '文件' },
    {
      label: '系统',
      submenu: [
        {
          label: '深色模式',
          click: () => {
            nativeTheme.themeSource = 'dark';
          },
        },
        {
          label: '浅色模式',
          click: () => {
            nativeTheme.themeSource = 'light';
          },
        },
        {
          label: '退出',
          click: () => {
            app.quit()
          }
        }
      ]
    },
  ]
  const menu = Menu.buildFromTemplate(template) // 构建菜单对象
  Menu.setApplicationMenu(menu) // 挂载应用菜单
}

app.whenReady().then(() => {
  // ...
  createAppMenu()
});
```

2. 鼠标右键原生菜单简单实现：

   ```js
   // main.js
   // ipcMain侦听页面的事件， 在页面右键点击时弹出原生菜单，并且支持页面自主添加
   ipcMain.on('contextmenu:menu', (event, template) => {
     template = template || []
     const menu = Menu.buildFromTemplate([
       { label: '刷新' },
       ...template,
     ])
     menu.popup()
   })
   
   // index.html
   // 页面容器绑定右键事件触发
   left.addEventListener('contextmenu', (event) => {
       event.preventDefault();
       window.electronAPI.send('contextmenu:menu', [
         {  label: '新增' },
         {  label: '删除' }
       ])
     })
   ```



### 托盘Tray

托盘Tray就是win系统右下角的小图标（不是应用打开时中间的任务窗口图标），这样只要应用没有完全关闭，托盘就会一直存在。可以通过设置使得单击托盘快速打开应用或右击弹出菜单列表。

```js
// main.js
const { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage } = require('electron');

// 主窗口
let mainWindow = null;
const createWindow = () => {
  mainWindow = new BrowserWindow({
    // ...
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // 关闭时只是隐藏主窗口 
  mainWindow.on('close', (event) => {
    event.preventDefault();
    mainWindow.hide();
  })

  mainWindow.on('closed', (event) => {
    mainWindow = null;
  })
};

/* 创建系统托盘 */
function createTray() {
  const icon = nativeImage.createFromPath(path.join(__dirname, 'icon.jpg'))
  const tray = new Tray(icon)
  tray.setTitle('测试APP')
  tray.setToolTip('This is my application')

  // 单击托盘打开主窗口
  tray.on('click', () => {
    mainWindow.show()
  })

  // 添加右键菜单
  const contextMenu = Menu.buildFromTemplate([
    { label: '主窗口', click: () => mainWindow.show() },
    {  type: 'separator' },
    { label: '退出', click: () => {
        // 退出应用需要销毁主窗口后再退出
      mainWindow.destroy()
      app.quit()
    } }
  ])
  tray.setContextMenu(contextMenu)
}

app.whenReady().then(() => {
  createWindow();
  createTray() // 创建Tray
});
```



### 通知Notification

通知Notification 可以分为主进程通知（electron的方法），以及渲染进程通知（浏览器的 Notification API）。

```js
// main.js 主进程通知
const { app, BrowserWindow, ipcMain, Notification } = require('electron');

/* 创建通知, 当然也可以用ipcMain.on监听渲染进程的触发来通知 */
function createNotification(optionParams = {}) {
  const options = {
    icon: path.join(__dirname, 'icon.jpg'),
    title: '通知标题',
    body: '通知内容',
    ...optionParams
  }

  const notify  = new Notification(options)
  notify.show()
  notify.on('click', () => {
    console.log('点击了通知')
  })
}
```

```js
// index.js 渲染进程通知 浏览器Notification API
function check() {
    const options = {
      icon: 'https://www.bilibili.com/favicon.ico',
      body: '通知内容'
    }
    const notify = new Notification('通知标题', options)
    notify.onclick = function () {
      window.open('https://www.bilibili.com')
    }
  }
```



### 快捷键

快捷键操作可以分为页面快捷键和全局快捷键：

- 页面快捷键实现有两种方式：一种是使用 window API 监听页面聚焦时的键盘事件，从而执行对应功能，这是纯js即可实现；另一种是借助Electron 的 menu 菜单实现，可以在menu菜单上绑定快捷键（可隐藏原生菜单），这样页面聚焦时按下对应快捷键即可触发menu上绑定的事件。

  ```js
  // index.js  window API 监听页面聚焦时的键盘事件
  window.addEventListener('keydown', (event) => {
      event.preventDefault()
  
      const { key, ctrlKey, shiftKey } = event
      if(!ctrlKey) return
  
      if(key.toLocaleUpperCase() === 'O') {
        console.log('ipcRenderer.send("open File")')
      }
  })
  ```

  ```js
  // main.js   menu 菜单实现页面键盘快捷键
  const { app, BrowserWindow, nativeTheme, Menu } = require('electron');
  /* 创建应用头部菜单 */
  function createAppMenu() {
    let template = [
      { 
        label: '编辑',
        submenu: [
          { 
            label: '文件',
            // 指定菜单对应的快捷键
            accelerator: process.platform === 'darwin' ? 'Cmd+I' : 'Shift+I',
            click: function () {
              console.log('click file menu');
            }
          },
        ]
      }
    ]
    const menu = Menu.buildFromTemplate(template) // 构建菜单对象
    Menu.setApplicationMenu(menu) // 挂载应用菜单
  }
  ```

- 全局快捷键实现需要借助 electron 的 globalShortcut API 实现；此种方式注册的快捷键，只要应用没有完全关闭即使主窗口不在聚焦状态也可以触发。例如微信的截屏快捷键实现。

  ```js
  // main.js
  const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
  
  // 注册全局快捷键
  function registerShortcut() {
    globalShortcut.register('CommandOrControl+Shift+O', () => {
      BrowserWindow.getFocusedWindow().webContents.openDevTools();
    })
  }
  ```




### 对话框dialog

dialog 主要是展示一些常规的信息提示，使用方式也较为简单，更多配置项参考官方文档：

```js
// main.js
const { app, BrowserWindow, ipcMain, dialog } = require('electron');

/* 页面对话框事件 */
ipcMain.handle('dialog', async (event, ...args) => {
  const res = await dialog.showMessageBox(BrowserWindow.fromWebContents(event.sender), ...args )
  return res
})
```

```js
// index.html
  async function popupDialog() {
    const res = await window.electronAPI.invoke('dialog', {
      title: '这是提示',
      type: 'info',
      message: '这是一条消息',
      detail: '这是详情',
      checkboxLabel: '记住选择', // res.checkboxChecked 获取是否选择
      buttons: ['确定', '取消', '忽略'] // res.response 数字与数组索引对应
    })

    console.log(res)
  }
```

此外也还支持打开文件选择框和文件保存框，搭配node的fs模块可以实现文件的读取与写入保存：

```js
// main.js
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { readFile, writeFile } = require('node:fs/promises')

/* 文件选择框事件， 选择文件，返回内容 */
ipcMain.handle('file-choose', async (event, ...args) => {
  const res = await dialog.showOpenDialog(BrowserWindow.fromWebContents(event.sender), ...args )
  if (res.canceled) return
  let filePath = res.filePaths[0]
  const fileData = await readFile(filePath)
  return fileData.toString()
})

/* 文件保存事件， 确认保存文件名称类型，写入内容 */
ipcMain.handle('file-save', async (event, ...args) => {
  let [ option, text ] = args
  console.log(option, text)
  const res = await dialog.showSaveDialog(BrowserWindow.fromWebContents(event.sender), option )
  if (res.canceled) return
  let filePath = res.filePath
  return await writeFile(filePath, text)
})
```



### 多窗口

多窗口的实现主要是通过 `new BrowserWindow` 创建窗口实例，基于此，我们可以实现应用初始化加载窗口以及应用内子窗口的创建与关闭：

```js
// main.js
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('node:path');

// 主窗口
let mainWindow = null, loadingWindow = null;
const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    // ...
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
};

/* 创建加载窗口 */
const createLoadingWindow = () => {
  loadingWindow = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false, // 无边框窗口
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  loadingWindow.loadFile(path.join(__dirname, 'loading.html'));
}

app.whenReady().then(() => {
  createLoadingWindow();
  createMainWindow();
});

// 实现应用初始化加载窗口
ipcMain.on('main-loaded', () => {
  loadingWindow.close();
  mainWindow.show();
})


/* 创建子窗口的方法 */
ipcMain.on('create-child-window', (event, option) => {
  let { needConfirm, windowOption = {}, pageUrl } = option;

  let defaultOption = {
    width: 600,
    height: 400,
    autoHideMenuBar:  true,
    parent: BrowserWindow.getFocusedWindow(event.sender), // 指定父窗口，子窗口会一直在父窗口上面
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  }
  let fullOption = Object.assign(defaultOption, windowOption);
  const childWindow = new BrowserWindow(fullOption);
  childWindow.loadFile(path.join(__dirname, pageUrl));

  // 子窗口关闭时是否需要确认
  childWindow.on('close', async (event) => {
    event.preventDefault()
    if (needConfirm) {
      const res = await dialog.showMessageBox(childWindow, {
        type: 'question',
        title: '提示',
        message: '确定要关闭吗？',
        buttons: ['OK', 'Cancel'],
      })
      if(res.response === 0) {
        childWindow.destroy();
      }
    } else {
      childWindow.close();
    }
  })
})
```

```js
// index.html
// 模拟主窗口数据加载，加载完毕触发关闭加载窗口
setTimeout(() => {
    window.electronAPI.send('main-loaded')
  }, 3000)
	
 // 创建子窗口的方法，传递相关配置参数
  function openAddWindow() {
    window.electronAPI.send('create-child-window', {
      needConfirm: true,
      windowOption: {
        modal: true, // model 模式 不允许越过子窗口操作父窗口
      },
      pageUrl: 'add.html'
    })
  }
```

