export default {
    namespaced: true,

    actions: {

        use: (context, payload) => {

            context.commit('setApiResponse', payload, { root: true });

            if (payload.success == 0) {
                context.dispatch('notify/showNotifyByCode', payload.error, { root: true })
            }

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

                case "log_file_download":
                    context.dispatch("log_file_download", payload);
                    break;

                case "log_file_delete":
                    context.dispatch("log_file_delete", payload);
                    break;

                case "log_new_message_switch":
                    context.dispatch("log_new_message_switch", payload);
                    break;

                case "log_new_message_count":
                    context.dispatch("log_new_message_count", payload);
                    break;


                default:
                    context.dispatch('notify/showNotifyByCode', "E_RESPONSE_001", { root: true })
                // console.log("Wrong queryName " + payload.queryName);
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

                // context.dispatch('log_file/get', {
                //     log_id: payload.log_id
                // }, { root: true });

                context.commit('log_file/deleteSuccess', payload.uin, { root: true });

            }

        },

        log_file_upload: (context, payload) => {

            if (payload.success == 1) {

                context.dispatch('notify/showNotifyByCode', "E_FILE_001", { root: true });

                // context.dispatch('log_file/get', {
                //     log_id: payload.log_id
                // }, { root: true });

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



    }

}