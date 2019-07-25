export default {
    namespaced: true,

    actions: {

        use: (context, payload) => {

            context.commit('setApiResponse', payload, { root: true });

            if (payload.success == 0) {
                context.dispatch('notify/showNotifyByCode', payload.error, { root: true })
            } else {

                switch (payload.queryName) {
                    case "auth_login":
                    case "auth_login_by_token":
                        context.dispatch("auth_login", payload);
                        break;
                    case "auth_change_password":
                        context.dispatch("auth_change_password", payload);
                        break;

                    case "auth_check_token":
                    case "role_check_guest":
                    case "role_check_engineer":
                    case "role_check_pm":
                    case "role_check_admin":
                        break;

                    case "service_database_update_attachment_status":
                        context.dispatch("service_database_update_attachment_status", payload);
                        break;

                    case "setting_get":
                        context.dispatch("setting_get", payload);
                        break;
                    case "setting_set":
                        context.dispatch("setting_set", payload);
                        break;

                    case "log_get":
                        context.dispatch("log_get", payload);
                        break;
                    case "log_set":
                        context.dispatch("log_set", payload);
                        break;
                    case "log_delete":
                        context.dispatch("log_delete", payload);
                        break;

                    case "title_get":
                        context.dispatch("title_get", payload);
                        break;
                    case "title_set":
                        context.dispatch("title_set", payload);
                        break;
                    case "title_delete":
                        context.dispatch("title_delete", payload);
                        break;

                    case "title_history_get":
                        context.dispatch("title_history_get", payload);
                        break;

                    case "user_get":
                        context.dispatch("user_get", payload);
                        break;
                    case "user_set":
                        context.dispatch("user_set", payload);
                        break;
                    case "user_set_default_password":
                        context.dispatch("user_set_default_password", payload);
                        break;
                    case "user_delete":
                        context.dispatch("user_delete", payload);
                        break;

                    case "status_get":
                        context.dispatch("status_get", payload);
                        break;
                    case "status_set":
                        context.dispatch("status_set", payload);
                        break;
                    case "status_add":
                        context.dispatch("status_add", payload);
                        break;
                    case "status_delete":
                        context.dispatch("status_delete", payload);
                        break;

                    case "log_file_get":
                        context.dispatch("log_file_get", payload);
                        break;

                    case "log_file_upload":
                        context.dispatch("log_file_upload", payload);
                        break;

                    case "log_file_delete":
                        context.dispatch("log_file_delete", payload);
                        break;

                    case "log_files_delete_files_without_articles":
                        context.dispatch("log_files_delete_files_without_articles", payload);
                        break;

                    case "log_new_message_switch":
                        context.dispatch("log_new_message_switch", payload);
                        break;

                    case "log_new_message_count":
                        context.dispatch("log_new_message_count", payload);
                        break;

                    case "log_get_last_articles":
                        context.dispatch("log_get_last_articles", payload);
                        break;

                    case "created_logs_chart_get":
                        context.dispatch("created_logs_chart_get", payload);
                        break;

                    case "created_titles_chart_get":
                        context.dispatch("created_titles_chart_get", payload);
                        break;



                    case "titles_status_chart_get":
                        context.dispatch("titles_status_chart_get", payload);
                        break;

                    case "tq_status_chart_get":
                        context.dispatch("tq_status_chart_get", payload);
                        break;

                    case "storage_chart_get":
                        context.dispatch("storage_chart_get", payload);
                        break;

                    case "checked_drawings_chart_get":
                        context.dispatch("checked_drawings_chart_get", payload);
                        break;

                    case "checker_get":
                        context.dispatch("checker_get", payload);
                        break;
                    case "checker_delete":
                        context.dispatch("checker_delete", payload);
                        break;

                    case "checker_rating_get":
                        context.dispatch("checker_rating_get", payload);
                        break;

                    case "checker_file_upload":
                        context.dispatch("checker_file_upload", payload);
                        break;

                    case "sender_folder_add":
                        context.dispatch("sender_folder_add", payload);
                        break;

                    case "sender_folder_get":
                        context.dispatch("sender_folder_get", payload);
                        break;

                    case "sender_folder_delete":
                        context.dispatch("sender_folder_delete", payload);
                        break;

                    case "sender_folder_count":
                        context.dispatch("sender_folder_count", payload);
                        break;

                    case "sender_folder_switch_ready":
                        context.dispatch("sender_folder_switch_ready", payload);
                        break;

                    case "sender_file_upload":
                        context.dispatch("sender_file_upload", payload);
                        break;

                    case "sender_file_get":
                        context.dispatch("sender_file_get", payload);
                        break;

                    case "sender_file_delete":
                        context.dispatch("sender_file_delete", payload);
                        break;

                    case "merge_pdf_file_upload":
                        context.dispatch("merge_pdf_file_upload", payload);
                        break;

                    case "merge_pdf_get":
                        context.dispatch("merge_pdf_get", payload);
                        break;

                    case "merge_pdf_clean":
                        context.dispatch("merge_pdf_clean", payload);
                        break;

                    case "merge_pdf_set_main_name":
                        context.dispatch("merge_pdf_set_main_name", payload);
                        break;

                    case "user_settings_get":
                        context.dispatch("user_settings_get", payload);
                        break;

                    case "user_settings_set":
                        context.dispatch("user_settings_set", payload);
                        break;

                    case "task_create":
                        context.dispatch("task_create", payload);
                        break;

                    case "docs_edit_get":
                        context.dispatch("docs_edit_get", payload);
                        break;

                    case "docs_edit_set":
                        context.dispatch("docs_edit_set", payload);
                        break;

                    case "docs_edit_add":
                        context.dispatch("docs_edit_add", payload);
                        break;

                    case "docs_edit_delete":
                        context.dispatch("docs_edit_add", payload);
                        break;

                    case "docs_edit_file_upload":
                        context.dispatch("docs_edit_file_upload", payload);
                        break;


                    default:
                        context.dispatch('notify/showNotifyByCode', "E_RESPONSE_001", { root: true })
                }
            }
        },

        auth_login: (context, payload) => {

            if (payload.success == 1) {
                context.commit('setUser', payload, { root: true });
                context.dispatch('notify/showNotifyByCode', "E_AUTH_001", { root: true })

            }

            if (payload.success == 0) {
                context.commit('setUser', {
                    access_token: "",
                    name: "",
                    surname: "",
                    role: "guest",
                    email: ""
                }, { root: true });
            }

        },

        auth_change_password: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_AUTH_003", { root: true })
                context.dispatch('auth/loginByToken', context.rootState.user.access_token, { root: true });
            }

        },

        service_database_update_attachment_status: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_DATABASE_001", { root: true })
            }

        },

        log_files_delete_files_without_articles: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_FILE_005", { root: true })
            }

        },

        setting_get: (context, payload) => {

            if (payload.success == 1) {
                context.commit('setting/update', payload.items, { root: true });
            }

        },

        setting_set: (context, payload) => {

            if (payload.success == 1) {
                //dfs1
                context.dispatch('notify/showNotifyByCode', "E_SETTING_001", { root: true })

            }

        },

        log_get: (context, payload) => {

            if (payload.success == 1) {
                context.commit('log/updateItems', payload.items, { root: true });
            }

        },

        log_set: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_LOG_001", { root: true })
                context.dispatch('log/getItems', context.rootGetters['log/givePreviousSearch'], { root: true });
            }

        },

        log_delete: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_LOG_002", { root: true })
                context.dispatch('log/getItems', context.rootGetters['log/givePreviousSearch'], { root: true });
            }

        },



        title_get: (context, payload) => {

            if (payload.success == 1) {
                context.commit('title/update', payload.items, { root: true });
            }

        },

        title_set: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_TITLE_001", { root: true })
                context.dispatch('title/get', context.rootGetters['title/givePreviousSearch'], { root: true });
            }

        },

        title_delete: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_TITLE_002", { root: true })
                context.dispatch('title/get', context.rootGetters['title/givePreviousSearch'], { root: true });
            }

        },

        title_history_get: (context, payload) => {

            if (payload.success == 1) {
                context.commit('title_history/update', payload.items, { root: true });
            }

        },

        user_get: (context, payload) => {

            if (payload.success == 1) {
                context.commit('users/update', payload.items, { root: true });
            }

        },

        user_set: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_USER_001", { root: true })
                context.dispatch('users/get', context.rootGetters['users/givePreviousSearch'], { root: true });
            }

        },

        user_set_default_password: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_USER_003", { root: true })
            }

        },

        user_delete: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_USER_002", { root: true })
                context.dispatch('users/get', context.rootGetters['users/givePreviousSearch'], { root: true });
            }

        },

        status_get: (context, payload) => {

            if (payload.success == 1) {
                context.commit('status/update', payload.items, { root: true });
            }

        },

        status_set: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_STATUS_001", { root: true })
            }

        },

        status_delete: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_STATUS_002", { root: true })
                context.dispatch('status/get', payload, { root: true });
            }

        },

        status_add: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_STATUS_003", { root: true })
                context.dispatch('status/get', payload, { root: true });
            }

        },

        log_file_get: (context, payload) => {

            if (payload.success == 1) {
                context.commit('log_file/update', payload.items, { root: true });
            }

        },

        log_file_delete: (context, payload) => {

            if (payload.success == 1) {

                context.dispatch('notify/showNotifyByCode', "E_FILE_002", { root: true });
                context.commit('log_file/deleteSuccess', payload.uin, { root: true });

            }

        },

        log_file_upload: (context, payload) => {

            if (payload.success == 1) {

                context.dispatch('notify/showNotifyByCode', "E_FILE_001", { root: true });
                context.commit('log_file/uploadSuccess', payload, { root: true });

            }

        },

        log_new_message_switch: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_LOG_001", { root: true })
                context.dispatch('log/getItems', context.rootGetters['log/givePreviousSearch'], { root: true });
            }

        },

        log_new_message_count: (context, payload) => {

            if (payload.success == 1) {
                context.commit('log/setCountOfNewMessages', payload.count, { root: true });
            }

        },

        log_get_last_articles: (context, payload) => {

            if (payload.success == 1) {
                context.commit('last_logs/update', payload.items, { root: true });
            }

        },

        created_logs_chart_get: (context, payload) => {

            if (payload.success == 1) {
                context.commit('chart_created_logs/updateCreatedLogs', payload.items, { root: true });
            }

        },

        created_titles_chart_get: (context, payload) => {

            if (payload.success == 1) {
                context.commit('chart_created_titles/updateCreatedTitles', payload.items, { root: true });
            }

        },

        titles_status_chart_get: (context, payload) => {

            if (payload.success == 1) {
                context.commit('chart_title_status/update', payload.items, { root: true });
            }

        },

        tq_status_chart_get: (context, payload) => {

            if (payload.success == 1) {
                context.commit('chart_tq_status/update', payload.items, { root: true });
            }

        },



        storage_chart_get: (context, payload) => {

            if (payload.success == 1) {
                context.commit('chart_file_storage/updateItems', payload.items, { root: true });
            }

        },

        checked_drawings_chart_get: (context, payload) => {

            if (payload.success == 1) {
                context.commit('chart_checked_drawings/update', payload.items, { root: true });
            }

        },

        checker_get: (context, payload) => {

            if (payload.success == 1) {
                context.commit('checker/updateItems', payload.items, { root: true });
            }

        },

        checker_delete: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_CHECK_002", { root: true })
                context.dispatch('checker/getItems', context.rootGetters['checker/givePreviousSearch'], { root: true });
            }

        },

        checker_rating_get: (context, payload) => {

            if (payload.success == 1) {
                context.commit('chart_checker_rating/update', payload.items, { root: true });
            }

        },

        checker_file_upload: (context, payload) => {

            if (payload.success == 1) {

                context.dispatch('notify/showNotifyByCode', "E_CHECK_001", { root: true });
                context.commit('checker_file/uploadSuccess', payload, { root: true });

            }

        },

        sender_folder_add: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_CHECK_001", { root: true });
                context.dispatch('sender/getFolder', {}, { root: true });
            }

        },

        sender_folder_get: (context, payload) => {

            if (payload.success == 1) {
                context.commit('sender/updateFolder', payload.items, { root: true });
            }

        },

        sender_folder_delete: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_CHECK_002", { root: true })
                context.dispatch('sender/getFolder', {}, { root: true });
            }

        },

        sender_folder_switch_ready: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_CHECK_001", { root: true })
                context.dispatch('sender/getFolder', {}, { root: true });
            }

        },

        sender_folder_count: (context, payload) => {

            if (payload.success == 1) {
                context.commit('sender/updateCountOfFolders', payload.count, { root: true });
            }

        },

        sender_file_upload: (context, payload) => {

            if (payload.success == 1) {

                context.dispatch('notify/showNotifyByCode', "E_CHECK_001", { root: true });
                context.commit('sender_file/uploadSuccess', payload, { root: true });
                context.dispatch('sender/getFile', context.rootGetters['sender/givePreviousFileSearch'], { root: true });
            }

        },

        sender_file_get: (context, payload) => {

            if (payload.success == 1) {
                context.commit('sender/updateFile', payload.items, { root: true });
            }

        },

        sender_file_delete: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_FILE_002", { root: true })
                context.dispatch('sender/getFile', context.rootGetters['sender/givePreviousFileSearch'], { root: true });
            }

        },

        merge_pdf_get: (context, payload) => {

            if (payload.success == 1) {
                context.commit('pdf_merge/updateItems', payload.items, { root: true });
            }

        },

        merge_pdf_clean: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('pdf_merge/getItems', {}, { root: true });
            }

        },

        merge_pdf_set_main_name: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('pdf_merge/getItems', {}, { root: true });
            }

        },

        merge_pdf_file_upload: (context, payload) => {

            if (payload.success == 1) {

                context.dispatch('notify/showNotifyByCode', "E_CHECK_001", { root: true });
                context.commit('pdf_merge_file/uploadSuccess', payload, { root: true });
                context.dispatch('pdf_merge/getItems', {}, { root: true });
            }

        },

        user_settings_get: (context, payload) => {

            if (payload.success == 1) {
                context.commit('user_settings/update', payload.items, { root: true });
            }

        },

        user_settings_set: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_SETTING_001", { root: true })
            }

        },

        task_create: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_LOG_004", { root: true })
                context.dispatch('log/getItems', context.rootGetters['log/givePreviousSearch'], { root: true });
            }

        },

        docs_edit_get: (context, payload) => {

            if (payload.success == 1) {
                context.commit('docs_edit/update', payload.items, { root: true });
            }

        },

        docs_edit_set: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_DOCS_001", { root: true })
                context.dispatch('docs_edit/get', context.rootGetters['docs_edit/givePreviousSearch'], { root: true });
            }

        },

        docs_edit_add: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_DOCS_002", { root: true })
                context.dispatch('docs_edit/get', context.rootGetters['docs_edit/givePreviousSearch'], { root: true });
            }

        },

        docs_edit_delete: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_DOCS_003", { root: true })
                context.dispatch('docs_edit/get', context.rootGetters['docs_edit/givePreviousSearch'], { root: true });
            }

        },

        docs_edit_file_upload: (context, payload) => {

            if (payload.success == 1) {

                context.dispatch('notify/showNotifyByCode', "E_DOCS_004", { root: true });
                context.commit('docs_edit_file/uploadSuccess', payload, { root: true });
                context.dispatch('docs_edit/get', context.rootGetters['docs_edit/givePreviousSearch'], { root: true });
            }

        },


    }

}