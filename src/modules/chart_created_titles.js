export default {
    namespaced: true,

    state: {
        createdTitles: null,
        createdTitlesCumulative: null,
        createdTitlesCount: 0
    },

    getters: {
        giveCreatedTitles: function (state) {
            return state.createdTitles;
        },

        giveCreatedTitlesCumulative: function (state) {
            return state.createdTitlesCumulative;
        },

        giveCreatedTitlesCount: function (state) {
            return state.createdTitlesCount;
        }
    },

    mutations: {
        updateCreatedTitles: function (state, data) {
            state.createdTitles = data;

            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            state.createdTitlesCount = data.values.reduce(reducer);

            // Создаем кумулятивный массив
            state.createdTitlesCumulative = {};
            state.createdTitlesCumulative.labels = data.labels;
            state.createdTitlesCumulative.values = [];
            data.values.reduce(function (a, b, i) {
                return state.createdTitlesCumulative.values[i] = a + b;
            }, 0);


        }
    },

    actions: {

        getCreatedTitles: (context, payload) => {

            let parameters = {
                queryName: "created_titles_chart_get",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true });
        }

    }

}