export default {
    namespaced: true,

    state: {
        createdLogs: null,
        createdLogsCount: 0
    },

    getters: {
        giveCreatedLogs: function (state) {
            return state.createdLogs;
        },

        giveCreatedLogsCount: function (state) {
            return state.createdLogsCount;
        }
    },

    mutations: {
        updateCreatedLogs: function (state, data) {
            state.createdLogs = data;

            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            state.createdLogsCount = data.values.reduce(reducer);

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