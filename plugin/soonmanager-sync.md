---
sidebarDepth: 2
---

# soonmanager-sync

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-soonmanager-sync/next.svg)
<br>
[空间平台](http://www.xwbuilders.com:9050/#/projectManage/bim)生产的场景加载及数据读取插件。

## 安装

```bash
npm install @soonspacejs/plugin-soonmanager-sync@next -S
# or
yarn add @soonspacejs/plugin-soonmanager-sync@next -S
```

## 使用方法

```js {2,10}
import SoonSpace from 'soonspacejs';
import SoonmanagerSyncPlugin from '@soonspacejs/plugin-soonmanager-sync';

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  event: {},
});

const soonmanagerSync = ssp.registerPlugin(
  SoonmanagerSyncPlugin,
  'soonmanagerSync'
);
consolo.log(soonmanagerSync);
```

## 方法

### setBaseUrl

设置基础路径

#### 定义

```ts
function setBaseUrl(url: string): void;
```

#### 用法

```js
soonmanagerSync.setBaseUrl('http://xxx.com/back-resource/');
```

::: warning 注意
必须要先调用 setBaseUrl, 才能加载效果、模型资源...

由于内部将 url 与 资源路径进行拼接获取资源, 所以参数的结尾需要加上斜线防止链接出错.
:::

### setGlobalSetting

同步背景、环境光、平行光、雾化效果

#### 定义

```ts
interface SMYFogOptions extends FogOptions {
  visible: boolean;
}

interface GlobalSetting {
  color: IColor;
  ambientLight: AmbientLightOptions;
  hemisphereLight: HemisphereLightOptions;
  directionalLight: DirectionalLightOptions;
  fog: SMYFogOptions;
}

function setGlobalSetting(setting?: GlobalSetting): void;
```

#### 用法

```js
soonmanagerSync.setGlobalSetting({
  color: '#f65',
  ambientLight: {
    id: 'sm_ambientLight',
    color: '#9a9a9a',
    intensity: 1,
  },
  hemisphereLight: {
    id: 'hemisphereLight',
    skyColor: '#ffffff',
    groundColor: '#dddddd',
    intensity: 1,
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  directionalLight: {
    id: 'sm_directionalLight',
    color: '#ffffff',
    intensity: 1,
    position: {
      x: 0,
      y: 500,
      z: 0,
    },
    target: {
      x: 0,
      y: -100,
      z: 0,
    },
  },
  fog: {
    color: 0xcce0ff,
    near: 500,
    far: 50000,
    visible: true,
  },
});
```

::: tip 提示
如果未传入 setting, 则获取 SoonManager 平台上保存的设置
:::

#### 参数

##### setting

- **描述:** 全局效果的对象集合
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `GlobalSetting`

##### GlobalSetting

<Docs-Table
    :data="[
      { prop: 'color', desc: '背景颜色', type: 'IColor', require: true, link: '../guide/types.html#icolor' },
      { prop: 'ambientLight', desc: '环境光', type: 'AmbientLightOptions', require: true },
      { prop: 'hemisphereLight', desc: '半球光', type: 'HemisphereLightOptions', require: true },
      { prop: 'directionalLight', desc: '平行光', type: 'DirectionalLightOptions', require: true },
      { prop: 'fog', desc: '雾化效果', type: 'SMYFogOptions', require: true },
    ]"
/>

### loadScene

加载场景模型

#### 定义

```ts
interface LoadSceneOptions {
  syncLoad?: boolean;
  LoadsPerSecond?: number;
}

function loadScene(options?: LoadSceneOptions): Promise<void>;
```

#### 用法

```js
soonmanagerSync.loadScene({ syncLoad: false, LoadsPerSecond: 120 });
```

#### 参数

##### options

- **描述:** 场景加载选项
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `LoadSceneOptions`

##### LoadSceneOptions

<Docs-Table
    :data="[
      { prop: 'syncLoad', desc: '同步加载模型', type: 'boolean', require: false, default: false },
      { prop: 'LoadsPerSecond', desc: '每秒加载多少个模型(syncLoad 为 true 时生效)', type: 'number', require: false, default: 60 },
    ]"
/>
