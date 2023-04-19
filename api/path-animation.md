# 路径动画

## 路径动画
让物体沿指定路径进行运动的动画

### 示例
<Docs-Iframe src="animation/createPathAnimationAction.html" />

### 定义
```ts
  /**
   * 创建沿路径运动的动画 action
   * 
   * @param target - 目标对象；需要让哪个目标沿着曲线路径运行
   * @param path - 路径；可以是一组点，或者一个曲线 Curve，或者拓扑路径 Topology
   * @param options - 其它选项
   * @returns 返回 AnimationOperate，它是对 AnimationAction 的扩展
   */
  createPathAnimationAction ( target: Object3D, path: AnimationPath, options: CreatePathAnimationOptions ):AnimationOperate;

```

#### AnimationPath
```ts
/**
 * 动画的路径
 * @remarks
 * 可以是一组点，或者一个曲线 Curve，或者拓扑路径 Topology
 */
export type AnimationPath = IVector3[] | Curve<IVector3> | Topology
```

#### CreatePathAnimationOptions
```ts
/**
 * createPathAnimationAction 的选项
 */
export type CreatePathAnimationOptions = CreateCurveAnimationClipOptions_Base & CreateKeyframeTrackOptions_Base & 
PathAnimationTimeOptions & CurveOptions & PolylineOptions & SampleOptions & GetKeyframeTransformDatasOptions_Base



/**
 * getKeyframeTransformDatas 的基础选项
 */
export interface GetKeyframeTransformDatasOptions_Base {
    /**
     * 目标对象
     * @remarks
     * 需要让哪个目标沿着曲线路径运行
     */
    target?:Object3D|null;

    /**
     * 表示目标对象在运动时的前方方向的向量
     * @remarks
     * 该向量是目标对象局部坐标系下向量
     * 
     * 需要旋转数据时才需要
     * 
     * @defaultValue 默认曲线起始处的切线方向
     */
    front?:IVector3|null;


    /**
     * 是否需要获取位置信息
     * @defaultValue true
     */
    position?:boolean|null;

    /**
     * 是否需要获取旋转信息
     * @defaultValue true
     */
    rotate?:boolean|null;

    /**
     * 是否启用up
     * @remarks
     * 启用 up 后，旋转时会考虑 up 方向
     */
    enableUp?:boolean|null;

    /**
     * 是否固定 up 方向
     * @remarks
     * 默认情况下，会优先 front 方向，然后在 front 方向的基础上再调整 up 方向；
     * 如果 fixUp 为 true，则会优先保证  up 方向，然后再调整 front 方向
     */
    fixUp?:boolean|null;

    /**
     * 局部坐标系下 up 方向的向量
     * @remarks
     * target 的局部坐标系
     */
    up?:IVector3|null;


    /**
     * 锚点
     * @remarks
     * 目标对象上局部坐标系下的一个位置，该位置会始终在曲线上；即让目标对象上的哪个位置沿曲线路径进行动画
     * 
     * @defaultValue 局部坐标系的原点
     */
    anchor?:IVector3|null;
    
}




/**
 * 曲线选项
 */
export interface CurveOptions {
    /**
     * 路径
     * @remarks
     * 用来描述路径的曲线
     */
    curve:Curve<IVector3>;

}



/**
 * 折线选项
 */
export interface PolylineOptions {
    /**
     * 描述拆线路径的顶点列表
     */
    points:IVector3[];
    /**
     * 描述拆线路径的线段列表
     */
    // lines:Line3[];

}





/**
 * 动画的基础选项
 */
export interface CreateCurveAnimationClipOptions_Base {
    /**
     * 动画的名字
     */
    name: string;

    /**
     * 是否平滑旋转
     * 
     * @remarks
     * 当开启此功能后，当沿折线转弯时会平滑处理
     * 
     * @defaultValue true
     */
    smooth?:boolean|null;

}



/**
 * createKeyframeTracksOfCurveAnimationByPolyline 新增的、所特有的选项
 */
export interface CreateKeyframeTrackOptions_Base {

    /**
     * 应用动画的目标对象的访问路径
     * @remarks
     * 相对于根对象
     */
    targetPath?:string|null;

    /**
     * 观看点的距离
     * @remarks
     * 表示看向前方多远处的位置
     * 
     * @defaultValue 0
     */
    lookDistance?:number|null

}




/**
 * 路径动画时间选项
 */
export interface PathAnimationTimeOptions {
    /**
     * 动画的持续时间
     * @remarks
     * `duration` 和 `speed` 只需要指定其一；优先 duration
     */
    duration?:number;
    /**
     * 动画的速度
     * @remarks
     * `duration` 和 `speed` 只需要指定其一；
     */
    speed?: number;
    
}






/**
 * 采样选项
 */
export interface SampleOptions {
    /**
     * 采样长度
     * @remarks
     * 多长的弧长长度会生成一个采样点
     * 
     * `sampleNum` 和 `sampleLength` 只需要其一；优先使用 `sampleLength`
     */
    sampleLength?: number;

    /**
     * 采样个数
     * @remarks
     * 生成多少个采样点；
     * 
     * `sampleNum` 和 `sampleLength` 只需要其一；优先使用 `sampleLength`
     */
    sampleNum?: number;

}
```





