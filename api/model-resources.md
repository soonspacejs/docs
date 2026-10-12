---
outline: 3
---

# 模型资源与 lease

::: warning 3.0 alpha 预览
本页对应已发布的 `3.0.0-alpha.0` 资源接口，仍可能发生破坏性变更。固定版本与依赖见 [安装说明](../guide/#install)。
:::

`ssp.models` 保存可共享的静态模型资源，不把加载所得源 Object3D 树加入 Scene。Entity 只引用资源，SDK 内部根据兼容性生成实际绘制对象。业务不需要直接维护合批对象或 instanceId。

本页说明资源 API；对象创建与通知见 [Entity API](./entities)，完整流程见 [入门](../guide/entity) 和 [迁移说明](../guide/entity-migration)。

## load

```ts
interface ModelLoadOptions {
  signal?: AbortSignal;
}

// ssp.models.load(url: string, options?: ModelLoadOptions): Promise<ModelLease>
```

返回的 ModelLease 持有资源引用，不是已经加入 Scene 的模型。将它传入 `entities.add({ model })` 或 `entity.replaceModel(model)` 后，Entity 会保留自己的引用；调用者可以释放原 lease。

```ts
import SoonSpace from 'soonspacejs';

const ssp = new SoonSpace({ el: '#view' });
const model = await ssp.models.load('/models/chair.glb');
try {
  ssp.entities.add({ id: 'chair-a', model });
  ssp.entities.add({ id: 'chair-b', model, position: [3, 0, 0] });
} finally {
  model.release();
}
```

### 共享与取消

- 同一个 ModelResources 内，相同 URL 字符串的并发 load 共享根请求与解析结果，每个调用者得到自己的 lease。
- 资源仍被引用时，同 URL 再次 load 可复用它；最后一个引用释放后缓存条目也被删除，不是永久缓存。URL 不做业务层规范化，不同字符串不保证复用。
- `signal` 已取消时不发起请求，返回 `AbortError`。取消一个等待者不影响其他等待者；所有等待者取消后中止共享根请求。
- 依赖纹理请求、解码 worker 或已经开始的解析不一定能立即停止。取消后的晚到结果不会进入有效资源缓存，并清理已解析结果；不会通过 `LoadingManager.abort()` 中止无关任务。
- 根模型 HTTP 失败、必需缓冲加载失败、解析器抛错、不支持的模型及受保护依赖的失败会拒绝 Promise；这些失败结果不会作为成功缓存保留。普通纹理或宿主解码器的部分错误仍可能被 GLTFLoader 接受为缺失纹理，加载成功不保证每张纹理都已解码。

资源注册和 load 本身不请求场景绘制。需要“旧模型保留直到新模型就绪”的切换，使用 [replaceModel](./entities#replacemodel)，不要提前删除旧 Entity。

### 格式与静态边界

当前路径使用 GLTFLoader，支持静态 glTF/GLB，以及带 `SBMG----` 头、采用现有 nibble-swap 编码的 SBM-X 容器。不等同于旧 `loadModel` 支持的所有格式：旧 SBM、FBX、DAE 等应继续走原 Object3D 加载路径。

以下模型会拒绝，而非静默丢弃这些能力：

- 有实际变化的动画轨道，或无法确认等于静态姿态的动画轨道。
- SkinnedMesh、存在 morph target influence 的 Mesh。
- 使用材质数组的 Mesh，包括需要多个材质分组的情况。
- URL 加载结果中已有的 InstancedMesh 或 BatchedMesh，不能当作普通静态 Mesh 展开。
- 含 Lines 或 Points 的模型，不能只忽略这些渲染内容并返回部分成功；改用原生 Object3D 加载路径。

不支持的资源以公开错误 `ModelResourceUnsupportedError` 拒绝，不自动切换原生加载路径：

```ts
import { ModelResourceUnsupportedError } from 'soonspacejs';
import type { UnsupportedModelReason } from 'soonspacejs';

try {
  const lease = await ssp.models.load('/models/building.glb');
  lease.release();
} catch (error) {
  if (error instanceof ModelResourceUnsupportedError) {
    const reasons: readonly UnsupportedModelReason[] = error.reasons;
    console.warn(error.code, error.url, reasons);
  } else {
    throw error; // 取消、网络或解析错误，不属于资源不支持。
  }
}
```

`code` 固定为 `'MODEL_RESOURCE_UNSUPPORTED'`。`reasons` 是只读数组，可包含 `'animation-clips'`、`'material-array'`、`'skinning'`、`'morph-targets'`、`'instanced-mesh'`、`'batched-mesh'`、`'line-or-points'`。后者表示存在 Lines / Points 渲染内容，整个资源拒绝，不返回不完整的 Mesh 快照。取消仍以 `AbortError` 拒绝，不能混为不支持的模型。

导出器写入的 position/quaternion/scale 动画轨道，如果所有关键帧均与节点静态姿态一致，可以作为静态模型接受；这不表示支持动画播放。立方样条布局等无法按此规则确认的轨道仍拒绝。

当前资源输入以静态 Mesh 为边界，含 Lines / Points 时整体拒绝，不导入 glTF 的灯光、相机或其他非 Mesh 场景语义。需要这些能力时，使用原加载路径或自行适配为附件。加载会保存源层级累积变换和源 visible，源树本身不用于后续变更检测。

## Draco、KTX2 与 Meshopt

通过 SoonSpace 使用 `ssp.models` 时，复用 SDK 配置过的 GLTFLoader。请在加载压缩资源前设置路径：

```ts
import SoonSpace from 'soonspacejs';

const ssp = new SoonSpace({ el: '#view' });
ssp.setModelDracoDecoderPath('/decoders/draco/');
ssp.setModelKtx2DecoderPath('/decoders/basis/');
const model = await ssp.models.load('/models/compressed.glb');
ssp.entities.add({ id: 'compressed-model', model });
model.release();
```

路径必须能够提供解码器所需文件，生产部署需要相应静态资源及跨域权限。Meshopt 使用 SDK 已配置的解码器，不需要另设新的 Entity API。借用的 loader 保留 URL 解析和解码配置，请求鉴权按下面的来源边界执行。

### glTF 请求头与来源边界

SDK 在开始加载时捕获 `FileRequestHeaders`。根模型使用这些请求头；标准 GLTFLoader 的缓冲区和 ImageBitmap 纹理依赖只在与根模型相同的 HTTP 来源携带它们。来源比较包括协议、主机和端口。显式配置 `loader.resourcePath` 时，该宿主配置选择依赖的可信来源。

模型文件声明的其他来源 URL 不继承 SDK 请求头，也不携带 Cookie，公开跨域依赖仍需通过 CORS。携带请求头或跨域凭证的可信来源依赖拒绝重定向，避免凭据随重定向发送；这种依赖失败会使本次资源加载失败，不应改为忽略错误。

宿主提供的 KTX2、Draco 解码器及自定义 LoadingManager handler 保持宿主所有权，不会被这项标准 parser 策略统一改写。它们自行发起请求时，鉴权、跨域和重定向策略由宿主配置负责；不要把全局敏感头无条件传给任意模型依赖地址。

`ModelResources` 可独立构造；其默认 GLTFLoader 不带宿主 SDK 的解码配置。高级集成可在第一次 load 前调用 `setGLTFLoader(loader: GLTFLoader)` 借用已配置 loader；存在进行中请求或有效 URL 缓存时不能替换。ModelResources 不拥有借用 loader 的解码 worker，销毁借用 loader 及其解码器仍由宿主负责。一般业务优先使用 `new SoonSpace(...)` 和 `ssp.models`。

## register

`ssp.models.register({ parts }, { ownership: 'transfer' }): ModelLease` 注册已经生成的静态几何描述，适合程序生成的语义对象。必须显式移交所有权；校验整个描述成功后才接管资源，校验失败不接管已检查的部分。

```ts
import SoonSpace from 'soonspacejs';
import { BoxGeometry, Matrix4, MeshBasicMaterial } from 'three';

const ssp = new SoonSpace({ el: '#view' });
const model = ssp.models.register({
  parts: [{
    geometry: new BoxGeometry(1, 2, 1),
    material: new MeshBasicMaterial({ color: 0xffffff }),
    matrix: new Matrix4(),
  }],
}, { ownership: 'transfer' });
ssp.entities.add({ id: 'generated-model', model });
model.release();
```

### ModelPart

```ts
interface ModelPart {
  geometry: THREE.BufferGeometry;
  material: THREE.Material | MaterialLease;
  matrix: THREE.Matrix4;
  visible?: boolean;
  name?: string;
  castShadow?: boolean;
  receiveShadow?: boolean;
  renderOrder?: number;
  layersMask?: number;
  frustumCulled?: boolean;
  transparentBatch?: 'sorted';
  color?: readonly [number, number, number];
}
```

| 字段 | 默认值 | 含义 |
| --- | --- | --- |
| `geometry` | 必填 | 有 position attribute 的 BufferGeometry。 |
| `material` | 必填 | 单个 Material，或同一个 ModelResources 的有效 MaterialLease。 |
| `matrix` | 必填 | 部件相对模型资源原点的矩阵；所有元素必须有限，注册时复制。 |
| `visible` | `true` | 固定部件可见性，与 Entity 最终显隐共同生效。 |
| `name` | 无 | 部件名称。 |
| `castShadow`、`receiveShadow` | `false` | 绘制对象阴影标志，不代表自动开启场景阴影。 |
| `renderOrder` | `0` | 绘制顺序；不同值分开合批。 |
| `layersMask` | `1` | Three.js layers 的位掩码，不是层级编号。 |
| `frustumCulled` | `true` | 视锥裁剪策略；BatchedMesh 同步逐成员裁剪开关。 |
| `transparentBatch` | 无 | `'sorted'` 显式允许批内透明排序；见下文兼容边界。 |
| `color` | `[1, 1, 1]` 的等效行为 | 线性 RGB 乘数；三分量有限且非负，材质必须有 Color 类型的 color 属性。 |

`color` 与共享材质颜色相乘，不修改共享材质。使用 Three.js Color 从业务颜色转换到线性值后再传入；不要将 0 到 255 的色值或 sRGB 分量直接当作线性乘数。

### 所有权与不可变约定

注册成功后 Geometry、原始 Material 及其纹理归资源管理器，调用者不得再自行 dispose，也不得继续修改共享 Geometry、Material、Texture 或部件描述。注册会复制矩阵、颜色和描述，但不会深拷贝 GPU 资源。

同一份注册描述的多个部件可以共用一个 Geometry 或原始 Material。已移交的 Geometry 不能再次单独 register；共享整个模型时复用/retain ModelLease。跨模型共享材质使用 MaterialLease，不要重复移交同一个原始 Material。SDK 不会仅因两个几何内容或两个材质参数相同就自动去重。

模型资源没有“修改内部 Mesh 后通知”的接口。变更 Entity TRS/显隐使用 notify；变更资源内容应创建新资源并 replaceModel。该约定使合批分组与静止帧命令缓存无需每帧检查源树。

## 材质注册

`ssp.materials.register(material, { ownership: 'transfer' }): MaterialLease` 与 `ssp.models.materials.register(...)` 等价。一个材质 lease 可被多个不同模型注册使用，模型会持有独立依赖引用。

```ts
import SoonSpace from 'soonspacejs';
import { BoxGeometry, Matrix4, MeshBasicMaterial } from 'three';

const ssp = new SoonSpace({ el: '#view' });
const material = ssp.materials.register(
  new MeshBasicMaterial({ color: 0xffffff }),
  { ownership: 'transfer' },
);
const first = ssp.models.register({ parts: [{
  geometry: new BoxGeometry(), material, matrix: new Matrix4(),
}] }, { ownership: 'transfer' });
const second = ssp.models.register({ parts: [{
  geometry: new BoxGeometry(2, 1, 1), material, matrix: new Matrix4(),
}] }, { ownership: 'transfer' });
material.release(); // 两个模型仍保有材质依赖
ssp.entities.add({ id: 'a', model: first });
ssp.entities.add({ id: 'b', model: second, position: [3, 0, 0] });
first.release();
second.release();
```

## ModelLease 与 MaterialLease

两者是 `ResourceLease<T>` 的类型别名。ModelLease 的 `value` 是只读部件列表，其中 material 已解析为原始 Material；MaterialLease 的 `value` 是 Material。这些值用于读取，不授予编辑或独立销毁权。

| 成员 | 行为 |
| --- | --- |
| `value` | 读取资源；lease 已释放或管理器已销毁时抛错。 |
| `retain()` | 返回新的 lease，并增加引用；不能 retain 已释放的 lease。 |
| `release()` | 释放当前 lease，重复调用无副作用。最后一个有效引用释放时清理资源。 |

每个 retain 得到的 lease 都应有对应 release。Entity 引用、加载调用者引用、模型的材质依赖分别计数。资源管理器会跟踪移交的 Geometry、Material 和 Texture，避免共享图重复 dispose；不表示业务可以绕过 lease 手动销毁共享对象。Texture.dispose 不等同于所有外部 ImageBitmap 所有权都已被解决，业务自行引入的图像内存应按其实际所有者管理。

## 合批兼容性

| 内容 | 当前路径 |
| --- | --- |
| 同材质对象、同几何对象的兼容不透明部件 | 可进入 InstancedMesh。 |
| 同材质对象、不同但属性布局/索引类型兼容的几何 | 可进入 BatchedMesh。 |
| 单个部件、超出批次预算或不兼容部件 | 独立 Mesh。 |
| geometry 仅绘制部分 drawRange | 不进入 BatchedMesh，保留原生或兼容 InstancedMesh 的绘制范围。 |
| Float16 / interleaved / 整数 gpuType 顶点属性不能保真合入批次 | 不进入 BatchedMesh，保留原生或兼容 InstancedMesh 路径。 |
| 默认透明材质 | 独立 Mesh，不自动选择可能改变顺序的批处理。 |
| 显式允许的透明部件 | 满足条件时使用可排序的 BatchedMesh，即使几何相同也不进入透明 InstancedMesh。 |

材质 UUID、顶点属性布局、是否索引几何，以及阴影、renderOrder、layers、裁剪策略共同限制分组。世界矩阵行列式非正、存在剪切变换，或 ShaderMaterial/RawShaderMaterial 的部件回退独立 Mesh。父级非均匀缩放叠加子级旋转可能形成剪切，不能仅看 Entity 自身 TRS 判断是否可实例化。

当前每批最多 512 个成员；BatchedMesh 还受顶点、索引及内存预算限制，所以兼容资源不保证都在一个批次。这些分块策略不是稳定的业务索引，不要持有内部批次槽位。

### 透明排序的显式选择

设置 `transparentBatch: 'sorted'` 表示接受批内排序语义，仍要求材质为 FrontSide、NormalBlending，且无有效 transmission。不能保证不同批次之间或与独立透明对象之间的逐成员全局顺序；该问题当前未处理。双面、特殊混合及透射材质不会因设置这个字段就强行合批。

```ts
import SoonSpace from 'soonspacejs';
import { BoxGeometry, Matrix4, MeshBasicMaterial } from 'three';

const ssp = new SoonSpace({ el: '#view' });
const model = ssp.models.register({ parts: [{
  geometry: new BoxGeometry(),
  material: new MeshBasicMaterial({
    color: 0xffffff, transparent: true, opacity: 0.3, depthWrite: false,
  }),
  matrix: new Matrix4(),
  transparentBatch: 'sorted',
}] }, { ownership: 'transfer' });
ssp.entities.add({ id: 'glass-a', model });
ssp.entities.add({ id: 'glass-b', model, position: [0, 0, -3] });
model.release();
```

SDK 自建的 BatchedMesh 会复用相机、几何及相关绘制状态不变时的最近绘制命令。相机移动、显隐或矩阵等变化时仍会重新裁剪和排序；没有永久关闭裁剪/排序，也没有对 Three.js 原型打补丁。静止帧缓存不代表移动帧无 CPU 开销，更不能从批次数推导 FPS。

## 销毁

正常 SoonSpace 使用 `ssp.dispose()` 统一销毁。`ModelResources.dispose()` 会取消所有等待 load、清理全部登记资源并让所有 lease 失效，即使调用者仍持有 lease；它不是“减少一个引用”的替代方法。销毁后不能再 register、load 或 setGLTFLoader。

独立集成若使用 `new ModelResources()` 和 `new EntityCollection(scene, requestRender, models)`，需要自行负责提交调度及生命周期：先停止渲染并销毁 collection，再释放自身 lease，最后销毁 models。不要提前销毁仍被 collection 使用的资源管理器。
