import { defineConfig } from 'vitepress';

const BASE_HTTP_URL = 'http://www.xwbuilders.com';
const BASE_PORT = '9018';
const PACKAGE_NAME = 'soonspacejs';

const OLD_PRO_PATH = `${BASE_HTTP_URL}:${BASE_PORT}/${PACKAGE_NAME}`;
const NEW_PRO_PATH = 'http://www.xwbuilders.com:8800';

export default defineConfig({
  base: '/',
  outDir: 'dist',
  title: 'SoonSpace.js 2.x',
  description: '简洁易学的 WebGL 库',
  ignoreDeadLinks: true,
  head: [
    ['link', { rel: 'icon', href: '/logo/logo.svg' }],
    // manifest
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        href: '/images/icons/apple-icon-152x152.png',
      },
    ],
    [
      'meta',
      {
        name: 'msapplication-TileImage',
        content: '/images/icons/ms-icon-144x144.png',
      },
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
  ],
  themeConfig: {
    logo: '/logo/logo.svg',
    nav: [
      { text: '教程', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: '插件', link: '/plugin/' },
      { text: '样例', link: `${NEW_PRO_PATH}/examples/` },
      {
        text: '更新日志',
        link: `https://github.com/soonspacejs/docs/releases`,
      },
      { text: '1.x', link: `${OLD_PRO_PATH}/Docs/1.x/` },
      {
        text: '了解更多',
        items: [
          {
            text: '开发指南',
            items: [
              { text: 'FAQ', link: '/faq/' },
              { text: '设计结构', link: '/design/' },
              { text: '博客', link: `${NEW_PRO_PATH}/blog/` },
            ],
          },
          {
            text: '相关产品',
            items: [
              {
                text: '建模工具 SoonBuilder',
                link: `${BASE_HTTP_URL}?page_id=1101&lang=zh`,
              },
              {
                text: '空间平台 SoonManager',
                link: `${BASE_HTTP_URL}:9050`,
              },
            ],
          },
        ],
      },
      {
        text: '外部链接',
        items: [
          { text: 'GitHub', link: 'https://github.com/soonspacejs' },
          {
            text: 'npm',
            link: 'https://www.npmjs.com/package/soonspacejs',
          },
          { text: '报告 Bug', link: 'https://github.com/soonspacejs/bugs' },
        ],
      },
    ],
    sidebar: {
      '/guide/': [
        {
          items: [
            { text: '介绍', link: '/guide/' },
            { text: '快速上手', link: '/guide/start' },
            { text: '从 1.x 迁移', link: '/guide/transfer' },
            { text: '类型定义', link: '/guide/types' },
            { text: '配置项', link: '/guide/config' },
            { text: '场景事件', link: '/guide/event' },
            { text: '对象事件', link: '/guide/objectEvent' },
            { text: '对象分组', link: '/guide/objectGroup' },
            {
              text: '空间对象',
              link: '/guide/sceneObject/',
              collapsed: true,
              items: [
                {
                  text: '基础空间对象',
                  link: '/guide/sceneObject/BaseObject3D',
                },
                {
                  text: '基础网格',
                  link: '/guide/sceneObject/BaseMesh',
                },
                {
                  text: '空间组',
                  link: '/guide/sceneObject/Group',
                },
                {
                  text: 'Sbm 模型',
                  link: '/guide/sceneObject/Sbm',
                },
                {
                  text: '通用模型',
                  link: '/guide/sceneObject/Model',
                },
                {
                  text: 'Poi',
                  link: '/guide/sceneObject/Poi',
                },
                {
                  text: 'PoiNode',
                  link: '/guide/sceneObject/PoiNode',
                },
                {
                  text: '空间画布',
                  link: '/guide/sceneObject/Canvas3D',
                },
                {
                  text: '拓扑路径',
                  link: '/guide/sceneObject/Topology',
                },
                {
                  text: '插件对象',
                  link: '/guide/sceneObject/PluginObject',
                },
                {
                  text: '点',
                  link: '/guide/sceneObject/Point',
                },
                {
                  text: '线',
                  link: '/guide/sceneObject/Line',
                },
                {
                  text: '面',
                  link: '/guide/sceneObject/Polygon',
                },
                {
                  text: '圆',
                  link: '/guide/sceneObject/Circle',
                },
                {
                  text: '路径连接线',
                  link: '/guide/sceneObject/Link',
                },
                {
                  text: '路径节点',
                  link: '/guide/sceneObject/Node',
                },
                {
                  text: '图标',
                  link: '/guide/sceneObject/Icon',
                },
              ],
            },
          ],
        },
      ],
      '/api/': [
        {
          text: '基础',
          items: [
            { text: '通用对象', link: '/api/object' },
            { text: 'Sbm 模型', link: '/api/sbm' },
            { text: '通用模型', link: '/api/model' },
            { text: 'Poi 对象', link: '/api/poi' },
            { text: 'PoiNode 对象', link: '/api/poiNode' },
            { text: 'PoiMesh 对象', link: '/api/poiMesh' },
            { text: '空间画布对象', link: '/api/canvas3D' },
            { text: '拓扑路径', link: '/api/topology' },
          ],
        },
        {
          text: '进阶',
          items: [
            { text: '控制器（废弃）', link: '/api/controls-legacy' },
            { text: '控制器（新版）', link: '/api/controls' },
            { text: '模型操作', link: '/api/modelTool' },
            { text: '场景操作', link: '/api/sceneTool' },
            { text: '相机', link: '/api/camera' },
            { text: '灯光', link: '/api/light' },
            { text: '辅助器', link: '/api/helper' },
            { text: '路径动画', link: '/api/path-animation' },
          ],
        },
        {
          text: '高阶',
          items: [
            { text: '补间动画', link: '/api/animation' },
            { text: '插件', link: '/api/plugin' },
            { text: 'SoonGIS', link: '/api/soongis' },
          ],
        },
      ],
      '/plugin/': [
        {
          text: '前端框架插件',
          items: [
            { text: 'vue-soonspace', link: '/plugin/vue-soonspace' },
            { text: 'react-soonspace', link: '/plugin/react-soonspace' },
          ],
        },
        {
          text: '平台协同插件',
          items: [
            {
              text: 'plugin-soonmanager-sync',
              link: '/plugin/soonmanager-sync',
            },
            {
              text: 'plugin-soonmanager2-sync',
              link: '/plugin/soonmanager2-sync',
            },
            { text: 'plugin-cps-soonmanager', link: '/plugin/cps-soonmanager' },
            { text: 'plugin-cps-scheme', link: '/plugin/cps-scheme' },
          ],
        },
        {
          text: '功能扩展插件',
          items: [
            { text: 'plugin-sspx', link: '/plugin/sspx' },
            { text: 'plugin-heat-map', link: '/plugin/heat-map' },
            { text: 'plugin-heat-cloud', link: '/plugin/heat-cloud' },
            { text: 'plugin-measuring', link: '/plugin/measuring' },
            { text: 'plugin-drawing-shape', link: '/plugin/drawing-shape' },
            { text: 'plugin-patrol-controls', link: '/plugin/patrol-controls' },
            {
              text: 'plugin-drawing-topology',
              link: '/plugin/drawing-topology',
            },
            { text: 'plugin-pathfinding', link: '/plugin/pathfinding' },
            {
              text: 'plugin-transform-controls',
              link: '/plugin/transform-controls',
            },
            { text: 'plugin-follow-mouse', link: '/plugin/follow-mouse' },
            {
              text: 'plugin-first-person-controls',
              link: '/plugin/first-person-controls',
            },
            { text: 'plugin-camera-follower', link: '/plugin/camera-follower' },
            {
              text: 'plugin-clipping-controls',
              link: '/plugin/clipping-controls',
            },
            { text: 'plugin-model-blast', link: '/plugin/model-blast' },
            { text: 'plugin-effect', link: '/plugin/effect' },
            { text: 'plugin-navigation', link: '/plugin/navigation' },
          ],
        },
        {
          text: '开发者插件',
          items: [
            { text: 'vscode-sbm-preivew', link: '/plugin/vscode-sbm-preview' },
          ],
        },
      ],
    },
    search: {
      provider: 'local',
    },
    footer: {
      message: '浙ICP备16043491号',
      copyright: '© Copyright 2018 xwbuilders - All rights reserved.',
    },
  },
});
