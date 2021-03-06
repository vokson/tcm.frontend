export default {
    namespaced: true,

    state: {
        items: null,
        previousSearch: {},
    },

    getters: {
        give: function (state) {
            return state.items;
        },

        givePreviousSearch: function (state) {
            return state.previousSearch;
        },

    },

    mutations: {
        update: function (state, data) {
            state.items = data;
        },


    },

    actions: {

        get: (context, payload) => {

            let parameters = {
                queryName: "docs_edit_get",
                data: payload,
            };

            context.state.previousSearch = payload;
            context.dispatch('query/send', parameters, { root: true });
        },

        set: (context, payload) => {

            let parameters = {
                queryName: "docs_edit_set",
                data: payload
            };

            context.dispatch('query/send', parameters, { root: true });
        },

        add: (context, payload) => {

            let parameters = {
                queryName: "docs_edit_add",
                data: payload
            };

            context.dispatch('query/send', parameters, { root: true });
        },

        delete: (context, payload) => {

            let parameters = {
                queryName: "docs_edit_delete",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true })
        },

    }

}