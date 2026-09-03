---
outline: 3
---

# 包导出 API 索引

本页按 SoonSpace.js `2.16.4` 的 package 入口文件生成，列出可导入符号与公开类成员。它用于查漏和搜索；签名、默认值、约束与示例请阅读对应详细页面或包的 TypeScript 声明。

::: tip 边界说明
类成员以未标记 `private` / `protected` 且不以下划线开头为准。清单也保留入口文件中的第三方再导出。
:::

::: warning 稳定性
“能够从包入口导入”不等于所有低层成员都承诺长期稳定。业务代码应优先使用详细页面说明的高层 API。
:::

## soonspacejs

[详细文档](./index)

**默认导出公开成员：** `THREE`、`TWEEN`、`utils`、`animation`、`library`、`ACTION`、`version`、`options`、`domElement`、`signals`、`objectsCache`、`viewport`、`controls`、`manager`、`plugins`、`setHoverEnabled`、`setLevelEnabled`、`setScaleFixedEnabled`、`setFileCacheEnabled`、`registerPlugin`、`getPlugin`、`createPluginObject`、`addToPluginObject`、`getPluginObjectById`、`getPluginObjectByName`、`removePluginObjectById`、`setAutoInstancing`、`getAutoInstancingStats`、`setBloom`、`setSSAO`、`setColorSpace`、`setToneMapping`、`setBackgroundColor`、`setBackgroundColorAlpha`、`setBackgroundImage`、`setSphereSkyBackground`、`setSkyBackground`、`setEnvironment`、`playModelAnimation`、`stopModelAnimation`、`getOffsetByPosition`、`getPositionByOffset`、`render`、`clearSignals`、`dispose`、`setCamera`、`getCameraViewpoint`、`setCameraViewpoint`、`flyTo`、`flyToBoundingBox`、`flyToObj`、`flyMainViewpoint`、`surroundOnTarget`、`surroundOnObject`、`getObjectLabelPos`、`setControlsOptions`、`addObject`、`attachObject`、`removeObject`、`openSceneFog`、`closeSceneFog`、`setSky`、`getScreenshot`、`screenshot`、`edgeShow`、`unEdgeShow`、`strokeShow`、`unStrokeShow`、`opacityShow`、`unOpacityShow`、`highlightShow`、`unHighlightShow`、`emissiveShow`、`unEmissiveShow`、`isolate`、`unisolate`、`clearObject`、`clear`、`createAmbientLight`、`setAmbientLight`、`createDirectionalLight`、`setDirectionalLight`、`createHemisphereLight`、`setHemisphereLight`、`createSpotLight`、`setSpotLight`、`createPointLight`、`setPointLight`、`createRectAreaLight`、`setRectAreaLight`、`getLightById`、`removeLightById`、`getAllLight`、`clearLight`、`showAllLight`、`hideAllLight`、`updateAllShadow`、`getObjectById`、`getObjectByName`、`getObjectByUserDataProperty`、`removeObjectById`、`createGroup`、`getGroupById`、`getGroupByName`、`getAllGroup`、`showAllGroup`、`hideAllGroup`、`removeGroupById`、`loadSbm`、`parseSbm`、`cloneSbm`、`getSbmById`、`getSbmByName`、`getSbmByUserDataProperty`、`removeSbmById`、`createGroupForSbm`、`loadSbmToGroup`、`addSbmForGroup`、`createSbmGroupFromXml`、`getSbmGroupById`、`getSbmGroupByName`、`getAllSbmGroup`、`removeSbmGroupById`、`clearSbm`、`getAllSbm`、`showAllSbm`、`hideAllSbm`、`getSbmModelMaps`、`setSbmModelMaps`、`setModelDracoDecoderPath`、`setModelKtx2DecoderPath`、`loadModel`、`cloneModel`、`getModelById`、`getModelByName`、`getModelByUserDataProperty`、`removeModelById`、`createGroupForModel`、`loadModelToGroup`、`addModelForGroup`、`getModelGroupById`、`getModelGroupByName`、`getAllModelGroup`、`removeModelGroupById`、`clearModel`、`getAllModel`、`showAllModel`、`hideAllModel`、`computeModelsBoundsTree`、`clearIdb`、`getModelsMap`、`setModelsMap`、`createPoi`、`clonePoi`、`getPoiById`、`getPoiByName`、`getPoiByUserDataProperty`、`removePoiById`、`createGroupForPoi`、`createPoiToGroup`、`addPoiForGroup`、`getPoiGroupById`、`getPoiGroupByName`、`getAllPoiGroup`、`removePoiGroupById`、`clearPoi`、`getAllPoi`、`showAllPoi`、`hideAllPoi`、`createPoiNode`、`getPoiNodeById`、`getPoiNodeByName`、`getPoiNodeByUserDataProperty`、`removePoiNodeById`、`createGroupForPoiNode`、`createPoiNodeToGroup`、`addPoiNodeForGroup`、`getPoiNodeGroupById`、`getPoiNodeGroupByName`、`getAllPoiNodeGroup`、`removePoiNodeGroupById`、`clearPoiNode`、`getAllPoiNode`、`showAllPoiNode`、`hideAllPoiNode`、`createPoiMesh`、`createPolygonPoiMesh`、`setTexture`、`createCanvas3D`、`getCanvas3DById`、`getCanvas3DByName`、`getCanvas3DByUserDataProperty`、`removeCanvas3DById`、`createGroupForCanvas3D`、`createCanvas3DToGroup`、`addCanvas3DForGroup`、`getCanvas3DGroupById`、`getCanvas3DGroupByName`、`getAllCanvas3DGroup`、`removeCanvas3DGroupById`、`clearCanvas3D`、`getAllCanvas3D`、`showAllCanvas3D`、`hideAllCanvas3D`、`getShortestPath`、`getShortestPathAsync`、`getShortestPathByMultipleStartPoints`、`getShortestPathByMultipleStartPointsAsync`、`getShortestPathByMultipleEndPoints`、`getShortestPathByMultipleEndPointsAsync`、`createTopologyFromGml`、`createTopology`、`setTopologyPassable`、`resetTopologyNodes`、`getTopologyById`、`getTopologyByName`、`getTopologyByUserDataProperty`、`removeTopologyById`、`createGroupForTopology`、`createTopologyToGroup`、`addTopologyForGroup`、`getTopologyGroupById`、`getTopologyGroupByName`、`getAllTopologyGroup`、`removeTopologyGroupById`、`clearTopology`、`getAllTopology`、`showAllTopology`、`hideAllTopology`、`addGridHelper`、`addAxesHelper`、`addBoxHelper`、`addPlaneHelper`、`createGround`、`addGroundHelper`、`addDirectionalLightHelper`、`addHemisphereLightHelper`、`addSpotLightHelper`、`addPointLightHelper`、`addRectAreaLightHelper`、`getHelperById`、`removeHelperById`、`clearHelper`、`showAllHelper`、`hideAllHelper`、`createDecal`、`updateDecalGeometry`、`updateAllDecalGeometry`、`clearDecal`、`getAllDecal`、`showAllDecal`、`hideAllDecal`、`createFindObjectsInBoxNearPosition`、`createFindObjectsInSphereNearPosition`、`createFindObjectsNearPath`、`createPathAnimation`、`createTopologyAnimation`、`createPathAnimationAction`、`createPathAnimationActionForCamera`、`createBonePathAnimation`、`createChainSkeletalModel`、`playClipAnimation`、`stopClipAnimation`、`resetClipAnimation`、`disposeClipAnimation`、`createPathAnimationForBones`

