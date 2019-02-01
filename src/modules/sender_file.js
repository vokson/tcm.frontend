export default {
    namespaced: true,

    state: {
        items: []
    },

    getters: {
        give: function (state) {
            return state.items;
        }
    },

    mutations: {
        update: function (state, data) {

            data.map(function (e) {
                e.uploadedSize = e.size;
            });

            state.items = data;

        },

        add: function (state, newItem) {
            state.items.push(newItem);
        },

        deleteSuccess: function (state, uin) {
            state.items.map(function (elem, i) {
                if (elem.uin == uin) {
                    state.items.splice(i, 1);
                }
            });
        },

        uploadSuccess: function (state, data) {

            for (let i = 0; i < state.items.length; i++) {

                if (state.items[i].uin == data.uin) {
                    state.items[i].id = data.id;
                    break;
                }
            }

        },


        updateProgress: function (state, data) {

            for (let i = 0; i < state.items.length; i++) {

                if (state.items[i].uin == data.uin) {
                    state.items[i].size = data.size;
                    state.items[i].uploadedSize = data.uploadedSize;
                    break;
                }
            }

        },

        clean: function (state) {
            state.items = [];
        },


    },

    actions: {

        download: (context, payload) => {

            let parameters = {
                queryName: "sender_file_download",
                data: {
                    id: payload.id
                },
            };

            context.dispatch('query/sendInOrderToGetFile', parameters, { root: true });
        },

        downloadAll: (context, payload) => {

            let parameters = {
                queryName: "sender_file_download_all",
                data: {
                    ids: payload.ids
                }
            };

            context.dispatch('query/sendInOrderToGetFile', parameters, { root: true });
        },


        upload: (context, payload) => {

            context.commit('add', {
                id: null,
                uin: payload.uin,
                original_name: payload.log_file.name,
                size: payload.log_file.size,
                uploadedSize: 0
            });

            let parameters = {
                queryName: "sender_file_upload",
                data: payload,
            };

            context.dispatch('query/sendInOrderToUploadFile', parameters, { root: true })
        },

    }

}