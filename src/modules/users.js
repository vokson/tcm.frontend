export default {
    namespaced: true,

    state: {
        items: null,
        userId: null
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

        get: (context, payload) => {

            let parameters = {
                queryName: "user_get",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true })
        },


        set: (context, payload) => {

            let parameters = {
                queryName: "user_set",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        del: (context, payload) => {

            let parameters = {
                queryName: "user_delete",
                data: {
                    id: payload.id
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

    }

}