**命名类：**

- `BaseMesh`：`mesh`、`geometry`、`material`、`updateMaterial`、`updateMaterialOpacity`、`updateMaterialColor`、`copy`
- `BaseObject3D`：`sid`、`stype`、`level`、`handleHide`、`isEventPropagation`、`extraIds`、`onLoad`、`onClick`、`onDblClick`、`onRightClick`、`eventPropagation`、`show`、`hide`、`setMove`、`setRotate`、`setScale`、`getBoundingBox`、`getSpaceAttribute`、`syncSpaceAttribute`、`copy`
- `Canvas3D`：`create`、`createPoint`、`getPoint`、`removePoint`、`createLine`、`getLine`、`removeLine`、`createPolygon`、`getPolygon`、`removePolygon`、`createCircle`、`getCircle`、`removeCircle`、`getChildForType`
- `Circle`：`updateGeometry`、`setOptions`
- `Decal`：`decalMesh`、`textureAspect`、`updateTexture`、`updateMaterial`
- `Ground`：无
- `Group`：`showAllChild`、`hideAllChild`
- `Icon`：`stype`
- `Line`：`updateGeometry`、`setOptions`
- `Link`：`passable`、`updateGeometry`、`computeVertex`、`computeTextureRepeat`、`createTexture`
- `Model`：`formatType`、`url`、`setEnvMap`、`copy`
- `Node`：`graphs`
- `PluginObject`：无
- `Poi`：`icon`、`text`、`iconType`、`scaleFixed`、`getBoundingBox`、`copy`
- `PoiMesh`：`image`
- `PoiNode`：`elementType`、`element`、`elementAutoDisplay`、`occlude`、`occludeThrottle`、`onChange`、`scaleFixed`、`create`、`getBoundingBox`
- `Point`：`updateGeometry`、`setOptions`
- `Polygon`：`updateGeometry`、`setOptions`
- `PolygonPoiMesh`：`image`
- `Topology`：`topologyType`、`nodes`、`links`、`linksImgAnimation`、`info`、`create`、`createNode`、`createCircle`、`createLink`、`updateLinksImgAnimation`、`resetNodes`、`updateLinks`、`getLength`

**函数：** `boundingIsIntersected`、`clearLinkTextureCache`、`createFindObjectsInBoxNearPosition`、`createFindObjectsInSphereNearPosition`、`createFindObjectsNearPath`、`createPlaneMatrix`、`createTexture`、`createUVMatrix`、`getPolygonGeometryInfo`、`isPoiNode25D`、`isPoiNode2D`、`isPoiNode3D`、`setTexture`

**Interfaces：** `AnimationOptions`、`AutoInstancingOptions`、`AutoInstancingStats`、`AxesHelperOptions`、`BaseLightInfo`、`BaseObject3DEventMap`、`BaseObject3DInfo`、`BaseObjectInfo`、`BaseSelectOptions`、`BloomOptions`、`BoxHelperOptions`、`BoxSpace`、`Building`、`CameraViewpointData`、`CameraViewpointDataLegacy`、`Canvas3DInfo`、`CircleInfo`、`ControlsOptions`、`DecalInfo`、`DirectionalLightHelperOptions`、`DirectionalLightOptions`、`EdgeSelectOptions`、`EmissiveSelectOptions`、`Entity`、`EnvironmentOptions`、`Floor`、`FloorSpaceInfo`、`FlyToObjOptions`、`FlyToOptions`、`FogOptions`、`FreeControlsOptions`、`GetTextureOptions`、`GmlJson`、`GridHelperOptions`、`GroundHelperOptions`、`GroupProgress`、`GroupProgressCallback`、`HemisphereLightHelperOptions`、`HemisphereLightOptions`、`IClipAnimation`、`IClipAnimationFrame`、`IClipAnimationPlayerEventMap`、`IClipTransform`、`IClipTweenSource`、`IconInfo`、`InternalOptions`、`Interpolate`、`IntersectsOptions`、`IVector2`、`IVector3`、`LabelOptions`、`Level`、`LineInfo`、`LinkInfo`、`MaterialEffectOptionItem`、`MaterialEffectOptions`、`MaterialsCache`、`MeshsCache`、`ModelAnimationFindFunc`、`ModelEventParams`、`ModelInfo`、`ModelInnerInfo`、`ModelLoadingProgress`、`ModelLoadingProgressCallback`、`NameCanvasInfo`、`NodeInfo`、`ObjectEventParams`、`OffsetPoint`、`OrbitControlsOptions`、`PlaneHelperOptions`、`PlaneIVector2`、`PluginsConstructor`、`PluginsConstructorWithOptions`、`PoiEventParams`、`PoiInfo`、`PoiMeshInfo`、`PoiMeshOptions`、`PoiNodeInfo`、`PointInfo`、`PointLightHelperOptions`、`PointLightOptions`、`PolygonInfo`、`PolygonPoiMeshInfo`、`ProjectInfo`、`RectAreaLightHelperOptions`、`RectAreaLightOptions`、`SbmCache`、`SbmXmlJson`、`ScaleFixed`、`SceneClickParam`、`SceneGlobalEvents`、`SceneModelIntersect`、`SceneObjectIntersect`、`ScenePoiIntersect`、`SelectModelOptions`、`SetTextureOptions`、`ShadowOptions`、`ShortestPathByMultipleEndPoints`、`ShortestPathByMultipleStartPoints`、`ShortestPathInfo`、`SignalsState`、`SkyOptions`、`SoonSpaceConstructor`、`SpotLightHelperOptions`、`SpotLightOptions`、`SSAOOptions`、`SSGIOptions`、`SSROptions`、`State`、`StrokeSelectOptions`、`SurroundOptions`、`ToneMappingOptions`、`TopologyEffectInfo`、`TopologyInfo`、`TopologyInfoForGml`、`TopologyInnerInfo`、`TopologyNodeGraph`、`TopologyNodeInfo`、`TopologyPassableInfo`、`Transition`、`TwoWaysLink`、`UpdateMaterialOption`、`UserDataPropertyFindFunc`、`ViewportOptions`、`ViewportState`、`X_floor`

