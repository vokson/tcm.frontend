import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Admin from './views/Admin.vue'
import Log from './views/Log.vue'
import Status from './views/Status.vue'
import Setting from './views/Setting.vue'
import Title from './views/Title.vue'
import User from './views/User.vue'
import LastLog from './views/LastLog.vue'
import Statistic from './views/Statistic.vue'
import LogsChart from './views/LogsChart.vue'
import TitlesChart from './views/TitlesChart.vue'


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
            path: '/admin/setting',
            name: 'setting',
            component: Setting,
        },

        {
            path: '/admin/user',
            name: 'user',
            component: User,
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

        {
            path: '/news',
            name: 'news',
            component: LastLog
        },

        {
            path: '/stat',
            name: 'stat',
            component: Statistic
        },

        {
            path: '/stat/chart/log',
            name: 'chart_created_logs',
            component: LogsChart
        },

        {
            path: '/stat/chart/title',
            name: 'chart_created_titles',
            component: TitlesChart
        },


    ]
})
