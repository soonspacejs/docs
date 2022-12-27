---
sidebarDepth: 2
---

# plugin-effect

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-effect/latest.svg)

特效。

## 样例

<Docs-Iframe src="plugin/effect.html" />

## 安装

```bash
npm install @soonspacejs/plugin-effect -S
# or
yarn add @soonspacejs/plugin-effect -S
```

## 使用方法

```js {2,10}
import SoonSpace from 'soonspacejs';
import EffectPlugin from '@soonspacejs/plugin-effect';

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {},
});

const effectPlugin = ssp.registerPlugin(EffectPlugin, 'effectPlugin');
```

## 方法

### createFlame

创建火焰

#### 定义

```ts
type PluginObjectInfo = BaseObject3DInfo;

interface FlameInfo extends PluginObjectInfo {
  magnitude?: number;
  gain?: number;
  imgUrl?: string;
}

function createFlame(param: FlameInfo): PluginObject;
```

#### 使用

```js
effectPlugin.createFlame({
  id: 'testFlame',
  position: {
    x: 0,
    y: 50,
    z: 0,
  },
});
```

#### 参数

##### param

- **描述:** 配置
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `FlameInfo`

##### FlameInfo

<Docs-Table 
    :data="[
      {
        prop: 'magnitude', desc: '火焰量级', type: 'number', require: false, default: '1.3'
      },
      {
        prop: 'gain', desc: '火焰增益', type: 'number', require: false, default: '0.5'
      },
      {
        prop: 'imgUrl', desc: '火焰图片', type: 'string', require: false, default: '内置图片'
      }
    ]"
/>

其他配置参考 [BaseObject3DInfo](../guide/types.md#baseobject3dinfo)

### createSmoke

创建烟雾

#### 定义

```ts
interface SmokeInfo extends PluginObjectInfo {
  imgUrl?: string;
  count?: number;
  maxAge?: number;
  size?: number;
  acceleration?: number;
  velocity?: IVector3;
  color?: IColor[];
}

function createSmoke(param: SmokeInfo): PluginObject;
```

#### 用法

```js
effectPlugin.createSmoke({
  id: 'testSmoke',
  name: 'testSmoke',
  position: {
    x: -300,
    y: 0,
    z: 300,
  },
});
```

#### 参数

##### param

- **描述:** 配置
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `SmokeInfo`

##### SmokeInfo

<Docs-Table 
    :data="[
      {
        prop: 'imgUrl', desc: '烟雾图片', type: 'string', require: false, default: '内置图片'
      },
       {
        prop: 'count', desc: '烟雾粒子的数量', type: 'number', require: false, default: '1000'
      },
      {
        prop: 'maxAge', desc: '烟雾粒子的显示时间（秒）', type: 'number', require: false, default: '4'
      },
      {
        prop: 'size', desc: '烟雾粒子的大小', type: 'number', require: false, default: '200'
      },
      {
        prop: 'acceleration', desc: '烟雾粒子的加速度', type: 'number', require: false, default: '10'
      },
      {
        prop: 'velocity', desc: '烟雾粒子的扩散方向', type: 'IVector3', link: '../guide/types.html#ivector3' ,require: false, default: '{ x: 100, y: 100, z: 100 }'
      },
       {
        prop: 'color', desc: '烟雾粒子的颜色', type: 'IColor[]', link: '../guide/types.html#icolor' ,require: false, default: '[0x333333, 0x111111]'
      },
    ]"
/>

其他配置参考 [BaseObject3DInfo](../guide/types.md#baseobject3dinfo)

### createContactShadows

创建接触阴影

#### 样例

<Docs-Iframe src="plugin/contactShadows.html" />

#### 定义

```ts
interface ContactShadowsInfo extends Omit<PluginObjectInfo, 'scale'> {
  opacity?: number;
  width?: number;
  height?: number;
  blur?: number;
  far?: number;
  resolution?: number;
  frames?: number;
  scale?: number | [x: number, y: number];
  darkness?: number;
}

function createContactShadows(param: ContactShadowsInfo): PluginObject;
```

#### 用法

```js
effectPlugin.createContactShadows({
  id: 'shadows',
  position: { x: 0, y: -0.1, z: 0 },
  opacity: 1,
  scale: [100, 100],
  blur: 2,
  far: 1,
  resolution: 1024,
  frames: 10,
  darkness: 2,
});
```

#### 参数

##### param

- **描述:** 配置
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `ContactShadowsInfo`

##### ContactShadowsInfo

<Docs-Table 
    :data="[
      {
        prop: 'opacity', desc: '不透明度', type: 'number', require: false, default: '1'
      },
      {
        prop: 'width', desc: '平面宽度', type: 'number', require: false, default: '1'
      },
      {
        prop: 'height', desc: '平面高度', type: 'number', require: false, default: '1'
      },
      {
        prop: 'blur', desc: '模糊', type: 'number', require: false, default: '1'
      },
      {
        prop: 'far', desc: '向上取样的阴影距离', type: 'number', require: false, default: '10'
      },
      {
        prop: 'resolution', desc: '阴影平面的分辨率', type: 'number', require: false, default: '512'
      },
      {
        prop: 'frames', desc: '阴影的渲染帧数', type: 'number', require: false, default: 'Infinity'
      },
      {
        prop: 'scale', desc: '用于乘以宽高', type: 'number | [x: number, y: number]', require: false, default: '10'
      },
      {
        prop: 'darkness', desc: '阴影的黑暗程度', type: 'number', require: false, default: '1'
      },
    ]"
/>

其他配置参考 [BaseObject3DInfo](../guide/types.md#baseobject3dinfo)

### removeEffect

删除效果

#### 定义

```ts
function removeEffect(id: PluginObjectInfo['id']): boolean;
```

#### 用法

```js
effectPlugin.removeEffect('test');
```
