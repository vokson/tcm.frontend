export default {
    namespaced: true,

    state: {
        items: null,
        itemsCumulative: null,
        itemsCount: 0,
        unit: 1048576 // Bytes to Mb
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

            // Переводим значения в требуемые единицы
            state.items.values = state.items.values.map(function (num) {
                return num / state.unit;
            });

            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            state.itemsCount = Math.round(data.values.reduce(reducer));

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
                queryName: "storage_chart_get",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true });
        }

    }

}