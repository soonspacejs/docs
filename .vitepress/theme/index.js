import DefaultTheme from 'vitepress/theme';
import './styles/index.css';

import BaseDeprecated from './components/Base/Deprecated.vue';
import BaseRequireIcon from './components/Base/RequireIcon.vue';
import BaseTable from './components/Base/Table.vue';
import BaseTag from './components/Base/Tag.vue';
import DocsIframe from './components/Docs/Iframe.vue';
import DocsTable from './components/Docs/Table.vue';
import DocsTips from './components/Docs/Tips.vue';

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('BaseDeprecated', BaseDeprecated);
    app.component('BaseRequireIcon', BaseRequireIcon);
    app.component('BaseTable', BaseTable);
    app.component('BaseTag', BaseTag);
    app.component('DocsIframe', DocsIframe);
    app.component('DocsTable', DocsTable);
    app.component('DocsTips', DocsTips);
  },
};
