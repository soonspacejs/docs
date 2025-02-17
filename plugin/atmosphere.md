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
