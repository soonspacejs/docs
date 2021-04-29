---
sidebarDepth: 2
---

# camera-follower

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-camera-follower/next.svg)

相机跟随插件

## 样例

<Docs-Iframe src="plugin/cameraFollower.html" />

## 安装

```bash
npm install @soonspacejs/plugin-camera-follower@next -S
# or
yarn add @soonspacejs/plugin-camera-follower@next -S
```

## 使用方法

```js {2,10}
import SoonSpace from 'soonspacejs';
import CameraFollowerPlugin from '@soonspacejs/plugin-camera-follower';

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  event: {},
});

const cameraFollowerPlugin = ssp.registerPlugin(
  CameraFollowerPlugin,
  'cameraFollowerPlugin'
);
consolo.log(cameraFollowerPlugin);
```

## 方法

### start

开启相机跟随

#### 定义

```ts
interface CameraViewpointData {
  position: Position;
  rotation: Rotation;
}

function start(object: Object3D, option?: CameraViewpointData): void;
```

#### 用法

```js
cameraFollowerPlugin.start(model, {
  position: {
    x: 1500,
    y: 300,
    z: 0,
  },
  rotation: {
    x: 0,
    y: Math.PI / 2,
    z: 0,
  },
});
```

### stop

结束相机跟随

#### 定义

```ts
function stop(): void;
```

#### 用法

```js
cameraFollowerPlugin.stop();
```
