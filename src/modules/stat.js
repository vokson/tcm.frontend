export default {
    namespaced: true,

    state: {
        createdLogs: null
    },

    getters: {
        giveCreatedLogs: function (state) {
            return state.createdLogs;
        }
    },

    mutations: {
        updateCreatedLogs: function (state, data) {
            state.createdLogs = data;
        }
    },

    actions: {

        getCreatedLogs: (context, payload) => {

            let parameters = {
                queryName: "created_logs_chart_get",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true });
        }

    }

}