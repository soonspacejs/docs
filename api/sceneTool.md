# 场景操作

## setBackgroundColor

设置背景色

### 定义：

```ts
function setBackgroundColor(color: IColor): void;
```

### 用法：

```js
ssp.setBackgroundColor(0xff0000);
```

### 参数：

#### color

- **类型:** [IColor](../guide/types.html#icolor)
- **描述:** 颜色值
- **必填:** <Base-RequireIcon />

## setBackgroundImage

设置背景图

### 定义：

```ts
function setBackgroundImage(imgUrl: string): void;
```

### 用法：

```js
ssp.setBackgroundImage('http://xx.com/xx.png');
```

### 参数：

#### imgUrl

- **类型:** string
- **描述:** 图片路径
- **必填:** <Base-RequireIcon />

## setSphereSkyBackground

设置球体天空盒，球体天空盒的图片资源是一张全景图。

### 用法：

```js
ssp.setSphereSkyBackground('http://xx.com/xx.png');
```

### 定义：

```ts
function setSphereSkyBackground(imgUrl: string): void;
```

### 参数：

#### imgUrl

- **类型:** string
- **描述:** 图片路径。
- **必填:** <Base-RequireIcon />

## setSkyBackground

设置天空盒

### 定义：

```ts
function setSkyBackground(dirPath: string, fileNames: string[]): void;
```

### 用法：

```js
ssp.setSkyBackground(
  // 文件夹路径
  'http://www.xwbuilders.com:9018/soonspacejs/skybox/sunny/',
  // 有序的图片名集合
  ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']
);
```

### 参数：

#### dirPath

- **类型:** string
- **描述:** 图片文件夹路径。
- **必填:** <Base-RequireIcon />

#### fileNames

- **类型:** string[]
- **描述:** 六张图片的名称集合。
- **必填:** <Base-RequireIcon />

::: tip 提示
参数 `fileNames` 内的图片是有严格顺序的。依次为：

- 以空间坐标系为参考
  <br>
  x 轴正向（px）、x 轴负向（nx）、y 轴正向（py）、y 轴负向（ny）、z 轴正向（pz）、z 轴负向（nz）。
  <br>
  p: prev、 n: next
- 以立方体盒子的六个面为参考
  <br>
  右（right）、左（left）、上（top）、下（bottom）、前（front）、后（back）。
  :::

## openSceneFog

## closeSceneFog

## sceneClipping

## changeSceneClipping

## removeSceneClipping

## getObjectLabelPos

## getOffsetByPosition

## getPositionByOffset

## addObject

## removeObject

## setHoverEnabled

## render

## clearObject

## clearSignals

## clear

## dispose
