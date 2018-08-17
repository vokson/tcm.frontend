let urls = {
    auth_login: "/auth/login",
    auth_login_by_token: "/auth/login/token",
    auth_check_token: "/auth/check_token",
    role_check_guest: "/test_guest",
    role_check_engineer: "/test_engineer",
    role_check_pm: "/test_pm",
    role_check_admin: "/test_admin",
    admin_settings_get: "/settings/get",
    admin_settings_set: "/settings/set",
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
            data.access_token = context.rootState.user.access_token;

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