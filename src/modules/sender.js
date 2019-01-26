export default {
    namespaced: true,

    state: {
        items: null,
        // previousSearch: {},
        // isRecordForTitleToBeShown: false,
        // nameOfTitleToBeShown: ''
    },

    getters: {
        give: function (state) {
            return state.items;
        },

        // givePreviousSearch: function (state) {
        //     return state.previousSearch;
        // },

        // giveIsRecordForTitleToBeShown: function (state) {
        //     return state.isRecordForTitleToBeShown;
        // },

        // giveNameOfTitleToBeShown: function (state) {
        //     return state.nameOfTitleToBeShown;
        // }
    },

    mutations: {
        update: function (state, data) {
            state.items = data;
        },

        // setIsRecordForTitleToBeShown: function (state, status) {
        //     state.isRecordForTitleToBeShown = status;
        // },

        // setNameOfTitleToBeShown: function (state, value) {
        //     state.nameOfTitleToBeShown = value;
        // }
    },

    actions: {

        delete: (context, payload) => {

            let parameters = {
                queryName: "sender_folder_delete",
                data: {
                    id: payload.id
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        get: (context, payload) => {

            let parameters = {
                queryName: "sender_folder_get",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true });
        },

        add: (context, payload) => {

            let parameters = {
                queryName: "sender_folder_add",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true })
        },

    }

}