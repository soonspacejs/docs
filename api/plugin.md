# 插件

插件机制在 `1.6.x` 中开始实现，希望通过这种方式在不丢失原有功能的基础上降低核心包的臃肿，且扩展性更强。
但为了保护内部和客户原有项目的稳定性，很多不常用功能始终没发解构抽离。

所以随着 `2.x` 大版本的更新优化了插件部分，抽离独立了很多功能，例如：`第一人称`、`自动巡检`、`手动路径绘制`...

## registerPlugin
注册插件
### 用法
```js {10}
import SoonSpace from 'soonspacejs'
import HeatMapPlugin from '@soonspacejs/plugin-heat-map'

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  event: {}
})

const heatMap = ssp.registerPlugin(HeatMapPlugin, 'heatMap')
consolo.log(heatMap)

// or
console.log(ssp.plugins.heatMap)
```
### 参数
#### plugin
被注册的插件函数，函数规则必须是构造函数，必须具有 `Constructor` 构造方法。
- 类型：Function
- 必填：是
##### `Constructor` 接受的回调参数
- ssp: `SoonSpace` 实例
```ts
class HeatMapPlugin {
  constructor(ssp: SoonSpace) {
    console.log(ssp)
  }
}
```
#### name
插件名称，用于读取查询。
- 类型：string
- 必填：是

## 插件对象

插件对象用于把插件创建的 Three.js 对象纳入 SoonSpace 对象管理。

```ts
createPluginObject(
  info: PluginObjectInfo,
  object?: Object3D
): PluginObject

addToPluginObject(
  id: PluginObjectInfo['id'],
  object: Object3D
): PluginObject | null

getPluginObjectById(
  id: PluginObjectInfo['id']
): PluginObject | null

getPluginObjectByName(name: string): PluginObject[]

removePluginObjectById(
  id: PluginObjectInfo['id']
): boolean
```

```ts
const pluginObject = ssp.createPluginObject({
  id: 'weather-effect',
  name: 'Weather effect',
})

ssp.addToPluginObject('weather-effect', mesh)
ssp.getObjectById<PluginObject>('weather-effect')
ssp.removeObjectById('weather-effect')
```

`getPluginObjectById`、`getPluginObjectByName` 和 `removePluginObjectById` 是兼容 API，调用时会输出 deprecated 警告。新代码分别使用 `getObjectById`、`getObjectByName` 和 `removeObjectById`。

## getPlugin
获取已注册插件
### 用法
```js
const heatMap = ssp.getPlugin('heatMap')
consolo.log(heatMap)

// or
console.log(ssp.plugins.heatMap)
```
### 参数
#### pluginName
插件名称。
- 类型：string
- 必填：是
