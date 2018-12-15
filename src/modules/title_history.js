export default {
    namespaced: true,

    state: {
        items: null,
        previousSearch: {}
    },

    getters: {
        give: function (state) {
            return state.items;
        }

    },

    mutations: {
        update: function (state, data) {
            state.items = data;
        },

        clear: function (state, data) {
            state.items = null;
        },
    },

    actions: {

        get: (context, payload) => {

            let parameters = {
                queryName: "title_history_get",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true });
        },

    }

}