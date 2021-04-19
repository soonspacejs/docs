---
sidebarDepth: 2
---

# patrol-controls

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-patrol-controls/next.svg)

路径巡检相机控制器插件。

### 样例：

<Docs-Iframe src="plugin/patrolControls.html" />

## 安装

```bash
npm install @soonspacejs/plugin-patrol-controls@next -S
# or
yarn add @soonspacejs/plugin-patrol-controls@next -S
```

## 使用方法

```js {2,10}
import SoonSpace from 'soonspacejs';
import PatrolControlsPlugin from '@soonspacejs/plugin-patrol-controls';

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  event: {},
});

const patrolControls = ssp.registerPlugin(
  PatrolControlsPlugin,
  'patrolControls'
);
consolo.log(patrolControls);
```

## 方法

### start

开始巡检。

#### 定义

```ts
interface StartOptions {
  path: Topology;
  naviSpeed?: number;
  eyeHeight?: number;
  onUpdate?: (currPosition: Position) => void;
}

function start(path: Topology, options: StartOptions) => Promise<Position>
```

#### 用法

```js
patrolControls.start(
  // path
  shortestPath.
  // options
  {
    naviSpeed: 1,
    eyeHeight: 100,
    onUpdate: (currPosition) => {
      console.log(currPosition)
    }
  }
)
  .then(position => {
    console.log('巡检结束！', position)
  })

```

#### 参数

##### path

- **描述:** 用于自动巡检的路径
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `Topology`

##### options

- **描述:** 可配置项
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `StartOptions`

###### StartOptions

<br>
<Docs-Table 
    :data="[
      {
        prop: 'naviSpeed', desc: '巡检时导航速度', type: 'number', require: false, default: '1'
      },
      {
        prop: 'eyeHeight', desc: '眼睛高度', type: 'number', require: false, default: '100'
      },
      {
        prop: 'onUpdate', desc: '巡检时实时更新回调函数', type: '(position: Position) => void', require: false, default: ''
      }
    ]"
/>

### stop

结束巡检。

#### 用法

```js
patrolControls.stop();
```

### pause

暂停巡检。

#### 用法

```js
patrolControls.pause();
```

### resume

继续巡检。

#### 用法

```js
patrolControls.resume();
```
