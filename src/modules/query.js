let urls = {
    auth_login: "/auth/login",
    auth_login_by_token: "/auth/login/token",
    auth_check_token: "/auth/check_token",
    auth_change_password: "/auth/change_password",

    service_database_backup: "/service/database/backup",

    setting_get: "/settings/get",
    setting_set: "/settings/set",

    log_set: "/logs/set",
    log_get: "/logs/get",
    log_delete: "/logs/delete",

    log_file_get: "/logs/file/get",
    log_file_upload: "/logs/file/upload",
    log_file_download: "/logs/file/download",
    log_file_delete: "/logs/file/delete",

    title_get: "/titles/get",
    title_set: "/titles/set",
    title_delete: "/titles/delete",

    user_get: "/users/get",
    user_set: "/users/set",
    user_set_default_password: "/users/set/default/password",
    user_delete: "/users/delete",

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

        sendInOrderToGetFile: (context, payload) => {

            let data = payload.data
            data.access_token = context.rootState.user.access_token;

            let responseFunction = function (response) {

                let filename = decodeURIComponent(response.headers['content-filename']);
                window.$download(response.data, filename);
            };

            window.$axios({
                url: urls[payload.queryName],
                data: data,
                headers: {
                    'Accept': '*/* ',
                },
                responseType: 'blob'
            })
                .then(responseFunction)
                .catch(function (error) {
                    console.log(error);
                });
        },

        sendInOrderToUploadFile: (context, payload) => {

            let query_name = payload.queryName;

            let responseFunction = function (response) {

                // Если загрузка файла не удалась, надо что-то делать..
                if (response.data.success == 0) {
                    payload.data.badFileUploadCallback();
                }

                // console.log(query_name);
                response.data.queryName = query_name;
                context.dispatch('response/use', response.data, { root: true });
            };

            // Пробрасываем имя запроса в response, чтобы точно знать от какой функции ответ
            responseFunction.bind(this);

            let data = payload.data

            let formData = new FormData();
            Object.keys(payload.data).map(function (key) {
                formData.append(key, data[key]);
            });

            formData.append('access_token', context.rootState.user.access_token);

            window.$axios({
                url: urls[payload.queryName],
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },

                onUploadProgress: payload.data.progressCallback,
            })
                .then(responseFunction)
                .catch(function (error) {
                    console.log(error);
                });


        },

    }

}