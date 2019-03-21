export default {
    namespaced: true,

    state: {
        items: null,
    },

    getters: {
        giveItems: function (state) {
            return state.items;
        },

    },

    mutations: {
        updateItems: function (state, data) {
            state.items = data;
        },

    },

    actions: {

        getItems: (context, payload) => {

            let parameters = {
                queryName: "merge_pdf_get",
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true });
        },

        cleanItems: (context, payload) => {

            let parameters = {
                queryName: "merge_pdf_clean",
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true });
        },

        // deleteItem: (context, payload) => {

        //     let parameters = {
        //         queryName: "checker_delete",
        //         data: payload,
        //     };

        //     context.dispatch('query/send', parameters, { root: true })
        // },

    }

}