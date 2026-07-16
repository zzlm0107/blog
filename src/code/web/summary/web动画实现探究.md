---
title: web动画实现探究
---

如果我们想要让我们开发的web页面变得更加丝滑和流畅，一个常见的方式就是应用动画效果，下面简单介绍下web动画的相关实现方式和进阶技巧:

## transition 过渡

使用css的 `transition` 属性实现过渡效果是动画的最简单表现形式: 下面是一个示例，鼠标移入容器会使box向右偏移，就是使用 transition 过渡实现的。

::: normal-demo transition 过渡

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>
    <style>
        .box {
            width: 50px;
            height: 30px;
            background-color: skyblue;
            transition: all 0.4s;
        }
        .warp:hover .box {
            transform: translateX(100px);
        }
    </style>
    <body>
        <div class="warp">
            <div class="box"></div>
        </div>
    </body>
</html>
```

:::

## animation 动画

使用css的 `animation` 属性也是实现动画的常用方式，先用 `@keyframes` 定义动画，然后在合适的时候通过添加类名等方式应用即可。(博客框架似乎不支持运行js,使用右上角在opencode打开可以预览)

animation 动画，相比 transition过渡，可以实现更加复杂的动画效果，支持定义动画过程中不同时间段的行为方式，也可以通过 `animation-timing-function` 的 steps 属性实现帧动画 。 css animation 属性本身是一个复合属性，更加细节的介绍参考 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/animation)

::: normal-demo animation 动画

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>
    <style>
        .box {
            width: 50px;
            height: 30px;
            background-color: skyblue;
        }

        @keyframes move {
            0% {
                transform: translateX(0) scale(1);
            }
            100% {
                transform: translateX(100px) scale(2);
            }
        }

        .box.active {
            animation: move 2s infinite alternate;
        }
    </style>
    <body>
        <div class="warp">
            <div class="box" onclick="change(event)"></div>
        </div>
    </body>
</html>

<script>
    function change(e) {
        e.target.classList.add("active");
    }
</script>
```

:::

## Web Animations API

浏览器也支持 Web Animations API，即通过 js 定义动画并实现播放暂停等操作，由于内容较多，暂时不做整理，具体可以查阅 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Animations_API)

下面简单实现将上文的的css animation 动画通过 Web Animations API 重构：

```js
e.target.animate(
    [
        { transform: "translateX(0) scale(1)" }, // 动画帧，如果需要增加中间状态可以增加 offset 配置 0-1
        { transform: "translateX(100px) scale(2)" },
    ],
    {
        duration: 2000,
        direction: "alternate",
        iterations: "Infinity",
    },
);
```

## FLIP 动画

FLIP 动画技术，是一种使用动画的高阶技巧， FLIP 即 First Last Invert Play 四种操作的组合缩写, 即想办法获取到元素初始状态和最终状态，然后通过将最终状态的元素用transform等方式先重置到初始位置，再使用Web Animations API或transition过渡实现元素从初始态到最终态的动画播放效果，实现完整的动画效果；理论上只要能获取到动画元素的初始位置信息和结束位置信息(元素的位置信息一般通过 `el.getBoundingClientRect()` 方法获取)，就都可以使用 FLIP 动画技术，是十分灵活的动画技巧。

下面是FLIP在实现图片放大查看操作的具体应用，实现图片是从点击的小图位置逐渐放大到大图位置的动画效果：

```vue
<template>
    <div class="pic-container" @click="handlePreview">
        <img src="https://dummyimage.com/300x400/c2c2c2e" alt="" />
        <img src="https://dummyimage.com/200x700/ded462" alt="" />
        <img src="https://dummyimage.com/1000x300/82d99f" alt="" />
    </div>

    <div class="mask" v-show="previewFlag" @click="handleClose">
        <img ref="previewImg" :src="previewSrc" alt="" />
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, useTemplateRef, nextTick } from "vue";

const previewImgRef = useTemplateRef<HTMLImageElement>("previewImg");
let animation: Animation | null = null;
const previewFlag = ref(false);
const previewSrc = ref("");
const previewFLIP = reactive({
    first: { x: 0, y: 0, w: 0, h: 0 },
    last: { x: 0, y: 0, w: 0, h: 0 },
});

function handlePreview(event: MouseEvent) {
    if ((event.target as HTMLElement).tagName !== "IMG") return;
    let src = (event.target as HTMLImageElement).src;
    // 1. First 记录点击的图片位置
    let firstImgRect = (
        event.target as HTMLImageElement
    ).getBoundingClientRect();
    previewFLIP.first = {
        x: firstImgRect.left,
        y: firstImgRect.top,
        w: firstImgRect.width,
        h: firstImgRect.height,
    };
    previewFlag.value = true;
    previewSrc.value = src;

    // 2. Last 记录放大的图片位置
    nextTick(() => {
        let lastImgRect = previewImgRef.value!.getBoundingClientRect();
        previewFLIP.last = {
            x: lastImgRect.left,
            y: lastImgRect.top,
            w: lastImgRect.width,
            h: lastImgRect.height,
        };

        // 3. Invert: 计算从大图位置"瞬移"到缩略图位置需要的 transform
        const dx = previewFLIP.first.x - previewFLIP.last.x;
        const dy = previewFLIP.first.y - previewFLIP.last.y;
        const sx = previewFLIP.first.w / previewFLIP.last.w;
        const sy = previewFLIP.first.h / previewFLIP.last.h;

        // 4. 使用animate动画
        animation = previewImgRef.value!.animate(
            [
                {
                    transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`,
                },
                { transform: "translate(0, 0) scale(1)" },
            ],
            {
                duration: 400,
                easing: "ease-in-out",
            },
        );
    });
}

