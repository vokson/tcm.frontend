let getText = function (language, code) {
    if (language == "RUS") {
        return getRusText(code);
    }

    if (language == "ENG") {
        return getEngText(code);
    }
}

let getRusText = function (code) {

    switch (code) {
        case 101:
            return {
                title: "Ошибка авторизации - 101",
                text: "Неверный логин/пароль",
                type: "error"
            }

        case 102:
            return {
                title: "Ошибка авторизации - 102",
                text: "Истек срок действия токена",
                type: "error"
            }

        case 103:
            return {
                title: "Ошибка авторизации - 103",
                text: "Неверный токен",
                type: "error"
            }

        case 104:
            return {
                title: "Ошибка авторизации - 104",
                text: "Недостаточно прав доступа",
                type: "error"
            }

        case 201:
            return {
                title: "Ошибка Администрирования - 201",
                text: "Неверное имя параметра настроек",
                type: "error"
            }

        case 202:
            return {
                title: "Ошибка Администрирования - 202",
                text: "Неверное значение параметра настроек",
                type: "error"
            }

        case 203:
            return {
                title: "Ошибка Администрирования - 203",
                text: "Значение settings не передано в запросе",
                type: "error"
            }

        case "E_AUTH_001":
            return {
                text: "Добро пожаловать !!!",
                type: "success"
            }

        case "E_AUTH_002":
            return {
                text: "Вы вышли из системы",
                type: "warn"
            }

        case "E_RESPONSE_001":
            return {
                title: "Ошибка обработчика ответов",
                text: "Неверное имя запроса",
                type: "error"
            }

        case "E_ADMIN_001":
            return {
                text: "Настройки сохранены",
                type: "success"
            }

        default:
            return {
                title: "Ошибка Уведомления",
                text: "Неверный текстовый код " + code,
                type: "error"
            }
    }

}

let getEngText = function (code) {

    switch (code) {
        case 101:
            return {
                title: "Authentication Error - 101",
                text: "Incorrect login/password",
                type: "error"
            }

        case 102:
            return {
                title: "Authentication Error - 102",
                text: "Token is expired",
                type: "error"
            }

        case 103:
            return {
                title: "Authentication Error - 103",
                text: "Invalid token",
                type: "error"
            }

        case 104:
            return {
                title: "Authentication Error - 104",
                text: "Permission denied",
                type: "error"
            }

        case 201:
            return {
                title: "Admin Error - 201",
                text: "Wrong parameter name in settings",
                type: "error"
            }

        case 202:
            return {
                title: "Admin Error - 202",
                text: "Wrong parameter value in settings",
                type: "error"
            }

        case 203:
            return {
                title: "Admin Error - 203",
                text: "Settigs are nmissed in request",
                type: "error"
            }

        case "E_AUTH_001":
            return {
                text: "You are successfully logged in",
                type: "success"
            }

        case "E_AUTH_002":
            return {
                text: "You are logged out. Good Bye !!!",
                type: "warn"
            }

        case "E_RESPONSE_001":
            return {
                title: "Response Error",
                text: "Wrong name of response function",
                type: "error"
            }

        case "E_ADMIN_001":
            return {
                text: "Setting have been saved",
                type: "success"
            }

        default:
            return {
                title: "Notification Error",
                text: "Wrong text code " + code,
                type: "error"
            }
    }

}

export default {
    namespaced: true,

    state: {
        show: false,
        title: '',
        text: '',
        type: ''
    },

    getters: {
        getLanguage (state, getters, rootState) {
            return rootState.language;
        }
    },

    mutations: {
        // showNotifyByCode(state, code, rootState) {
        //     state = Object.assign(getText(rootState.language, code), { show: true })
        // },

        setState (state, newState) {
            state.title = newState.title;
            state.text = newState.text;
            state.type = newState.type;
            state.show = newState.show;
        },

        showNotify (state, { title, text, type }) {
            state.title = title;
            state.text = text;
            state.type = type;
            state.show = true;
        },

        disableNotify (state) {
            state.show = false
        }
    },

    actions: {
        showNotifyByCode ({ commit, rootState }, code) {
            commit('setState', Object.assign(getText(rootState.language, code), { show: true }))
        },
    },
}