**Types：** `AmbientLightOptions`、`AnimationModeType`、`AnimationModeValueType`、`AxisType`、`BaseMaterial`、`CameraType`、`CloneModelInfo`、`ClonePoiInfo`、`ControlsType`、`DecalGeometryInfo`、`DecalMaterialInfo`、`FindNearbyObjects`、`FindObjectsNearPosition`、`FlyToViewpoint`、`FreeControlsProperties`、`FreeControlsType`、`GroundInfo`、`GroupInfo`、`HighlightSelectOptions`、`IColor`、`IColorSpace`、`InitEvents`、`InitOptions`、`MaterialEffectOptionList`、`MaterialEffectType`、`OpacitySelectOptions`、`OrbitControlsProperties`、`OrbitControlsType`、`PluginObjectInfo`、`PoiMeshTextureImage`、`PoiNodeType`、`PoiType`、`Position`、`Rotation`、`Scale`、`SceneEventType`、`SceneEventTypeUppercase`、`SetOptionsCircleInfo`、`SetOptionsLineInfo`、`SetOptionsPointInfo`、`SetOptionsPolygonInfo`、`TopologyInnerNodeInfo`

**Enums：** `ModelFormat`、`ObjecType`

**常量与其他导出：** `DecalUVMapType`、`FileRequestHeaders`、`INNER_ID`

**从 `@three3d/animation` 再导出：** `AnimationActionController`、`AnimationActionCreator`、`AnimationActionKeyframe`、`AnimationActionOperate`、`AnimationClipCreator`、`AnimationClipKeyframe`、`AnimationCreatorOptions`、`AnimationEvent`、`AnimationEventBaseType`、`AnimationEventMap`、`AnimationEventType`、`AnimationFinishedEvent`、`AnimationLoopEvent`、`AnimationOperate`、`BindChainSkeletalForModelOptions`、`BindChainSkeletalForModelOptions_Base`、`BonePathAnimationInfo`、`BonePathAnimationOptions`、`ChainSkinnedMeshOptions`、`ConfigVertexWeightByEquallyDividedOptions`、`ConfigVertexWeightForChainBonesOptions`、`ConfigVertexWeightForChainBonesOptions_Base`、`ConfigVertexWeightForEqualChainBonesOptions`、`ConfigVertexWeightOptions_Base`、`CreateBonePathAnimationOptions`、`CreateBonePathAnimationOptions_Base`、`CreateChainBonesOptions`、`CreateChainBonesOptionsByAxials`、`CreateChainBonesOptions_Base`、`CreateChainSkeletalModelOptions`、`CreateChainSkeletalModelOptions_Base`、`CreateChainSkinnedMeshForMeshOptions`、`CreateChainSkinnedMeshForMeshOptions_Base`、`CreateCurveAnimationClipByCurveOptions`、`CreateCurveAnimationClipByPolylineOptions`、`CreateCurveAnimationClipForBonesOptions`、`CreateCurveAnimationClipOptions`、`CreateCurveAnimationClipOptions_Base`、`CreateCurveAnimationClipReturn`、`CreateCurveAnimationClip_Base`、`CreateKeyframeTrackByPolylineOptions`、`CreateKeyframeTrackOptions`、`CreateKeyframeTrackOptions_Base`、`CurveOptions`、`EqualChainBoneOptions`、`GetClosestContinuousIndexesOptions`、`GetDivisionDataOptions_Base`、`GetDivisionsDataOptions`、`GetKeyframeTransformDatasByPolylineOptions`、`GetKeyframeTransformDatasByPolylineOptions_Base`、`GetKeyframeTransformDatasOptions`、`GetKeyframeTransformDatasOptionsByCurve_Base`、`GetKeyframeTransformDatasOptions_Base`、`GetSampleDataForBones`、`GuiAnimationActionController`、`GuiAnimationController`、`Keyframe`、`KeyframeInfo`、`KeyframeInfos`、`LookPointOptions`、`LookPointOptionsOfKeyframes`、`PathAnimationTimeOptions`、`PolylineKeyframe`、`PolylineOptions`、`SkeletalModelInfo`、`TrackConfig`、`TrackProperty_Common`、`UpdateGUI`、`ValueTypeNames`、`configVertexWeightByEquallyDivided`、`configVertexWeightForChainBones`、`configVertexWeightForEqualChainBones`、`createAnimationOperate`、`createBonePathAnimation`、`createChainBones`、`createChainBonesByAxials`、`createChainBonesByJoints`、`createChainSkeletalModel`、`createChainSkinnedMesh`、`createChainSkinnedMeshForMesh`、`createCurveAnimationClip`、`createCurveAnimationClipByCurve`、`createCurveAnimationClipByPolyline`、`createCurveAnimationClipForBones`、`createCurveAnimationClipForBonesTarget`、`createEqualChainBones`、`createGuiAnimationController`、`createKeyframeTracksForBones`、`createKeyframeTracksForBonesTarget`、`createKeyframeTracksOfCurveAnimation`、`createKeyframeTracksOfCurveAnimationByPolyline`、`getAllRootBones`、`getClosestContinuousIndexes`、`getContinuousNumsList`、`getDurationOfPathAnimationOptions`、`getFirstRootBone`、`getKeyframeTransformDatas`、`getKeyframeTransformDatasByPolyline`、`getRootBone`、`getSampleDataForBones`、`getSampleDataForBonesTarget`、`getTS`、`getTimes`、`renderLoop`

## @soonspacejs/plugin-atmosphere

[详细文档](../plugin/atmosphere)

**默认导出公开成员：** `cacheKey`、`date`、`longitude`、`latitude`、`altitude`、`distance`、`target`、`ground`、`groundAlbedo`、`castShadow`、`cloudCoverage`、`cloudQuality`、`neesUpdate`、`atmosphereProps`、`texturesGenerator`、`arrayBufferLoader`、`skyMaterial`、`skyMesh`、`skyLight`、`sunLight`、`aerialPerspectiveEffect`、`aerialPerspective`、`lensFlareEffect`、`lensFlare`、`ditheringEffect`、`dithering`、`lightingMaskPass`、`cubeRenderTarget`、`cubeCamera`、`cloudsEffect`、`clouds`、`onCloudsChange`、`update`、`start`、`updateModelLightingMask`、`loadCloudTextures`、`setCloudLayer`、`stop`、`dispose`

## @soonspacejs/plugin-camera-follower

[详细文档](../plugin/camera-follower)

**默认导出公开成员：** `start`、`stop`

**Interfaces：** `StartOptions`

## @soonspacejs/plugin-clipping-controls

[详细文档](../plugin/clipping-controls)

**默认导出公开成员：** `scenePlaneHelpers`、`sceneClipping`、`removeSceneClipping`、`modelClipping`、`removeModelClipping`

**Interfaces：** `ClippingPlaneHelperOptions`、`ModelClippingOptions`、`SceneClippingOptions`

**Types：** `ClipPlaneName`

## @soonspacejs/plugin-cps-scheme

[详细文档](../plugin/cps-scheme)

