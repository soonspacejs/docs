# 场景事件

实例初始时可以通过 `events` 定义场景交互函数。运行时监听、完整 signal 清单和清理方式见 [事件与变更通知（signals）](../api/signals)。

```js
const ssp = new SoonSpace({
  el: "#view",
  options: {},
  events: {
    // 鼠标点击模型
    modelClick(modelEvent) {
      console.log(modelEvent, modelEvent.target);
    },
    // 鼠标双击模型
    modelDblClick(modelEvent) {
      console.log(modelEvent, modelEvent.target);
    },
    // 鼠标右键点击模型
    modelRightClick(modelEvent) {
      console.log(modelEvent, modelEvent.target);
    },
    // 鼠标悬浮模型
    modelHover(modelEvent) {
      console.log(modelEvent, modelEvent.target);
    },
    // 鼠标悬浮模型后离开
    modelUnHover(model) {
      console.log(model);
    },
    // 鼠标点击 poi
    poiClick(poiEvent) {
      console.log(poiEvent, poiEvent.target);
    },
    // 鼠标双击 poi
    poiDblClick(poiEvent) {
      console.log(poiEvent, poiEvent.target);
    },
    // 鼠标右键点击 poi
    poiRightClick(poiEvent) {
      console.log(poiEvent, poiEvent.target);
    },
    // 鼠标悬浮 poi
    poiHover(poiEvent) {
      console.log(poiEvent, poiEvent.target);
    },
    // 鼠标悬浮离开 poi
    poiUnHover(poi) {
      console.log(poi);
    },
    // 左键点击场景且射线未命中任何对象
    sceneClick(sceneClickEvent) {
      console.log(sceneClickEvent, sceneClickEvent.type);
    },
    // 鼠标点击拾取空间坐标
    selectPosition(position) {
      console.log(position);
    },
  },
});
```

<!-- modelClick -->

## modelClick

鼠标单击模型事件。

### 回调参数

#### modelEvent

- **target**
  - **类型：** Model
  - **描述：** 事件选中的第一个模型。
- **currentTarget**
  - **类型：** Mesh
  - **描述：** 触发该事件的模型子节点。
- **intersects**
  - **类型：** intersect[]
    - intersect
      - model：Model
      - sourceData：object
  - **描述：** 事件选中的所有数据。

## modelDblClick

鼠标双击模型事件。

### 回调参数

#### modelEvent

[同 modelClick](#modelevent)

## modelRightClick

鼠标右键点击模型事件。

### 回调参数

#### modelEvent

[同 modelClick](#modelevent)

## modelHover

鼠标悬浮在模型上事件。

### 回调参数

#### modelEvent

[同 modelClick](#modelevent)

## modelUnHover

鼠标悬浮模型后离开事件。

### 回调参数

#### model

- **类型** Model
- **描述** 上次鼠标悬浮后又离开的模型对象

## poiClick

鼠标单击 `poi` 事件。

### 回调参数

#### poiEvent

- **target**
  - **类型：** Poi
  - **描述：** 单击选中的 `Poi` 对象。
- **event**
  - **类型：** MouseEvent | TouchEvent
  - **描述：** 触发交互的原生输入事件。

## poiDblClick

双击 `poi` 事件。

### 回调参数

#### poiEvent

[同 poiClick](#poievent)

## poiRightClick

右键单击或移动端长按 `poi` 事件。

### 回调参数

#### poiEvent

[同 poiClick](#poievent)

## poiHover

鼠标悬浮在 `poi` 上事件。

### 回调参数

#### poiEvent

[同 poiClick](#poievent)

## poiUnHover

鼠标悬浮在 `poi` 上离开事件。

### 回调参数

#### poi

- **类型：** Poi
- **描述：** 上次鼠标悬浮后又离开的 `Poi` 对象。

## sceneClick

鼠标左键单击，并且射线未相交到任何对象时触发。

### 回调参数

#### sceneClickEvent

- **type**
  - 类型: [SceneEventType](./types#sceneeventtype)
  - 描述: 当前固定为 `click`
- **event**
  - 类型: [MouseEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/MouseEvent) ｜ [TouchEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent)
  - 描述: 触发时传递的原生事件

## selectPosition

通过点击在空间内获取坐标点(世界坐标)。

### 回调参数

#### position

- **类型：** [Position](./types#position)
- **描述：** 射线与空间对象相交坐标点。