## 相机路径动画
让相机沿指定路径进行运动的动画；

_该方法是针对相机的便利方法，内部是调用 `createPathAnimationAction` 来实现的；_

### 示例
<Docs-Iframe src="animation/createPathAnimationActionForCamera.html" />

### 定义
```ts
  /**
   * 创建沿路径运动的动画 action
   * 
   * @param target - 目标对象；需要让哪个目标沿着曲线路径运行
   * @param path - 路径；可以是一组点，或者一个曲线 Curve，或者拓扑路径 Topology
   * @param options - 其它选项
   * @returns 返回 AnimationOperate，它是对 AnimationAction 的扩展
   */
createPathAnimationActionForCamera ( path: AnimationPath, options?: CreatePathAnimationActionForCameraOptions & {camera?: Camera} ):AnimationOperate;
```

#### AnimationPath
```ts
/**
 * 动画的路径
 * @remarks
 * 可以是一组点，或者一个曲线 Curve，或者拓扑路径 Topology
 */
export type AnimationPath = IVector3[] | Curve<IVector3> | Topology
```

#### CreatePathAnimationForCameraOptions
```ts
export interface CreatePathAnimationForCameraOptions extends Omit<CreatePathAnimationActionForCameraOptions,"target"> {
  /**
   * 要操作的相机
   */
  camera?: Camera;

  /**
   * 眼睛高度
   */
  eyeHeight?: number;
} 
```






## 路径骨骼动画
让物体沿指定路径进行运动并变形以贴合路径的动画

### 示例
<Docs-Iframe src="animation/createBonePathAnimation.html" />

### 定义
```ts
/**
 * 创建骨骼路径动画
 * @param options 
 * @returns 
 */
createBonePathAnimation ( model: Object3D, path: AnimationPath, options: CreateBonePathAnimationOptions ): BonePathAnimationInfo;
```


#### AnimationPath
```ts
/**
 * 动画的路径
 * @remarks
 * 可以是一组点，或者一个曲线 Curve，或者拓扑路径 Topology
 */
export type AnimationPath = IVector3[] | Curve<IVector3> | Topology
```




