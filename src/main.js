import '@babel/polyfill'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import Notifications from 'vue-notification'
import Datepicker from 'vuejs-datepicker';
import { VueEditor } from 'vue2-editor';
import axios from 'axios'
import sha256 from 'sha256'
import fileDownload from 'js-file-download'
import VueTimers from 'vue-timers'
import VueCharts from 'vue-chartjs'



Vue.use(VueCookies);
Vue.use(Notifications);
Vue.use(VueTimers);
Vue.use(VueCharts);

Vue.component("datepicker", Datepicker);
Vue.component("editor", VueEditor);


Vue.config.productionTip = false;
// Vue.config.devtools = true;

router.beforeEach((to, from, next) => {

    store.commit('roles/path', {
        path: to.path,
        role: (store.state.user.role == undefined) ? 'guest' : store.state.user.role
    });

    if (store.getters['roles/mayEnter'] == false) {

        store.dispatch('notify/showNotifyByCode', 104);
        next({ name: 'login' })

    } else {
        next();
    }
})

window.$app = new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');



window.$axios = axios.create({
    // baseURL: "http://api.vlg/api",
    baseURL: "http://tcm.api/api",
    method: 'post',

});

window.$sha256 = sha256
window.$download = fileDownload

window.$guid = function () {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  }
  
  window.$formatBytes =  function(bytes, decimals) {
    if (bytes == 0) return "0 Bytes";
    var k = 1024,
      dm = decimals || 2,
      sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }