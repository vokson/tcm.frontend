export default {
    namespaced: true,

    state: {
        items: null
    },

    getters: {
        // give: function (state, nameOfSetting) {
        //     if (state.items === null) {
        //         return null;
        //     }

        //     return (state.items[nameOfSetting] === null) ? null : state.items[nameOfSetting];
        // }
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
                queryName: "user_settings_get",
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        // switch: (context, payload) => {

        //     let parameters = {
        //         queryName: "user_settings_switch",
        //         data: {
        //             name: payload.name,
        //             value: payload.value
        //         },
        //     };

        //     context.dispatch('query/send', parameters, { root: true })
        // },

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