import '@babel/polyfill'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import Notifications from 'vue-notification'
import axios from 'axios'
import sha256 from 'sha256'

Vue.use(VueCookies);
Vue.use(Notifications)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');

window.$axios = axios.create({
  baseURL: "http://tcm.api/api",
  method: 'post'
});

window.$sha256 = sha256