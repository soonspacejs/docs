# 配置项

实例初始时可配置选项。
```js
const ssp = new SoonSpace({
  el: '#view',
  options: {
    showGrid: true,
    showInfo: true,
    background: {
      color: 0x333300,
      // alpha: false,
      // img: null,
      // skyBox: null
    },
    hoverEnabled: false,
    closeWarnLog: false,
    fog: null,
    useIndexedDB: true
  },
  events: {}
})
```

<!-- showGrid -->
## showGrid 
是否显示场景网格。
- **类型**: boolean | GridHelperOptions
- **默认值**: `false`
### GridHelperOptions
<Docs-Table 
    :data="[
      { prop: 'size', desc: '网格尺寸', type: 'number', require: false, default: '1000' },
      { prop: 'divisions', desc: '网格横纵向分割格数', type: 'number', require: false, default: '20' },
      { prop: 'color', desc: '网格颜色', type: 'IColor', require: false, default: '#ffffff' },
    ]"
/>

<!-- showInfo -->
## showInfo
是否显示左下角的加载数量信息。
- **类型**: boolean
- **默认值**: `true`

<!-- background -->
## background
背景属性
- **类型**: BackgroundOptions
### BackgroundOptions
<Docs-Table 
    :data="[
      { prop: 'color', desc: '背景色，权重低于 img、skyBox', type: 'string | number ｜ null', require: false, default: '#000000' },
      { prop: 'alpha', desc: '背景色是否透明', type: 'boolean', require: false, default: 'false' },
      { prop: 'img', desc: '背景图路径，权重低于 skyBox', type: 'string', require: false, default: 'undefined' },
      { prop: 'skyBox', desc: '背景天空盒属性', type: 'string | SkyBoxOptions', require: false, default: 'undefined' }
    ]"
/>

### SkyBoxOptions
<Docs-Table 
    :data="[
      { prop: 'dirPath', desc: '图片文件夹路径', type: 'string', require: true, default: '' },
      { prop: 'fileNames', desc: '包围盒六张图片的名称集合', type: 'string[]', require: true, default: '' },
    ]"
/>
::: tip 特殊使用
  `alpha` 设置为 `true`，同时 `color` 设置为 `null`, 空间背景将完全透明。
:::

<!-- hoverEnabled -->
## hoverEnabled
是否开启鼠标悬浮响应。
- **类型**: boolean
- **默认值**: `false`
::: tip 提示
不开启时 `modelHover` 和 `poiHover` 不会触发。
提供一个 `API` [setHoverEnabled](../../api/advanced/dynamicconfig.html#setHoverEnabled) 动态更改该配置。
:::

<!-- closeWarnLog -->
## closeWarnLog
是否关闭控制台的警告日志（console.warn）。
- **类型**: boolean
- **默认值**: `true`
::: warning 注意
在开发维护过程中发现大量来至 `threejs` 层的警告日志占用浏览器内存所导致卡顿，但未找到其提供的关闭配置，所以 `soonspacejs` 添加该配置项来默认用一个空函数赋值到 `window.console.warn` 来解决该问题。
```js
if( option.closeWarnLog ) window.console.warn = function () {}
```
:::

<!-- fog -->
## fog
场景雾化效果。
- **类型**: boolean ｜ FogOptions
- **默认值**: `false`
### FogOptions
<Docs-Table 
    :data="[
      { prop: 'color', desc: '雾化颜色', type: 'IColor', require: false, default: '#cce0ff' },
      { prop: 'near', desc: '雾化近地点高度', type: 'number', require: false, default: '500' },
      { prop: 'far', desc: '雾化远地点高度', type: 'number', require: false, default: '50000' },
    ]"
/>

<!-- useIndexedDB -->
## useIndexedDB
是否使用 `indexedDB` 本地数据库来持久化存储模型文件数据。开启后重复的模型资源不会多次加载。
- **类型**: boolean
- **默认值**: `true` 
