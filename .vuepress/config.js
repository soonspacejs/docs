const path = require('path');

const BASE_HTTP_URL = 'http://www.xwbuilders.com';
const BASE_PORT = '9018';
const PACKAGE_NAME = 'soonspacejs';

const OLD_PRO_PATH = `${BASE_HTTP_URL}:${BASE_PORT}/${PACKAGE_NAME}`;
const NEW_PRO_PATH = 'http://www.xwbuilders.com:8800';

module.exports = {
  base: '/',
  dest: 'dist',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'SoonSpace.js 2.x',
      description: '简洁易学的 WebGL 框架',
    },
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
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
    smoothScroll: true,
    locales: {
      '/': {
        nav: [
          { text: '教程', link: '/guide/' },
          { text: 'API', link: '/api/' },
          { text: '插件', link: '/plugin/' },
          { text: '样例', link: `${NEW_PRO_PATH}/examples/` },
          { text: '更新日志', link: `https://github.com/soonspacejs/docs/releases` },
          { text: '1.x', link: `${OLD_PRO_PATH}/Docs/1.x/` },
          {
            text: '了解更多',
            items: [
              {
                text: '开发指南',
                items: [
                  { text: 'FAQ', link: '/faq/' },
                  { text: '博客', link: `${NEW_PRO_PATH}/blog/` },
                  { text: '设计结构', link: '/design/' },
                  {
                    text: '离线文档下载',
                    link:
                      `${NEW_PRO_PATH}/resource/离线功能说明书/SoonSpace 功能说明书.pdf`,
                    target: '_blank',
                  },
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
            '',
            'start',
            'transfer',
            'types',
            'config',
            'event',
            'objectEvent',
            'objectGroup',
            {
              title: '空间对象',
              children: [
                '/guide/sceneObject/BaseObject3D',
                '/guide/sceneObject/BaseMesh',
                '/guide/sceneObject/Group',
                '/guide/sceneObject/Sbm',
                '/guide/sceneObject/Model',
                '/guide/sceneObject/Poi',
                '/guide/sceneObject/PoiNode',
                '/guide/sceneObject/Canvas3D',
                '/guide/sceneObject/Topology',
                '/guide/sceneObject/PluginObject',
                '/guide/sceneObject/Point',
                '/guide/sceneObject/Line',
                '/guide/sceneObject/Polygon',
                '/guide/sceneObject/Circle',
                '/guide/sceneObject/Link',
                '/guide/sceneObject/Node',
                '/guide/sceneObject/Icon',
              ],
            },
          ],
          '/api/': [
            {
              title: '基础',
              collapsable: false,
              children: [
                '/api/object',
                '/api/sbm',
                '/api/model',
                '/api/poi',
                '/api/poiNode',
                '/api/Canvas3D',
                '/api/topology',
              ],
            },
            {
              title: '进阶',
              collapsable: false,
              children: [
                '/api/controls',
                '/api/modelTool',
                '/api/sceneTool',
                '/api/camera',
                '/api/light',
                '/api/helper',
              ],
            },
            {
              title: '高阶',
              collapsable: false,
              children: ['/api/animation', '/api/pligin'],
            },
          ],
          '/plugin/': [
            {
              title: '前端框架插件',
              collapsable: false,
              children: ['/plugin/vue-soonspace', '/plugin/react-soonspace'],
            },
            {
              title: '平台协同插件',
              collapsable: false,
              children: [
                '/plugin/soonmanager-sync',
                '/plugin/soonmanager2-sync',
              ],
            },
            {
              title: '功能扩展插件',
              collapsable: false,
              children: [
                '/plugin/sspx',
                '/plugin/heat-map',
                '/plugin/drawing-shape',
                '/plugin/patrol-controls',
                '/plugin/drawing-topology',
                '/plugin/transform-controls',
                '/plugin/follow-mouse',
                '/plugin/first-person-controls',
                '/plugin/camera-follower',
                '/plugin/clipping-controls',
                '/plugin/model-blast',
                '/plugin/effect',
              ],
            },
            {
              title: '开发者插件',
              collapsable: false,
              children: ['/plugin/vscode-sbm-preview'],
            },
          ],
          '/faq/': ['/faq/'],
          '/design/': ['/design/'],
        },
      },
    },
  },
  plugins: [
    // ['@vuepress/active-header-links', false],
    ['@vuepress/back-to-top'],
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: {
          '/': {
            message: '文档已更新',
            buttonText: 'Refresh',
          },
        },
      },
    ],
    [
      'vuepress-plugin-baidu-tongji-analytics',
      {
        key: 'eabe35e4f4a0087dfb191ca425c2c3a5',
      },
    ],
  ],
  enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js'),
};
