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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {

    store.commit('roles/path', {
      path: to.path,
      role: store.state.user.role
    });

    if (store.getters['roles/mayEnter'] == false) {

      store.dispatch('notify/showNotifyByCode', 104);

      next({ name: 'login' })

    } else {
      next()
    }
  } else {
    next() // всегда так или иначе нужно вызвать next()!
  }
})

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