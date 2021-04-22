
// import { resolve } from 'path'

const path = require('path')

const BASE_HTTP_URL = 'http://www.xwbuilders.com'
const BASE_PORT = '9018'
const PACKAGE_NAME = 'soonspacejs'
const PRO_PATH = `${BASE_HTTP_URL}:${BASE_PORT}/${PACKAGE_NAME}`

module.exports = {
  base: '/soonspacejs/Docs/2.x/',
  dest: 'dist',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'SoonSpace.js 2.x',
      description: '简洁易学的 WebGL 框架',
    },
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    smoothScroll: true,
    locales: {
      '/': {
        nav: [
          { text: '教程', link: '/guide/' },
          { text: 'Api', link: '/api/' },
          { text: '插件', link: '/plugin/' },
          { text: '样例', link: `${PRO_PATH}/examples/2.x/page/` },
          { text: '1.x', link: `${PRO_PATH}/Docs/1.x/` },
          {
            text: '了解更多',
            items: [
              {
                text: '开发指南',
                items: [
                  { text: 'FAQ', link: '/faq/' },
                  { text: '报告 Bug', link: 'https://github.com/soonspacejs/bugs' },
                ]
              },
              {
                text: '设计原理',
                items: [
                  { text: '设计结构', link: '/design/architectures' }
                ]
              },
              {
                text: '相关产品',
                items: [
                  { text: '建模工具 SoonBuilder', link: `${BASE_HTTP_URL}?page_id=1101&lang=zh` },
                  { text: '空间平台 SoonManager', link: `${BASE_HTTP_URL}:9050` }
                ]
              },
            ]
          },
          {
            text: '外部链接',
            items: [
              { text: 'GitHub', link: 'https://github.com/soonspacejs' },
              { text: 'npm', link: 'https://www.npmjs.com/package/soonspacejs' },
            ]
          }
        ],
        sidebar: {
          '/guide/': [
            'start',
            'transfer',
            'types',
            'config',
            'event',
            {
              path: '/guide/sceneObject',
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
                '/guide/sceneObject/Icon'
              ]
            },
            // 'design'
          ],
          '/api/': [
            {
              title: '基础',
              children: [
                '/api/sbm',
                '/api/model',
                '/api/poi',
                '/api/poiNode',
                '/api/Canvas3D',
                '/api/topology',
              ]
            },
            {
              title: '进阶',
              children: [
                '/api/modelTool',
                '/api/sceneTool',
                '/api/camera',
                '/api/light',
                '/api/helper',
              ]
            },
            {
              title: '高阶',
              children: [
                '/api/animation',
                '/api/pligin'
              ]
            }
          ],
          '/plugin/': [
            'vue-soonspace',
            'react-soonspace',
            'heat-map',
            'patrol-controls',
            'transform-controls',
            'first-person-controls',
            'follow-mouse',
            'soonmanager-sync',
          ],
          '/faq/': [
            '/faq/'
          ],
          '/design/': [
            'architectures'
          ]
        }
      }
    }
  },
  plugins: [
    // ['@vuepress/active-header-links', false],
    ['@vuepress/back-to-top'],
    ['vuepress-plugin-baidu-tongji-analytics', {
      key: 'c66a0e48f36b820887680904de6be840'
    }]
  ],
  enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js'),
}