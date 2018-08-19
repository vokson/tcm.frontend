export default {
    namespaced: true,

    state: {
        items: null
    },

    getters: {
        giveItems: function (state) {
            return state.items;
        }
    },

    mutations: {
        updateItems: function (state, data) {
            state.items = data;
        },
    },

    actions: {

        getItems: (context) => {

            let parameters = {
                queryName: "log_get",
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        setItem: (context, payload) => {

            let parameters = {
                queryName: "log_set",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true })
        },

    }

}