export default {
    namespaced: true,

    state: {
        items: null,
        properties: null,
        default_properties: {
            'FRONTEND_CODE_1_NAME_RU': 'КОД ДОКУМЕНТА 1',
            'FRONTEND_CODE_2_NAME_RU': 'КОД ДОКУМЕНТА 2',
            'FRONTEND_CODE_1_NAME_EN': 'DOC CODE 1',
            'FRONTEND_CODE_2_NAME_EN': 'DOC CODE 2',
        }
    },

    getters: {
        give: function (state) {
            return state.items;
        },

        give_property: (state) => (property_name) => {
            if (Array.isArray(state.items)) {
                return state.items.find(item => item.name === property_name).value
            }

            if (property_name in state.default_properties) {      
                return state.default_properties[property_name]
            }

            return ''
        },

    },

    mutations: {
        update: function (state, data) {
            if (Array.isArray(data)) {

                state.items = data;
                state.properties = {}

                if (Array.isArray(data)) {
                    state.items.forEach(function(item){
                        state.properties[item.name] = item.value
                    })
                }

            }
            
        },
    },

    actions: {

        get: (context) => {

            let parameters = {
                queryName: "setting_get",
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        set: (context) => {

            let parameters = {
                queryName: "setting_set",
                data: {
                    items: context.state.items
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

    }

}