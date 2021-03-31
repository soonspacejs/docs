# 辅助器

## createGround
创建地面
### 定义：
```ts
function createGround(options: GroundOptions): BaseMesh
```
### 用法：
```js
ssp.createGround({
  imgUrl: 'http://xxx.com/xx.png',
  width: 500,
  height: 500,
  // ...
})
```
### 参数：
#### options
  - **描述:** 可配置项
  - **必填:** <Base-RequireIcon :isRequire="true"/>
  - **类型:** GroundOptions
##### GroundOptions
<Docs-Table 
    :data="[
      {
        prop: 'imgUrl', desc: '生成地面的图片资源路径', type: 'string', require: true, default: ''
      },
      {
        prop: 'id', desc: '地面唯一 ID', type: 'string', require: true, default: ''
      },
      {
        prop: 'width', desc: '地面长（平面的宽）', type: 'number', require: false, default: '500',
      },
      {
        prop: 'height', desc: '地面宽（平面的高）', type: 'number', require: false, default: '500',
      },
      {
        prop: 'opacity', desc: '地面不透明度', type: 'number', require: false, default: '1',
      },
      {
        prop: 'position', desc: '地面中心点坐标', type: 'Position', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#position'
      },
      {
        prop: 'rotation', desc: '地面旋转角度', type: 'Rotation', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#rotation'
      },
      {
        prop: 'scale', desc: '地面缩放比', type: 'Scale', require: false, default: '{ x: 1, y: 1, z: 1 }', link: '../guide/types.html#scale'
      },
      {
        prop: 'repeat', desc: '地面在平面内的平铺数', type: 'IVector2', require: false, default: '{ x: 10, y: 10 }', link: '../guide/types.html#ivector2'
      },
    ]"
/>

## addGridHelper
添加网格辅助器
### 定义：
```ts
function addGridHelper(options: GridHelperOptions = {}): GridHelper
```
### 用法：
```js
ssp.addGridHelper({
  size: 1000,
  divisions: 20,
  color: '#fff'
})
```
### 参数：
#### options
  - **描述:** 可配置项
  - **必填:** <Base-RequireIcon :isRequire="false"/>
  - **类型:** [GridHelperOptions](../guide/config.html#gridhelperoptions)
  - **默认值:** `{ size: 1000, divisions: 20, color: '#fff' }`

## addAxishelper
添加坐标轴辅助器
### 定义：
```ts
function addAxishelper(axisLength: number = 1000): AxesHelper
```
### 用法：
```js
ssp.addAxishelper(100)
```
### 参数：
#### axisLength
  - **描述:** 轴展示长度
  - **必填:** <Base-RequireIcon :isRequire="false"/>
  - **类型:** number
  - **默认值:** `1000`

## addBoxHelper
添加包围盒辅助器
### 定义：
```ts
function addBoxHelper(box: Box3, color: IColor = '#00ff00'): Box3Helper
```
### 用法：
```js
ssp.addBoxHelper(
  // box
  ssp.getSbmById('xxx').getBoundingBox()
  // color
  '#00ff00'
)
```
### 参数：
#### box
  - **描述:** 包围盒
  - **必填:** <Base-RequireIcon :isRequire="true"/>
  - **类型:** Box3
#### box
  - **描述:** 包围盒
  - **必填:** <Base-RequireIcon :isRequire="false"/>
  - **类型:** [IColor](../guide/types.html#icolor)
  - **默认值:** `#00ff00`
