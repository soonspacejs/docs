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
    closeInfoLog: false,
    closeWarnLog: false,
    fog: null,
    useIndexedDB: true,
  },
  events: {},
});
```

<!-- showGrid -->

## showGrid

是否显示场景网格。

- **类型**: boolean | [GridHelperOptions](../api/helper.html#gridhelperoptions)
- **默认值**: `false`

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

<!-- fog -->

## fog

场景雾化效果。

- **类型**: boolean ｜ [FogOptions](../api/sceneTool.html#fogoptions)
- **默认值**: `false`

<!-- controls -->

## controls

控制器配置。

- **类型**: [ControlsOptions](../api/controls.html#controlsoptions)
- **默认值**: `{}`

<!-- hoverEnabled -->

## hoverEnabled

是否开启鼠标悬浮响应。

- **类型**: boolean
- **默认值**: `false`
  ::: tip 提示
  不开启时 `modelHover` 和 `poiHover` 不会触发。
  提供一个 `API` [setHoverEnabled](../../api/advanced/dynamicconfig.html#setHoverEnabled) 动态更改该配置。
  :::

## closeInfoLog

是否关闭控制台信息

- **类型**: boolean
- **默认值**: `false`

<!-- closeWarnLog -->

## closeWarnLog

是否关闭控制台的警告日志（console.warn）。

- **类型**: boolean
- **默认值**: `true`
  ::: warning 注意
  在开发维护过程中发现大量来至 `threejs` 层的警告日志占用浏览器内存所导致卡顿，但未找到其提供的关闭配置，所以 `soonspacejs` 添加该配置项来默认用一个空函数赋值到 `window.console.warn` 来解决该问题。

```js
if (option.closeWarnLog) window.console.warn = function() {};
```

:::

<!-- useIndexedDB -->

## useIndexedDB

是否使用 `indexedDB` 本地数据库来持久化存储模型文件数据。开启后重复的模型资源不会多次加载。

- **类型**: boolean
- **默认值**: `true`

::: tip 提示
清空 `indexedDB` 存储参考[这里](../api/sbm.html#clearidb)
:::
