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
        add: (context) => {

            let parameters = {
                queryName: "status_add",
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        del: (context, payload) => {

            let parameters = {
                queryName: "status_delete",
                data: {
                    id: payload.id
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },


        get: (context) => {

            let parameters = {
                queryName: "status_get",
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        set: (context) => {

            let parameters = {
                queryName: "status_set",
                data: {
                    items: context.state.items
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

    }

}