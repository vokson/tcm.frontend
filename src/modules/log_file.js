export default {
    namespaced: true,

    state: {
        items: [],
        // uploadingItems: []
        // previousSearch: {}
    },

    getters: {
        give: function (state) {
            return state.items;
        },

        // giveUploadingItems: function (state) {
        //     return state.uploadingItems;
        // },

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

            // let uploadingItems = state.items.filter(function (e) {
            //     return (e.uploadedSize < e.size);
            // });


            // uploadingItems = uploadingItems.map(function (e1) {
            //     if (!data.find(function (e2) {
            //         if (e2.uin == e1.uin) {
            //             return true;
            //         }
            //     })) {
            //         return e1;
            //     }

            // });

            // console.log(uploadingItems);
            // // console.log(data);


            // state.items = uploadingItems;
            // state.items.concat(data);

            // // data.map(function (newElem) {

            // //     let isFound = false;

            // //     state.items = state.items.map(function (oldElem) {
            // //         if (newElem.uin == oldElem.uin) {
            // //             isFound = true;
            // //         }
            // //         return (newElem.uin == oldElem.uin) ? newElem : oldElem;
            // //     });

            // //     if (!isFound) {
            // //         state.items.push(newElem);
            // //     }
            // // });

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

        uploadSuccess: function (state, uin) {

            // TODO

        },

        // addUploadingItem: function (state, data) {

        //     state.uploadingItems.push({
        //         id: data.uin,
        //         name: data.name,
        //         size: data.size,
        //         uploadedSize: 0
        //     });

        // },

        // updateProgress: function (state, data) {

        //     this.uploadingFiles.map(function (item) {
        //         if (item.id == data.uin) {
        //             item.uploadedSize = data.size;
        //             item.size = data.size;
        //         }
        //     });

        // },


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
                    log_id: payload.log_id
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

            context.commit('add', {
                id: null,
                uin: payload.uin,
                original_name: payload.log_file.name,
                size: payload.log_file.size,
                uploadedSize: 0
            });

            let parameters = {
                queryName: "log_file_upload",
                data: payload,
            };

            context.dispatch('query/sendInOrderToUploadFile', parameters, { root: true })
        },

    }

}