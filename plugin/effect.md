---
sidebarDepth: 2
---

# plugin-effect

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-effect/latest.svg)

模型爆炸。

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

#### FlameInfo

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

### removeFlame

删除火焰

#### 定义

```ts
function removeFlame(id: PluginObjectInfo['id']): boolean;
```

#### 用法

```js
effectPlugin.removeFlame('testFlame');
```
