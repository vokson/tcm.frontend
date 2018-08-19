export default {
    namespaced: true,

    state: {
        items: null
    },

    getters: {
        give: function (state) {
            return state.items;
        }
    },

    mutations: {
        update: function (state, data) {
            state.items = data;
        },
    },

    actions: {

        get: (context) => {

            let parameters = {
                queryName: "user_get",
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true })
        },

    }

}