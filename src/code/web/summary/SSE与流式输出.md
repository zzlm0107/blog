---
title: SSE与流式输出
---

前后端通信有时需要服务端主动推送信息给前端，除了 **轮询** 外，目前还有两种主流实现方式即 **SSE** 和 **websocket**, websocket 是一种双工通信协议，暂且不展开讨论，下面主要介绍 SSE：

## Server-Sent Events

Server-Sent Events (SSE) 这是 HTML5 提供的一种事件推送机制，客户端通过EventSource API发起请求后，服务器会保持长连接，并持续、单向地向客户端推送数据流。适用场景如实时通知，新闻推送，大模型实时输出等。

- 优点：实现简单，基于HTTP协议；浏览器原生支持EventSource API；内置自动断线重连机制；相比WebSocket更轻量，在单向推送场景下资源消耗更低。
- 缺点：仅支持服务器到客户端的单向通信；不支持二进制数据，且仅支持 GET 请求，不适合复杂场景。

在技术实现上，需要前后端配合：

1. 后端方面，需要指定 Content-Type 为 `text/event-stream `,并且注意SSE数据格式为 `data: xxxx\n\n`，如果表示发送完毕还需要补充 `data: [DONE]\n\n`，默认不传的事件类型是message事件；如果我们需要传递其他的事件类型和数据，只需要服务端按格式写入 `event: 事件名\n` 表示事件名，紧接着写入对应的data数据。
2. 客户端方面，需要创建一个 EventSource 实例，指定服务器端的URL，即可开始监听服务器端推送的事件。服务端默认发送的SSE数据会触发 EventSource 的 message 事件；如果服务端发送了自定义事件，客户端也需要监听同名事件，才能收到对应的事件数据。

前端方面相关代码如下：

```js
const input = document.querySelector('input')

let SessionId = '' // 会话记忆 id
let currentEventSource = null // 保存当前的 EventSource 实例以便关闭

function sendMsg() {
  // 如果已有连接，先关闭（防止重复发送或内存泄漏）
  if (currentEventSource) currentEventSource.close()

  const userMsg = input.value

  // 构建 URL：注意 EventSource 仅支持 GET，参数需拼接到 URL 中
  let url = `http://localhost:8866/AIChat?msg=${encodeURIComponent(userMsg)}`

  // 创建 EventSource 连接
  currentEventSource = new EventSource(url)
  // 监听自定义事件
  currentEventSource.addEventListener('session-id', function (event) {
    // 只接收 event: session-id 的消息
    console.log('Session ID message:', event.data)
    SessionId = event.data
  })

  let resText = '' // 大模型响应的全部内容
  // 监听默认消息事件
  currentEventSource.onmessage = function (event) {
    if (event.data === '[DONE]') {
      currentEventSource.close()
      currentEventSource = null
      return
    }

    // 累加内容并渲染 Markdown
    console.log(event.data)
    resText += event.data
  }
}
```

## fetch + ReadableStream

由于 EventSource API 仅支持 GET 请求，无法处理复杂传参场景，所以实际上更常见的应用方式是通过 fetch + ReadableStream 处理；手动解析流数据，下面是一个前后端关于ai流式输出的场景演示：

后端方面使用nestjs, 部分核心代码如下,主要参考学习设置 SSE 响应头 和 发送 event 与 data 部分的内容

```ts
// 设置 SSE 格式的响应头, 并立刻刷新响应头
res.setHeader('Content-Type', 'text/event-stream')
res.setHeader('Cache-Control', 'no-cache')
res.setHeader('Connection', 'keep-alive')
res.flushHeaders()

// ...
// 创建 AbortController 用于支持前端中断本次生成，以 timeStamp 为唯一标识
const controller = new AbortController()
this.abortControllers.set(userMessageInfo.timeStamp, controller)

const completion = await this.aiClient.chat.completions.create(
  {
    model,
    messages: [
      { role: 'system', content: this.configService.get<string>('ai.systemPrompt')! },
      ...messageHistory,
      { role: 'user', content: userMessageInfo.content },
    ],
    stream: true,
  },
  { signal: controller.signal },
)

// deepseek 默认开启思考模式，大模型输出时会先输出思考内容，再输出最终内容
// {"delta":{"content":null,"reasoning_content":"的时间"}} 思考时返回格式示例，取 reasoning_content
// {"delta":{"content":"作为","reasoning_content":null}} 最终内容返回格式示例，取 content

// 4. 遍历大模型输出流，根据思考内容和最终内容分别发送sse事件 reasoning | content
for await (const chunk of completion) {
  const delta = chunk.choices[0]?.delta as { content?: string | null; reasoning_content?: string | null } | undefined
  const reasoningContent = delta?.reasoning_content ?? ''
  const content = delta?.content ?? ''

  if (reasoningContent) {
    res.write(`event: reasoning\n`)
    res.write(`data: ${JSON.stringify({ reasoningContent })}\n\n`)
    fullReasoningContent += reasoningContent
  }

  if (content) {
    res.write(`event: content\n`)
    res.write(`data: ${JSON.stringify({ content })}\n\n`)
    fullContent += content
  }
}

//...
res.write(`event: done\n`)
res.write(`data: ${JSON.stringify({ done: true })}\n\n`)
res.end()
```

前端方面通过 fetch + ReadableStream 处理流数据，手动解析流数据组装成一个个SSE数据块后，交给相应函数处理

```ts
const resp = await fetch(`${baseURL}/chat`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  body: JSON.stringify({
    sessionId: chatStore.currentSessionId,
    content: text,
  }),
})
if (!resp.ok) {
  let errInfo = await resp.json()
  ElMessage.error(errInfo.message[0] || '请求失败')
}

const reader = resp.body!.getReader()
const decoder = new TextDecoder()
let buffer = '' // 累积未解析完的 SSE 文本

while (true) {
  const { done, value } = await reader.read()
  if (done) break

  // 换行符兼容 流先进入buffer文本，防止事件被网络分块截断，等组合出一个完整的sse块 再解析
  buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, '\n')
  let sepIdx
  while ((sepIdx = buffer.indexOf('\n\n')) !== -1) {
    handleSseEvent(buffer.slice(0, sepIdx))
    buffer = buffer.slice(sepIdx + 2)
  }
}
```

解析SSE数据块参考方法
```ts
// ------------------- 解析单个 SSE 事件块（event: xxx \n data: {...}） -------------------
async function handleSseEvent(block: string) {
  let event = ''
  let sseData = ''
  for (const line of block.split('\n')) {
    if (line.startsWith('event:')) event = line.slice(6).trim()
    else if (line.startsWith('data:')) sseData = line.slice(5).trim()
  }

  const payload = JSON.parse(sseData)
  if (event === 'reasoning') {
    // ...
  } else if (event === 'content') {
    // ...
  } else if (event === 'done') {
    // ...
  }
}
```