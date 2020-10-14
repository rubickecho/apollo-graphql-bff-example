import Vue from 'vue'
import App from './App.vue'
import { createProvider } from './vue-apollo'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false

Vue.use(Antd);

new Vue({
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
