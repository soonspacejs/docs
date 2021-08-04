---
sidebarDepth: 2
---

# plugin-model-blast

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-model-blast/latest.svg)

模型爆炸。

## 样例

<Docs-Iframe src="plugin/modelBlast.html" />

## 安装

```bash
npm install @soonspacejs/plugin-model-blast -S
# or
yarn add @soonspacejs/plugin-model-blast -S
```

## 使用方法

```js {2,10}
import SoonSpace from 'soonspacejs';
import ModelBlastPlugin from '@soonspacejs/plugin-model-blast';

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {},
});

const modelBlastPlugin = ssp.registerPlugin(
  ModelBlastPlugin,
  'modelBlastPlugin'
);
consolo.log(modelBlastPlugin);
```

## 方法

### start
开启模型爆炸

#### 定义
```ts
function start(object: Object3D, scalar?: number): void
```

#### 使用
```js
modelBlastPlugin.start(model, 100)
```

#### 参数

##### object
- **描述:** 模型对象
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:**  `Sbm | Model`

##### scalar
- **描述:** 爆炸间隔
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:**  `number`
- **默认值:**  `100`

### stop
结束模型爆炸

#### 定义
```ts
function stop(object?: BaseObject3D): void
```

#### 使用
```js
modelBlastPlugin.stop()
```
#### 参数
- **描述:** 要还原的模型对象，**不传参数默认还原上一次**。
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:**  `BaseObject3D`
- **默认值:**  `undefined`

::: tip 逻辑场景
已操作一个模型，在不还原上个模型情况下继续操作第二个模型，只需要不使用 **stop** 方法连续调用俩次 **start** 即可。
<br>
后续想连续还原俩个模型就需要指定参数调用俩次 **stop**。
:::
