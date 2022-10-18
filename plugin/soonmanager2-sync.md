---
sidebarDepth: 2
---

# plugin-soonmanager2-sync

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-soonmanager2-sync/latest.svg)

[空间平台 2.0（公测）](http://106.52.64.158:54330/) 生产的场景加载及数据读取。

## 样例

<Docs-Iframe src="plugin/soonmanager2Sync.html" />

## 安装

```bash
npm install @soonspacejs/plugin-soonmanager2-sync -S
# or
yarn add @soonspacejs/plugin-soonmanager2-sync -S
```

## 使用方法

```js {2,10-13}
import SoonSpace from 'soonspacejs';
import Soonmanager2SyncPlugin from '@soonspacejs/plugin-soonmanager2-sync';

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {},
});

const soonmanager2Sync = ssp.registerPlugin(
  Soonmanager2SyncPlugin,
  'soonmanager2Sync'
);
console.log(soonmanager2Sync);
```

## 属性

### path

资源加载的基础路径

- **默认值:** `''`
- **类型:** `string`

### treeData

场景树数据

- **默认值:** `null`
- **类型:** `ITreeData[] | null`

#### 定义

```ts
interface ITreeData {
  id: string;
  pid: string | null;
  name: string;
  renderType: 'GROUP' | '3D' | 'ROOM';
  matrix: number[];
  path: string | null;
  children: ITreeData[];
}
```

### topologyData

拓扑路径数据

- **默认值:** `null`
- **类型:** [`TopologyInfo[]`](../api/topology.html#topologyinfo) | `null`

### propertiesData

自定义属性数据，根据 `modelId` 分组

- **默认值:** `null`
- **类型:** `TPropertiesMap | null`

#### 定义

```ts
interface IProperties {
  modelId: string;
  group: string;
  key: string;
  value: string | null;
  label: string | null;
}

type TPropertiesMap = Map<IProperties['modelId'], IProperties[]>;
```

### animationsData

补间动画数据，根据 `modelId` 分组

- **默认值:** `null`
- **类型:** `TAnimationsMap | null`

#### 定义

```ts
interface IKeyframe {
  id: string;
  uuid: string;
  x: number;
  y: number;
  z: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  easing: AnimationModeType;
  mode: string;
  delay: number;
  duration: number;
  repeat: number;
  yoyo: boolean;
}

/**
 * 动画
 */
interface IAnimations {
  id: string;
  uuid: string;
  modelId: string;
  name: string;
  keyframes: IKeyframe[];
}

type TAnimationsMap = Map<IAnimations['modelId'], IAnimations[]>;
```

## 方法

### setPath

设置加载资源的基础路径

#### 定义

```ts
function setPath(path: string): void;
```

#### 用法

```js
soonmanager2Sync.setPath('./models');
// or
soonmanager2Sync.setPath('http://xxx.com/models');
```

::: warning 注意
插件的其他方法依赖于 `path`，需要先设置才能使用
:::

### loadScene

加载场景对象

#### 定义

```ts
interface ILoadSceneOptions {
  syncProperties?: boolean;
}

function loadScene(options?: ILoadSceneOptions): Promise<void>;
```

#### 用法

```js
soonmanager2Sync.loadScene().then(() => {
  console.log('场景对象加载完成');
});
```

#### 参数

##### options

- **描述:** 场景加载选项
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `ILoadSceneOptions`

##### ILoadSceneOptions

<Docs-Table
    :data="[
      { prop: 'syncProperties', desc: '是否同步自定义属性', type: 'boolean', require: false, default: 'true' },
    ]"
/>

::: tip 提示
自定义属性存储在对象的 `userData.properties` 属性上
:::

### getTopologies

获取拓扑路径数据

#### 定义

```ts
function getTopologies(): Promise<TopologyInfo[]>;
```

#### 用法

```js
soonmanager2Sync.getTopologies().then((topologies) => {
  const [t1] = topologies;

  /**
   * 使用获取到的数据直接创建拓扑路径
   */
  ssp.createTopology(t1);
});
```

### playAnimationById

根据对象 `id` 播放补间动画

#### 定义

```ts
type TAnimationsTweenProps = Pick<
  IKeyframe,
  | 'x'
  | 'y'
  | 'z'
  | 'rotationX'
  | 'rotationY'
  | 'rotationZ'
  | 'scaleX'
  | 'scaleY'
  | 'scaleZ'
>;

interface IPlayAnimationByIdOptions {
  onUpdate?: (
    source: TAnimationsTweenProps,
    tween: Tween<TAnimationsTweenProps>
  ) => void;
  onStart?: (tween: Tween<TAnimationsTweenProps>) => void;
}

function playAnimationById(
  id: string,
  animationIndex?: number,
  options?: IPlayAnimationByIdOptions
): Promise<void>;
```

#### 用法

```js
soonmanager2SyncPlugin.playAnimationById('4H6T1H53CSFW', 0, {
  onUpdate: (source, tween) => {},
  onStart: (tween) => {
    /**
     * 包含多个帧动画时，每个动画帧开始时 onStart 都会执行
     */
    console.log(tween);
  },
});
```

#### 参数

##### id

- **描述:** 要播放动画的对象 `id`
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `string`

##### animationIndex

- **描述:** 该动画所在数据列表中的下标
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **默认值:** `0`
- **类型:** `number`

##### options

- **描述:** 动画播放选项
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `IPlayAnimationByIdOptions`

##### IPlayAnimationByIdOptions

<Docs-Table
    :data="[
      { prop: 'onUpdate', desc: '动画更新回调', type: 'IPlayAnimationByIdOptions[\'onUpdate\']', require: false, default: '' },
      { prop: 'onStart', desc: '动画开始回调', type: 'IPlayAnimationByIdOptions[\'onStart\']', require: false, default: '' },
    ]"
/>

::: tip 提示
动画播放时，可以是多个 `animation` 的组合

所以每次执行新的 `animation` 方法时都会执行 `onStart` 回调并且返回新的 `tween` 实例
:::
