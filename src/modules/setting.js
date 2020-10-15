export default {
    namespaced: true,

    state: {
        items: null,
        properties: null,
        default_properties: {
            'DOCS_REV_LIST': '',

            'FRONTEND_CODE_1_NAME_RU': 'КОД ДОКУМЕНТА 1',
            'FRONTEND_CODE_2_NAME_RU': 'КОД ДОКУМЕНТА 2',
            'FRONTEND_CODE_1_NAME_EN': 'DOC CODE 1',
            'FRONTEND_CODE_2_NAME_EN': 'DOC CODE 2',
            'FRONTEND_DOCS_JSON_MAX_FILE_SIZE_MB': '1',
            'FRONTEND_RECORDS_MAX_FILE_SIZE_MB': '1000',
            'FRONTEND_CHECKER_MAX_FILE_SIZE_MB': '50',
            'FRONTEND_SENDER_MAX_FILE_SIZE_MB': '1000',
            'FRONTEND_MERGE_PDF_MAX_FILE_SIZE_MB': '100',
            'FRONTEND_DOCS_CODE_1_JS_REG_EXP': '.*',
            'FRONTEND_DOCS_CODE_2_JS_REG_EXP': '.*',
            
            'FRONTEND_DOCS_CLASS_JS_REG_EXP': '.*',
            'FRONTEND_RECORDS_ADD_WORDS_TO_TEXT_IN_JSON': '["Здесь должны","быть слова","которые можно добавить"]',
            'FRONTEND_TITLES_FIELD_1_NAME_RU': 'Поле 1',
            'FRONTEND_TITLES_FIELD_1_NAME_EN': 'Field 1',
            'FRONTEND_TITLES_FIELD_2_NAME_RU': 'Поле 2',
            'FRONTEND_TITLES_FIELD_2_NAME_EN': 'Field 2',
            'FRONTEND_TITLES_FIELD_3_NAME_RU': 'Поле 3',
            'FRONTEND_TITLES_FIELD_3_NAME_EN': 'Field 3',
            'FRONTEND_CHARTS_TITLES_PHP_REG_EXP_IN_JSON': '[]',
            'FRONTEND_PROJECT_NAME_RU': 'Имя проекта',
            'FRONTEND_PROJECT_NAME_EN': 'Name of project'
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
                queryName: 'setting_get',
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        set: (context) => {

            let parameters = {
                queryName: 'setting_set',
                data: {
                    items: context.state.items
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

    }

}