// 关闭预览
function handleClose() {
    // 直接使用反向动画即可, 动画结束后关闭遮罩
    animation!.reverse();
    animation!.finished.then(() => {
        previewFlag.value = false;
    });
}
</script>

<style scoped>
.pic-container img {
    width: 100px;
    margin-right: 10px;
}

.mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
}

.mask img {
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    transform-origin: 0 0;
}
</style>
```

## Transition 组件实现不定高度过渡

在Vue工程中，当我们想实现过渡效果时，可以使用Vue的Transition组件。Transition组件提供了一个简单而强大的方式来实现元素的过渡效果，包括进入和离开的动画。

> transition组件是一个抽象组件，不会渲染出任何的Dom，它主要是帮助我们更加方便的写出动画。以插槽的形式对内部单一的子节点进行动画的管理，在渲染阶段就会往子节点的虚拟Dom上挂载一个transition属性，表示它的一个被transition组件包裹的节点，在path阶段就会执行transition组件内部钩子，钩子里分为enter和leave状态，在这个被包裹的子节点上使用v-if或v-show进行状态的切换。你可以使用Css也可以使用JavaScript钩子，使用Css方式时会在enter/leave状态内进行class类名的添加和删除，用户只需要写出对应类名的动画即可。如果使用JavaScript钩子，则也是按照顺序的执行指定的函数，而这些函数也是需要用户自己定义，组件只是控制这个的流程而已。

*当然使用FLIP也是可以实现的,但是需要js获取高度，这里主要探究使用css 实现*

而要使用 Transition 组件实现不定高度过渡，比较合理的实现方式是搭配 grid 布局来使用，因为对于高度会变化的不确定元素来说，使用 max-height 限制高度搭配 transition 属性实现过渡可行但不够优雅，而且需要大概确定 内容高度否则动画时间会异常；而 grid布局的 grid-template-rows: 0fr -> 1fr 是支持过渡的，所以我们只需要将容器调整为 grid 布局，子容器高度设为0，然后再使用 Transition 组件 的 css 过渡类即可优雅的完成高度变化过渡。

```vue
<template>
<transition name="expand">
    <div class="show-clearindicator item-popup animate" v-show="currentTab === '清待办'">
        <div class="item-popup-content">
            <!-- 具体内容 -->
        </div>
    </div>
</transition>
</template>

<style scoped>
.item-popup.animate {
    display: grid;
    overflow: hidden;
}
/* 确保子容器没有默认高度和上下的margin padding */
.item-popup.animate>.item-popup-content { min-height: 0; padding: 0 0.2rem; }
.expand-enter-from {
    grid-template-rows: 0fr;
}
.expand-enter-to {
    grid-template-rows: 1fr;
}
.expand-enter-active {
  transition: grid-template-rows .5s;
}
.expand-leave-from {
    grid-template-rows: 1fr;
}
.expand-leave-to {
    grid-template-rows: 0fr;
}
.expand-leave-active {
    transition: grid-template-rows .6s;
}
</style>
```

## TransitionGroup 组件与 FILP 实现

Vue TransitionGroup 组件，是用来实现列表多个元素的过渡效果，根据 [vue 官网](https://cn.vuejs.org/guide/built-ins/transition-group.html) 的示例，想要实现优雅的动画效果，主要是让移动中的元素也使用过渡效果并对移除的元素改为绝对定位让其脱离文档流，在执行移除动画。

```vue
<template>
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</TransitionGroup>
</template>

