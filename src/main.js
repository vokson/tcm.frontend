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



Vue.use(VueCookies);
Vue.use(Notifications)
Vue.use(VueTimers)

Vue.component("datepicker", Datepicker);
Vue.component("editor", VueEditor);


Vue.config.productionTip = false

router.beforeEach((to, from, next) => {

  });
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
    // baseURL: "http://api.agpp/api",
    baseURL: "http://tcm.api/api",
    method: 'post',

});

window.$sha256 = sha256
window.$download = fileDownload