import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuetify from 'vuetify';

import zhHans from 'vuetify/lib/locale/zh-Hans';
import 'vuetify/dist/vuetify.min.css'; // 引入Vuetify样式
import '@mdi/font/css/materialdesignicons.css'; // 引入 MDI 字体
import './assets/styles/global.scss';

Vue.config.productionTip = false;

Vue.use(Vuetify);
const vuetify = new Vuetify({
  theme: { dark: false },
  lang: {
    locales: { zhHans },
    current: 'zhHans',
  },
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
