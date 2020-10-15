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
    log_file_download_all: "/logs/file/download/all",
    log_file_delete: "/logs/file/delete",
    log_files_delete_files_without_articles: "/logs/clean/files/without/articles",

    log_new_message_switch: "/logs/new/message/switch",

    log_get_last_articles: "/logs/get/last/articles",

    title_get: "/titles/get",
    title_set: "/titles/set",
    title_delete: "/titles/delete",
    title_history_get: "/titles/history/get",

    user_get: "/users/get",
    user_set: "/users/set",
    user_set_default_password: "/users/set/default/password",
    user_delete: "/users/delete",

    action_get: "/action/get",
    action_set: "/action/set",

    status_get: "/statuses/get",
    status_set: "/statuses/set",
    status_add: "/statuses/add",
    status_delete: "/statuses/delete",

    created_logs_chart_get: "charts/logs/created/get",
    created_titles_chart_get: "charts/titles/created/get",
    titles_status_chart_get: "charts/titles/status/get",
    tq_status_chart_get: "charts/tq/status/get",
    storage_chart_get: "charts/storage/get",
    checked_drawings_chart_get: "charts/checked/drawings/get",

    checker_get: "/checker/get",
    checker_delete: "/checker/delete",

    checker_rating_get: "/checker/rating/get",

    checker_file_upload: "/checker/file/upload",
    checker_file_download: "/checker/file/download",
    checker_file_download_all: "/checker/file/download/all",

    sender_folder_add: "/sender/folder/add",
    sender_folder_get: "/sender/folder/get",
    sender_folder_delete: "/sender/folder/delete",
    sender_folder_switch_ready: "/sender/folder/switch/ready",

    sender_file_upload: "/sender/file/upload",
    sender_file_get: "/sender/file/get",
    sender_file_delete: "/sender/file/delete",
    sender_file_download: "/sender/file/download",
    sender_file_download_all: "/sender/file/download/all",

    merge_pdf_get: "/merge/pdf/get",
    merge_pdf_clean: "/merge/pdf/clean",
    merge_pdf_set_main_name: "/merge/pdf/set/main/name",

    merge_pdf_file_upload: "/merge/pdf/file/upload",
    merge_pdf_file_download: "/merge/pdf/file/download",

    user_settings_get: "/settings/user/get",
    user_settings_set: "/settings/user/set",

    task_create: "/task/create",

    docs_edit_get: "/docs/edit/get",
    docs_edit_set: "/docs/edit/set",
    docs_edit_add: "/docs/edit/add",
    docs_edit_delete: "/docs/edit/delete",
    docs_edit_file_upload: "/docs/edit/file/upload",
    docs_update_priority_indexes: "/docs/update/priority/indexes",

    docs_search_get: "/docs/search/get",

    counts_get: "/counts",
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
                data: data,
            })
                .then(responseFunction)
                .catch(function (error) {

                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                    console.log(error.config);

                    if (error.response.status === 404) {
                        context.dispatch('notify/showNotifyByCode', "E_SERVER_001", { root: true });
                    }

                    if (error.response.status === 500) {
                        context.dispatch('notify/showNotifyByCode', "E_SERVER_002", { root: true });
                    }
                });
        },

        sendInOrderToGetFile: (context, payload) => {

            let data = payload.data
            data.access_token = context.rootState.user.access_token;

            let responseFunction = function (response) {

                // Скачивание
                if (payload.isInline == true) {

                    var newBlob = new Blob([response.data], { type: "application/pdf" })
                    const url = window.URL.createObjectURL(newBlob);
                    window.open(url);
                    window.URL.revokeObjectURL(url);

                } else {
                    // Открытие PDF на новой вкладке

                    let filename = decodeURIComponent(response.headers['content-filename']);
                    window.$download(response.data, filename);

                    // Вызов дополнительной функции после завершения запроса
                    if (payload.afterDownloadAction != null) {
                        context.dispatch(payload.afterDownloadAction, {}, { root: true });
                    }

                }
            }

            let params_before = {
                url: urls[payload.queryName],
                data: data,
                method: 'post',
                headers: {
                    'Accept': '*/* ',
                },
                responseType: 'blob'
            };

            let params_after = (payload.isInline == true) ? Object.assign({}, params_before) : Object.assign({}, params_before, {onDownloadProgress: payload.progressCallback})

            window.$axios(params_after)
                .then(responseFunction)
                .catch(function (error) {
                    payload.badFileDownloadCallback();
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