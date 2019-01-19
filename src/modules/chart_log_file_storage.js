export default {
    namespaced: true,

    state: {
        items: null,
        itemsCumulative: null,
        itemsCount: 0
    },

    getters: {
        giveItems: function (state) {
            return state.items;
        },

        giveItemsCumulative: function (state) {
            return state.itemsCumulative;
        },

        giveItemsCount: function (state) {
            return state.itemsCount;
        }
    },

    mutations: {
        updateItems: function (state, data) {
            state.items = data;

            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            state.itemsCount = data.values.reduce(reducer);

            // Создаем кумулятивный массив
            state.itemsCumulative = {};
            state.itemsCumulative.labels = data.labels;
            state.itemsCumulative.values = [];
            data.values.reduce(function (a, b, i) {
                return state.itemsCumulative.values[i] = a + b;
            }, 0);


        }
    },

    actions: {

        getItems: (context, payload) => {

            let parameters = {
                queryName: "created_titles_chart_get",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true });
        }

    }

}