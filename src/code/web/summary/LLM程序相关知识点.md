---
title: LLM程序相关知识点
---

LLM（Large Language Model） 即大语言模型，是目前各类ai的基石，这里主要介绍在开发ai相关网站或应用时，需要了解实现的一些知识点。

## 流式输出的原理与实现

ai网站的一个主要特点就是 **流式输出**，由于ai在接收到用户输入后，需要花时间处理，如果等ai把所有内容全部生成完毕再返回，会导致用户等待时间过长，影响用户体验。所以，流式输出是必要的，即ai一边生产内容一边实时向用户展示处理。

目前主流的实现方式有两种：**SSE** 和 **websocket**。 由于 websocket 需要新开协议，改动较大，目前大部分网站还是使用基于 SSE 的技术。这里主要介绍 SSE：

Server-Sent Events (SSE) 这是 HTML5 提供的一种事件推送机制，客户端通过EventSource API发起请求后，服务器会保持长连接，并持续、单向地向客户端推送数据流。适用场景如实时通知，新闻推送，大模型实时输出等。 SSE发送的数据是字符串，且标准格式遵循 `data: xxxx\n\n`，如果表示发送完毕还需要补充 `data: [DONE]\n\n`，默认不传的事件类型是message事件；如果需要传递其他的事件类型和数据，只需要服务端按格式写入 `event: 事件名\n` 表示事件名，紧接着写入对应的data数据即可。

- 优点：实现简单，基于HTTP协议；浏览器原生支持EventSource API；内置自动断线重连机制；相比WebSocket更轻量，在单向推送场景下资源消耗更低。
- 缺点：仅支持服务器到客户端的单向通信；不支持二进制数据，且仅支持 GET 请求，不适合复杂场景。

在技术实现上，需要前后端配合：

1. 后端方面，需要指定接口返回的 Content-Type 为 `text/event-stream `，且接入ai模型后，也是需要循环一边接收ai模型的输出,一边整理成sse数据格式再向客户端推送数据。
2. 客户端方面，需要创建一个 EventSource 实例，指定服务器端的URL，即可开始监听服务器端推送的事件。服务端默认发送的SSE数据会触发 EventSource 的 message 事件；如果服务端发送了自定义事件，客户端也需要监听同名事件，才能收到对应的事件数据。

前端方面相关代码如下：

```js
const input = document.querySelector('input')

let SessionId = '' // 会话记忆 id
let currentEventSource = null // 保存当前的 EventSource 实例以便关闭

function sendMsg() {
  if (currentEventSource) currentEventSource.close()
  const userMsg = input.value

  // 构建 URL：注意 EventSource 仅支持 GET，参数需拼接到 URL 中
  let url = `http://localhost:8866/AIChat?msg=${encodeURIComponent(userMsg)}`

  currentEventSource = new EventSource(url)
  // 监听自定义事件
  currentEventSource.addEventListener('session-id', function (event) {
    console.log('Session ID message:', event.data)
    SessionId = event.data
  })

  let resText = '' // 大模型响应的全部内容
  currentEventSource.onmessage = function (event) {
    if (event.data === '[DONE]') {
      currentEventSource.close()
      currentEventSource = null
      return
    }

    console.log(event.data)
    resText += event.data
  }
}
```

## fetch + ReadableStream 组合

由于 EventSource API 仅支持 GET 请求，无法处理复杂传参场景，所以实际上更常见的应用方式是 fetch + ReadableStream 组合；即客户端用fetch发起请求，接收到服务端返回的SSE数据流后，手动解析流数据，下面是一个前后端关于ai流式输出的场景演示：

后端方面使用nestjs, 部分核心代码如下, 以下是一个简单的连接在线LLM并返回各种事件类型和流数据的示例：

```ts
// 设置 SSE 格式的响应头, 并立刻刷新响应头
res.setHeader('Content-Type', 'text/event-stream')
res.setHeader('Cache-Control', 'no-cache')
res.setHeader('Connection', 'keep-alive')
res.flushHeaders()

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

前端方面通过 fetch + ReadableStream 组合，手动解析流数据组装成一个个SSE数据块后，交给相应函数处理

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

## 大模型的工具调用