**默认导出公开成员：** `cpsSoonmanagerPlugin`、`platter`、`schemeData`、`platterDomElement`、`autoRunFlow`、`init`、`setBtnReady`、`setBtnHover`、`dispose`、`fetchContent`、`fetchSchemeData`

## @soonspacejs/plugin-cps-soonmanager

[详细文档](../plugin/cps-soonmanager)

**默认导出公开成员：** `path`、`progress`、`loadFDS`、`sceneGroup`、`metaData`、`treeData`、`flatData`、`faltDataMap`、`poiData`、`dataSourceData`、`topologyData`、`propertiesData`、`objectsAnimations`、`animationsData`、`modelVisionsData`、`spacesData`、`flowsData`、`gisData`、`semanticObjects`、`roadsData`、`fdsData`、`fdsManager`、`effectPlugin`、`atmospherePlugin`、`terrainTilesRenderer`、`tilesRendererManager`、`soonflow`、`flowData`、`setKey`、`fetchMetaData`、`fetchTreeData`、`fetchSemanticData`、`fetchRoadsData`、`fetchFlatData`、`fetchPoiData`、`fetchDataSourceData`、`fetchTopologyData`、`fetchPropertiesData`、`fetchAnimationsData`、`fetchModelVisionsData`、`fetchSpacesData`、`fetchFlowsData`、`fetchGisData`、`fetchGisPlotsData`、`fetchFDSData`、`formatPoiData`、`loadPoi`、`refreshPoiByDataSource`、`refreshByUserData`、`runWithCode`、`applyWorkIdMap`、`getTreeNodeById`、`setPath`、`clearFDS`、`getFDSState`、`playFDS`、`pauseFDS`、`toggleFDSPlay`、`setFDSTime`、`loadScene`、`setAutoInstancing`、`getAutoInstancingStats`、`loadSceneAndSemantic`、`loadSceneAndSemanticInWorker`、`presetGis`、`presetEffects`、`getTopologies`、`loadTopologies`、`sortTopologyNodes`、`playAnimationById`、`playObjectAnimation`、`stopObjectAnimation`、`flyToSceneFromVisionsData`、`flyToMainSceneFromVisionsData`、`flyToObjectFromVisionsData`、`flyToMainObjectFromVisionsData`、`loadFlowData`、`runFlowById`、`getSpaceAssets`、`dispose`

**Interfaces：** `ConstructorOptions`、`Geo`、`IAnimations`、`IApplyWorkIdMapResult`、`IFdsData`、`IGisData`、`IGisPlot`、`IGisPlotGeometry`、`IGisPlotProperties`、`IGisSettings`、`IInnerTreeData`、`IKeyframe`、`ILoadSceneAndSemanticInWorkerOptions`、`ILoadSceneAndSemanticInWorkerResult`、`ILoadSceneOptions`、`Imagery`、`IMetadata`、`IModelVisions`、`IPlayAnimationByIdOptions`、`IPoiData`、`IPresetEffectsOptions`、`IProgress`、`IProgressEventMap`、`IProperties`、`IRoadEdge`、`IRoadLane`、`IRoadNode`、`IRoadsData`、`ISemanticWorkerStageEvent`、`ISpaces`、`ITopologyEdge`、`ITopologyNode`、`ITopologyNodeGraph`、`ITopologyPath`、`ITreeData`、`IWorkIdMapValue`、`PoiContent`、`PoiContentData`、`PoiMedia`、`Terrain`、`Tileset`、`TLicense`

**Types：** `BaseTreeNode`、`IFlatData`、`IWorkIdMap`、`SemanticWorkerStage`、`TAnimationsMap`、`TModelVisionsMap`、`TPropertiesMap`、`TSpacesMap`

**Enums：** `LoadSceneAlgorithm`、`PoiContentTypeEnum`

**常量与其他导出：** `ANIMATIONS_DATA_FILE_PATH`、`DATA_SOURCE_FILE_PATH`、`FDS_DATA_FILE_PATH`、`FLAT_DATA_FILE_PATH`、`FLOWS_DATA_FILE_PATH`、`GIS_DATA_FILE_PATH`、`GIS_PLOTS_DATA_FILE_PATH`、`META_DATA_FILE_PATH`、`MODEL_VISIONS_DATA_FILE_PATH`、`POI_DATA_FILE_PATH`、`POI_PLUGIN_NAME`、`PROPERTIES_DATA_FLEE_PATH`、`PROPERTIES_KEY`、`ROADS_DATA_FILE_PATH`、`SCENE_NODE_FDS_DATA_FILE_PATH`、`SEMANTIC_DATA_FILE_PATH`、`SPACES_DATA_FILE_PATH`、`TOPOLOGY_DATA_FILE_PATH`、`TREE_DATA_FILE_PATH`

## @soonspacejs/plugin-drag-controls

[详细文档](../plugin/drag-controls)

**默认导出公开成员：** `controls`、`viewport`、`start`、`stop`

**Interfaces：** `StartOptions`

## @soonspacejs/plugin-drawing-shape

[详细文档](../plugin/drawing-shape)

**默认导出公开成员：** `blankIntersect`、`viewport`、`getFirstIntersect`、`drawingLayer`、`configLayer`、`recoverLayer`、`drawingPoint`、`drawingLine`、`drawingPolygon`、`drawingCircle`、`clearDrawingCanvas3D`

**Interfaces：** `DrawingCircleEvents`、`DrawingLineEvents`、`DrawingPointEvents`、`DrawingPolygonEvents`

**Types：** `DrawingCircleInfo`、`DrawingLineInfo`、`DrawingPointInfo`、`DrawingPolygonInfo`

## @soonspacejs/plugin-drawing-topology

[详细文档](../plugin/drawing-topology)

**默认导出公开成员：** `viewport`、`drawing`、`nodes`、`topology`、`start`、`undo`、`done`、`cancel`

**Interfaces：** `StartOptions`

## @soonspacejs/plugin-effect

[详细文档](../plugin/effect)

**默认导出公开成员：** `weatherPresetImgs`、`createFlame`、`createSmoke`、`createSmoke2`、`createSparkles`、`createContactShadows`、`openWeather`、`closeWeather`、`createParticleCluster`、`createCircleWave`、`createCylinderWave`、`createPointsWave`、`createBuilds`、`createWater`、`removeEffect`

**Interfaces：** `BuildsOptions`、`ContactShadowsOptions`、`CreateWaterOptions`、`FlameOptions`、`PointsWaveOptions`、`Smoke2Options`、`SmokeOptions`、`SparklesOptions`、`WeatherOptions`

**Types：** `CircleWaveOptions`、`CylinderWaveOptions`

