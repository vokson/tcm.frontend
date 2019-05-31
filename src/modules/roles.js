let guest = [
    '/login',
];

let engineer = [
    '/',
    '/home',
    '/log',
    '/title',
    '/news',
    '/stat',
    '/stat/chart/log',
    '/stat/chart/title',
    '/stat/chart/title/status',
    '/stat/chart/tq',
    '/stat/chart/checked/drawings',
    '/stat/chart/checker/rating',
    '/checker',
    '/stat/chart/storage',
    '/sender',
    '/pdf_merge'

];

let group_leader = [];

let pm = [];

let admin = [
    '/admin',
    '/admin/status',
    '/admin/setting',
    '/admin/user',
];

let permissions = {
    guest: guest,
    engineer: guest.concat(engineer),
    group_leader: guest.concat(engineer).concat(group_leader),
    pm: guest.concat(engineer).concat(group_leader).concat(pm),
    admin: guest.concat(engineer).concat(group_leader).concat(pm).concat(admin)
}


export default {
    namespaced: true,

    state: {
        isOk: false
    },

    getters: {
        mayEnter: function (state) {
            return state.isOk;
        }
    },

    mutations: {
        path: function (state, payload) {
            // console.log(payload);
            state.isOk = false;

            if (permissions.hasOwnProperty(payload.role)) {
                let urls = permissions[payload.role];

                if (urls.includes(payload.path) === true) {
                    state.isOk = true;
                }

            }


        }
    }

}