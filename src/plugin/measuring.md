---
sidebarDepth: 2
---

# plugin-measuring

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-measuring/latest.svg)

测量。

## 交互提示

鼠标左键单击连接测量点

鼠标左键双击或 `return | Enter` 键保存当前测量并结束

当 `mode` 为 `MeasuringMode.Angle` 时，点击三次后自动结束

`esc` 键终止当前测量

## 样例

<Docs-Iframe src="plugin/measuring.html" />

## 安装

```bash
npm install @soonspacejs/plugin-measuring
# or
yarn add @soonspacejs/plugin-measuring
```

## 使用方法

```js {2,10}
import SoonSpace from 'soonspacejs';
import MeasuringPlugin, { MeasuringMode } from '@soonspacejs/plugin-measuring';

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {},
});

const measuringPlugin = ssp.registerPlugin(MeasuringPlugin, 'measuringPlugin');
```

## 方法

### start

开始测量。

#### 定义

```ts
enum MeasuringMode {
  Distance = 'Distance',
  Area = 'Area',
  Angle = 'Angle',
}

type UnitType = 'm' | 'mm' | 'cm' | 'ft' | 'in' | 'pt';

interface Options {
  unit?: UnitType;
  precision?: number;
}

function start(mode?: MeasuringMode, options?: Options): void;
```

#### 用法

```js
import { MeasuringMode } from '@soonspacejs/plugin-measuring';

measuringPlugin.start(MeasuringMode.Distance, { unit: 'm', precision: 2 });
```

#### 参数：

##### mode

- **描述:** 测量模式
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `MeasuringMode`
- **默认值:** `MeasuringMode.Distance`

##### options

- **描述:** 测量参数
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `Options`

###### Options

<Docs-Table 
    :data="[
      {
        prop: 'unit', desc: '测量单位', type: 'UnitType', require: false, default: 'm'
      },
      {
        prop: 'precision', desc: '数值精度（小数位）', type: 'number', require: false, default: '2'
      },
    ]"
/>

### done

结束测量。

双击或者 `return | Enter` 键时触发，也可主动调用。

#### 示例

```js
measuringPlugin.done();
```

### onDone

结束测量时触发。

#### 示例

```js
measuringPlugin.onDone(() => {
  console.log('done');
});
```

### cancel

终止测量。

`Esc` 键时触发，也可主动调用。

#### 示例

```js
measuringPlugin.cancel();
```

### onCancel

终止测量时触发。

#### 示例

```js
measuringPlugin.onCancel(() => {
  console.log('cancel');
});
```

### clear

清除测量结果。

#### 示例

```js
measuringPlugin.clear();
```
