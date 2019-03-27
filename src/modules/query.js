let urls = {
    auth_login: "/auth/login",
    auth_login_by_token: "/auth/login/token",
    auth_check_token: "/auth/check_token",
    auth_change_password: "/auth/change_password",

    service_database_backup: "/service/database/backup",
    service_database_update_attachment_status: "/service/database/update/attachments",

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
    log_new_message_count: "/logs/new/message/count",

    log_get_last_articles: "/logs/get/last/articles",

    title_get: "/titles/get",
    title_set: "/titles/set",
    title_delete: "/titles/delete",
    title_history_get: "/titles/history/get",

    user_get: "/users/get",
    user_set: "/users/set",
    user_set_default_password: "/users/set/default/password",
    user_delete: "/users/delete",

    status_get: "/statuses/get",
    status_set: "/statuses/set",
    status_add: "/statuses/add",
    status_delete: "/statuses/delete",

    created_logs_chart_get: "charts/logs/created/get",
    created_titles_chart_get: "charts/titles/created/get",
    titles_status_chart_get: "charts/titles/status/get",
    tq_status_chart_get: "charts/tq/status/get",
    storage_chart_get: "charts/storage/get",

    checker_get: "/checker/get",
    checker_delete: "/checker/delete",

    checker_file_upload: "/checker/file/upload",
    checker_file_download: "/checker/file/download",
    checker_file_download_all: "/checker/file/download/all",

    sender_folder_add: "/sender/folder/add",
    sender_folder_get: "/sender/folder/get",
    sender_folder_delete: "/sender/folder/delete",
    sender_folder_count: "/sender/folder/count",
    sender_folder_switch_ready: "/sender/folder/switch/ready",

    sender_file_upload: "/sender/file/upload",
    sender_file_get: "/sender/file/get",
    sender_file_delete: "/sender/file/delete",
    sender_file_download: "/sender/file/download",
    sender_file_download_all: "/sender/file/download/all",

    merge_pdf_get: "/merge/pdf/get",
    merge_pdf_clean: "/merge/pdf/clean",

    merge_pdf_file_upload: "/merge/pdf/file/upload",
    merge_pdf_file_download: "/merge/pdf/file/download",
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

                // Вызов дополнительной функции после завершения запроса
                if (payload.afterDownloadAction != null) {
                    context.dispatch(payload.afterDownloadAction, {}, { root: true });
                }
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
                    context.dispatch('notify/showNotifyByCode', 601, { root: true })
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