**从 `@three3d/particle` 再导出：** `AccumulateValue`、`ClusterGeometry`、`ClusterGeometryOptions`、`ClusterType`、`CreateHeatParticleClusterDataArrOptions`、`CreatePointParticleClusterDataArrOptions`、`GetGradientValue`、`GradientParams`、`HeatParticleClusterFeature`、`HeatParticleClusterFeaturePoint`、`LinePointInfo`、`ParticleCluster`、`ParticleClusterData`、`ParticleClusterFeature`、`ParticleClusterFeaturePoint`、`ParticleClusterFeatureVector`、`ParticleClusterGeometry`、`ParticleClusterGeometryOptions`、`ParticleClusterOptions`、`ParticleClusterShape`、`PointParticleClusterInfo`、`ValuesAccumulate`、`createHeatParticleClusterData`、`createHeatParticleClusterDataArr`、`createPointParticleClusterData`、`createPointParticleClusterDataArr`、`densityGradient_Default`、`getRandomVector_Circle`、`getRandomVector_CircleAnnular`、`getRandomVector_CircleCylinder`、`getRandomVector_CircleCylinderAnnular`、`getRandomVector_Square`、`getRandomVector_SquareAnnular`、`getRandomVector_SquareCylinder`、`getRandomVector_SquareCylinderAnnular`、`valueGradient_Default`、`valuesAccumulate_Default`

## @soonspacejs/plugin-fds

[详细文档](../plugin/fds)

**命名类：**

- `FdsManager`：`id`、`volumes`、`activeVolume`、`isPlaying`、`setOptions`、`getState`、`load`、`clear`、`setActiveVolume`、`setTime`、`play`、`pause`、`togglePlay`、`dispose`
- `FdsMesh`：`ijk`、`xb`、`origin`、`size`、`cellSize`、`getPositionByCell`、`getCellByPosition`
- `VolumePoints`：`texture`、`updateData`、`updateCamera`、`dispose`

**函数：** `loadFDS`

**Interfaces：** `IFdsManagerActiveChangeEvent`、`IFdsManagerClearEvent`、`IFdsManagerErrorEvent`、`IFdsManagerEventMap`、`IFdsManagerLoadedEvent`、`IFdsManagerLoadOptions`、`IFdsManagerOptions`、`IFdsManagerSource`、`IFdsManagerState`、`IFdsManagerStateChangeEvent`、`IVector3`、`Xb`

**Types：** `SpaceType`、`TFdsLoadOptions`、`TFdsManagerLoadInput`、`TFdsMeshIjk`、`TFdsMeshXb`、`TSimulatesManifest`、`TSliceData`、`TVolumePointsShape`

**常量与其他导出：** `fdsSpaceMatrix`、`rainbowCanvasTexture`、`sootCanvasTexture`、`threeToFdsSpaceMatrix`

## @soonspacejs/plugin-first-person-controls

[详细文档](../plugin/first-person-controls)

**默认导出公开成员：** `ssp`、`viewport`、`controls`、`enabled`、`keyCodeMap`、`moveSpeed`、`gravitySpeed`、`jumpOffset`、`clashCheckDistance`、`clashDistance`、`eyeHeight`、`kneeHeight`、`jumpHeight`、`enableClash`、`enableGravity`、`reverseRotate`、`rotate`、`rotateSpeed`、`horizontalRotate`、`verticalRotate`、`dblClickForward`、`movement`、`clashFilter`、`clashLayers`、`onKeyDown`、`onKeyUp`、`onDblClick`、`onPointerDown`、`onPointerMove`、`onPointerUp`、`clearClashCache`、`lastDirection`、`onClashCheck`、`searchRadiusFactor`、`checkedSphere`、`getCheckedObjects`、`gravitySearchFactor`、`gravityCheckedObjects`、`gravityCheckedBox`、`getGravityCheckedObjects`、`gravityClashCheck`、`setOptions`、`start`、`stop`、`gravityInterObject`、`kneeInterObject`、`eyeInterObject`、`update`

**Interfaces：** `StartOptions`

**Types：** `ClashCheckAxis`、`ClashFilter`

## @soonspacejs/plugin-flow

[详细文档](../plugin/flow)

**命名类：**

- `ComponentFlowParser`：`flow`
- `ComponentTrigger`：`flows`、`flowsMap`、`getComponentObsTarget`、`modelHandler`、`componentThingModelHandler`、`runFlowByIds`、`execBehavior`、`initLoaded`、`initThingPropChange`、`initThingEvent`、`onThingPropChange`
- `FlowParser`：`ssp`、`flow`、`nodes`、`nodesMap`、`edges`、`edgesMap`、`onNodeBefore`、`onNodeAfter`、`addNode`、`addEdge`、`getNodeById`、`getEdgeById`、`clear`、`parse`、`run`、`debug`、`stop`、`cleanup`、`getVariableNameById`、`dispose`
- `Node`：`parser`、`ssp`、`id`、`type`、`props`、`prevNodes`、`postNodes`、`execOrder`、`ctx`、`promise`、`resolve`、`reject`、`cleanSets`、`onBefore`、`onAfter`、`rejected`、`init`、`readContext`、`writeContext`、`findProp`、`waitForPrevNodes`、`mergeContext`、`exec`、`run`、`cleanup`
- `Trigger`：`ssp`、`interaction`、`flows`、`flowsMap`、`options`、`disposables`、`status`、`target`、`getObsTarget`、`modelHandler`、`runFlowByIds`、`execBehavior`、`initMouseClick`、`initMouseDbClick`、`initMouseRightClick`、`initLoaded`、`modelPropChangeHandler`、`initModelPropChange`、`initThingPropChange`、`initThingEvent`、`dispose`

**Interfaces：** `IAnimation`、`IComponentAnimation`

**Types：** `ComponentFlowType`、`EdgeType`、`FlowParserEventMap`、`FlowType`、`Interaction`、`InteractionBehavior`、`NodeCtxType`、`NodeGlobalType`、`NodePropType`、`NodeType`、`TriggerOptions`

**Enums：** `InteractionAction`、`InteractionActionType`、`InteractionObsType`、`InteractionType`、`NodePropTypeEnum`、`NodeTypeEnum`

## @soonspacejs/plugin-follow-mouse

[详细文档](../plugin/follow-mouse)

**默认导出公开成员：** `start`

**Interfaces：** `StartOptions`

## @soonspacejs/plugin-gs3d-loader

[详细文档](../plugin/gs3d-loader)

**默认导出公开成员：** `ssp`、`load`、`loads`、`createViewer`

## @soonspacejs/plugin-heat-cloud

[详细文档](../plugin/heat-cloud)

**默认导出公开成员：** `defaultColorGradient`、`defaultGradientVolumeMaterialOptions`、`createHeatCloud`、`createLineHeat`、`createImageExtrusion`、`createSliceMesh`、`createImageSlice`

**命名类：**

- `HeatMapPlugin`：`defaultColorGradient`、`defaultGradientVolumeMaterialOptions`、`createHeatCloud`、`createLineHeat`、`createImageExtrusion`、`createSliceMesh`、`createImageSlice`

