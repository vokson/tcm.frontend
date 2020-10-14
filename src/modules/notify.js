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
        case 100:
            return {
                title: "Ошибка - 100",
                text: "Необработанное исключение",
                type: "error"
            }

        case 101:
            return {
                title: "Ошибка авторизации - 101",
                text: "Неверный логин/пароль",
                type: "error"
            }

        case 102:
            return {
                title: "Ошибка авторизации - 102",
                text: "Истек срок авторизации",
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

        case 106:
            return {
                title: "Ошибка авторизации - 106",
                text: "У вас нет доступа к этой области титулов",
                type: "error"
            }

        case 110:
            return {
                title: "Ошибка валидации действия - 110",
                text: "Неверные данные в поле role.",
                type: "error"
            }

        case 111:
            return {
                title: "Ошибка валидации действия - 111",
                text: "Неверные данные в поле name.",
                type: "error"
            }

        case 112:
            return {
                title: "Ошибка валидации действия - 112",
                text: "Неверные данные в поле state.",
                type: "error"
            }

        case 113:
            return {
                title: "Ошибка валидации действия - 113",
                text: "Неверные данные в поле items.",
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

        case 307:
            return {
                title: "Ошибка Журнала Событий - 307",
                text: "Ошибка в галочке \"Новое Сообщение ?\"",
                type: "error"
            }

        case 308:
            return {
                title: "Ошибка Журнала Событий - 308",
                text: "Нельзя удалить запись из-за вложенных файлов",
                type: "error"
            }

        case 309:
            return {
                title: "Ошибка Журнала Событий - 309",
                text: "Недостаточно прав для создания первой записи по трансмитталу",
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

        case 405:
            return {
                title: "Ошибка Списка Титулов - 405",
                text: "Ошибка сохранения, возможно данный титул уже зарегистрирован",
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

        case 507:
            return {
                title: "Ошибка Списка Пользователей - 507",
                text: "Ошибка в поле \"Persmission Expression\"",
                type: "error"
            }

        case 601:
            return {
                title: "Ошибка Файловой Системы - 601",
                text: "Файл не существует",
                type: "error"
            }

        case 602:
            return {
                title: "Ошибка Файловой Системы - 602",
                text: "Ошибка передачи файла на сервер",
                type: "error"
            }

        case 603:
            return {
                title: "Ошибка Файловой Системы - 603",
                text: "Ошибка удаления файла на сервере",
                type: "error"
            }

        case 604:
            return {
                title: "Ошибка Файловой Системы - 604",
                text: "Неверный ID",
                type: "error"
            }

        case 605:
            return {
                title: "Ошибка Файловой Системы - 605",
                text: "Неверный UIN",
                type: "error"
            }

        case 606:
            return {
                title: "Ошибка Файловой Системы - 606",
                text: "Ошибка сохранения файла на сервере",
                type: "error"
            }

        case 607:
            return {
                title: "Ошибка Файловой Системы - 607",
                text: "Файл не может быть сохранен на сервере",
                type: "error"
            }

        case 608:
            return {
                title: "Ошибка Файловой Системы - 608",
                text: "Не удалось создать ZIP архив",
                type: "error"
            }

        case 609:
            return {
                title: "Ошибка Файловой Системы - 609",
                text: "Неправильное имя файла",
                type: "error"
            }

        case 610:
            return {
                title: "Ошибка Файловой Системы - 610",
                text: "Не удалось создать PDF",
                type: "error"
            }

        case 611:
            return {
                title: "Ошибка Файловой Системы - 611",
                text: "Не удалось создать папку для задачи",
                type: "error"
            }

        case 612:
            return {
                title: "Ошибка Файловой Системы - 612",
                text: "Папка задачи уже существует",
                type: "error"
            }

        case 701:
            return {
                title: "Ошибка Проверяшки - 701",
                text: "Номер записи неверен",
                type: "error"
            }

        case 801:
            return {
                title: "Ошибка Графика - 801",
                text: "Имя Хранилища неверено",
                type: "error"
            }

        case 802:
            return {
                title: "Ошибка Графика - 802",
                text: "Пустое регулярное выражение",
                type: "error"
            }

        case 803:
            return {
                title: "Ошибка Графика - 803",
                text: "Объем титула не является целым числом",
                type: "error"
            }

        case 804:
            return {
                title: "Ошибка Графика - 804",
                text: "Некорректный Предшественник титула",
                type: "error"
            }

        case 901:
            return {
                title: "Ошибка Отправки - 901",
                text: "Номер папки неверен",
                type: "error"
            }

        case 1001:
            return {
                title: "Ошибка Документов - 1001",
                text: "Информация о документах не найдена",
                type: "error"
            }

        case 1002:
            return {
                title: "Ошибка Документов - 1002",
                text: "Код TCM не найден",
                type: "error"
            }

        case 1003:
            return {
                title: "Ошибка Документов - 1003",
                text: "Код клиента не найден",
                type: "error"
            }

        case 1004:
            return {
                title: "Ошибка Документов - 1004",
                text: "Ревизия не найдена",
                type: "error"
            }

        case 1005:
            return {
                title: "Ошибка Документов - 1005",
                text: "Класс не найден",
                type: "error"
            }

        case 1006:
            return {
                title: "Ошибка Документов - 1006",
                text: "Титул RU не найден",
                type: "error"
            }

        case 1007:
            return {
                title: "Ошибка Документов - 1007",
                text: "Титул EN не найден",
                type: "error"
            }

        case 1008:
            return {
                title: "Ошибка Документов - 1008",
                text: "ID не найден",
                type: "error"
            }

        case 1009:
            return {
                title: "Ошибка Документов - 1009",
                text: "Код TCM не должен быть пустым",
                type: "error"
            }

        case 1010:
            return {
                title: "Ошибка Документов - 1010",
                text: "Ревизия не должна быть пустой",
                type: "error"
            }

        case 1011:
            return {
                title: "Ошибка Документов - 1011",
                text: "Неправильный ID",
                type: "error"
            }

        case 1012:
            return {
                title: "Ошибка Документов - 1012",
                text: "Документ не может быть создан",
                type: "error"
            }

        case 1013:
            return {
                title: "Ошибка Документов - 1013",
                text: "Документ не может быть удален",
                type: "error"
            }

        case 1014:
            return {
                title: "Ошибка Документов - 1014",
                text: "Неправильный формат файла со списком документов",
                type: "error"
            }

        case 1015:
            return {
                title: "Ошибка Документов - 1015",
                text: "Отсутствует первая запись в ЛОГ для трансмиттала",
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

        case "E_DATABASE_001":
            return {
                text: "База данных обновлена",
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

        case "E_LOG_003":
            return {
                text: "Уточните запрос для поиска",
                type: "warning"
            }

        case "E_LOG_004":
            return {
                text: "Задача успешно создана",
                type: "success"
            }

        case "E_LOG_005":
            return {
                text: "Неверный JSON в вариантами добавочных слов",
                type: "error"
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

        case "E_USER_003":
            return {
                text: "Пользователю установлен пароль по умолчанию",
                type: "success"
            }

        case "E_FILE_001":
            return {
                text: "Файл сохранен",
                type: "success"
            }

        case "E_FILE_002":
            return {
                text: "Файл удален",
                type: "success"
            }

        case "E_FILE_003":
            return {
                text: "Выберите запись до добавления файла",
                type: "warning"
            }

        case "E_FILE_004":
            return {
                text: "превышен максимальный размер файла",
                type: "error"
            }

        case "E_FILE_005":
            return {
                text: "Файлы были успешно очищены",
                type: "success"
            }

        case "E_FILE_006":
            return {
                text: "Список файлов пуст",
                type: "error"
            }

        case "E_CHECK_001":
            return {
                text: "Запись сохранена",
                type: "success"
            }

        case "E_CHECK_002":
            return {
                text: "Запись удалена",
                type: "success"
            }

        case "E_SENDER_001":
            return {
                text: "Имя папки не должно быть пустым",
                type: "error"
            }

        case "E_DOCS_001":
            return {
                text: "Информация о документах сохранена",
                type: "success"
            }

        case "E_DOCS_002":
            return {
                text: "Добавлен новый документ",
                type: "success"
            }

        case "E_DOCS_003":
            return {
                text: "Документ удален",
                type: "success"
            }

        case "E_DOCS_004":
            return {
                text: "Файл успешно загружен",
                type: "success"
            }

        case "E_DOCS_005":
            return {
                text: "Обрабатывается предыдущий запрос..",
                type: "warning"
            }

        case "E_SERVER_001":
            return {
                text: "Сервер не отвечает",
                type: "success"
            }

        case "E_SERVER_002":
            return {
                text: "Необработанная ошибка сервера",
                type: "success"
            }

        case "E_CHART_001":
            return {
                text: "Неверный JSON с вариантами регулярных выражений",
                type: "error"
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
        case 100:
            return {
                title: "Error - 100",
                text: "Unhandled Exception",
                type: "error"
            }

        case 101:
            return {
                title: "Authentication Error - 101",
                text: "Incorrect login/password",
                type: "error"
            }

        case 102:
            return {
                title: "Authentication Error - 102",
                text: "Authentication is expired",
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

        case 106:
            return {
                title: "Authentication Error - 106",
                text: "Error of permission expression",
                type: "error"
            }

        case 110:
            return {
                title: "Action Validation Error - 110",
                text: "Invalid role",
                type: "error"
            }

        case 111:
            return {
                title: "Action Validation Error - 111",
                text: "Invalid name",
                type: "error"
            }

        case 112:
            return {
                title: "Action Validation Error - 112",
                text: "Invalid state",
                type: "error"
            }

        case 113:
            return {
                title: "Action Validation Error - 113",
                text: "Invalid items",
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

        case 307:
            return {
                title: "Log Error - 307",
                text: "Wrong input check box \"Is New Message ?\"",
                type: "error"
            }

        case 308:
            return {
                title: "Log Error - 308",
                text: "Article can not be deleted, because of attached files",
                type: "error"
            }

        case 309:
            return {
                title: "Log Error - 309",
                text: "Permission denied for creation of 1st record for transmittal",
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

        case 405:
            return {
                title: "Title Error - 405",
                text: "Saving error, probably the Title has been already registered",
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

        case 507:
            return {
                title: "Title Error - 507",
                text: "Wrong input \"Permission Expression\"",
                type: "error"
            }

        case 601:
            return {
                title: "File System Error - 601",
                text: "File doesn't exist",
                type: "error"
            }

        case 602:
            return {
                title: "File System Error - 602",
                text: "Error of file transfering to server",
                type: "error"
            }

        case 603:
            return {
                title: "File System Error - 603",
                text: "Error of file's deletion on server",
                type: "error"
            }

        case 604:
            return {
                title: "File System Error - 604",
                text: "Wrong ID",
                type: "error"
            }

        case 605:
            return {
                title: "File System Error - 605",
                text: "Wrong UIN",
                type: "error"
            }

        case 606:
            return {
                title: "File System Error - 606",
                text: "Error of storage file on server",
                type: "error"
            }

        case 607:
            return {
                title: "File System Error - 607",
                text: "File can not be saved on server",
                type: "error"
            }

        case 608:
            return {
                title: "File System Error - 608",
                text: "Zip archive can't be created",
                type: "error"
            }

        case 609:
            return {
                title: "File System Error - 609",
                text: "Incorrect filename",
                type: "error"
            }

        case 610:
            return {
                title: "File System Error - 610",
                text: "PDF can't be created",
                type: "error"
            }

        case 611:
            return {
                title: "File System Error - 611",
                text: "Task folder can not be created",
                type: "error"
            }

        case 612:
            return {
                title: "File System Error - 612",
                text: "Task folder is already exist",
                type: "error"
            }

        case 701:
            return {
                title: "Checker Error - 701",
                text: "ID is wrong",
                type: "error"
            }

        case 801:
            return {
                title: "Chart Error - 801",
                text: "Storage Name is wrong",
                type: "error"
            }

        case 802:
            return {
                title: "Chart Error - 802",
                text: "Empty Regular Expression",
                type: "error"
            }

        case 803:
            return {
                title: "Chart Error - 803",
                text: "Volume of title is not integer type",
                type: "error"
            }

        case 804:
            return {
                title: "Chart Error - 804",
                text: "Incorrect predecessor of title",
                type: "error"
            }

        case 901:
            return {
                title: "Sender Error - 901",
                text: "ID is wrong",
                type: "error"
            }

        case 1001:
            return {
                title: "Docs Error - 1001",
                text: "Information about docs has not found",
                type: "error"
            }

        case 1002:
            return {
                title: "Docs Error - 1002",
                text: "Code TCM is not found",
                type: "error"
            }

        case 1003:
            return {
                title: "Docs Error - 1003",
                text: "Client code is not found",
                type: "error"
            }

        case 1004:
            return {
                title: "Docs Error - 1004",
                text: "Revision is not found",
                type: "error"
            }

        case 1005:
            return {
                title: "Docs Error - 1005",
                text: "Class is not found",
                type: "error"
            }

        case 1006:
            return {
                title: "Docs Error - 1006",
                text: "Title RU is not found",
                type: "error"
            }

        case 1007:
            return {
                title: "Docs Error - 1007",
                text: "Title EN is not found",
                type: "error"
            }

        case 1008:
            return {
                title: "Docs Error - 1008",
                text: "ID is not found",
                type: "error"
            }

        case 1009:
            return {
                title: "Docs Error - 1009",
                text: "Code TCM should not be empty",
                type: "error"
            }

        case 1010:
            return {
                title: "Docs Error - 1010",
                text: "Revision should not be empty",
                type: "error"
            }

        case 1011:
            return {
                title: "Docs Error - 1011",
                text: "Wrong ID",
                type: "error"
            }

        case 1012:
            return {
                title: "Docs Error - 1012",
                text: "Doc can not be added",
                type: "error"
            }

        case 1013:
            return {
                title: "Docs Error - 1013",
                text: "Doc can not be deleted",
                type: "error"
            }

        case 1014:
            return {
                title: "Docs Error - 1014",
                text: "Wrong format of file with list of docs",
                type: "error"
            }

        case 1015:
            return {
                title: "Docs Error - 1015",
                text: "First record for transmittal in LOG is missed",
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

        case "E_DATABASE_001":
            return {
                text: "Database has been updated",
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

        case "E_LOG_003":
            return {
                text: "Please, input something as search query",
                type: "warning"
            }

        case "E_LOG_004":
            return {
                text: "Task has been created",
                type: "success"
            }

        case "E_LOG_005":
            return {
                text: "Wrong JSON with list of additional words",
                type: "error"
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

        case "E_USER_003":
            return {
                text: "Default password has been applied to user",
                type: "success"
            }

        case "E_FILE_001":
            return {
                text: "File has been saved",
                type: "success"
            }

        case "E_FILE_002":
            return {
                text: "File has been deleted",
                type: "success"
            }

        case "E_FILE_003":
            return {
                text: "Please, choose log before add file",
                type: "warning"
            }

        case "E_FILE_004":
            return {
                text: "Size of file is over limit",
                type: "error"
            }

        case "E_FILE_005":
            return {
                text: "Files have been cleaned successfully",
                type: "success"
            }

        case "E_FILE_006":
            return {
                text: "List of files is empty",
                type: "error"
            }

        case "E_CHECK_001":
            return {
                text: "Record has been saved",
                type: "success"
            }

        case "E_CHECK_002":
            return {
                text: "Record has been deleted",
                type: "success"
            }

        case "E_SENDER_001":
            return {
                text: "Folder name must not be empty",
                type: "error"
            }

        case "E_DOCS_001":
            return {
                text: "Information about documents has been saved",
                type: "success"
            }

        case "E_DOCS_002":
            return {
                text: "New document has been added",
                type: "success"
            }

        case "E_DOCS_003":
            return {
                text: "Document has been deleted",
                type: "success"
            }

        case "E_DOCS_004":
            return {
                text: "File has been uploaded",
                type: "success"
            }

        case "E_DOCS_005":
            return {
                text: "Previous request is not finished",
                type: "warning"
            }

        case "E_SERVER_001":
            return {
                text: "Server not found",
                type: "success"
            }

        case "E_SERVER_002":
            return {
                text: "Server error",
                type: "success"
            }

        case "E_CHART_001":
            return {
                text: "Wrong JSON with variants of regular expressions",
                type: "error"
            }



        default:
            return {
                title: "Notification Error",
                text: "Wrong text code " + code,
                type: "error"
            }
    }

}

import Vue from 'vue'

export default {
    namespaced: true,

    actions: {
        showNotifyByCode ({ rootState }, code) {
            Vue.notify(Object.assign(getText(rootState.language, code), { group: "notify-group" }));
        },
    },
}