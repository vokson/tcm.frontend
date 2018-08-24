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

        case 105:
            return {
                title: "Ошибка авторизации - 105",
                text: "Некорректный новый пароль",
                type: "error"
            }

        case 201:
            return {
                title: "Ошибка Администрирования - 201",
                text: "Неверное имя параметра name в запросе",
                type: "error"
            }

        case 202:
            return {
                title: "Ошибка Администрирования - 202",
                text: "Неверное значение параметра value в запросе",
                type: "error"
            }

        case 203:
            return {
                title: "Ошибка Администрирования - 203",
                text: "Значение settings не передано в запросе",
                type: "error"
            }

        case 204:
            return {
                title: "Ошибка Администрирования - 204",
                text: "Значение items не передано в запросе",
                type: "error"
            }

        case 205:
            return {
                title: "Ошибка Администрирования - 205",
                text: "Неверное значение параметра id в запросе",
                type: "error"
            }

        case 206:
            return {
                title: "Ошибка Базы Данных - 206",
                text: "Попытка удаления связанного объекта. Нарушение целостности базы данных",
                type: "error"
            }

        case 301:
            return {
                title: "Ошибка Журнала Событий - 301",
                text: "Ошибка в поле \"Кому\"",
                type: "error"
            }

        case 302:
            return {
                title: "Ошибка Журнала Событий - 302",
                text: "Ошибка в поле \"От\"",
                type: "error"
            }

        case 303:
            return {
                title: "Ошибка Журнала Событий - 303",
                text: "Ошибка в поле \"Титул\"",
                type: "error"
            }

        case 304:
            return {
                title: "Ошибка Журнала Событий - 304",
                text: "Ошибка в поле \"Текст\"",
                type: "error"
            }

        case 305:
            return {
                title: "Ошибка Журнала Событий - 305",
                text: "Ошибка в поле \"Номер записи\"",
                type: "error"
            }

        case 306:
            return {
                title: "Ошибка Журнала Событий - 306",
                text: "Ошибка в поле \"Дата\"",
                type: "error"
            }

        case 401:
            return {
                title: "Ошибка Списка Титулов - 401",
                text: "Ошибка в поле \"Номер записи\"",
                type: "error"
            }

        case 402:
            return {
                title: "Ошибка Списка Титулов - 402",
                text: "Ошибка в поле \"Титул\"",
                type: "error"
            }

        case 403:
            return {
                title: "Ошибка Списка Титулов - 403",
                text: "Ошибка в поле \"Статус\"",
                type: "error"
            }

        case 404:
            return {
                title: "Ошибка Списка Титулов - 404",
                text: "Ошибка в поле \"Предшественник\"",
                type: "error"
            }

        case 501:
            return {
                title: "Ошибка Списка Пользователей - 501",
                text: "Ошибка в поле \"Номер записи\"",
                type: "error"
            }

        case 502:
            return {
                title: "Ошибка Списка Пользователей - 502",
                text: "Ошибка в поле \"E-mail\"",
                type: "error"
            }

        case 503:
            return {
                title: "Ошибка Списка Пользователей - 503",
                text: "Ошибка в поле \"Surname\"",
                type: "error"
            }

        case 504:
            return {
                title: "Ошибка Списка Пользователей - 504",
                text: "Ошибка в поле \"Name\"",
                type: "error"
            }

        case 505:
            return {
                title: "Ошибка Списка Пользователей - 505",
                text: "Ошибка в поле \"Role\"",
                type: "error"
            }

        case 506:
            return {
                title: "Ошибка Списка Пользователей - 506",
                text: "Ошибка в поле \"Active\"",
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

        case "E_AUTH_003":
            return {
                text: "Новый пароль сохранен",
                type: "success"
            }

        case "E_RESPONSE_001":
            return {
                title: "Ошибка обработчика ответов",
                text: "Неверное имя запроса",
                type: "error"
            }

        case "E_SETTING_001":
            return {
                text: "Настройки сохранены",
                type: "success"
            }

        case "E_STATUS_001":
            return {
                text: "Записи сохранены",
                type: "success"
            }

        case "E_STATUS_002":
            return {
                text: "Запись удалена",
                type: "success"
            }

        case "E_STATUS_003":
            return {
                text: "Новая запись добавлена. Обновите имя",
                type: "success"
            }

        case "E_LOG_001":
            return {
                text: "Запись сохранена",
                type: "success"
            }

        case "E_LOG_002":
            return {
                text: "Запись удалена",
                type: "success"
            }

        case "E_TITLE_001":
            return {
                text: "Титул сохранен",
                type: "success"
            }

        case "E_TITLE_002":
            return {
                text: "Титул удален",
                type: "success"
            }

        case "E_USER_001":
            return {
                text: "Пользователь сохранен",
                type: "success"
            }

        case "E_USER_002":
            return {
                text: "Пользователь удален",
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

        case 105:
            return {
                title: "Authentication Error - 105",
                text: "Incorrect new password",
                type: "error"
            }

        case 201:
            return {
                title: "Admin Error - 201",
                text: "Wrong parameter name in request",
                type: "error"
            }

        case 202:
            return {
                title: "Admin Error - 202",
                text: "Wrong parameter value in request",
                type: "error"
            }

        case 203:
            return {
                title: "Admin Error - 203",
                text: "Settigs are missed in request",
                type: "error"
            }

        case 204:
            return {
                title: "Admin Error - 204",
                text: "Items are missed in request",
                type: "error"
            }

        case 205:
            return {
                title: "Admin Error - 205",
                text: "Wrong parameter id in request",
                type: "error"
            }

        case 206:
            return {
                title: "Admin Error - 206",
                text: "Item to be deleted is used in other place of database",
                type: "error"
            }

        case 301:
            return {
                title: "Log Error - 301",
                text: "Wrong input \"To\"",
                type: "error"
            }

        case 302:
            return {
                title: "Log Error - 302",
                text: "Wrong input \"From\"",
                type: "error"
            }

        case 303:
            return {
                title: "Log Error - 303",
                text: "Wrong input \"Title\"",
                type: "error"
            }

        case 304:
            return {
                title: "Log Error - 304",
                text: "Wrong input \"Text\"",
                type: "error"
            }

        case 305:
            return {
                title: "Log Error - 305",
                text: "Wrong input \"ID\"",
                type: "error"
            }

        case 306:
            return {
                title: "Log Error - 306",
                text: "Wrong input \"Date\"",
                type: "error"
            }

        case 401:
            return {
                title: "Title Error - 401",
                text: "Wrong input \"ID\"",
                type: "error"
            }

        case 402:
            return {
                title: "Title Error - 402",
                text: "Wrong input \"Title\"",
                type: "error"
            }

        case 403:
            return {
                title: "Title Error - 403",
                text: "Wrong input \"Status\"",
                type: "error"
            }

        case 404:
            return {
                title: "Title Error - 404",
                text: "Wrong input \"Predecessor\"",
                type: "error"
            }

        case 501:
            return {
                title: "Title Error - 501",
                text: "Wrong input \"ID\"",
                type: "error"
            }

        case 502:
            return {
                title: "Title Error - 502",
                text: "Wrong input \"E-mail\"",
                type: "error"
            }

        case 503:
            return {
                title: "Title Error - 503",
                text: "Wrong input \"Surname\"",
                type: "error"
            }

        case 504:
            return {
                title: "Title Error - 504",
                text: "Wrong input \"Name\"",
                type: "error"
            }

        case 505:
            return {
                title: "Title Error - 505",
                text: "Wrong input \"Role\"",
                type: "error"
            }

        case 506:
            return {
                title: "Title Error - 506",
                text: "Wrong input \"Active\"",
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

        case "E_AUTH_003":
            return {
                text: "New password has been saved",
                type: "success"
            }

        case "E_RESPONSE_001":
            return {
                title: "Response Error",
                text: "Wrong name of response function",
                type: "error"
            }

        case "E_SETTING_001":
            return {
                text: "Setting have been saved",
                type: "success"
            }

        case "E_STATUS_001":
            return {
                text: "Statuses have been saved",
                type: "success"
            }

        case "E_STATUS_002":
            return {
                text: "Status has been deleted",
                type: "success"
            }

        case "E_STATUS_003":
            return {
                text: "Status has been added. Please, update name.",
                type: "success"
            }

        case "E_LOG_001":
            return {
                text: "Log has been saved",
                type: "success"
            }

        case "E_LOG_002":
            return {
                text: "Log has been deleted",
                type: "success"
            }

        case "E_TITLE_001":
            return {
                text: "Title has been saved",
                type: "success"
            }

        case "E_TITLE_002":
            return {
                text: "Title has been deleted",
                type: "success"
            }

        case "E_USER_001":
            return {
                text: "User has been saved",
                type: "success"
            }

        case "E_USER_002":
            return {
                text: "User has been deleted",
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
            // 123
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