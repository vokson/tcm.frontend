export default {
    namespaced: true,

    state: {
        items: null
    },

    getters: {
        // givePositiveRating: function (state) {
        //     return (state.items === null) ? 0.0 : state.items.positiveRating;
        // },

        // giveNegativeRating: function (state) {
        //     return (state.items === null) ? 1.0 : state.items.negativeRating;
        // },

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
                queryName: "checker_rating_get",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true });
        }

    }

}