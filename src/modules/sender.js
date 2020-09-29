export default {
    namespaced: true,

    state: {
        folders: null,
        files: null,
        previousFileSearch: {}
    },

    getters: {
        giveFolder: function (state) {
            return state.folders;
        },

        giveFile: function (state) {
            return state.files;
        },

        givePreviousFileSearch: function (state) {
            return state.previousFileSearch;
        },


    },

    mutations: {
        updateFolder: function (state, data) {
            state.folders = data;
        },

        updateFile: function (state, data) {
            state.files = data;
        },

        clean: function (state) {
            state.files = [];
            state.folders = [];
        },
    },

    actions: {

        deleteFolder: (context, payload) => {

            let parameters = {
                queryName: "sender_folder_delete",
                data: {
                    id: payload.id
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        switchFolder: (context, payload) => {

            let parameters = {
                queryName: "sender_folder_switch_ready",
                data: {
                    id: payload.id
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        getFolder: (context, payload) => {

            let parameters = {
                queryName: "sender_folder_get",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true });
        },

        addFolder: (context, payload) => {

            let parameters = {
                queryName: "sender_folder_add",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        getFile: (context, payload) => {

            let parameters = {
                queryName: "sender_file_get",
                data: payload,
            };

            context.state.previousFileSearch = payload;

            context.dispatch('query/send', parameters, { root: true });
        },

        deleteFile: (context, payload) => {

            let parameters = {
                queryName: "sender_file_delete",
                data: {
                    id: payload.id
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

    }

}