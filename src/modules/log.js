export default {
    namespaced: true,

    state: {
        items: null
    },

    getters: {
        giveItems: function (state) {
            return state.items;
        },

        // userId: function ({ rootState }) {
        //     return rootState.user.id;
        // }
    },

    mutations: {
        updateItems: function (state, data) {
            state.items = data;
        },
    },

    actions: {

        getItems: (context, payload) => {

            let parameters = {
                queryName: "log_get",
                data: payload,
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

        deleteItem: (context, payload) => {

            let parameters = {
                queryName: "log_delete",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true })
        },

    }

}