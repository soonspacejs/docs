---
sidebarDepth: 2
---

# vue-soonspace

![beta](https://img.shields.io/npm/v/vue-soonspace/latest.svg)
<br>
Vue 中快速使用 soonspacejs。

<!-- 安装 -->

## 安装

```bash
npm install vue-soonspace soonspacejs -S
# or
yarn add vue-soonspace soonspacejs -S
```

::: tip 提示
安装 `vue-soonspace` 插件时，要同时安装 `soonspacejs`，但是注册 **前者** 组件时不必手动引入 **后者**，内部自动引入。这样做是为了保证 **后者** 版本最新，不受版本依赖限制。
:::

<!-- 使用方式 -->

## 使用方式

### main.js

#### Vue 2.x

```js {3,7}
import Vue from 'vue';
import App from './App.vue';
import VueSoonspace from 'vue-soonspace';

Vue.config.productionTip = false;

Vue.use(VueSoonspace);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
```

#### Vue 3.x

```js {3,7}
import { createApp } from 'vue';
import App from './App.vue';
import VueSoonspace from 'vue-soonspace';

const app = createApp(App);

app.use(VueSoonspace);
app.mount('#app');
```

### App.vue

```vue {2-21}
<template>
  <vue-soonspace
    id="selfId"
    className="selfClass"
    :customStyle="{
      width: '50vw',
      height: '50vh',
      position: 'fixed',
      top: '0',
      left: '0',
    }"
    :options="{
      showInfo: true,
      background: {
        color: 0x333300,
      },
    }"
    @sceneReady="sceneReady"
    @modelClick="modelClick"
    @selectPosition="selectPosition"
  />
</template>

<script>
export default {
  name: 'app',
  methods: {
    sceneReady(ssp) {
      console.log('sceneReady', ssp);

      /**
       * TODO
       */
    },
    modelClick(param) {
      console.log('modelClick', param);
    },
    selectPosition(position) {
      console.log('selectPosition', position);
    },
  },
};
</script>

<style>
html,
body,
#app {
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
```

<!-- 属性 -->

## 配置属性

### id

自定义 `id`

- **类型：** string
- **默认值：** `SoonSpace_View${idIndex++}`

### className

自定义类名

- **类型：** [Vue.class](https://cn.vuejs.org/v2/guide/class-and-style.html)
- **默认值：** `undefined`

### customStyle

自定义样式

- **类型：** object
- **默认值：**

```js
  {
    position: 'relative',
    width: '100%',
    height: '100%'
  }
```

### options

[soonspace 配置项](../../guide/config.html)

- **类型：** object
- **默认值：** `{}`

<!-- 方法 -->

## 方法属性

### sceneReady

场景准备完成时触发函数。

#### 回调参数

##### ssp

`soonspace` 实例

> 实例存储推荐使用插件 [Sspx](./sspx.html)，或保存在 `Vue` 原型上，你要保存在组件数据中，避免空间数据被劫持。

正确写法
```js
import Vue from 'vue'

export default {
  methods: {
    sceneReady(ssp) {
      Vue.prototype.$ssp = ssp;
    }
  }
}
```

错误写法
```js
export default {
  data() {
    return {
      ssp: null
    }
  },
  methods: {
    sceneReady(ssp) {
      this.ssp = ssp;
    }
  }
}
```

<br>
<br>

::: tip 提示
以下方法全部为 [soonspace 空间交互事件](../../guide/event.html) 在 `vue-soonspace` 组件内的事件传递，方法名与回调参数完全一致。
:::

### modelClick

### modelRightClick

### modelDblClick

### modelHover

### modelUnHover

### poiClick

### poiRightClick

### poiDblClick

### poiHover

### selectPosition

### sceneClick
