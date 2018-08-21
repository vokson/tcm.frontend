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
    log_set: "/logs/set",
    log_get: "/logs/get",
    log_delete: "/logs/delete",
    title_get: "/titles/get",
    title_set: "/titles/set",
    title_delete: "/titles/delete",
    user_get: "/users/get",
    status_get: "/statuses/get",
    status_set: "/statuses/set",
    status_add: "/statuses/add",
    status_delete: "/statuses/delete",
};

export default {
    namespaced: true,

    state: {
        name: ""
    },

    actions: {

        send: (context, payload) => {

            // context.state.name = payload.queryName;

            let data = payload.data
            data.access_token = context.rootState.user.access_token;
            let query_name = payload.queryName

            let responseFunction = function (response) {
                // console.log(query_name);
                response.data.queryName = query_name;
                context.dispatch('response/use', response.data, { root: true });
            };

            // Пробрасываем имя запроса в response, чтобы точно знать от какой функции ответ
            responseFunction.bind(this);

            window.$axios({
                url: urls[payload.queryName],
                data: data
            })
                .then(responseFunction)
                .catch(function (error) {
                    console.log(error);
                });
        },

    }

}