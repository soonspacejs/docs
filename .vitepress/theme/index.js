import DefaultTheme from 'vitepress/theme';
import './styles/index.css';

const modules = import.meta.glob('../components/**/*.vue');

console.log(modules)

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // register your custom global components
    // app.component('MyGlobalComponent' /* ... */);
  },
};
