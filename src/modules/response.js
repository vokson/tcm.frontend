export default {
    namespaced: true,

    actions: {

        use: (context, payload) => {

            context.commit('setApiResponse', payload, { root: true });

            switch (payload.queryName) {
                case "auth_login":
                    context.dispatch("auth_login", payload);
                    break;
                case "auth_check_token":
                    break;
                default:
                    console.log("Wrong queryName " + payload.queryName);
            }
        },

        auth_login: (context, payload) => {

            if (payload.success == 1) {
                context.commit('setAccessToken', payload.access_token, { root: true });
            }

        },


    }

}