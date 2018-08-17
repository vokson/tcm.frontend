import Vue from 'vue'
// import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import Notifications from 'vue-notification'
import axios from 'axios'
import sha256 from 'sha256'
// import VueAxios from 'vue-axios'

// Vue.use(Vuex)
Vue.use(VueCookies);
// Vue.use(VueAxios, axios)
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