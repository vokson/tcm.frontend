export default {
    namespaced: true,

    state: {
        settings: null
    },

    getters: {
        giveSettings: function (state) {
            return state.settings;
        }
    },

    mutations: {
        updateSettings: function (state, data) {
            state.settings = data;
        },
    },

    actions: {

        getSettings: (context) => {

            let parameters = {
                queryName: "admin_settings_get",
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        setSettings: (context) => {

            let parameters = {
                queryName: "admin_settings_set",
                data: {
                    settings: context.state.settings
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

    }

}