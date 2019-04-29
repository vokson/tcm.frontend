export default {
    namespaced: true,

    state: {
        items: null,
        previousSearch: {},
        countOfNewMessages: 0,
        isNewMessagesToBeShown: false,
        isRecordForTitleToBeShown: false,
        nameOfTitleToBeShown: ''
    },

    getters: {
        giveItems: function (state) {
            return state.items;
        },

        givePreviousSearch: function (state) {
            return state.previousSearch;
        },

        giveCountOfNewMessages: function (state) {
            return state.countOfNewMessages;
        },

        giveIsNewMessagesToBeShown: function (state) {
            return state.isNewMessagesToBeShown;
        },

        giveIsRecordForTitleToBeShown: function (state) {
            return state.isRecordForTitleToBeShown;
        },

        giveNameOfTitleToBeShown: function (state) {
            return state.nameOfTitleToBeShown;
        }
    },

    mutations: {
        updateItems: function (state, data) {

            data.forEach(element => {
                element.is_new = parseInt(element.is_new);
            });

            state.items = data;
        },

        setCountOfNewMessages: function (state, count) {
            state.countOfNewMessages = count;
        },

        setIsNewMessagesToBeShown: function (state, status) {
            state.isNewMessagesToBeShown = status;
        },

        setIsRecordForTitleToBeShown: function (state, status) {
            state.isRecordForTitleToBeShown = status;
        },

        setNameOfTitleToBeShown: function (state, value) {
            state.nameOfTitleToBeShown = value;
        }
    },

    actions: {

        getItems: (context, payload) => {

            if (
                (payload.to == "" || !payload.hasOwnProperty("to")) &&
                (payload.from == "" || !payload.hasOwnProperty("from")) &&
                (payload.what == "" || !payload.hasOwnProperty("what")) &&
                (payload.title == "" || !payload.hasOwnProperty("title")) &&
                (payload.date == "" || !payload.hasOwnProperty("date")) &&
                (payload.is_new == false || payload.is_new == null || !payload.hasOwnProperty("is_new"))
            ) {
                context.dispatch('notify/showNotifyByCode', "E_LOG_003", { root: true });
                return;
            }

            let parameters = {
                queryName: "log_get",
                data: payload,
            };

            context.state.previousSearch = payload;
            context.dispatch('query/send', parameters, { root: true });
        },

        setItem: (context, payload) => {

            let parameters = {
                queryName: "log_set",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        deleteItem: (context, payload) => {

            let parameters = {
                queryName: "log_delete",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        switchNewMessage: (context, payload) => {

            let parameters = {
                queryName: "log_new_message_switch",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        getCountOfNewMessages: (context, payload) => {

            let parameters = {
                queryName: "log_new_message_count",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true })
        },



    }

}