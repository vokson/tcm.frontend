export default {
    namespaced: true,

    state: {
        items: null,
        previousSearch: {}
    },

    getters: {
        give: function (state) {
            return state.items;
        },

        givePreviousSearch: function (state) {
            return state.previousSearch;
        }
    },

    mutations: {
        update: function (state, data) {
            state.items = data;
        },
    },

    actions: {

        del: (context, payload) => {

            let parameters = {
                queryName: "title_delete",
                data: {
                    id: payload.id
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        get: (context, payload) => {

            let parameters = {
                queryName: "title_get",
                data: payload,
            };

            context.state.previousSearch = payload;
            context.dispatch('query/send', parameters, { root: true });
        },

        set: (context, payload) => {

            let parameters = {
                queryName: "title_set",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true })
        },

    }

}