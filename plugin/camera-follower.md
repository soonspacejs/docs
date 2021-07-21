---
sidebarDepth: 2
---

# plugin-camera-follower

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-camera-follower/latest.svg)

相机跟随。

## 样例

<Docs-Iframe src="plugin/cameraFollower.html" />

## 安装

```bash
npm install @soonspacejs/plugin-camera-follower -S
# or
yarn add @soonspacejs/plugin-camera-follower -S
```

## 使用方法

```js {2,10}
import SoonSpace from 'soonspacejs';
import CameraFollowerPlugin from '@soonspacejs/plugin-camera-follower';

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {},
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
interface StartOptions {
  position?: Position;
  rotation?: Rotation;
}

function start(object: Object3D, options?: StartOptions): void;
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

#### 参数:

##### object

- **描述:** 模型对象
- **类型:** `BaseObject3D`
- **必填:** <Base-RequireIcon />

##### options

- **描述:** 配置选项
- **类型:** `StartOptions`
- **必填:** <Base-RequireIcon :isRequire="false" />

###### StartOptions

<Docs-Table 
    :data="[
      {
        prop: 'position', desc: '相机位置（相对于模型）', type: 'Position', require: false, default: '{x: 0,y: 0,z: 0}', link: '../guide/types.html#position'
      },
      {
        prop: 'rotation', desc: '相机弧度（相对于模型）', type: 'Rotation', require: false, default: '{x: 0,y: 0,z: 0}', link: '../guide/types.html#rotation'
      }
    ]"
/>

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
