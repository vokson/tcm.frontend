export default {
    namespaced: true,

    state: {
        items: null,
        previousSearch: {},
        isProgress: false
    },



    getters: {
        give: function (state) {
            return state.items;
        },

        givePreviousSearch: function (state) {
            return state.previousSearch;
        },

        isProgress: function (state) {
            return state.isProgress;
        }

    },

    mutations: {
        update: function (state, data) {
            state.items = data;
            state.isProgress = false;
        },

    },

    actions: {

        get: (context, payload) => {

            let parameters = {
                queryName: "docs_search_get",
                data: payload,
            };

            context.state.previousSearch = payload;
            context.state.isProgress = true;
            context.dispatch('query/send', parameters, { root: true });
        },



    }

}