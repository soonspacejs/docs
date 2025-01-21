---
outline: 3
---

# plugin-cps-soonmanager

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-cps-soonmanager/latest.svg)

[CPS 平台](https://sooncps.xwbuilders.com/workspace/manager) 生产的场景加载及数据读取。

此插件是基于 [soonmanager2-sync](./soonmanager2-sync) 插件的扩展，并完全向下兼容。

## 样例

<Docs-Iframe src="plugin/cpsSoonmanager.html" />

## 安装

```bash
npm install @soonspacejs/plugin-cps-soonmanager
# or
yarn add @soonspacejs/plugin-cps-soonmanager
```

## 使用方法

```js {2,10-14}
import SoonSpace from 'soonspacejs';
import CpsSoonmanagerPlugin from '@soonspacejs/plugin-cps-soonmanager';

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {},
});

// 如需加载多个场景请注册多个插件
const cpsSoonmanagerPlugin = ssp.registerPlugin(CpsSoonmanagerPlugin, 'cpsSoonmanagerPlugin');
cpsSoonmanagerPlugin.setPath('xxx');
await cpsSoonmanagerPlugin.loadScene();
```

## 属性

### path

资源加载的基础路径

- **默认值:** `''`
- **类型:** `string`

### effectPlugin

特效插件实例

- **默认值:** `null`
- **类型:** `EffectPlugin | null`

```js
const effectPlugin = ssp.registerPlugin(EffectPlugin, 'effectPlugin');

cpsSoonmanagerPlugin.effectPlugin = effectPlugin;
cpsSoonmanagerPlugin.loadScene();
```

::: tip 提示
当 `renderType` 为 `WATER_SURFACE` 时，需要使用[特效插件](./effect)
:::

### sceneGroup

<Base-Tag title="readonly" />

场景 Group 对象

场景树的顶层对象会作为 sceneGroup 的 `children`。

```js
// Group 的默认 id 是 `path` 属性，可以通过 `getObjectById` 获取
const sceneGroup = ssp.getObjectById(path);
// 设置该场景的整体偏移
sceneGroup.position.set(10, 0, 0);
```

- **默认值:** `null`
- **类型:** `Group | null`

### metaData

<Base-Tag title="readonly" />

场景元数据

调用 [fetchMetaData](#fetchmetadata) 方法时会设置此属性

- **默认值:** `null`
- **类型:** `IMetadata | null`

#### 定义

```ts
interface IMetadata {
  platformVersion: number;
  version: number;
  name: string;
  projectId: string;
  sceneId: string;
  cover: string | null;
  flatModel: string;
  treeModel: string;
  resource: string;
  exportTime: number;
  environment?: string;
}
```

### treeData

<Base-Tag title="readonly" />

场景树数据

调用 [loadScene](#loadscene) 方法时会设置此属性

- **默认值:** `null`
- **类型:** `ITreeData[] | null`

#### 定义

```ts
interface ITreeData {
  id: string;
  pid: string | null;
  sid: string;
  name: string;
  renderType: 'GROUP' | '3D' | 'ROOM' | 'STUB' | 'POLYGON' | 'CIRCLE' | 'WATER_SURFACE' | 'DECAL';
  deviceCode: string | null;
  matrix: number[];
  path: string | null;
  familyId: string | null;
  children: ITreeData[];
  visible: boolean;
  shape?: {
    height: number;
    radius: number;
    points?: IVector3[];
  };
  boundingBox?: number[];
  extra?: {
    [key: string]: any;
  };
}
```

|    字段     |                  释义                  |
| :---------: | :------------------------------------: |
|     id      | 场景内对象的绑定 `id`，是以前的 `uuid` |
|     pid     |               父级的 id                |
|    name     |   对象的名称，作为对象的 `name` 属性   |
|     sid     |        数据库生成的唯一随机 id         |
| renderType  |             对象的渲染类型             |
| deviceCode  |                设备编码                |
|   matrix    |           对象的局部矩阵信息           |
|    path     |                资源路径                |
|  familyId   |          模型资源的组件 `id`           |
|  children   |              子对象的数组              |
|   visible   |           初始化对象是否可见           |
|    shape    |           多边形、水面等信息           |
| boundingBox |         房间等对象的包围盒数据         |
|    extra    |              一些额外信息              |

::: tip 检索对象的几种方式
除了 `children` 其他字段都会存在每个对象的 `userData` 上

```js
// 使用 `id` 获取
const model = ssp.getObjectById('xxx');

// 使用 `name` 获取
const [model] = ssp.getObjectByName('xxx');

// 假设定义了一个 deviceCode 为 kx-1
const [deviceModel] = ssp.getObjectByUserDataProperty('deviceCode', 'kx-1');
```

:::

::: warning 注意
`2024-08-09` 之后导出的版本，已经将现在的 `id` 作为之前的 `uuid`。

如果使用旧版资源包或者新版资源包使用 `id`，使用 `loadScene` 方法时传入 `{ asId: 'id' }`。
:::

### poiData

<Base-Tag title="readonly" />

场景内配置 Poi 数据, 该数据在加载场景（loadScene）时自动获取。

- **默认值:** `null`
- **类型:** `IPoiData[] | null`

#### 定义

```ts
export enum PoiContentTypeEnum {
  PANEL = 'PANEL',
  VIDEO = 'VIDEO',
  VIDEO_STREAM = 'VIDEO_STREAM',
}

interface IPoiData {
  projectId: string;
  sceneId: string;
  nodeId: string;
  poiId: string;
  name: string;
  width: number;
  height: number;
  x: number;
  y: number;
  z: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  scale: number;
  dimensional: PoiNodeType;
  content: string;
  media: Record<string, string> | null;
  contentType: PoiContentTypeEnum;
  display: boolean;
  style: string;
}
```

### topologyData

<Base-Tag title="readonly" />

拓扑路径数据

调用 [getTopologies](#gettopologies) 方法时会设置此属性

- **默认值:** `null`
- **类型:** [`TopologyInfo[]`](../api/topology#topologyinfo) | `null`

### propertiesData

<Base-Tag title="readonly" />

自定义属性数据，根据 `modelId` 分组

调用 [fetchPropertiesData](#fetchpropertiesdata) 方法时会设置此属性

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

<Base-Tag title="readonly" />

补间动画数据，根据 `modelId` 分组

调用 [fetchAnimationsData](#fetchanimationsdata) 方法时会设置此属性

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

### modelVisionsData

<Base-Tag title="readonly" />

模型视角数据，根据 `nodeId` 分组

调用 [fetchModelVisionsData](#fetchmodelvisionsdata) 方法时会设置此属性

- **默认值:** `null`
- **类型:** `TModelVisionsMap | null`

#### 定义

```ts
interface IModelVisions {
  id: string;
  uuid: string;
  nodeId: string;
  name: string;
  camera: 'O' | 'P';
  position: IVector3;
  rotation: IVector3;
  target: IVector3;
  zoom: number;
  primary: boolean;
}

type TModelVisionsMap = Map<IModelVisions['nodeId'], IModelVisions[]>;
```

::: tip 提示
Map 的 key 为 "" 时，表示场景视角数据
:::

### spacesData

<Base-Tag title="readonly" />

模型视角数据，根据 `sid` 分组

调用 [fetchSpacesData](#fetchspacesdata) 方法时会设置此属性

- **默认值:** `null`
- **类型:** `TSpacesMap | null`

#### 定义

```ts
interface ISpaces {
  id: string;
  sid: string;
  name: string;
  type: string;
  matrix: number[];
  visible: boolean;
  // treeData 中的 id 列表
  assets: string[] | null;
  children: ISpaces[] | null;
}

export type TSpacesMap = Map<ISpaces['sid'], ISpaces>;
```

### soonflow

<Base-Tag title="readonly" />

流程执行引擎实例

- **类型:** [SoonFlow](https://www.npmjs.com/package/@soonflow/core)

### flowData

<Base-Tag title="readonly" />

场景中配置好的流程数据，数据可提供给 [runFlowById](#runflowbyid) 使用。

- **默认值:** `null`
- **类型:** `any[] | null`

## 方法

### setKey

设置企业公钥

::: tip 提示
如下图，只有使用 **安装包** 需去除场景水印时才需要设置企业公钥。
![page](./images/cps-soonmanager/use-scene.jpeg)

获取企业公钥, 请联系 CPS 平台企业 **管理员** 按下图提示操作获取。
![page](./images/cps-soonmanager/getkey.jpeg)

整体设计逻辑

| 资源包类型 | 是否需要设置企业公钥 | 是否携带水印 |
| :--------: | :------------------: | :----------: |
|   调试包   |          否          |      是      |
|   安装包   |          是          |      否      |
| 旧版资源包 |          否          |      否      |

:::

#### 定义

```ts
function setKey(key: string): void;
```

#### 用法

```js
cpsSoonmanagerPlugin.setKey('xxxxxxxxxxxxxxxx');
```

::: warning 注意
需要在调用 `loadScene` 之前调用 `setKey` 方法，否则安装包将无法正常加载
:::

### setPath

设置加载资源的基础路径

#### 定义

```ts
function setPath(path: string): void;
```

#### 用法

```js
cpsSoonmanagerPlugin.setPath('./models');
// or
cpsSoonmanagerPlugin.setPath('http://xxx.com/models');
```

::: warning 注意
插件的其他方法依赖于 `path`，需要先设置才能使用
:::

### loadScene

加载场景对象

配合 `loadTargetId` 或 `loadLevel` 使用可以重复调用

#### 定义

```ts
export enum LoadSceneAlgorithm {
  BFS = 'BFS', // 广度优先
  DFS = 'DFS', // 深度优先
}
```

```ts
interface ILoadSceneOptions {
  /**
   * 平台解密公钥
   */
  key?: string;
  /**
   * 资源包路径
   */
  path?: string;
  /**
   * 同步自定义属性
   */
  syncProperties?: boolean;
  /**
   * 同步模型视角数据
   */
  syncModelVisions?: boolean;
  /**
   * 计算 bounds tree
   */
  needsModelsBoundsTree?: boolean;
  /**
   * 应用预设效果
   */
  applyPresetEffects?: boolean;
  /**
   * 同步场景算法 BFS | DFS
   */
  loadSceneAlgorithm?: LoadSceneAlgorithm;
  /**
   * 目标节点 id（DFS时有效）
   */
  loadTargetId?: ITreeData['id'];
  /**
   * 需要加载的层级（DFS时有效）
   */
  loadLevel?: number;
  /**
   * v2.10.x
   * 需要隐藏的对象 id
   */
  hiddenObjects?: Set<string>;
  /**
   * 加载 poi
   */
  loadPoi?: boolean;
  /**
   * 通过数据源刷新 poi
   */
  refreshPoiByDataSource?: boolean;
  /**
   * 加载流程数据
   */
  loadFlowData?: boolean;
  /**
   * 场景 group 信息
   */
  sceneGroupInfo?: Partial<BaseObjectInfo>;
  /**
   * 对象 id 前缀
   */
  objectPrefixId?: string;
  /**
   * 作为对象的 id
   */
  asId?: 'id' | 'sid';
}

function loadScene(options?: ILoadSceneOptions): Promise<void>;
```

#### 用法

```js
// 进度事件
cpsSoonmanagerPlugin.addEventListener('progressing', ({ progress }) => {
  console.log((progress.loaded / progress.total) * 100 + '% loaded');
});

cpsSoonmanagerPlugin
  .loadScene()
  .then(() => {
    console.log('场景对象加载完成');
  })
  .catch((err) => {
    // key 验证失败时会触发此错误
    console.error(err);
  });
```

::: tip 提示
某些模型文件可能应用了 [DRACO](https://google.github.io/draco/) 压缩，建议调用 loadScene 方法之前调用 [setModelDracoDecoderPath](../api/model.md#setmodeldracodecoderpath) 方法设置 DRACO 解压路径
:::

::: tip 提示
如果你需要使用 Worker 计算 BVH，可以关闭默认行为

```js
cpsSoonmanagerPlugin.loadScene({ needsModelsBoundsTree: false }).then(() => {
  ssp.computeModelsBoundsTree({
    type: 'worker',
    workerCreator,
  });
});
```

具体请查看 [computeModelsBoundsTree](../api/model#computemodelsboundstree)

:::

::: tip 提示

初始化加载大场景时，可以通过 `loadSceneAlgorithm` 参数设置加载场景算法为`BFS`，可以提升部分加载时间。

```ts
import { LoadSceneAlgorithm } from '@soonspacejs/plugin-cps-soonmanager';

cpsSoonmanagerPlugin
  .loadScene({
    loadSceneAlgorithm: LoadSceneAlgorithm.BFS,
  })
  .then(() => {
    ssp.flyMainViewpoint();

    console.log('场景对象加载完成');
  });
```

:::

#### 参数

##### options

- **描述:** 场景加载选项
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `ILoadSceneOptions`

##### ILoadSceneOptions

<Docs-Table
    :data="[
      { prop: 'key', desc: '等价于 setKey 方法', type: 'string', require: false, default: '' },
      { prop: 'path', desc: '等价于 setPath 方法', type: 'string', require: false, default: '' },
      { prop: 'syncProperties', desc: '是否同步自定义属性，开启时自动调用 fetchPropertiesData 方法', type: 'boolean', require: false, default: 'true' },
      { prop: 'syncModelVisions', desc: '是否同步节点视角数据，开启时自动调用 fetchModelVisionsData 方法', type: 'boolean', require: false, default: 'true' },
      { prop: 'needsModelsBoundsTree', desc: '场景加载完成后调用 ssp.computeModelsBoundsTree 方法', type: 'boolean', require: false, default: 'true' },
      { prop: 'applyPresetEffects', desc: '默认调用 presetEffects 方法', type: 'boolean', require: false, default: 'true' },
      { prop: 'loadSceneAlgorithm', desc: '加载场景使用的算法', type: 'LoadSceneAlgorithm', require: false, default: 'LoadSceneAlgorithm.DFS' },
      { prop: 'loadTargetId', desc: '加载的目标树节点id', type: 'string', require: false, default: '' },
      { prop: 'loadLevel', desc: '加载的树层级。如果设置了loadTargetId，则以此为起始层。从1开始计算', type: 'number', require: false, default: 'Infinity' },
      { prop: 'hiddenObjects', desc: '初始化隐藏的对象 id 集合', type: 'Set&lt;string&gt;', require: false, default: '' },
      { prop: 'loadPoi', desc: '默认执行 loadPoi 方法', type: 'boolean', require: false, default: 'false' },
      { prop: 'refreshPoiByDataSource', desc: '默认执行 refreshPoiByDataSource 方法', type: 'boolean', require: false, default: 'false' },
      { prop: 'loadFlowData', desc: '默认执行 loadFlowData 方法', type: 'boolean', require: false, default: 'false' },
      { prop: 'sceneGroupInfo', desc: '场景 group 信息', type: 'Partial<BaseObjectInfo>', require: false, default: '{id: [this.path]}' },
      { prop: 'objectPrefixId', desc: '场景对象的id前缀', type: 'string', require: false, default: '' },
      { prop: 'asId', desc: '作为对象 id 的字段', type: 'id | sid', require: false, default: 'sid' },
    ]"
/>

::: tip 提示
自定义属性存储在对象的 `userData.properties` 属性上
:::

###### 分层加载示例

<Docs-Iframe src="plugin/cpsSoonmanagerLevel.html" />

::: warning 警告
由于场景模型是嵌套的树结构，内部对象的矩阵变换依赖父级，如果先加载内部，可能会出现位置、旋转、缩放的错乱

建议 `loadTargetId` 设置为上层节点的 id
:::

### presetEffects

设置预设效果，参数来源由平台渲染后导出。

#### 定义

```ts
interface IPresetEffectsOptions {
  hdr?: boolean;
  ssao?: boolean;
  directionalLightShadow?: boolean | { angle?: number };
  toneMappping?: boolean;
}

function presetEffects(options?: IPresetEffectsOptions): Promise<void>;
```

#### 用法

```js
await cpsSoonmanagerPlugin.loadScene({
  applyPresetEffects: false,
});
await cpsSoonmanagerPlugin.presetEffects({
  hdr: true,
  ssao: true,
  directionalLightShadow: true,
  toneMappping: true,
});
```

#### 参数

##### options

- **描述:** 效果参数
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `IPresetEffectsOptions`

##### IPresetEffectsOptions

<Docs-Table
    :data="[
      { prop: 'hdr', desc: '使用资源包中预设的 hdr 环境', type: 'boolean', require: false, default: 'true' },
      { prop: 'ssao', desc: '开启 SSAO  效果', type: 'boolean', require: false, default: 'true' },
      { prop: 'directionalLightShadow', desc: '开启平行光阴影', type: 'boolean', require: false, default: 'true' },
      { prop: 'toneMappping', desc: '设置 toneMappping', type: 'boolean', require: false, default: 'true' },
    ]"
/>

_各参数对应的方法_
| 参数 | 对应的内部方法 |
| :--------------------: | :----------------------------------------------------: |
| hdr | [setEnvironment](../api/sceneTool#setenvironment) |
| ssao | [setSSAO](../api/sceneTool#setssao) |
| directionalLightShadow | [createDirectionalLight](../api/light#createdirectionallight) |
| toneMappping | [setToneMapping](../api/sceneTool.html#settonemapping) |

::: warning 注意
presetEffects 需要等待场景加载完调用
:::

### getTopologies

获取拓扑路径数据

#### 定义

```ts
function getTopologies(): Promise<TopologyInfo[]>;
```

#### 用法

```js
const topologiesInfo = await cpsSoonmanagerPlugin.getTopologies();

/**
 * 每个数组元素对应一个拓扑路径
 * 使用获取到的数据直接创建拓扑路径
 */
ssp.createTopology(topologiesInfo[0]);
ssp.createTopology(topologiesInfo[1]);
ssp.createTopology(topologiesInfo[2]);
```

### sortTopologyNodes

对拓扑路径数据的 nodes 进行排序（只适用于线路）

#### 定义

```ts
function sortTopologyNodes(topologyInfo: TopologyInfo, startNodeId?: TopologyNodeInfo['id']): TopologyInfo | undefined;
```

#### 用法

```js
const [topologyInfo] = await cpsSoonmanagerPlugin.getTopologies();

/**
 * 没有 startNodeId 则默认第0个 node 为起始 node
 */
const sortedToplogyInfo = cpsSoonmanagerPlugin.sortTopologyNodes(topologyInfo);

ssp.createTopology({
  ...sortedToplogyInfo,
  imgUrl: 'xxx.png',
  animation: true,
});
```

::: tip 提示
在播放路径动画或使用[巡检插件](./patrol-controls)时会按照 nodes 数组的顺序执行

所以可能需要使用此方法对线路的 nodes 排序
:::

### playObjectAnimation

根据动画数据播放对象的补间动画

#### 定义

```ts
type TAnimationsTweenProps = Pick<
  IKeyframe,
  'x' | 'y' | 'z' | 'rotationX' | 'rotationY' | 'rotationZ' | 'scaleX' | 'scaleY' | 'scaleZ'
>;

interface IPlayAnimationByIdOptions {
  autoStopPrevious?: boolean;
  onUpdate?: (source: TAnimationsTweenProps, tween: Tween<TAnimationsTweenProps>) => void;
  onStart?: (tween: Tween<TAnimationsTweenProps>) => void;
}

function playObjectAnimation(
  object: BaseObject3D,
  animationIndex?: number,
  options?: IPlayAnimationByIdOptions
): Promise<boolean>;
```

#### 用法

```js
const object = ssp.getObjectByUserDataProperty('deviceCode', '111');
cpsSoonmanagerPlugin.playObjectAnimation(object, 0, {
  autoStopPrevious: true,
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

##### object

- **描述:** 要播放动画的对象
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `BaseObject3D`

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
      { prop: 'autoStopPrevious', desc: '是否自动停止之前的动画', type: 'boolean', require: false, default: 'true' },
      { prop: 'onUpdate', desc: '动画更新回调', type: 'IPlayAnimationByIdOptions[\'onUpdate\']', require: false, default: '' },
      { prop: 'onStart', desc: '动画开始回调', type: 'IPlayAnimationByIdOptions[\'onStart\']', require: false, default: '' },
    ]"
/>

::: tip 提示
动画播放时，可以是多个 `animation` 的组合

所以每次执行新的 `animation` 方法时都会执行 `onStart` 回调并且返回新的 `tween` 实例
:::

### stopObjectAnimation

停止由 [playObjectAnimation](#playobjectanimation) 方法触发的补间动画

#### 定义

```ts
function stopObjectAnimation(object: BaseObject3D): Promise<boolean>;
```

#### 用法

```js
cpsSoonmanagerPlugin.stopObjectAnimation(object);
```

### flyToSceneFromVisionsData

根据场景视角数据飞向

#### 定义

```ts
function flyToSceneFromVisionsData(index?: number): Promise<boolean>;
```

#### 用法

```js
cpsSoonmanagerPlugin.flyToSceneFromVisionsData(0);
```

#### 参数

##### index

- **描述:** 该视角所在数据列表中的下标
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `number`

### flyToMainSceneFromVisionsData

根据场景视角数据飞向主视角

#### 定义

```ts
function flyToMainSceneFromVisionsData(fallback?: boolean): Promise<boolean>;
```

#### 用法

```js
const success = await cpsSoonmanagerPlugin.flyToMainSceneFromVisionsData();
```

#### 参数

##### fallback

- **描述:** 没有主视角时，是否默认调用 [`flyMainViewpoint`](../api/camera#flymainviewpoint)。默认是 `true`
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `boolean`

### flyToObjectFromVisionsData

根据对象视角数据飞向

#### 定义

```ts
function flyToObjectFromVisionsData(object: BaseObject3D, index?: number): Promise<boolean>;
```

#### 用法

```js
const model = ssp.getObjectByUserDataProperty('device', 'xxx');

cpsSoonmanagerPlugin.flyToObjectFromVisionsData(model, 0);
```

#### 参数

##### object

- **描述:** 场景对象
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `BaseObject3D`

##### index

- **描述:** 该视角所在数据列表中的下标
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `number`

### flyToMainObjectFromVisionsData

根据对象视角数据飞向默认视角

#### 定义

```ts
function flyToMainObjectFromVisionsData(object: BaseObject3D, fallback?: boolean): Promise<boolean>;
```

#### 用法

```js
const model = ssp.getObjectByUserDataProperty('device', 'xxx');

const success = await cpsSoonmanagerPlugin.flyToMainObjectFromVisionsData(model);
```

#### 参数

##### object

- **描述:** 场景对象
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `BaseObject3D`

##### fallback

- **描述:** 没有默认视角时，是否默认调用 [`flyToObj`](../api/camera#flytoobj)。默认是 `true`
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `boolean`

### getSpaceAssets

获取空间下辖设备列表

#### 定义

```ts
function getSpaceAssets<T extends BaseObject3D = BaseObject3D>(space: BaseObject3D): Promise<T[]>;
```

#### 用法

```ts
const [spaceObject] = ssp.getObjectByUserDataProperty('space', 'xxx');
const spaceAssets = await cpsSoonmanagerPlugin.getSpaceAssets(spaceObject);
```

#### 参数

##### space

- **描述:** 空间对象
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `BaseObject3D`

### loadPoi

根据 poiData 渲染 Poi。

::: tip 使用提示
如果 `loadScene` 时参数 `loadPoi` 已设置开启将自动执行，无需手动调用。
:::

#### 定义

```ts
function loadPoi(refreshByDataSource: boolean): Promise<void>;
```

#### 用法

```ts
cpsSoonmanagerPlugin.loadPoi(true);
```

#### 参数

##### refreshByDataSource

- **描述:** 加载完调用 [refreshPoiByDataSource](#refreshbydatasource)
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `boolean`

### refreshPoiByDataSource

通过数据源刷新 Poi

::: tip 使用提示
如果 `loadScene` 时参数 `refreshPoiByDataSource` 或手动执行 `loadPoi` 时 `refreshPoiByDataSource` 已设置开启都将自动执行，无需手动调用。
:::

#### 定义

```ts
function refreshPoiByDataSource(): Promise<void>;
```

#### 用法

```ts
cpsSoonmanagerPlugin.loadPoi();
cpsSoonmanagerPlugin.refreshPoiByDataSource();
```

### loadFlowData

加载场景的流程数据

::: tip 使用提示
如果 `loadScene` 时参数 `loadFlowData` 已设置开启将自动执行，无需手动调用。
:::

#### 定义

```ts
function loadFlowData(): Promise<void>;
```

#### 用法

```ts
// 假设执行第一条流程
cpsSoonmanagerPlugin.loadFlowData().then(() => {
  console.log('流程数据加载完成');
});
```

### runFlowById

手动执行场景流程，流程 id 可在 [flowData](#flowdata) 中获取。

::: warning 使用提示
使用该方法时必须确保 `loadFlowData` 已执行完成，`loadFlowData` 可通过 `loadScene` 参数 `loadFlowData` 配置开启自动加载 或 手动调用 `loadFlowData` 方法。
:::

#### 定义

```ts
function runFlowById(id: string): Promise<void>;
```

#### 用法

```ts
// 假设执行第一条流程
cpsSoonmanagerPlugin.runFlowById(cpsSoonmanagerPlugin.flowData[0].id);
```

### fetchMetaData

根据当前 `path` 获取场景元数据

由 [loadScene](#loadscene) 方法调用

#### 定义

```ts
function fetchMetaData(): Promise<IMetadata>;
```

#### 用法

```ts
cpsSoonmanagerPlugin.fetchMetaData().then((metaData) => {
  console.log(fetchMetaData);
});
```

### fetchTreeData <Base-Deprecated />

根据当前 `path` 获取场景树数据

#### 定义

```ts
function fetchTreeData(): Promise<ITreeData[]>;
```

#### 用法

```ts
cpsSoonmanagerPlugin.fetchTreeData().then((treeData) => {
  console.log(treeData);
});
```

::: warning 注意
此方法已不适用于加密资源包
:::

### fetchPropertiesData

根据当前 `path` 获取自定义属性数据

由 [loadScene](#loadscene) 方法调用

#### 定义

```ts
function fetchPropertiesData(): Promise<TPropertiesMap>;
```

#### 用法

```ts
cpsSoonmanagerPlugin.fetchPropertiesData().then((propertiesData) => {
  console.log(propertiesData);
});
```

### fetchAnimationsData

根据当前 `path` 获取补间动画数据

由 [playAnimationById](#playanimationbyid) 方法调用

#### 定义

```ts
function fetchAnimationsData(): Promise<TAnimationsMap>;
```

#### 用法

```ts
cpsSoonmanagerPlugin.fetchAnimationsData().then((animationsData) => {
  console.log(animationsData);
});
```

### fetchModelVisionsData

根据当前 `path` 获取模型视角数据

由 [flyToSceneFromVisionsData](#flytoscenefromvisionsdata) 和 [flyToObjectFromVisionsData](#flytoobjectfromvisionsdata) 方法调用

#### 定义

```ts
function fetchModelVisionsData(): Promise<TModelVisionsMap>;
```

#### 用法

```ts
cpsSoonmanagerPlugin.fetchModelVisionsData().then((modelVisions) => {
  console.log(modelVisions);
});
```

### fetchSpacesData

根据当前 `path` 获取空间数据

由 [getSpaceAssets](#getspaceassets) 方法调用

#### 定义

```ts
function fetchSpacesData(): Promise<Map<string, ISpaces>>;
```

#### 用法

```ts
cpsSoonmanagerPlugin.fetchSpacesData().then((spacesData) => {
  console.log(spacesData);
});
```
