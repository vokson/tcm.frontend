let urls = {
    auth_login: "/auth/login",
    auth_check_token: "/auth/check_token",
    role_check_guest: "/test_guest",
    role_check_engineer: "/test_engineer",
    role_check_pm: "/test_pm",
    role_check_admin: "/test_admin",
};

export default {
    namespaced: true,

    state: {
        name: ""
    },

    actions: {

        send: (context, payload) => {

            context.state.name = payload.queryName;

            let data = payload.data
            data.access_token = context.rootState.accessToken;

            window.$axios({
                url: urls[payload.queryName],
                data: data
            })
                .then(function (response) {
                    response.data.queryName = context.state.name;
                    context.dispatch('response/use', response.data, { root: true });
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

    }

}