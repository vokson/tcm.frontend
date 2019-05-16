export default {
    namespaced: true,

    state: {
        items: null
    },

    getters: {
        give: function (state) {
            return state.items;
        },

    },

    mutations: {
        update: function (state, data) {
            state.items = data;
        }
    },

    actions: {

        get: (context, payload) => {

            let parameters = {
                queryName: "checked_drawings_chart_get",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true });
        }

    }

}