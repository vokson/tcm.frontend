export default {
    namespaced: true,

    state: {
        items: null
    },

    getters: {
        give: function (state, nameOfSetting) {
            return (state.items[nameOfSetting] === null) ? null : state.items.[nameOfSetting];
        }
    },

    mutations: {
        update: function (state, data) {
            state.items = data;
        },
    },

    actions: {

        get: (context, payload) => {

            let parameters = {
                queryName: "user_settings_get",
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        switch: (context, payload) => {

            let parameters = {
                queryName: "user_settings_switch",
                data: {
                    name: payload.name,
                    value: payload.value
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

    }

}