**Types：** `CreateHeatCloudOptions`、`CreateHeatOptions`、`CreateImageExtrusionOptions`、`CreatLineHeatOptions`、`GradientOptions`、`HeatDataOptions`、`LineDataOptions`

**从 `@three3d/volume` 再导出：** `ColorFogPoint`、`ColorFogPointsMaterial`、`ColorFogPointsMaterialOptions`、`ColorFogPointsMaterialUniforms`、`ColorFogPointsOptions`、`CreateColorFogPointsOptions`、`CreateGradientData3DTextureOptions`、`CreateGradientFogPointsOptions`、`CreateImageData3DTextureFromGradientOptions`、`Data3DPointExtraInfo`、`ExampleVolumeMaterial_1`、`ExampleVolumeMaterial_1Options`、`ExampleVolumeMaterial_1Uniforms`、`ExampleVolumeMaterial_Cloud`、`ExampleVolumeMaterial_CloudOptions`、`ExampleVolumeMaterial_CloudUniforms`、`ExampleVolumeMaterial_Perlin`、`ExampleVolumeMaterial_PerlinOptions`、`ExampleVolumeMaterial_PerlinUniforms`、`FogPointsMaterial`、`FogPointsMaterialOptions`、`FogPointsMaterialUniforms`、`GetGradientValue`、`GetLineGradientValue`、`GradientData3DOptions`、`GradientData3DTexture`、`GradientData3DToImageData3DOptions`、`GradientFogPoint`、`GradientFogPointsGeometryOptions`、`GradientFogPointsMaterial`、`GradientFogPointsMaterialOptions`、`GradientFogPointsMaterialUniforms`、`GradientFogPointsOptions`、`GradientOptionsOptimizeOptions`、`GradientParams`、`GradientVolumeMaterial`、`GradientVolumeMaterialOptions`、`GradientVolumeMaterialUniforms`、`HeatAccumulateValue`、`HeatData3DOptions`、`HeatParticleVolumeFeature`、`HeatParticleVolumeFeaturePoint`、`HeatParticleVolumeFeaturePointInfo`、`HeatParticleVolumeFeatureVectorInfo`、`HeatValuesAccumulate`、`ImageData3DTexture`、`ImageData3DTextureSlice`、`ImageVolumeMaterial`、`LineData3DOptions`、`LineGradientParams`、`NumberValuesAccumulate`、`ParticleVolumeFeature`、`ParticleVolumeFeaturePoint`、`ParticleVolumeFeaturePointInfo`、`ParticleVolumeFeatureVectorInfo`、`PointsUniforms`、`SliceMaterial`、`SliceMaterialOptions`、`SliceMaterialUniforms`、`SliceMesh`、`SphereFogMaterial`、`SphereFogMaterialOptions`、`SphereFogMaterialUniforms`、`SphereParticleVolumeFeature`、`TransferableGradientFeature`、`TransferableGradientOptions`、`VolumeFeature`、`VolumeFit`、`VolumeMaterial`、`VolumeMaterialOptions`、`VolumeMaterialUniforms`、`VolumeMesh`、`VolumeRenderStyle`、`computeHeatData3DForPoint`、`createColorFogPoints`、`createGradientData3DTexture`、`createGradientFogPoints`、`createHeatData3D`、`createImageData3DTextureByExtrudeImage`、`createImageData3DTextureFromGradient`、`createLineData3D`、`gradientData3DToImageData3D`、`hollowGradient_Default`、`lineValueGradient_Default`、`makeOriginOnBoundingBoxMinOfGeometry`、`numberValuesAccumulate_Default`、`optimizeGradientOptions`、`radiusGradient_Default`、`transformGradientOptions`、`translateScaleGradientOptions`、`valueGradient_Default`、`valuesAccumulate_Default`

## @soonspacejs/plugin-heat-map

[详细文档](../plugin/heat-map)

**默认导出公开成员：** `hmInstance`、`store`、`maxCanvasSize`、`create`、`createPolygon`、`createDrawing`、`setData`、`setDataPolygon`、`getById`、`getByName`、`removeById`

**Interfaces：** `CanvasSize`、`CreateParam`、`CreatePolygonParam`、`DrawingParam`、`SceneDataPoint`、`ScenePolygonDataPoint`、`StartParam`、`StoreValue`、`StoreValuePolygon`

**Types：** `DrawingModeType`

**Enums：** `StartEventType`

## @soonspacejs/plugin-ifc-loader

[详细文档](../plugin/ifc-loader)

**默认导出公开成员：** `ifcLoader`、`setWasmPath`、`load`、`dispose`

## @soonspacejs/plugin-measuring

[详细文档](../plugin/measuring)

**默认导出公开成员：** `LINE_MATERIAL`、`MESH_MATERIAL`、`MAX_DISTANCE`、`OBJ_NAME`、`LABEL_NAME`、`mode`、`objectsStore`、`onCancel`、`onDone`、`domElement`、`start`、`close`、`cancel`、`clear`、`initPointMarkerMaterial`、`done`、`mousemove`、`dblclick`、`click`、`keydown`、`getClosestIntersection`、`addOrUpdateTempLabel`、`createLabel`、`createCurve`、`calculateArea`、`calculateAngle`、`getAngleBisector`、`getBarycenter`、`getUnitString`、`numberToString`

**Enums：** `MeasuringMode`

## @soonspacejs/plugin-model-blast

[详细文档](../plugin/model-blast)

**默认导出公开成员：** `prevObjects`、`childDirs`、`childPositions`、`start`、`stop`、`objectActionMap`、`startForObjects`、`stopForObjects`

**函数：** `blastObjects`

## @soonspacejs/plugin-navigation

[详细文档](../plugin/navigation)

**命名类：**

- `GyroListener`：`gyroEvent`、`onChange`、`defaultBeta`、`defaultAlpha`、`defaultGamma`、`cache`、`beta`、`alpha`、`gamma`、`gyroX`、`gyroY`、`gyroZ`、`absolute`、`requestPermisson`、`active`、`inActive`
- `MapCamera`：`zoom`、`resizeCamera`
- `NavigateCamera`：`initOptions`、`cameraKey`、`position`、`rotation`、`quaternion`、`disabledAnimate`、`distanceToTarget`、`rotationToTarget`、`oppositeCamera`、`oppositeType`、`isFixRotationRelativeTarget`、`targetRotationFix`、`isFixPositionRelativeTarget`、`targetPositionFix`、`autoRestoreOrientation`、`onControlStart`、`onControlRender`、`onControlEnd`、`enableGyro`、`gyroX`、`gyroY`、`gyroZ`、`gyroAbsolute`、`targetRotationAfterFix`、`targetPositionAfterFix`、`realDistanceToTarget`、`realRotationToTarget`、`orientationType`、`orientationTarget`、`vision`、`followTarget`、`followPosition`、`followRotation`、`fixedOrientation`、`resetOptions`、`setOptions`、`setCamera`、`restoreOrientation`
- `Navigator`：`onPlay`、`onStatusChange`、`loop`、`autoNext`、`playAfterStart`、`flyToModelAfterStart`、`backStartPointWhenStop`、`model`、`speed`、`pathProgress`、`totalProgress`、`currentPath`、`currentPathIndex`、`currentRotationVector`、`start`、`restart`、`play`、`pause`、`stop`、`flip`、`over`
- `SoonSpaceCamera`：`active`

