export default {
    namespaced: true,

    state: {
        items: null,
        previousSearch: {
            to: "",
            from: "",
            date: "",
            title: "",
            what: ""
        }
    },

    getters: {
        giveItems: function (state) {
            return state.items;
        },

        givePreviousSearch: function (state) {
            return state.previousSearch;
        }
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


            context.dispatch('query/send', parameters, { root: true });
            context.state.previousSearch = payload;
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