#### CreateBonePathAnimationOptions
```ts
export type CreateBonePathAnimationOptions = CreateBonePathAnimationOptions_Base & CreateChainBonesOptionsByAxials 
& EqualChainBoneOptions & CreateChainBonesOptions & Omit<CreateCurveAnimationClipOptions,"front"|"target">


export type CreateBonePathAnimationOptions = {

//CreateBonePathAnimationOptions_Base 

    /**
     * 模型对象
     * @remarks
     * 可以是任意的 Object3D 对象，会对 model 及其子孙节点进行递归的 Object3D 级别的拷贝（会复用 geometry 和 material 对象）；
     * 并会将所有的 Mesh 对象转为 SkinnedMesh
     */
    model:Object3D;



    /**
     * 柔性系数
     * @remarks
     * 取值范围：0 - 1
     * @defaultValue 1
     */
    flexible?:number;


    /**
     * 可伸缩的
     */
    stretch?:boolean|null;

    /**
     * 距离容差因子
     * @remarks
     * 取值为范围为 [0-1]
     * 容差范围 = 距离容差因子 * 距离
     * 在容差范围呢视为等距
     * 
     * @defaultValue 0.1
     */
    tolerance?:number; 



//CreateChainBonesOptionsByAxials
    /**
     * 所有骨骼的轴向量列表
     */
    axials:IVector3[];



// EqualChainBoneOptions 等分链式骨骼选项

    /**
     * 根骨骼的起始点
     */
    start?:IVector3|null;

    /**
     * 单个骨骼的轴向量
     * @remarks
     * 该向量的方向会作为骨骼的方向，向量的长度会作为骨骼的长度
     */
    axial:IVector3;

    /**
     * 骨骼的数量
     */
    number:number;



//CreateChainBonesOptions 以关节位置来定义骨骼的选项

    /**
     * 关节位置列表
     */
    joints?:IVector3[]|null;






// Omit<CreateCurveAnimationClipOptions,"front"|"target"
    /**
     * 动画的名字
     */
    name: string;
    /**
     * 是否平滑旋转
     *
     * @remarks
     * 当开启此功能后，当沿折线转弯时会平滑处理
     *
     * @defaultValue true
     */
    smooth?: boolean | null;
    /**
     * 应用动画的目标对象的访问路径
     * @remarks
     * 相对于根对象
     */
    targetPath?: string | null;
    /**
     * 观看点的距离
     * @remarks
     * 表示看向前方多远处的位置
     *
     * @defaultValue 0
     */
    lookDistance?: number | null;

    /**
     * 动画的持续时间
     * @remarks
     * `duration` 和 `speed` 只需要指定其一；优先 duration
     */
    duration?: number;
    /**
     * 动画的速度
     * @remarks
     * `duration` 和 `speed` 只需要指定其一；
     */
    speed?: number;
    /**
     * 路径
     * @remarks
     * 用来描述路径的曲线
     */
    curve: Curve<Vector3>;

    /**
     * 采样长度
     * @remarks
     * 多长的弧长长度会生成一个采样点
     *
     * `sampleNum` 和 `sampleLength` 只需要其一；优先使用 `sampleLength`
     */
    sampleLength?: number;
    /**
     * 采样个数
     * @remarks
     * 生成多少个采样点；
     *
     * `sampleNum` 和 `sampleLength` 只需要其一；优先使用 `sampleLength`
     */
    sampleNum?: number;
    /**
     * 是否需要获取位置信息
     * @defaultValue true
     */
    position?: boolean | null;
    /**
     * 是否需要获取旋转信息
     * @defaultValue true
     */
    rotate?: boolean | null;
    /**
     * 是否启用up
     * @remarks
     * 启用 up 后，旋转时会考虑 up 方向
     */
    enableUp?: boolean | null;
    /**
     * 是否固定 up 方向
     * @remarks
     * 默认情况下，会优先 front 方向，然后在 front 方向的基础上再调整 up 方向；
     * 如果 fixUp 为 true，则会优先保证  up 方向，然后再调整 front 方向
     */
    fixUp?: boolean | null;
    /**
     * 局部坐标系下 up 方向的向量
     * @remarks
     * target 的局部坐标系
     */
    up?: Vector3 | null;
    /**
     * 锚点
     * @remarks
     * 目标对象上局部坐标系下的一个位置，该位置会始终在曲线上；即让目标对象上的哪个位置沿曲线路径进行动画
     *
     * @defaultValue 局部坐标系的原点
     */
    anchor?: Vector3 | null;





}


```







#### BonePathAnimationInfo
```ts
/**
 * createBonePathAnimation 返回的结果
 */
export interface BonePathAnimationInfo {
    /**
     * 转换后的带有骨骼动画的模型对象
     */
    model:Object3D;
    /**
     * 骨架
     */
    skeleton:Skeleton;
    /**
     * 根骨骼
     */
    rootBone:Bone;
    /**
     * 动画剪辑对象
     */
    clip:AnimationClip;
    /**
     * 动画的 action 对象
     */
    action?:AnimationAction;
}
```