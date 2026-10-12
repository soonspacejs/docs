# Entity 入门：创建共享资源的模型场景

::: warning 3.0 alpha 预览
本页对应已发布的 `3.0.0-alpha.0`，旧 AutoInstancing 已移除，接口仍可能发生破坏性变更。安装稳定版 `2.16.8` 不会获得这些接口。
:::

本教程使用 `new SoonSpace(...)` 创建场景，把同一份几何资源用于九个 Entity，再演示移动、隐藏和加载外部模型。Entity 表示业务对象；内部实例槽位变化不会改变它的 `id`。

## 准备依赖与容器

按 [安装说明](./index#install) 固定 SDK 为 `3.0.0-alpha.0`，并安装匹配的 Three.js 及配套依赖。未指定版本的 `soonspacejs` 仍安装稳定版，不包含这些接口。

先准备一个有实际宽高的容器：

```html
<div id="view" style="width: 100%; height: 600px"></div>
```

## 第一步：创建九个共享资源的 Entity

下面是可放入 ES module 的完整 TypeScript 示例，不需要自己创建 `WebGLRenderer`：

```ts
import SoonSpace from 'soonspacejs';

export async function createEntityScene(el: string | HTMLElement = '#view') {
  const ssp = new SoonSpace({
    el,
    options: { showGrid: false, useIndexedDB: false },
  });

  try {
    const { BoxGeometry, MeshNormalMaterial, Matrix4 } = SoonSpace.THREE;
    const resource = ssp.models.register(
      {
        parts: [{
          geometry: new BoxGeometry(),
          material: new MeshNormalMaterial(),
          matrix: new Matrix4(),
        }],
      },
      { ownership: 'transfer' }
    );

    const root = ssp.entities.add({ id: 'campus', owner: 'tutorial' });
    try {
      ssp.entities.batch(() => {
        for (let x = -1; x <= 1; x++) {
          for (let z = -1; z <= 1; z++) {
            ssp.entities.add({
              id: `box-${x}-${z}`,
              parent: root,
              model: resource,
              position: [x * 3, 0, z * 3],
            });
          }
        }
      });
    } finally {
      // Entity 已保留自己的引用，释放本次业务调用持有的引用。
      resource.release();
    }

    ssp.flushUpdates();
    await ssp.controls.setLookAt(8, 8, 12, 0, 0, 0, false);
    await ssp.controls.fitToBox(ssp.entities.getBounds(root), false);
    await ssp.render();
    return { ssp, root };
  } catch (error) {
    ssp.dispose();
    throw error;
  }
}

const { ssp, root } = await createEntityScene();
console.log(ssp.entities.getStats());
```

此时能看到九个方块，并可用 SoonSpace 的相机控制器操作视角。统计中的 `entities` 为 `10`：一个无模型的父 Entity，加九个子 Entity；这个兼容资源组可形成一个 `InstancedMesh` 批次。整帧 draw calls 还可能包含其他渲染 pass，不应据此断言整帧只有一次提交。

`ownership: 'transfer'` 表示成功注册后资源归 SDK 管理，业务代码不能再修改或自行销毁其中的 geometry、material、texture。不同 Entity 使用同一个资源 lease（引用句柄），而不是重复注册同一份已转交的资源。

## 第二步：修改后显式通知

后面的片段沿用第一步返回的 `ssp` 和 `root`：

```ts
const box = ssp.entities.getById('box-0-0');
if (box) {
  box.position.x = 2;
  box.notifyChange('transform');
  box.visible = false;
  box.notifyChange('visibility');
}

root.position.y = 1;
root.notifyChange('transform');
ssp.flushUpdates();
await ssp.render();
```

修改 `position`、`quaternion`、`scale`、`visible` 或 `contentVisible` 只是编辑草稿，通知才提交对应字段的快照。`transform` 捕获 TRS，`visibility` 同时捕获 visible 和 contentVisible。父 Entity 的已提交变换与 visible 会传递到后代，无需逐个通知子节点；contentVisible 只控制自身模型及附件。

```ts
// 只隐藏父节点自己的内容，保留子 Entity。
root.contentVisible = false;
root.notifyChange('visibility');
ssp.flushUpdates();
const ownBounds = ssp.entities.getBounds(root, { includeDescendants: false });
```

`notifyChange()` 会请求渲染，下一次实际绘制前自动同步；`flushUpdates()` 用于马上需要包围盒或拾取结果的场合。它同步状态，不代表 GPU 已经完成绘制。不要用 `ssp.signals.objectChanged.dispatch(entity)` 替代 Entity 通知。

## 第三步：选择、查询与卸载

```ts
ssp.entities.setSelection([root]);
ssp.flushUpdates();
console.log(ssp.entities.getBounds(root));

// 清除选择。
ssp.entities.setSelection([]);

// 只移除这一棵 Entity 子树。
ssp.entities.remove(root);

// 页面或组件整体卸载时，释放 SDK 与其管理的资源。
ssp.dispose();
```

首期选择高亮使用橙色线框覆盖层，不需要开启后处理。它不是后处理描边，也不会自动改写原生附件的材质。需要自行实现屏幕坐标拾取时，使用 [pickEntities](../api/entities#包围盒与拾取)，不能假定旧的 `modelClick` 会自动返回 Entity。

## 加载外部 GLB / glTF

重新创建一个 SoonSpace 实例后，可以用 URL 资源替代方块资源。先把自己的 `building.glb` 放到站点 `/models/building.glb`；跨域地址需允许浏览器请求。

```ts
import SoonSpace from 'soonspacejs';

export async function loadBuilding(el: string | HTMLElement = '#view') {
  const ssp = new SoonSpace({ el });
  try {
    ssp.createAmbientLight({ id: 'model-light', intensity: 2 });
    const resource = await ssp.models.load('/models/building.glb');
    try {
      const building = ssp.entities.add({ id: 'building', model: resource });
      ssp.flushUpdates();
      const bounds = ssp.entities.getBounds(building);
      if (!bounds.isEmpty()) await ssp.controls.fitToBox(bounds, false);
      await ssp.render();
      return { ssp, building };
    } finally {
      resource.release();
    }
  } catch (error) {
    ssp.dispose();
    throw error;
  }
}
```

Draco / KTX2 资源需在加载前设置现有解码器路径：

```ts
ssp.setModelDracoDecoderPath('/decoders/draco/');
ssp.setModelKtx2DecoderPath('/decoders/basis/');
```

这些路径需实际提供匹配 Three.js 版本的 JS/WASM 文件。Entity 使用 SDK 已配置的 GLTFLoader，包括 Meshopt 和 KTX2 能力检测。更完整的取消、共享、替换和支持范围见 [模型资源与生命周期](../api/model-resources)。

## 排查与验证

| 现象 | 先检查 |
| --- | --- |
| `ssp.entities` 不存在 | 当前导入的是否为 3.0 alpha，而不是稳定版 2.x。 |
| 场景空白 | 容器是否有高度、资源请求是否成功、相机是否对准包围盒。 |
| 修改后没有变化 | 是否通知了正确字段；是否只调用了 `render()` 而没有 `notifyChange()`。 |
| GLB 加载被拒绝 | URL 模型首期不支持实际变化的动画、骨骼、morph、多材质 Mesh、已有 InstancedMesh / BatchedMesh；检查资源错误的 reasons，再使用原生路径或调整资源。 |
| 合批数量不如预期 | geometry / material 是否复用，渲染状态是否兼容；透明和特殊对象可能保留独立渲染。 |
| draw calls 下降但帧率仍低 | 同时检查运动帧、GPU 时间、分辨率、透明着色与实际绘制三角形，不只看批次数。 |

## 你已经完成了什么

你创建了一个逻辑父节点和九个共享资源的模型对象，并通过显式通知修改了它们。下一步阅读 [Entity API](../api/entities)、[迁移指南](./entity-migration)，或接入 [CPS Entity 场景包](../plugin/cps-soonmanager#loadentityscene)。
