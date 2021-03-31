---
sidebarDepth: 2
---

# react-soonspace
![beta](https://img.shields.io/npm/v/react-soonspace/next.svg)
<br>
React 中快速使用 soonspacejs。

<!-- 项目模版 -->
## 项目模版
[https://github.com/soonspacejs/react-soonspace-template](https://github.com/soonspacejs/react-soonspace-template)

## 安装
```bash
npm install react-soonspace@next soonspacejs@next -S
# or
yarn add react-soonspace@next soonspacejs@next -S
```

::: tip 提示
安装 `react-soonspace` 插件时，要同时安装 `soonspacejs`，但在使用 **前者** 组件时不必手动引入 **后者**，内部自动引入。这样做是为了保证 **后者** 版本最新，不受版本依赖限制。
:::


<!-- 使用方法 -->
## 使用方法

```jsx {2,21-31}
import React from 'react';
import ReactSoonspace from 'react-soonspace';

export default function SoonspaceTest () {

  function sceneReady(ssp) {
    console.log('sceneReady', ssp)

    /**
     * TODO
     */

  }

  function selectPosition(position) {
    console.log('selectPosition', position)
  }

  return (
    <div className="App">
      <ReactSoonspace
        className='soonspace-view'
        options={{
          showInfo: false,
          background: {
            color: 0x333300
          }
        }}
        sceneReady={sceneReady}
        selectPosition={selectPosition}
      />
    </div>
  )

}
```

## 配置属性

### id
  自定义ID
  - **类型：** string
  - **默认值：** `SoonSpace_View${idIndex++}`

### className
  自定义类名
  - **类型：** string
  - **默认值：** `undefined`

### style
  自定义样式
  - **类型：** [React.CSSProperties](https://www.npmjs.com/package/csstype)
  - **默认值：** 
```js
  {
    position: 'relative',
    width: '100%',
    height: '100%'
  }
```

### options
  `soonspace` [配置项](../../guide/config.html)
  - **类型：** object
  - **默认值：** `{}`


<!-- 方法属性 -->
## 方法属性

### sceneReady
  场景准备完成时触发函数。
#### 回调参数
##### ssp 
  `soonspace` 实例

<br>
<br>

::: tip 提示
  以下方法全部为 [soonspace 空间交互事件](../../guide/event.html) 在 `react-soonspace` 组件内的事件传递，方法名与回调参数完全一致。
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