上面介绍了的流式输出原理与实现，这一步已经实现了基础的接入在线LLM并调用展示流式输出的功能。但我们也只是简单的把用户输入直接发送给在线模型，同时把模型输出内容返回给前端展示；但这没有和生产系统相关联，所以想更进一步解锁大模型的能力，就需要调用外部工具。

Tool Calling 是大模型能力的一个扩展，它允许大模型调用外部工具或服务，以完成更复杂的任务。具体的实现方式就是： 我们在接入大模型时，指定一个工具列表，大模型在生成输出时，根据上下文判断是否需要调用工具，如果需要调用工具，大模型会先暂时返回工具调用列表并整理入参；服务端在接收整理LLM返回内容时，如果发现返回内容有工具调用数组，就需要执行对应的工具拿到调用结果，然后再次连接大模型，把之前的思维链，工具调用结果等再推入消息数组传给LLM， 这样大模型就拿到了工具调用结果，进而继续输出后续内容。

下面是一个基础的获取天气的tool Schema, 参考一个工具定义的规范格式：

```ts
// 工具定义：获取一个地区的天气
export const getWeatherTool = {
  type: 'function' as const,
  function: {
    name: 'get_weather',
    description: '获取一个地区的天气, 用户需要提供一个地区名称作为查询参数',
    parameters: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
          description: '要查询的地区名称',
        },
      },
      required: ['location'],
    },
  },
}

// 获取一个地区的天气（异步返回模拟查询）
export async function getWeather(params: { location: string }): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`天气晴朗，${params.location}的温度是25摄氏度`)
    }, 2000)
  })
}
```

除了工具定义，还需要注意 Tool Loop，即大模型可能会进行多轮工具调用，因此我们需要循环判断是否有工具调用数组，如果有就得整理消息数组再次连接大模型知道返回里没有工具调用数组，就可判断大模型已经完成了任务。下面是实现 Tool Loop 的部分代码：

