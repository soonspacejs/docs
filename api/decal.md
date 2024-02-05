# 贴花

### 样例：

<Docs-Iframe src="decal/decalSpotting.html" />

<Docs-Iframe src="decal/decalTransform.html" />

## createDecal

创建贴花

### 定义：

```ts
interface DecalInfo extends BaseObjectInfo {
  url?: string;
  color?: IColor;
  opacity?: number;
  snapping?: boolean;
  snappingDistance?: number;
  snappingTargets?: Object3D[];
}

function createDecal(info: DecalInfo, parent?: Object3D | null): Promise<Decal>;
```

### 用法：

```js
const decal = await ssp.createDecal({
  id: 'decal',
  url: './img/poi_001.png',
  position: {
    x: 0,
    y: 2,
    z: 3,
  },
  rotation: {
    x: 0,
    y: 0,
    z: 0,
  },
  scale: {
    x: 1,
    y: 1,
    z: 1,
  },
  snapping: true,
  snappingDistance: 1,
});
```

### 参数：

#### info

- **描述:** 贴花参数
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** DecalInfo

##### DecalInfo

<Docs-Table
    :data="[
      { prop: 'url', desc: '图片地址', type: 'string', require: false, default: '' },
      { prop: 'color', desc: '颜色', type: 'IColor', require: false, default: '#fff', link: '../guide/types#icolor' },
      { prop: 'opacity', desc: '不透明度', type: 'number', require: false, default: '1', },
      { prop: 'snapping', desc: '是否开启吸附', type: 'boolean', require: false, default: 'true', },
      { prop: 'snappingDistance', desc: '吸附距离', type: 'number', require: false, default: '1', },
      { prop: 'snappingTargets', desc: '吸附目标', type: 'Object3D[]', require: false, default: '场景所有模型', },
    ]"
/>

其他配置请参考[BaseObjectInfo](../guide/types#baseobjectinfo)

## decal.updateTexture

更新贴花纹理

### 定义：

```ts
Decal.updateTexture(url: DecalInfo['url']): Promise<void>;
```

### 用法：

```js
decal.updateTexture('xxx.png');
// 重新渲染
ssp.render();
```

## decal.updateMaterial

更新贴花材质

### 定义：

```ts
type DecalMaterialInfo = Pick<DecalInfo, 'color' | 'opacity'>

Decal.updateMaterial(params?: DecalMaterialInfo): void
```

### 用法：

```js
decal.updateMaterial({ color: '#ff0', opacity: 0.5 });
// 重新渲染
ssp.render();
```

## updateDecalGeometry

更新贴花几何结构

### 定义：

```ts
type DecalGeometryInfo = Pick<DecalInfo, 'snapping' | 'snappingDistance' | 'snappingTargets'>;

function updateDecalGeometry(decal: Decal, info?: DecalGeometryInfo): Decal;
```

### 用法：

```js
// 只可以吸附到特定的对象上
ssp.updateDecalGeometry(decal, { snapping: true, snappingDistance: 1, snappingTargets: [xxxObject] });
// 可以吸附到所有模型上
ssp.updateDecalGeometry(decal, { snapping: true, snappingDistance: 1 });
```
