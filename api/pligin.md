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
