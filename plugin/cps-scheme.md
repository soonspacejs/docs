---
outline: 3
---

# plugin-cps-scheme

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-cps-scheme/latest.svg)

[CPS 平台](https://sooncps.xwbuilders.com/workspace/manager) 预案插件

## 样例

<Docs-Iframe src="plugin/cpsScheme.html" />

## 安装

```bash
npm install @soonspacejs/plugin-cps-scheme
# or
yarn add @soonspacejs/plugin-cps-scheme
```

## 使用方法

::: warning 前置条件
预案插件强依赖 CPS 场景加载插件，所以必须先注册 [plugin-cps-soonmanager](./cps-soonmanager) 插件及加载场景步骤。
:::

```js
import SoonSpace from 'soonspacejs';
import CpsSoonmanagerPlugin from '@soonspacejs/plugin-cps-soonmanager';
import CpsSchemePlugin from '@soonspacejs/plugin-cps-scheme';

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {},
});

const cpsSoonmanagerPlugin = ssp.registerPlugin(CpsSoonmanagerPlugin, 'cpsSoonmanagerPlugin');
cpsSoonmanagerPlugin.setPath('xxxx');
await cpsSoonmanagerPlugin.loadScene({
  // ...

  // 加载场景时必须开启流程数据加载，或通过手动方法执行
  loadFlowData: true
});

// 加载场景时 loadFlowData 未开启时，必须在预案执行前手动加载流程数据
await cpsSoonmanagerPlugin.loadFlowData()

const cpsSchemePlugin = ssp.registerPlugin(CpsSchemePlugin, 'cpsSchemePlugin');
await cpsSchemePlugin.init({
  el: '#platter',
  schemeId: '8SPBFEXLC850',
  dependentPlugins: {
    cpsSoonmanagerPlugin: cpsSoonmanagerPlugin,
  },
  placeholder: '占位符',
  // 执行回调（只有配置过数据才会触发）
  execCallback: (content, origin) => {
    console.log(content, origin);
  },
});
```

## 属性

### cpsSoonmanagerPlugin

上游 CPS 插件

- **默认值:** `undefined`
- **类型:** [`CpsSoonmanagerPlugin`](./cps-soonmanager)

### schemeData

预案数据

- **默认值:** `null`
- **类型:** `ISchemeData[] | null`

#### 定义

```ts
interface ISchemeNode {
  id: string;
  btnId: string;
  enable: boolean;
  name?: string;
  content?: string;
  contentPath?: string;
  flow?: { flowId: string };
}

interface ISchemeData {
  id: string;
  name: string;
  nodes: Record<string, ISchemeNode>;
}
```

### platterDomElement

预案八卦盘 dom 元素

- **默认值:** `null`
- **类型:** `SVGElement | null`

### autoRunFlow

`v2.10.x`

点击八卦盘按钮时自动执行流程

##### 用法

```js
cpsSchemePlugin.autoRunFlow = false;
```

- **默认值:** `true`
- **类型:** `boolean`

::: tip 提示
设置为 `false` 后，你可以手动调用执行流程的方法 [runFlowById](./cps-soonmanager#runflowbyid)
:::

## 方法

### init

初始化预案八卦盘

#### 定义

```ts
import CpsSoonmanagerPlugin from '@soonspacejs/plugin-cps-soonmanager';

type TInitOptions = {
  el: string;
  schemeId: string;
  // 上游依赖插件
  dependentPlugins: {
    cpsSoonmanagerPlugin: CpsSoonmanagerPlugin;
  };
  placeholder?: string;
  /**
   * 执行回调（节点点击）
   */
  execCallback?: (content: string, originData: ISchemeNode) => void;
};

function init(options: TInitOptions): Promise<void>;
```

#### 用法

```js
await cpsSchemePlugin.init({
  el: '#platter',
  schemeId: '8SPBFEXLC850',
  dependentPlugins: {
    cpsSoonmanagerPlugin: cpsSoonmanagerPlugin,
  },
  placeholder: '占位符',
  // 执行回调（只有配置过数据才会触发）
  execCallback: (content, origin) => {
    console.log(content, origin);
  },
});
```

#### 参数

##### options

- **描述:** 场景加载选项
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `TInitOptions`

##### TInitOptions

<Docs-Table
    :data="[
      { prop: 'el', desc: '装载八卦盘的元素选择器', type: 'string', require: true, default: '' },
      { prop: 'schemeId', desc: '预案 id', type: 'string', require: true, default: '' },
      { prop: 'dependentPlugins', desc: '上游依赖插件', type: 'object', require: true, default: '' },
      { prop: 'dependentPlugins.cpsSoonmanagerPlugin', desc: 'CPS 平台导出场景加载插件实例', type: 'CpsSoonmanagerPlugin', require: true, default: '' },
      { prop: 'placeholder', desc: '未配置的预案按钮占位符', type: 'string', require: false, default: '你好，世界' },
      { prop: 'execCallback', desc: '按钮点击回调', type: 'TInitOptions[execCallback]', require: false, default: '' },
    ]"
/>

### setBtnReady

设置八卦盘按钮就绪状态

#### 定义

```ts
function setBtnReady(btnId: string, ready?: boolean): void;
```

#### 用法

```js
cpsSchemePlugin.setBtnReady('bn_p4_s1_9', true);
```

### setBtnHover

设置八卦盘按钮 Hover 状态

#### 定义

```ts
function setBtnHover(btnId: string, hover?: boolean): void;
```

#### 用法

```js
cpsSchemePlugin.setBtnHover('bn_p4_s1_9', true);
```

### dispose

清除预案八卦盘以及数据

#### 用法

```js
cpsSchemePlugin.dispose();
```

::: tip 提示
必须调用 `dispose()` 才能再次调用 `init()`
:::

### fetchSchemeData

根据当前 `cpsSoonmanagerPlugin.path` 获取预案数据

[init](#init) 方法会调用此方法

#### 定义

```ts
function fetchSchemeData(): Promise<ISchemeData[]>;
```

#### 用法

```ts
cpsSoonmanagerPlugin.fetchSchemeData().then((ISchemeData) => {
  console.log(ISchemeData);
});
```