```ts
// 组装本次对话给大模型的消息数组
const buildHistory = messageHistory.map((item) => {
  if (item.role === 'assistant' && item.toolCalls) {
    return {
      role: 'assistant',
      tool_calls: JSON.parse(item.toolCalls) as unknown,
      reasoning_content: item.reasoning,
      content: item.content,
    }
  } else if (item.role === 'assistant' && !item.toolCalls) {
    return { role: 'assistant', reasoning_content: item.reasoning, content: item.content }
  } else if (item.role === 'tool') {
    return { role: 'tool', tool_call_id: item.toolCallId, content: item.content }
  } else {
    return { role: item.role, content: item.content }
  }
})
const allMessages = [
  { role: 'system', content: this.configService.get<string>('ai.systemPrompt')! },
  ...buildHistory,
  { role: 'user', content: userMessageInfo.content },
]

// 记录本轮所有需要入库的消息（包含工具调用轮和最终回答）
const persistedMessages: Array<Record<string, string>> = []

// 4. 工具调用循环
const MAX_TOOL_ROUNDS = 10
let toolRounds = 0

while (true) {
  const completion = await this.aiClient.chat.completions.create(
    {
      model,
      tools: toolSchemas,
      messages: allMessages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
      stream: true,
    },
    { signal: controller.signal },
  )

  let roundReasoning = ''
  let roundContent = ''
  // 流式返回的 tool_calls 是碎片的，需要用数组按 index 聚合并拼接参数
  const callBuffer: Array<{ id: string; type: string; function: { name: string; arguments: string } }> = []

  // deepseek 默认开启思考模式，大模型输出时会先输出思考内容，再输出最终内容
  // 遍历大模型输出流，分别发送 reasoning | content 的 sse 事件，并收集 tool_calls 片段
  try {
    for await (const chunk of completion) {
      const delta = chunk.choices[0]?.delta as
        | {
            content?: string | null
            reasoning_content?: string | null
            tool_calls?: Array<{
              index: number
              id?: string
              function?: { name?: string | null; arguments?: string | null }
            }>
          }
        | undefined

      // 聚合流式工具调用片段
      const toolCalls = delta?.tool_calls
      if (toolCalls) {
        toolCalls.forEach((tc) => {
          if (!callBuffer[tc.index]) {
            callBuffer[tc.index] = { id: '', type: 'function', function: { name: '', arguments: '' } }
          }
          if (tc.id) callBuffer[tc.index].id = tc.id
          if (tc.function?.name) callBuffer[tc.index].function.name += tc.function.name
          if (tc.function?.arguments) callBuffer[tc.index].function.arguments += tc.function.arguments
        })
      }

      const reasoningContent = delta?.reasoning_content ?? ''
      const content = delta?.content ?? ''

      if (reasoningContent) {
        res.write(`event: reasoning\n`)
        res.write(`data: ${JSON.stringify({ reasoningContent })}\n\n`)
        roundReasoning += reasoningContent
      }

      if (content) {
        res.write(`event: content\n`)
        res.write(`data: ${JSON.stringify({ content })}\n\n`)
        roundContent += content
        fullContent += content
      }
    }
  } catch (error) {
    // 前端触发了中断，仅放行 AbortError，已生成的思考内容和回答内容照常进入后续入库流程
    if (!(error instanceof Error && error.name === 'AbortError')) throw error
    this.logger.log(`用户中断了本次生成 abortId=${userMessageInfo.abortId}`)
    if (res.writableEnded) throw error
  }

  // callBuffer 中模型返回的索引不一定是连续的，需要过滤掉索引为 undefined 的项
  const toolCalls = callBuffer.filter(Boolean)

  if (toolCalls.length > 0) {
    // 有工具调用 → 消息数组添加工具调用消息，并依次执行工具后把结果追加到消息数组
    // SSE 通知前端正在进行工具调用
    const callTip = `正在调用工具${toolCalls.map((t) => t.function?.name).join('、')}...`
    res.write(`event: reasoning\n`)
    res.write(`data: ${JSON.stringify({ reasoningContent: callTip })}\n\n`)
    roundReasoning += callTip

    allMessages.push({
      role: 'assistant',
      reasoning_content: roundReasoning,
      content: roundContent || '',
      tool_calls: toolCalls,
    })
    persistedMessages.push({
      role: 'assistant',
      reasoning: roundReasoning,
      toolCalls: JSON.stringify(toolCalls),
      toolCallId: '',
      content: roundContent,
      createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    })

    // 逐个执行当前轮次的工具调用
    for (const tCall of toolCalls) {
      let args = {}
      try {
        args = JSON.parse(tCall.function?.arguments || '{}') as object
      } catch {
        args = {}
      }

      const result = await executeTool(tCall.function?.name, args)

      allMessages.push({ role: 'tool', tool_call_id: tCall.id, content: result })
      persistedMessages.push({
        role: 'tool',
        reasoning: '',
        toolCalls: '',
        toolCallId: tCall.id,
        content: result,
        createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      })
      // SSE 通知前端本轮工具调用结果
      // res.write(`event: tool-result\n`);
      // res.write(`data: ${JSON.stringify({ toolCallId: tCall.id, result })}\n\n`);
    }

    if (++toolRounds > MAX_TOOL_ROUNDS) {
      throw new Error('工具调用次数超过上限，已终止本次生成')
    }
  } else {
    // 无工具调用 → 本轮为最终正式回答，跳出循环
    persistedMessages.push({
      role: 'assistant',
      reasoning: roundReasoning,
      toolCalls: '',
      toolCallId: '',
      content: roundContent,
      createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    })
    break
  }
}
```

**补充： 对比 Tool 与 Skill 的区别**

- Tool Calling 是LLM的一种原生底层能力。它解决的是模型与外部世界的连接，模型本身并不执行该工具，真正的执行由外部应用代码完成；具有原子性和无状态性。
- Skills是构建在Tool Calling等底层机制之上的上层应用抽象；通过渐进式披露，制定了一份完整的工作流，指导模型在特定问题下如何规范化工作，产生相同的结构化输出，同时避免每次执行相关工作时都要输入相同的提示词, 其内部可能会涉及工具调用。
- Tool 是模型底层能力，需要在接入模型时配置，才能使用。而Skill是上层应用抽象，本身并不是配置项；如果想接入skill，我们可以直接把skill也做成一个工具，内部直接描述各种skill的适合环境，当模型需要执行skill时，先通过工具渐进式披露获取到全部的skill内容，再由模型按skill约束规范进一步执行后续操作。