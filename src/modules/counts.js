export default {
    namespaced: true,

    state: {
        sender_folders: 0,
        new_messages: 0,
        non_checked_docs: 0
    },

    getters: {

        giveSenderFolders: function (state) {
            return state.sender_folders;
        },

        giveNewMessages: function (state) {
            return state.new_messages;
        },

        giveNonCheckedDocs: function (state) {
            return state.non_checked_docs;
        },

    },

    mutations: {
        update: function (state, data) {
            state.sender_folders = data.sender_folders;
            state.new_messages = data.new_messages;
            state.non_checked_docs = data.non_checked_docs;
        }
    },

    actions: {

        get: (context, payload) => {

            let parameters = {
                queryName: "counts_get",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true })
        }

    }

}