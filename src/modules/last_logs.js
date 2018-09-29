export default {
    namespaced: true,

    state: {
        items: null,
    },

    getters: {
        give: function (state) {
            return state.items;
        }
    },

    mutations: {
        update: function (state, data) {
            state.items = data;
        }
    },

    actions: {

        get: (context, payload) => {

            let parameters = {
                queryName: "log_get_last_articles",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true });
        },

    }

}