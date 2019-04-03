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
import TitleStatusChart from './views/TitleStatusChart.vue'
import FileStorageChart from './views/FileStorageChart.vue'
import TqStatisticChart from './views/TqStatisticChart.vue'
import Checker from './views/Checker.vue'
import Sender from './views/Sender.vue'
import MergePdf from './views/MergePdf.vue'


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
            path: '/checker',
            name: 'checker',
            component: Checker
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

        {
            path: '/stat/chart/title/status',
            name: 'chart_title_status',
            component: TitleStatusChart
        },

        {
            path: '/stat/chart/tq',
            name: 'chart_tq',
            component: TqStatisticChart
        },


        {
            path: '/stat/chart/storage',
            name: 'chart_file_storage',
            component: FileStorageChart
        },

        {
            path: '/sender',
            name: 'sender',
            component: Sender
        },

        {
            path: '/pdf_merge',
            name: 'pdf_merge',
            component: MergePdf
        },


    ]
})
