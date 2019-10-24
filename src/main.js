import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Ionic from '@ionic/vue';
import '@ionic/core/css/ionic.bundle.css';

import VuePusher from 'vue-pusher'

Vue.use(Ionic);
Vue.use(VuePusher, {
  api_key: '97e7b31d543104eaaa59',
  options: {
      cluster: 'ap3',
      encrypted: true,
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


