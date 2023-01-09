---
sidebarDepth: 2
---

# plugin-patrol-controls

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-patrol-controls/latest.svg)

路径巡检控制器。

## 样例

<Docs-Iframe src="plugin/patrolControls.html" />

## 安装

```bash
npm install @soonspacejs/plugin-patrol-controls -S
# or
yarn add @soonspacejs/plugin-patrol-controls -S
```

## 使用方法

```js {2,10}
import SoonSpace from 'soonspacejs';
import PatrolControlsPlugin from '@soonspacejs/plugin-patrol-controls';

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {},
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
  eyeHeight?: number
  naviSpeed?: number
  rotateSpeed?: number
  flyToStartPoint?: boolean
  onUpdate?: (e: Position) => {}
  onEnd?: (endPosition: Position) => {}
}

function start(path: Topology, options: StartOptions) => void
```

#### 用法

```js
patrolControls.start(
  // path
  shortestPath.
  // options
  {
    naviSpeed: 1,
    rotateSpeed: 1,
    eyeHeight: 100,
    flyToStartPoint: true,
    onUpdate: (realTimePosition) => {
      console.log(realTimePosition)
    },
    onEnd: (position) => {
      console.log('巡检结束！', position)
    }
  }
)
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
        prop: 'rotateSpeed', desc: '视角旋转速度', type: 'number', require: false, default: '1'
      },
      {
        prop: 'eyeHeight', desc: '眼睛高度', type: 'number', require: false, default: '100'
      },
      {
        prop: 'flyToStartPoint', desc: '是否飞向起始点位置', type: 'boolean', require: false, default: 'true'
      },
      {
        prop: 'onUpdate', desc: '巡检时实时更新回调函数', type: '( realTimePosition: Position, realTimeRotation: Euler, nextNode: Node, toNextNodeDistance: number ) => void;', require: false, default: ''
      },
      {
        prop: 'onEnd', desc: '巡检结束回调函数', type: '(endPosition: Position) => void', require: false, default: ''
      }
    ]"
/>

### setOptions

动态设置巡检参数

#### 定义

```ts
type ResetOptions = Pick<
  StartOptions,
  'eyeHeight' | 'naviSpeed' | 'rotateSpeed'
>;

function setOptions(options: ResetOptions): void;
```

#### 用法

```js
patrolControls.setOptions({
  naviSpeed: 1,
  rotateSpeed: 1,
  eyeHeight: 100,
});
```

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
