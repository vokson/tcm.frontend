let guest = [
    '/home',
    '/login'
];

let engineer = [];

let pm = [];

let admin = [
    '/admin'
];

let permissions = {
    guest: guest,
    engineer: guest.concat(engineer),
    pm: guest.concat(engineer).concat(pm),
    admin: guest.concat(engineer).concat(pm).concat(admin)
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