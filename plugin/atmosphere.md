---
outline: 3
---

# plugin-atmosphere

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-atmosphere/latest.svg)

大气环境。

## 样例

<Docs-Iframe src="plugin/atmosphere.html" />

## 安装

```bash
npm install @soonspacejs/plugin-atmosphere
# or
yarn add @soonspacejs/plugin-atmosphere
```

## 使用方法

```js {2,10}
import SoonSpace from 'soonspacejs';
import AtmospherePlugin from '@soonspacejs/plugin-atmosphere';

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {},
});

const atmospherePlugin = ssp.registerPlugin(AtmospherePlugin, 'atmospherePlugin');
```

## 属性

### date

当前时间对象

- 类型：`Date`
- 默认值：当前时间，时刻为 10 点

### longitude

当前经度

- 类型：`number`
- 默认值：`120`

### latitude

当前纬度

- 类型：`number`
- 默认值：`30`

### altitude

当前高度

- 类型：`number`
- 默认值：`20`

### distance

光源与 `target` 的距离

- 类型：`number`
- 默认值：`300`

### target

光照点

- 类型：`THREE.Vector3`
- 默认值：`new THREE.Vector3(0, 0, 0)`

### groundAlbedo

地面颜色

- 类型：`IColor`
- 默认值：`0x666666`

### castShadow

是否开启阴影

- 类型：`boolean`
- 默认值：`true`

## 方法

### start

开启大气环境。

#### 定义

```ts
start(texturesUrl: string): void
```

#### 用法

```js
atmospherePlugin.start('../xx/atmosphere/assets');
```

::: tip 提示
`assets` 目录在 `node_modules/@soonspacejs/plugin-atmosphere/dist` 中

然后将 `assets` 目录拷贝至所在项目的静态资源目录中，一般是 `public` 目录
:::

::: tip 提示
调用 `start` 方法后，内部将会重置环境效果，并且重置色调。

```js
ssp.setToneMapping({ type: 'AGX', exposure: 10 });
```

:::

### stop

结束大气效果。

#### 定义

```ts
function stop(): void;
```

#### 用法

```js
atmospherePlugin.stop();
```

::: tip 提示
调用 `stop` 方法后，内部将会还原环境与色调。

```js
ssp.setEnvironment();
ssp.setToneMapping({ type: 'ACESFilmic', exposure: 0.8 });
```

:::

### dispose

结束并销毁大气效果。

#### 定义

```ts
function dispose(): void;
```

#### 用法

```js
atmospherePlugin.dispose();
```

::: tip 提示
`dispose` 方法会释放显存，可以在组件销毁时调用。
:::

## 云层与光照遮罩

### setCloudLayer

```ts
setCloudLayer(options: {
  coverage?: number
  quality?: 'low' | 'medium' | 'high' | 'ultra'
}): void
```

更新云层覆盖率和质量预设，并触发重新渲染。

```ts
atmospherePlugin.setCloudLayer({
  coverage: 0.45,
  quality: 'high',
})
```

### loadCloudTextures

```ts
loadCloudTextures(basePath: string): void
```

从目录加载 `local_weather.png`、`turbulence.png`、`shape.bin`、`shape_detail.bin` 和 `stbn.bin`。必须先调用 `start()`。

::: warning 异步加载
纹理请求没有取消或代际保护。不要并发或重复调用 `loadCloudTextures()`；确认全部纹理加载完成后再 `dispose()`，否则在途回调仍可能把新纹理写回已释放的 effect。
:::

### updateModelLightingMask

```ts
updateModelLightingMask(): void
```

把当前场景模型 Mesh 加入大气光照遮罩 layer。场景启动后又加载了新模型时可再次调用。

### neesUpdate

```ts
atmospherePlugin.neesUpdate = true
```

该兼容属性通过更新内部 `cacheKey` 使大气参数重新计算。属性名按现有 API 保留为 `neesUpdate`。
