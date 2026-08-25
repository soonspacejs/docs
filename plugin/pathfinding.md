---
outline: 3
---

# plugin-pathfinding

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-pathfinding/latest.svg)

路径寻找，依赖是 [RecastJS](https://github.com/isaac-mason/recast-navigation-js)

## 样例

<Docs-Iframe src="plugin/pathfinding.html" />

## 安装

```bash
npm install @soonspacejs/plugin-pathfinding
# or
yarn add @soonspacejs/plugin-pathfinding
```

## 使用方法

```js
import SoonSpace from 'soonspacejs';
import PathfindingPlugin from '@soonspacejs/plugin-pathfinding';
import { init } from '@recast-navigation/core';

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {},
});

// 初始化 RecastJS
await init();

const pathfinding = ssp.registerPlugin(PathfindingPlugin, 'pathfinding');
consolo.log(pathfinding);
```

## 属性

### navMesh

导航 Mesh 区域

#### 定义

```ts
import { NavMesh } from '@recast-navigation/core';

NavMesh | null;
```

### crowd

人群管理

#### 定义

```ts
import { Crowd } from '@recast-navigation/core';

Crowd | null;
```

### debugDrawer

导航 Mesh 辅助对象

#### 定义

```ts
import { DebugDrawer } from '@recast-navigation/three';

DebugDrawer | null;
```

### crowdHelper

人群辅助对象

#### 定义

```ts
import { CrowdHelper } from '@recast-navigation/three';

CrowdHelper | null;
```

## 方法

### createSoloNavMesh

创建 NavMesh，创建成功后会设置 `navMesh` 属性

#### 定义

```ts
createSoloNavMesh(objects: Object3D[], config?: Partial<SoloNavMeshGeneratorConfig>): NavMesh | null
```

#### 用法

```js
const [model] = ssp.getObjectByName('xx');
pathfindingPlugin.createSoloNavMesh([model], {
  cs: 0.2,
  ch: 0.2,
});
```

#### 参数

##### objects

- **描述:** 用于计算 `navigation-mesh` 的场景对象
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `Object3D[]`

##### config

- **描述:** 配置项
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `Partial<SoloNavMeshGeneratorConfig>`

###### SoloNavMeshGeneratorConfig

请参考 [SoloNavMeshGeneratorConfig](https://docs.recast-navigation-js.isaacmason.com/types/generators.SoloNavMeshGeneratorConfig.html)

### disposeSoloNavMesh

卸载 Nav Mesh 的数据

#### 定义

```ts
disposeSoloNavMesh(): void
```

#### 用法

```js
pathfinding.disposeSoloNavMesh();
```

::: tip 提示
再次调用 `createSoloNavMesh` 之前，必须先调用 `disposeSoloNavMesh` 卸载数据。
:::

### createCrowd

创建 Crowd，创建成功后会设置 `crowd` 属性

#### 定义

```ts
function createCrowd(params: CrowdParams): Crowd | null;
```

#### 用法

```js
pathfindingPlugin.createCrowd({
  maxAgents: 500,
  maxAgentRadius: 10,
});
```

#### 参数

##### params

- **描述:** Crowd 参数
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `CrowdParams`

### disposeCrowd

卸载 Crowd 的数据

#### 定义

```ts
function disposeCrowd(): void;
```

#### 用法

```js
pathfinding.disposeCrowd();
```

::: tip 提示
再次调用 `createCrowd` 之前，必须先调用 `disposeCrowd` 卸载数据。
:::

### createDebugDrawer

创建 DebugDrawer，创建成功后会设置 `debugDrawer` 属性

#### 定义

```ts
function createDebugDrawer(): DebugDrawer | null;
```

#### 用法

```js
pathfinding.createDebugDrawer();
```

### disposeDebugDrawer

卸载 DebugDrawer 的数据

#### 定义

```ts
function disposeDebugDrawer(): void;
```

#### 用法

```js
pathfinding.disposeDebugDrawer();
```

::: tip 提示
再次调用 `createDebugDrawer` 之前，必须先调用 `disposeDebugDrawer` 卸载数据。
:::

### createCrowdHelper

创建 CrowdHelper，创建成功后会设置 `crowdHelper` 属性

#### 定义

```ts
function createCrowdHelper(params?: CrowdHelperParams): CrowdHelper | null;
```

#### 用法

```js
pathfinding.createCrowdHelper({
  agentMaterial: new THREE.MeshStandardMaterial({ color: 0x00ff00 }),
});
```

#### 参数

##### params

- **描述:** CrowdHelper 参数
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `CrowdHelperParams`

### disposeCrowdHelper

卸载 CrowdHelper 的数据

#### 定义

```ts
function disposeCrowdHelper(): void;
```

#### 用法

```js
pathfinding.disposeCrowdHelper();
```

::: tip 提示
再次调用 `createCrowdHelper` 之前，必须先调用 `disposeCrowdHelper` 卸载数据。
:::

### dispose

卸载所有数据

#### 定义

```
dispose(): void;
```

#### 用法

```js
pathfinding.dispose();
```

## 补充 API

### createTiledNavMesh

```ts
createTiledNavMesh(
  objects: Object3D[],
  config?: Partial<TiledNavMeshGeneratorConfig>
): NavMesh | null
```

按 tiled 模式生成导航网格。已有 `navMesh` 时不会重新生成，而是警告并返回旧实例；场景几何变化后应先释放 crowd，再调用 `disposeNavMesh()`，最后重新生成。

### disposeNavMesh

```ts
disposeNavMesh(): void
```

只释放当前导航网格。`dispose()` 还会释放 crowd 和 debug helper。

### getVertices

```ts
getVertices(objects: Object3D[]): {
  positions: Float32Array
  indices: TypedArray | null
}
```

遍历普通 Mesh 和 InstancedMesh，应用世界变换后合并为 Recast 可用的顶点和索引。

### deInstancingMesh

```ts
deInstancingMesh(mesh: InstancedMesh): Mesh[]
```

把 InstancedMesh 的每个实例转换为独立 Mesh，用于导航网格几何采集。返回 Mesh 共享源 geometry 和 material，不应单独 dispose 这些共享资源。
