const path = require('path')

const BASE_HTTP_URL = 'http://www.xwbuilders.com'
const BASE_PORT = '9018'
const PACKAGE_NAME = 'soonspacejs'
const PRO_PATH = `${BASE_HTTP_URL}:${BASE_PORT}/${PACKAGE_NAME}`

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
          { text: '样例', link: `./examples/`, target:'_blank' },
          { text: '1.x', link: `${PRO_PATH}/Docs/1.x/` },
          {
            text: '了解更多',
            items: [
              {
                text: '开发指南',
                items: [
                  { text: 'FAQ', link: '/faq/' },
                  { text: '设计结构', link: '/design/' },
                  { text: '博客', link: 'http://www.soonspacejs.com:8800/blog/' },
                  { text: '报告 Bug', link: 'https://github.com/soonspacejs/bugs' },
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
            '',
            'start',
            'transfer',
            'types',
            'config',
            'event',
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
                '/guide/sceneObject/Icon'
              ]
            },
          ],
          '/api/': [
            {
              title: '基础',
              collapsable: false,
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
              collapsable: false,
              children: [
                '/api/controls',
                '/api/modelTool',
                '/api/sceneTool',
                '/api/camera',
                '/api/light',
                '/api/helper',
              ]
            },
            {
              title: '高阶',
              collapsable: false,
              children: [
                '/api/animation',
                '/api/pligin'
              ]
            }
          ],
          '/plugin/': [
            {
              title: '前端框架插件',
              collapsable: false,
              children: [
                '/plugin/vue-soonspace',
                '/plugin/react-soonspace'
              ]
            },
            {
              title: '平台协同插件',
              collapsable: false,
              children: [
                '/plugin/soonmanager-sync'
              ]
            },
            {
              title: '功能扩展插件',
              collapsable: false,
              children: [
                '/plugin/heat-map',
                '/plugin/patrol-controls',
                '/plugin/draw-topology',
                '/plugin/transform-controls',
                '/plugin/follow-mouse',
                '/plugin/first-person-controls',
                '/plugin/camera-follower',
                '/plugin/clipping-controls',
              ]
            },
          ],
          '/faq/': [
            '/faq/'
          ],
          '/design/': [
            '/design/'
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