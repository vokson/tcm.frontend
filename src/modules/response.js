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
                    context.dispatch("auth_login", payload);
                    break;

                case "auth_check_token":
                case "role_check_guest":
                case "role_check_engineer":
                case "role_check_pm":
                case "role_check_admin":
                    break;

                default:
                    context.dispatch('notify/showNotifyByCode', "E_RESPONSE_001", { root: true })
                    console.log("Wrong queryName " + payload.queryName);
            }
        },

        auth_login: (context, payload) => {

            if (payload.success == 1) {
                context.commit('setAccessToken', payload.access_token, { root: true });
                context.dispatch('notify/showNotifyByCode', "E_AUTH_001", { root: true })
            }

            if (payload.success == 0) {
                context.commit('setAccessToken', "", { root: true });
            }

        },


    }

}