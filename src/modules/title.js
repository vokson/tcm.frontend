export default {
    namespaced: true,

    state: {
        items: null
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

            context.dispatch('query/send', parameters, { root: true })
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