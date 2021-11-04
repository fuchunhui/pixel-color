import {createApp, ComponentPublicInstance} from 'vue';
import App from '../src/App.vue';
import '../src/assets/css/base.less';
import '../src/assets/css/theme.less';

const load = (container: string | Element, domain: string): ComponentPublicInstance => {
  return createApp(App).mount(container);
};

export default {
  load
};
