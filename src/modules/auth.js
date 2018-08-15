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

            // window.$axios({
            //     url: "/auth/login",
            //     data: {
            //         email: payload.email,
            //         password: payload.password
            //     }
            // })
            //     .then(function (response) {
            //         context.commit('setApiResponse', response.data, { root: true });
            //         if (response.data.success == 1) {
            //             context.commit('setAccessToken', response.data.access_token, { root: true });
            //         }
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });
        },

        logout: ({ commit }) => {
            commit('setAccessToken', "", { root: true });
        },

    }

}