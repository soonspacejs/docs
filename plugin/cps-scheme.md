---
sidebarDepth: 2
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
预案插件强依赖 CPS 场景加载插件，所以必须先注册 [plugin-cps-soonmanager](./cps-soonmanager.html) 插件及加载场景步骤。
:::

```js {2,20-32}
import SoonSpace from 'soonspacejs';
import CpsSoonmanagerPlugin from '@soonspacejs/plugin-cps-soonmanager';
import CpsSchemePlugin from '@soonspacejs/plugin-cps-scheme';

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {},
});

const cpsSoonmanagerPlugin = ssp.registerPlugin(
  CpsSoonmanagerPlugin,
  'cpsSoonmanagerPlugin'
);
cpsSoonmanagerPlugin.setPath('xxxx')
await cpsSoonmanagerPlugin.loadScene({
  // ...
})

const cpsSchemePlugin = ssp.registerPlugin(CpsSchemePlugin, 'cpsSchemePlugin');
await cpsSchemePlugin.init({
  el: '#platter',
  schemeId: '8SPBFEXLC850',
  dependentPlugins: {
    cpsSoonmanagerPlugin: cpsSoonmanagerPlugin
  },
  placeholder: '占位符',
  // 执行回调（只有配置过数据才会触发）
  execCallback: (content, origin) => {
    console.log(content, origin);
  },
});
```

## 属性

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

## 方法

### init

初始化预案八卦盘

#### 定义

```ts
import CpsSoonmanagerPlugin from '@soonspacejs/plugin-cps-soonmanager'

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
    cpsSoonmanagerPlugin: cpsSoonmanagerPlugin
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

### dispose

清除预案八卦盘以及数据

#### 用法

```js
cpsSchemePlugin.dispose();
```

::: tip 提示
必须调用 `dispose()` 才能再次调用 `init()`
:::
