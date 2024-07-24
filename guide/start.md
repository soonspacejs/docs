# 快速上手

## hello-world

<Docs-Iframe src="start/helloWorld.html" />

## 使用

推荐使用 [Vite](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project) 快速搭建项目

#### 在 Vue3 中使用

```html
<template>
  <div id="view"></div>
</template>

<script setup>
  import { onMounted, onUnmounted } from 'vue';
  import SoonSpace from 'soonspacejs';

  let ssp;
  onMounted(() => {
    ssp = new SoonSpace({
      el: '#view',
      options: {
        showGrid: true,
      },
    });
  });

  // 组件卸载后，卸载 ssp
  onUnmounted(() => ssp.dispose());
</script>
```

或使用 [vue-soonspace](../plugin/vue-soonspace)

#### 在 React 中使用

```js
import { useEffect } from 'react';
import SoonSpace from 'soonspacejs';

function App() {
  useEffect(() => {
    const ssp = new SoonSpace({
      el: '#view',
      options: {
        showGrid: true,
      },
    });

    return () => {
      // 组件卸载后，卸载 ssp
      ssp.dispose();
    };
  }, []);

  return <div id="view"></div>;
}
```

或使用 [react-soonspace](../plugin/react-soonspace)

#### CDN

[https://unpkg.com/soonspacejs/dist/index.esm.js](https://unpkg.com/soonspacejs/dist/index.esm.js)

### 在 html 中使用

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>SoonSpace Example</title>
    <style>
      body {
        margin: 0;
      }
      #view {
        width: 100vw;
        height: 100vh;
      }
    </style>
  </head>

  <body>
    <div id="view"></div>

    <script type="importmap">
      {
        "imports": {
          "three": "https://unpkg.com/three/build/three.module.js",
          "three/examples/": "https://unpkg.com/three/examples/",
          "three-mesh-bvh": "https://unpkg.com/three-mesh-bvh@0.5.23/build/index.module.js",
          "soonspacejs": "https://unpkg.com/soonspacejs/dist/index.esm.js"
        }
      }
    </script>
    <script type="module">
      import SoonSpace from 'soonspacejs';

      const ssp = new SoonSpace({
        // 绑定场景的元素选择器
        el: '#view',
        // 初始配置项
        options: {
          // 是否显示网格
          showGrid: true,
        },
        // 场景交互事件
        events: {
          // 模型点击
          modelClick({ target, currentTarget }) {
            console.log(target, currentTarget);
          },
        },
      });
    </script>
  </body>
</html>
```
