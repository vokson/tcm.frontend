export default {
    namespaced: true,

    state: {
        items: [],
        isMergingInProgress: false
    },

    getters: {
        give: function (state) {
            return state.items;
        },

        giveIsMergingInProgress: function (state) {
            return state.isMergingInProgress;
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

        setIsMergingInProgress: function (state, data) {
            state.isMergingInProgress = data;
        }


    },

    actions: {

        afterDownloadAction: (context) => {
            context.commit('pdf_merge_file/setIsMergingInProgress', false, { root: true });
        },

        download: (context) => {

            let parameters = {
                queryName: "merge_pdf_file_download",
                data: {},
                afterDownloadAction: 'pdf_merge_file/afterDownloadAction'
            };

            context.dispatch('query/sendInOrderToGetFile', parameters, { root: true });
            context.commit('pdf_merge_file/setIsMergingInProgress', true, { root: true });
        },

        // downloadAll: (context, payload) => {

        //     let parameters = {
        //         queryName: "sender_file_download_all",
        //         data: {
        //             ids: payload.ids
        //         }
        //     };

        //     context.dispatch('query/sendInOrderToGetFile', parameters, { root: true });
        // },


        upload: (context, payload) => {

            context.commit('add', {
                id: null,
                uin: payload.uin,
                drop_uin: payload.drop_uin,
                original_name: payload.pdf_file.name,
                size: payload.pdf_file.size,
                uploadedSize: 0
            });

            let parameters = {
                queryName: "merge_pdf_file_upload",
                data: payload,
            };

            context.dispatch('query/sendInOrderToUploadFile', parameters, { root: true })
        },

    }

}