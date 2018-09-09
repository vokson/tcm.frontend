export default {
    namespaced: true,

    state: {
        items: null,
        // previousSearch: {}
    },

    getters: {
        give: function (state) {
            return state.items;
        },

        // givePreviousSearch: function (state) {
        // return state.previousSearch;
        // }
    },

    mutations: {
        update: function (state, data) {

            data.map(function (e) {
                e.uploadedSize = e.size;
            });

            state.items = data;
        },
    },

    actions: {

        delete: (context, payload) => {

            let parameters = {
                queryName: "log_file_delete",
                data: {
                    id: payload.id
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        get: (context, payload) => {

            let parameters = {
                queryName: "log_file_get",
                data: {
                    id: payload.id
                },
            };

            // context.state.previousSearch = payload;
            context.dispatch('query/send', parameters, { root: true });
        },

        download: (context, payload) => {

            let parameters = {
                queryName: "log_file_download",
                data: {
                    id: payload.id
                },
            };

            // context.state.previousSearch = payload;
            context.dispatch('query/sendInOrderToGetFile', parameters, { root: true });
        },


        upload: (context, payload) => {

            let parameters = {
                queryName: "log_file_upload",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true })
        },

    }

}