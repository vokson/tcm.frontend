import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Admin from './views/Admin.vue'
import Log from './views/Log.vue'
import Status from './views/Status.vue'
import Title from './views/Title.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },

    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },

    {
      path: '/admin',
      name: 'admin',
      component: Admin,
    },

    {
      path: '/admin/status',
      name: 'status',
      component: Status,
    },

    {
      path: '/log',
      name: 'log',
      component: Log
    },

    {
      path: '/title',
      name: 'title',
      component: Title
    },


  ]
})