**函数：** `eulerToVector3`、`getDirection`、`getDirectionByNodes`、`getDistanceInfoByProgress`、`getFixEuler`、`getFixVector`、`getNavigatorNodeInfoByProgress`、`getNavigatorNodeInfosByTopology`、`normalizeEuler`、`reverseTopologies`、`Vector3ToEuler`

**Interfaces：** `NavigateCameraOptions`、`playInfo`

**Types：** `CameraOppositeType`、`ControlCallback`、`Direction`、`EulerArray`、`FixEuler`、`FixVector`、`NavigateOrientationTarget`、`Object3DLike`、`VectorArray`

**Enums：** `NAVIGATE_ORIENTATION_TYPE`、`NAVIGATE_VISION_TYPE`、`PLAY_STATUS`

**常量与其他导出：** `AngleRange`、`azimuth`、`Azimuth`、`AzimuthDefine`、`AzimuthInfo`、`AzimuthList`、`AzimuthMap`、`AzimuthOptions`、`CourseAzimuthMap`、`CourseInfo`

## @soonspacejs/plugin-pathfinding

[详细文档](../plugin/pathfinding)

**默认导出公开成员：** `navMesh`、`crowd`、`debugDrawer`、`crowdHelper`、`createSoloNavMesh`、`createTiledNavMesh`、`disposeSoloNavMesh`、`disposeNavMesh`、`createCrowd`、`disposeCrowd`、`createDebugDrawer`、`disposeDebugDrawer`、`createCrowdHelper`、`disposeCrowdHelper`、`dispose`

**函数：** `deInstancingMesh`、`getVertices`

## @soonspacejs/plugin-patrol-controls

[详细文档](../plugin/patrol-controls)

**默认导出公开成员：** `camera`、`options`、`states`、`nodes`、`nextPointIndex`、`isPaused`、`isStoped`、`start`、`setProgress`、`setOptions`、`pause`、`resume`、`stop`

**Interfaces：** `DefaultOptions`

**Types：** `ProgressParams`、`ResetOptions`、`StartOptions`

## @soonspacejs/plugin-poi-renderer

[详细文档](../plugin/poi-renderer)

**默认导出公开成员：** `poiIdSet`、`renderCustom`、`renderVideo`、`renderPanel`、`batchRender`

**Interfaces：** `PoiNodeBatchOptions`、`PoiNodeCustomOptions`、`PoiNodeData`、`PoiNodePanelDataSource`、`PoiNodePanelOptions`、`PoiNodeVideoOptions`

**Types：** `PoiImageOptions`、`PoiNodeBaseOption`

**Enums：** `PoiContentTypeEnum`

**常量与其他导出：** `DefaultStyle`

## @soonspacejs/plugin-sbmz-loader

[详细文档](../plugin/sbmz-loader)

**默认导出公开成员：** `ssp`、`modelData`、`modelList`、`load`

**Interfaces：** `SbmzModelData`

## @soonspacejs/plugin-soonbuilder-loader

[详细文档](../plugin/soonbuilder-loader)

**默认导出公开成员：** `fileInfo`、`sceneInfo`、`treeData`、`modelData`、`load`

**Interfaces：** `TModelInfo`

## @soonspacejs/plugin-soonmanager2-sync

[详细文档](../plugin/soonmanager2-sync)

**默认导出公开成员：** `path`、`metaData`、`treeData`、`topologyData`、`propertiesData`、`animationsData`、`modelVisionsData`、`fetchMetaData`、`fetchTreeData`、`fetchTopologyData`、`fetchPropertiesData`、`fetchAnimationsData`、`fetchModelVisionsData`、`setPath`、`loadScene`、`getTopologies`、`playAnimationById`

**Interfaces：** `IAnimations`、`IKeyframe`、`ILoadSceneOptions`、`IMetadata`、`IModelVisions`、`IPlayAnimationByIdOptions`、`IProperties`、`ITopologyEdge`、`ITopologyNode`、`ITopologyNodeGraph`、`ITopologyPath`、`ITreeData`

**Types：** `TAnimationsMap`、`TAnimationsTweenProps`、`TModelVisionsMap`、`TPropertiesMap`

**常量与其他导出：** `ANIMATIONS_DATA_FILE_PATH`、`META_DATA_FILE_PATH`、`MODEL_VISIONS_DATA_FILE_PATH`、`PROPERTIES_DATA_FLEE_PATH`、`PROPERTIES_KEY`、`SIGN_PATH`、`TOPOLOGY_DATA_FILE_PATH`、`TREE_DATA_FILE_PATH`

## @soonspacejs/plugin-sspx

[详细文档](../plugin/sspx)

**常量与其他导出：** `default`

## @soonspacejs/plugin-tiles

[详细文档](../plugin/tiles)

**默认导出公开成员：** `tilesMap`、`needsUpdate`、`cameraTransitionStart`、`loadTiles`、`removeTiles`

**命名类：**

