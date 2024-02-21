---
outline: 3
---

# plugin-pathfinding

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-pathfinding/latest.svg)

路径寻找

## 样例

<Docs-Iframe src="plugin/pathfinding.html" />

## 安装

```bash
npm install @soonspacejs/plugin-pathfinding
# or
yarn add @soonspacejs/plugin-pathfinding
```

## 使用方法

```js {2,13}
import SoonSpace from 'soonspacejs';
import PathfindingPlugin from '@soonspacejs/plugin-pathfinding';

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {},
});

await PathfindingPlugin.ready();

const pathfinding = ssp.registerPlugin(PathfindingPlugin, 'pathfinding');
consolo.log(pathfinding);
```

## 静态方法

### ready

导航区域程序初始化

#### 定义

```ts
PathfindingPlugin.ready(): Promise<void>
```

#### 用法

```js
await PathfindingPlugin.ready();

pathfinding.createNavMesh({
  ...
})
```

::: tip 提示
使用 `createNavMesh` 计算路径导航区域时，请先等待 `PathfindingPlugin.ready` 完成
:::

## 方法

### createNavMesh

创建 [navigation-mesh](https://www.donmccurdy.com/2017/08/20/creating-a-nav-mesh-for-a-webvr-scene/)

#### 定义

```ts
interface INavMeshOptions {
  cs?: number;
  ch?: number;
  walkableSlopeAngle?: number;
  walkableHeight?: number;
  walkableClimb?: number;
  walkableRadius?: number;
  maxEdgeLen?: number;
  maxSimplificationError?: number;
  minRegionArea?: number;
  mergeRegionArea?: number;
  maxVertsPerPoly?: number;
  detailSampleDist?: number;
  detailSampleMaxError?: number;
  borderSize?: number;
}

function createNavMesh(objects?: Object3D[], options?: INavMeshOptions): void;
```

#### 用法

```js
pathfinding.createNavMesh(ssp.getAllModel(), {
  cs: 0.2,
  ch: 0.1,
  walkableSlopeAngle: 89,
  walkableHeight: 15,
  walkableClimb: 2,
  walkableRadius: 2,
  maxSimplificationError: 1.3,
  minRegionArea: 1,
  mergeRegionArea: 10,
  maxVertsPerPoly: 5,
  detailSampleDist: 6,
  detailSampleMaxError: 1,
});
```

#### 参数

##### objects

- **描述:** 用于计算 `navigation-mesh` 的场景对象，默认值是 `ssp.getAllModel()`
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `Object3D[]`

##### options

- **描述:** 配置项
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `INavMeshOptions`

###### INavMeshOptions

<Docs-Table 
    :data="[
      {
        prop: 'cs', desc: 'mesh 是体素化的，以便计算可行走的导航网格。这个参数在世界单位中定义了一个体素的宽度和深度', type: 'number', require: false, default: '0.1'
      },
      {
        prop: 'ch', desc: '和 cs 类似，用于定义高度', type: 'number', require: false, default: '0.1'
      },
      {
        prop: 'walkableSlopeAngle', desc: '最大可行走坡度', type: 'number', require: false, default: '89'
      },
      {
        prop: 'walkableHeight', desc: '允许进入的体素单位的高度', type: 'number', require: false, default: '15'
      },
      {
        prop: 'walkableClimb', desc: '可以被攀爬的体素单位', type: 'number', require: false, default: '2'
      },
      {
        prop: 'walkableRadius', desc: '体素单位的半径', type: 'number', require: false, default: '2'
      },
      {
        prop: 'maxEdgeLen', desc: '沿网格边界的轮廓边的最大允许长度。体素单位', type: 'number', require: false, default: '12'
      },
      {
        prop: 'maxSimplificationError', desc: '简化轮廓线边界边缘偏离原始轮廓线的最大距离。体素单位', type: 'number', require: false, default: '1.3'
      },
      {
        prop: 'minRegionArea', desc: '允许形成独立区域的最小单元格数量。体素单元', type: 'number', require: false, default: '8'
      },
      {
        prop: 'mergeRegionArea', desc: '如果可能的话，任何跨度计数小于此值的区域都将与更大的区域合并。体素单元', type: 'number', require: false, default: '100'
      },
      {
        prop: 'maxVertsPerPoly', desc: '在轮廓到多边形转换过程中生成的多边形所允许的最大顶点数。必须是&gt;3.', type: 'number', require: false, default: '5'
      },
      {
        prop: 'detailSampleDist', desc: '设置生成细节网格时要使用的采样距离。世界单位', type: 'number', require: false, default: '6'
      },
      {
        prop: 'detailSampleMaxError', desc: '细节网格表面应该偏离高度场数据的最大距离。世界单位', type: 'number', require: false, default: '1'
      },
      {
        prop: 'borderSize', desc: '高度场周围不可航行边界的大小', type: 'number', require: false, default: '0'
      },
    ]"
/>

### createDebugNavMesh

创建辅助 mesh

#### 定义

```ts
function createDebugNavMesh(): Mesh | null;
```

#### 用法

```js
const debugMesh = pathfinding.createDebugNavMesh();

/**
 * 需要删除时
 */
ssp.removeObject(debugMesh);
```

::: tip 提示
重复创建时会自动将之前的辅助 mesh 删除
:::

### getClosestPoint

在 navigation-mesh 上获得一个接近世界位置的点

#### 定义

```ts
function getClosestPoint(position: IVector3): IVector3 | null;
```

#### 用法

```js
const p = { x: 0, y: 0, z: 0 };

const closestPoint = pathfinding.getClosestPoint(p);
```

### computePath

计算从开始到结束的导航路径

#### 定义

```ts
function computePath(start: IVector3, end: IVector3): IVector3[] | null;
```

#### 用法

```js
const p1 = pathfinding.getClosestPoint({ x: 0, y: 0, z: 0 });

const p2 = pathfinding.getClosestPoint({ x: 100, y: 0, z: 100 });

const path = pathfinding.computePath(p1, p2);
```

### dispose

卸载 navigation-mesh 的数据

#### 定义

```ts
function dispose(): void;
```

#### 用法

```js
pathfinding.dispose();
```