<style scoped>
/* 移动中的元素 vue 会添加 *-move类名，所以对移动中的元素应用过渡让动画更优雅 */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除，以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
</style>
```

下面是通过传统的 FLIP 技术实现列表元素增加与删除过渡效果的代码：

```vue
<template>
  <div>
    <button @click="addElement">随机添加一个</button>
    <button @click="removeElement">随机删除一个</button>
  </div>
  <ul>
    <li v-for="item in list" :key="item.id" :class="{ 'list-leave-active': item.leaving }">
      {{ item.text }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

interface ListItem {
  id: number
  text: number
  leaving?: boolean // 元素正在移除
}

const list = ref<ListItem[]>([
  { id: 1, text: 1 },
  { id: 2, text: 2 },
  { id: 3, text: 3 },
  { id: 4, text: 4 },
  { id: 5, text: 5 },
  { id: 6, text: 6 },
  { id: 7, text: 7 },
  { id: 8, text: 8 },
  { id: 9, text: 9 },
  { id: 10, text: 10 }
])
const num = ref(11)

// 在随机位置添加元素
function addElement() {
  const randomIndex = Math.floor(Math.random() * list.value.length)
  list.value.splice(randomIndex, 0, { id: num.value, text: num.value })
  num.value++
  handleFLIP('add')
}

// 随机位置删除元素
function removeElement() {
  // 过滤掉已经在删除中的元素
  const availableItems = list.value.filter(item => !item.leaving)
  if (availableItems.length === 0) return

  const randomItem = availableItems[Math.floor(Math.random() * availableItems.length)]
  randomItem.leaving = true
  handleFLIP('remove', randomItem.id)
}

// 元素添加或删除时的FLIP动画实现
function handleFLIP(type: 'add' | 'remove', removeId?: number) {
  // 1. First 记录所有元素的初始位置  使用 WeakMap ，避免内存泄漏问题
  const elementsFirstPosition = new WeakMap<HTMLElement, { top: number }>()
  const liElementsFirst = document.querySelectorAll<HTMLLIElement>('li')
  liElementsFirst.forEach(item => {
    elementsFirstPosition.set(item, { top: item.getBoundingClientRect().top })
  })

  nextTick(() => {
    // 2. Last 获取最终状态的所有元素，方便获取元素位置信息
    const liElementsAfter = document.querySelectorAll<HTMLLIElement>('li')

    if (type === 'add') {
      // 新增元素，控制其他元素位置与新增元素动画即可
      liElementsAfter.forEach(el => {
        const first = elementsFirstPosition.get(el)
        if (first) {
          // 非新增元素  3 Invert + 4 Play 计算偏移值，播放动画
          const dy = first.top - el.getBoundingClientRect().top
          if (dy !== 0) {
            el.animate(
              [{ transform: `translateY(${dy}px)` }, { transform: 'translateY(0)' }],
              { duration: 400, easing: 'ease-in-out' }
            )
          }
        } else {
          // 新增元素  3 Invert + 4 Play 计算偏移值，播放动画
          el.animate(
            [{ transform: 'translateX(50px)', opacity: 0.2 }, { transform: 'translateX(0)', opacity: 1 }],
            { duration: 400, easing: 'ease-in-out' }
          )
        }
      })
    } else {
      // 移除元素，延迟移除，等动画结束再真正移除
      liElementsAfter.forEach(el => {
        const first = elementsFirstPosition.get(el)
        if (!el.classList.contains('list-leave-active')) {
          // 非移除元素  3 Invert + 4 Play 计算偏移值，播放动画
          const dy = first!.top - el.getBoundingClientRect().top
          if (dy !== 0) {
            el.animate(
              [{ transform: `translateY(${dy}px)` }, { transform: 'translateY(0)' }],
              { duration: 400, easing: 'ease-in-out' }
            )
          }
        } else {
          // 移除元素  3 Invert + 4 Play 计算偏移值，播放动画
          const removeAnimation = el.animate(
            [{ transform: 'translateX(0px)', opacity: 1 }, { transform: 'translateX(50px)', opacity: 0.2 }],
            { duration: 400, easing: 'ease-in-out' }
          )
          // 动画结束后，真正删除元素
          removeAnimation.finished.then(() => {
            const index = list.value.findIndex(i => i.id === removeId)
            if (index !== -1) {
              list.value.splice(index, 1)
            }
          })
        }
      })
    }
  })
}
</script>

<style scoped>
button {
  margin-right: 10px;
}

ul {
  list-style: none;
  padding: 0;
  position: relative;
}

li {
  width: 300px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: rgb(255, 209, 123);
  border-radius: 5px;
  margin-bottom: 10px;
  transition: all 0.4s ease-in-out;
}

/* 离开的元素，脱离文档流，才能让其他元素平滑上移 */
.list-leave-active {
  position: absolute;
}
</style>
```