- `ArcgisTilesRenderer`：`tiles`、`tilesFadePlugin`、`updateOnChangePlugin`、`quantizedPlugin`、`customMaterialPlugin`、`imageOverlayPlugin`、`reorientationPlugin`、`loedTilesSets`、`render`、`beforeRenderHandler`、`enable`、`disable`、`invalidate`、`dispose`
- `GisPlotArrow`：`category`、`options`、`generatedCoords`、`update`、`generateCoords`、`getSnapshot`、`getSnapshotDeep`
- `GisPlotBase`：`category`、`options`、`boundingBox`、`boundingSphere`、`setBoundingBoxResolver`、`invalidateBoundingBox`、`computeBoundingBox`、`computeBoundingSphere`、`update`、`getSnapshot`、`getSnapshotDeep`、`getCenterPoints`、`getExtentPoints`
- `GisPlotCircle`：`category`、`options`、`update`、`getExtentPoints`
- `GisPlotLine`：`category`、`options`、`update`
- `GisPlotPoint`：`category`、`options`、`update`、`getCenterPoints`、`getExtentPoints`
- `GisPlotPolygon`：`category`、`options`、`update`
- `GisPlotRectangle`：`category`、`options`、`update`
- `GisPlotSector`：`category`、`options`、`update`、`getExtentPoints`
- `GisPlotText`：`category`、`options`、`update`、`getCenterPoints`、`getExtentPoints`
- `GroundDecalManager`：`id`、`ssp`、`bridge`、`plotSdfPlugin`、`setPlotSDFPlugin`、`addPlot`、`remove`、`clear`、`getAllItems`、`invalidateBoundingBoxes`、`getItem`、`getItemDeep`、`setStyle`、`setCenter`、`setCoords`、`setCoord`、`insertCoord`、`removeCoord`、`translateCoords`、`setText`、`setGlobalOpacity`、`getCoordCount`、`findNearestCoord`、`update`、`render`、`dispose`
- `OverlayManager`：`addGeoJSONOverlay`、`updateGeoJSONColor`、`updateGeoJSONDefaultStyle`、`updateGeoJSONStrokeStyle`、`updateGeoJSONStrokeWidth`、`updateGeoJSONFillStyle`、`updateGeoJSONMode`、`setGeoJSON`、`normalizeGeoJSON`、`mergeGeoJSON`、`setMergedGeoJSON`、`getGeoJSONFeatureById`、`updateGeoJSONFeatureStyleById`、`updateGeoJSONFeatureStylesByIds`、`addCesiumIonOverlay`、`addTMSOverlay`、`addXYZOverlay`、`addUrlTemplateOverlay`、`addWMSOverlay`、`addWMTSOverlay`、`remove`、`get`、`has`、`setVisible`、`setOpacity`、`setOrder`、`getOrder`、`bringToFront`、`sendToBack`、`restoreFromResourceManager`、`getIds`、`count`、`disposeInstances`、`dispose`
- `PlotPrimitiveBridge`：`shapes`、`opacity`、`redraw`、`update`、`dispose`
- `TerrainTilesRenderer`：`defaultTerrainId`、`defaultImageryId`、`tiles`、`tilesFadePlugin`、`updateOnChangePlugin`、`customMaterialPlugin`、`imageOverlayPlugin`、`reorientationPlugin`、`resourceManager`、`terrainManager`、`overlayManager`、`groundDecalManager`、`loedTilesSets`、`options`、`isCesiumIon`、`currentTerrainConfig`、`maxDepth`、`errorTarget`、`showTerrain`、`alphaClipMode`、`addEventLoad`、`setTerrain`、`flyToPlotById`、`addOverlay`、`removeOverlay`、`updateGeoJSONColor`、`updateGeoJSONMode`、`updateGeoJSONStrokeStyle`、`updateGeoJSONStrokeWidth`、`updateGeoJSONFillStyle`、`updateGeoJSONDefaultStyle`、`setGeoJSON`、`setMergedGeoJSON`、`getGeoJSONFeatureById`、`updateGeoJSONFeatureStyleById`、`updateGeoJSONFeatureStylesByIds`、`normalizeGeoJSON`、`mergeGeoJSON`、`setOverlayOrder`、`getOverlayOrder`、`bringOverlayToFront`、`sendOverlayToBack`、`setOverlayVisible`、`setOverlayOpacity`、`render`、`beforeRenderHandler`、`enable`、`disable`、`invalidate`、`dispose`
- `TileCustomMaterialPlugin`：`priority`、`alphaClipMode`、`processTileModel`、`updateAllLoadedModels`
- `TilesRenderer`：`tiles`、`tilesFadePlugin`、`updateOnChangePlugin`、`reorientationPlugin`、`options`、`loedTilesSets`、`materialType`、`onLoadModel`、`updateMaterial`、`onDisposeModel`、`applyAutoCenter`、`beforeRenderHandler`、`render`、`enable`、`disable`、`invalidate`、`dispose`、`lonLatHeightToPosition`、`positionToLonLatHeight`
- `TilesRendererManager`：`tilesMap`、`needsUpdate`、`cameraTransitionStart`、`referenceOrigin`、`setReferenceOrigin`、`clearReferenceOrigin`、`loadTiles`、`removeTiles`、`getTiles`、`getAllTiles`、`clear`、`invalidate`、`applyReferencePlacement`、`dispose`

**函数：** `computePlotBoundingBox`、`createAssaultDirectionArrow`、`createAttackArrow`、`createCurvedArrow`、`createFineArrow`、`createSwallowtailAttackArrow`、`flyToPlotById`、`getAngleOfThreePoints`、`getAzimuth`、`getBaseLength`、`getBisectorNormals`、`getCurvePoints`、`getNormal`、`getQBSplinePoints`、`getThirdPoint`、`isClockWise`、`MathDistance`、`Mid`、`parseColorToRGBA`、`plotOrderToRenderOrder`、`resolveEmergencyResourceIcon`、`resolveOpacity`、`resolvePlotPointImageUrl`、`sanitizePlotOrder`、`wholeDistance`

**Interfaces：** `ICesiumIonOptions`、`ICesiumIonOverlayOptions`、`IGeoJSONFeatureStyle`、`IGeoJSONOverlayOptions`、`IOverlayBaseOptions`、`IOverlayItem`、`IQuantizedMeshTerrainOptions`、`IReferencePlacementOptions`、`IReorientationOptions`、`ITerrainTilesRendererOptions`、`ITilesRendererOptions`、`ITMSTilesOverlayOptions`、`IUrlTemplateOverlayOptions`、`IWMSTilesOverlayOptions`、`IWMTSTilesOverlayOptions`、`IXYZTilesOverlayOptions`、`PlotPrimitiveBridgeOptions`、`StyleOpacityInput`

**Types：** `CenterLonLat`、`EmergencyResourceOntologyId`、`GeoJSONOverlayMode`、`GisPlotArrowSnapshot`、`GisPlotBaseOptions`、`GisPlotBoundingBoxResolver`、`GisPlotCategory`、`GisPlotItemSnapshot`、`GisPlotSnapshot`、`GisPlotStylePatch`、`GroundDecalManagerOptions`、`IManagedTilesRendererOptions`、`IReferenceOriginOptions`、`ITerrainSource`、`LonLat`、`LonLatPoint`、`MaterialTypeValue`、`NormalizedRGBA`、`PlotAddOptions`、`PlotArrowOptions`、`PlotArrowStyle`、`PlotArrowType`、`PlotCircleOptions`、`PlotLineOptions`、`PlotLineStrokeStyle`、`PlotPointOptions`、`PlotPointStyle`、`PlotPolygonOptions`、`PlotRectangleOptions`、`PlotSectorOptions`、`PlotTextAlign`、`PlotTextAnchorX`、`PlotTextAnchorY`、`PlotTextLayoutDirection`、`PlotTextOptions`、`PlotTextVerticalAlign`、`ReferencePlacementUp`

**Enums：** `OverlayType`、`TerrainType`

**常量与其他导出：** `EMERGENCY_RESOURCE_ICON_BY_ONTOLOGY_ID`、`EMERGENCY_RESOURCE_ONTOLOGY_IDS`、`FITTING_COUNT`、`MaterialType`、`ZERO_TOLERANCE`

## @soonspacejs/plugin-transform-controls

[详细文档](../plugin/transform-controls)

**默认导出公开成员：** `controls`、`start`、`close`、`closeAll`、`setBounds`、`changeMode`

**Interfaces：** `StartOptions`
