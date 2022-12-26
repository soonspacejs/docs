# PoiMesh 对象

PoiMesh 其实就是 3D 平面 Mesh 对象，与普通的 Mesh 对象没有几何区别。

## 对比

`Poi`、`PoiNode`、`PoiMesh` 的区别如下：

- `Poi`：
  - 具备空间尺寸的透视特性，即：近大无小的特性
  - 总是面向用户
  - 但只能显示图片、文字，不能呈现 dom 元素
- `PoiNode`：
  - 具备空间尺寸的透视特性，即：近大无小的特性
  - 能呈现 Dom 元素
  - 总是显示在 3 维场景的最前面，即：模型遮挡不住 `PoiNode`
  - 2D 和 2.5D 类型的 `PoiNode` 总是面向用户，而 3D 类型的 `PoiNode` 不会
- `PoiMesh`：
  - 就是普通的 Mesh，具备空间尺寸的透视特性，即：近大无小的特性
  - 类型于 3D 类型的 PoiNode，但可以被场景中的其它 3D 模型遮挡
  - 能呈现 图片、Cavans、视频
  - 用于可以指定任意三维多边形区域来创建多边形的 `PoiMesh`。

### 样例：

<Docs-Iframe src="poiMesh/createPoiMesh.html" />

## createPoiMesh

创建一个具有矩形边界的 `PoiMesh` 对象，它可用于在 3 维场景中展示图片、视频、Canvas 等等

通过 `width`、`height` 选项来确定矩形的尺寸。

通过 `image` 选项来设置 poi 的图片、Canvas 或 视频。

### 定义：

```ts
interface PoiMeshOptions extends MeshBasicMaterialParameters, MeshPhongMaterialParameters {
  /**
   * 图片的url 或者是  HTMLImageElement | HTMLCanvasElement | HTMLVideoElement
   */
  image?: TextureImage | null;
  /**
   * 是否需要有灯光才能显示
   */
  needLight?: boolean;

  id: string | number;
  name?: string;
  userData?: any;
  level?: Level;
  visible?: boolean;

  /**
   * 是否使用缓存的材质
   */
  cache?: boolean;

}

interface CreatePoiMeshOptions extends PoiMeshOptions {
  position?: IVector3;
  rotation?: IVector3;
  width?: number;
  height?: number;
}

createPoiMesh ( options: CreatePoiMeshOptions ): BaseMesh;
```

### 用法：

```js
ssp.createPoiMesh(
  // poiInfo
  {
    id: 'xx',
    name: 'xx',
    image: 'http://xx.com/xx.png',
    width: 100,
    height: 50,
    level: {
      max: 1000,
      min: null,
    },
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 2, y: 2, z: 2 },
    userData: {},
  }
);
```

### 参数：

#### options

- **描述:** 实例 `PoiMesh` 对象所需信息
- **类型:** `CreatePoiMeshOptions`
- **必填:** <Base-RequireIcon :isRequire="true"/>

##### CreatePoiMeshOptions

<Docs-Table
    :data="[
      { prop: 'id', desc: '唯一ID', type: 'string | number', require: true, default: '' },
      { prop: 'name', desc: '名称', type: 'string', require: false, default: '' },
      { prop: 'image', desc: '图片资源路径', type: 'string', require: true, default: '' },
      { prop: 'width', desc: 'PoiMesh 的宽', type: 'number', require: false, default: '1' },
      { prop: 'height', desc: 'PoiMesh 的高', type: 'number', require: false, default: '1' },
      { prop: 'level', desc: '显示层级范围', type: 'Level', require: false, default: '{ max: null, min: null }', link: '../guide/types.html#level' },
      { prop: 'visible', desc: '是否可见', type: 'boolean', require: false, default: 'true' },
      { prop: 'position', desc: '位置坐标', type: 'Position', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#position' },
      { prop: 'rotation', desc: '旋转弧度', type: 'Rotation', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#rotation' },
      { prop: 'scale', desc: '缩放比例', type: 'Scale', require: false, default: '{ x: 1, y: 1, z: 1 }', link: '../guide/types.html#scale' },
      { prop: 'userData', desc: '用户数据', type: 'any', require: false, default: '{}' },
      { prop: 'needLight', desc: '是否需要有灯光才能显示', type: 'boolean', require: false, default: 'false' },
      { prop: 'cache', desc: '是否使用缓存的材质', type: 'boolean', require: false, default: 'true' },
    ]"
/>

## createPolygonPoiMesh

创建一个具有多边形边界的 `PoiMesh` 对象。

通过 `points` 选项来设置多边形的顶点的世界坐标。

该多边形所在的平面是由 `points` 中前三个顶点来决定的，其它的顶点会自动转换成在该平面上的投影点。所以，最终形成的多边形是 传入的所有顶点 在 其前三个顶点所确定的平面上的投影顶点所围成的多边形。

### 定义：

```ts
interface PoiMeshOptions extends MeshBasicMaterialParameters, MeshPhongMaterialParameters {
  /**
   * 图片的url 或者是  HTMLImageElement | HTMLCanvasElement | HTMLVideoElement
   */
  image?: TextureImage | null;
  /**
   * 是否需要有灯光才能显示
   */
  needLight?: boolean;

  id: string | number;
  name?: string;
  userData?: any;
  level?: Level;
  visible?: boolean;

  /**
   * 是否使用缓存的材质
   */
  cache?: boolean;

}

interface CreatePolygonPoiMeshOptions extends PoiMeshOptions {
  points: IVector3[];
}

createPolygonPoiMesh ( options: CreatePolygonPoiMeshOptions ): BaseMesh;
```

### 用法：

```js
ssp.createPolygonPoiMesh(
  // poiInfo
  {
    id: 'xx',
    name: 'xx',
    image: 'http://xx.com/xx.png',
    points:[
    {
      x:0,
      y:0,
      z:0,

    },
    {
      x:0,
      y:100,
      z:0,

    },
    {
      x:80,
      y:100,
      z:0,

    },
    {
      x:100,
      y:30,
      z:0,

    },
    ]
    level: {
      max: 1000,
      min: null,
    },
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 2, y: 2, z: 2 },
    userData: {},
  }
);
```

### 参数：

#### options

- **描述:** 实例 `PoiMesh` 对象所需信息
- **类型:** `CreatePolygonPoiMeshOptions`
- **必填:** <Base-RequireIcon :isRequire="true"/>

##### CreatePolygonPoiMeshOptions

<Docs-Table
    :data="[
      { prop: 'id', desc: '唯一ID', type: 'string | number', require: true, default: '' },
      { prop: 'name', desc: '名称', type: 'string', require: false, default: '' },
      { prop: 'image', desc: '图片资源路径', type: 'string', require: true, default: '' },
      {
        prop: 'points', desc: '多边形的顶点列表', type: 'IVector3[]', require: true, default: ''
      },
      { prop: 'level', desc: '显示层级范围', type: 'Level', require: false, default: '{ max: null, min: null }', link: '../guide/types.html#level' },
      { prop: 'visible', desc: '是否可见', type: 'boolean', require: false, default: 'true' },
      { prop: 'scale', desc: '缩放比例', type: 'Scale', require: false, default: '{ x: 1, y: 1, z: 1 }', link: '../guide/types.html#scale' },
      { prop: 'userData', desc: '用户数据', type: 'any', require: false, default: '{}' },
      { prop: 'needLight', desc: '是否需要有灯光才能显示', type: 'boolean', require: false, default: 'false' },
      { prop: 'cache', desc: '是否使用缓存的材质', type: 'boolean', require: false, default: 'true' },
    ]"
/>
