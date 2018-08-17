export default {
    namespaced: true,

    actions: {

        checkAccessToken: (context) => {

            let parameters = {
                queryName: "auth_check_token",
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        login: (context, payload) => {

            let parameters = {
                queryName: "auth_login",
                data: {
                    email: payload.email,
                    password: payload.password
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        logout: (context) => {
            context.commit('setAccessToken', "", { root: true });
            context.dispatch('notify/showNotifyByCode', "E_AUTH_002", { root: true })
        },

    }

}