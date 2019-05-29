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
            // Замена 0, 1 на true, false
            // иначе Checkbox в Home не работает
            state.items = data.map(function (item) {
                if (item.is_switchable == 1) {
                    item.value = (item.value == 1) ? true : false;
                }
                return item;
            });
        },
    },

    actions: {

        get: (context) => {

            let parameters = {
                queryName: "user_settings_get",
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        set: (context) => {

            let parameters = {
                queryName: "user_settings_set",
                data: {
                    items: context.state.items
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

    }

}