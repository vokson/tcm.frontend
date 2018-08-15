let urls = {
    auth_login: "/auth/login",
    auth_check_token: "/auth/check_token"
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
            data.access_token = context.rootState.accessToken;

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