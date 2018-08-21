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

                case "auth_check_token":
                case "role_check_guest":
                case "role_check_engineer":
                case "role_check_pm":
                case "role_check_admin":
                    break;

                case "admin_settings_get":
                    context.dispatch("admin_settings_get", payload);
                    break;
                case "admin_settings_set":
                    context.dispatch("admin_settings_set", payload);
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

                case "user_get":
                    context.dispatch("user_get", payload);
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


                default:
                    context.dispatch('notify/showNotifyByCode', "E_RESPONSE_001", { root: true })
                // console.log("Wrong queryName " + payload.queryName);
            }
        },

        auth_login: (context, payload) => {

            if (payload.success == 1) {
                context.commit('setUser', payload, { root: true });
                // context.commit('users/setUserId', payload.id, { root: true });
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

        admin_settings_get: (context, payload) => {

            if (payload.success == 1) {
                context.commit('admin/updateSettings', payload.settings, { root: true });
            }

        },

        admin_settings_set: (context, payload) => {

            if (payload.success == 1) {
                //dfs
                context.dispatch('notify/showNotifyByCode', "E_ADMIN_001", { root: true })

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
            }

        },

        log_delete: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_LOG_002", { root: true })
            }

        },

        title_get: (context, payload) => {

            if (payload.success == 1) {
                context.commit('title/update', payload.items, { root: true });
            }

        },

        user_get: (context, payload) => {

            if (payload.success == 1) {
                context.commit('users/update', payload.items, { root: true });
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



    }

}