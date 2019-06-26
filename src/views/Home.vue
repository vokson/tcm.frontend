<template>
  <div>

    <div class="container">
      <div class="row">
        <div class='col-8'>
          <div class='row'>
            <div class="col">
              <h3 v-if="language === 'RUS'">Проектный офис АГПЗ
                <span class="actual_version_color">(v.{{version}})</span>
              </h3>
              <h3 v-else-if="language === 'ENG'">AGPP Design Office
                <span class="actual_version_color">(v.{{version}})</span>
              </h3>
            </div>
          </div>
          <div class="row">

            <div class="col-5">
              <p v-if="language === 'RUS'">Choose language:</p>
              <p v-else-if="language === 'ENG'">Выберите язык:</p>
            </div>

            <div class="col-5">
              <b-form-radio-group
                id="language-radio"
                v-model="choose_language"
                name="radioSubComponent"
              >
                <b-form-radio value="RUS">RU</b-form-radio>
                <b-form-radio value="ENG">EN</b-form-radio>
              </b-form-radio-group>
            </div>

          </div>

          <div class="row">
            <div class="col-5">
              <p> E-mail:</p>
            </div>
            <div class="col-5">
              <p>{{email}}</p>
            </div>
          </div>

          <div class="row">
            <div class="col-5">
              <p v-if="language === 'RUS'">Имя:</p>
              <p v-else-if="language === 'ENG'">Name:</p>
            </div>
            <div class="col-5">
              <p>{{name}}</p>
            </div>
          </div>

          <div class="row">
            <div class="col-5">
              <p v-if="language === 'RUS'">Фамилия:</p>
              <p v-else-if="language === 'ENG'">Surname:</p>
            </div>
            <div class="col-5">
              <p>{{surname}}</p>
            </div>
          </div>

          <div class="row">
            <div class="col-5">
              <p v-if="language === 'RUS'">Права доступа:</p>
              <p v-else-if="language === 'ENG'">Permissions:</p>
            </div>
            <div class="col-5">
              <p>{{role}}</p>
            </div>
          </div>
          <div
            v-if="isDefaultPassword === true"
            class="row"
          >
            <div class="col-5">
              <span
                v-if="language === 'RUS'"
                class="badge badge-danger"
              >У вас стандартный пароль. Смените его.</span>
              <span
                v-else-if="language === 'ENG'"
                class="badge badge-danger"
              >You have default password. Change it.</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="container">
      <div class="row">
        <h5 v-if="language === 'RUS'">Ваши настройки</h5>
        <h5 v-else-if="language === 'ENG'">Your settings</h5>
      </div>

      <div
        v-for="item in settings"
        :key="item.name"
        class="row"
      >

        <div class="col-6">
          <p v-if="language === 'RUS'">{{ item.description_RUS}}</p>
          <p v-if="language === 'ENG'">{{ item.description_ENG}}</p>
        </div>
        <div class="col-3">
          <input
            v-if="item.is_switchable == 0"
            type="text"
            class="form-control"
            v-model="item.value"
          >
          <input
            v-if="item.is_switchable == 1"
            type="checkbox"
            class="form-check-input user_setting_checkbox"
            v-model="item.value"
          >
        </div>

      </div>

      <div class="row">

        <div class="col-2">
          <button
            type="button"
            class="btn btn-primary"
            v-on:click="getUserSettings"
          >
            <div v-if="language === 'RUS'">Обновить</div>
            <div v-if="language === 'ENG'">Refresh</div>
          </button>
        </div>

        <div class="col-1">
          <button
            type="button"
            class="btn btn-danger"
            v-on:click="setUserSettings"
          >
            <div v-if="language === 'RUS'">Сохранить</div>
            <div v-if="language === 'ENG'">Save</div>
          </button>
        </div>

      </div>

    </div>

    <div class="container">
      <div class="row">
        <h5 v-if="language === 'RUS'">Сменить пароль (не менее 4-х символов, без пробелов)</h5>
        <h5 v-else-if="language === 'ENG'">Change password (not less than 4 symbols, without spaces)</h5>
      </div>

      <div class="row">
        <div class="col-5">
          <p v-if="language === 'RUS'">Новый пароль:</p>
          <p v-else-if="language === 'ENG'">New password:</p>
        </div>
        <div class="col-2">
          <input
            type="password"
            v-model="new_password_1"
          />
        </div>
        <div class="col-1">
          <span
            v-if="isNewPasswordOk_1 === true"
            class="badge badge-success"
          >OK</span>
          <span
            v-else
            class="badge badge-danger"
          >FAIL</span>
        </div>
      </div>

      <div class="row">
        <div class="col-5">
          <p v-if="language === 'RUS'">Новый пароль еще раз:</p>
          <p v-else-if="language === 'ENG'">New password again:</p>
        </div>
        <div class="col-2">
          <input
            type="password"
            v-model="new_password_2"
          />
        </div>
        <div class="col-1">
          <span
            v-if="isNewPasswordOk_2 === true"
            class="badge badge-success"
          >OK</span>
          <span
            v-else
            class="badge badge-danger"
          >FAIL</span>
        </div>
      </div>

      <div
        v-if="isNewPasswordOk_1 === true && isNewPasswordOk_2 === true"
        class="row"
      >
        <div class="col-1">
          <button
            v-if="language === 'RUS'"
            type="button"
            class="btn btn-danger"
            v-on:click="changePassword"
          >Сохранить</button>
          <button
            v-else-if="language === 'ENG'"
            type="button"
            class="btn btn-danger"
            v-on:click="changePassword"
          >Save</button>
        </div>
      </div>

      <div class="row">
        <br />
      </div>

      <div class="row">

        <h5 v-if="language === 'RUS'">История изменений</h5>
        <h5 v-else-if="language === 'ENG'">History of versions</h5>
      </div>

      <div class="row actual_version_color">
        <div class="col-1">
          <p>1.33.0</p>
        </div>
        <div class="col-4">
          <p>В статистику по проверенным чертежам добавлены графики Ошибки/Чертежи. Поиск в Проверяшке теперь выполняется по дате обновления чертежа.</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.32.2</p>
        </div>
        <div class="col-4">
          <p>Добавлены шаблоны для архитектуры и КИП в статистику по записям ЛОГ и титулам</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.32.1</p>
        </div>
        <div class="col-4">
          <p>Проверяшка теперь использует дату последнего обновления файла, вместо даты первой загрузки</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.32.0</p>
        </div>
        <div class="col-4">
          <p>Добавлены пользовательские настройки в Начало, возможность отправки уведомлений и Отправки на электронную почту</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.31.0</p>
        </div>
        <div class="col-4">
          <p>В Статистику добавлены рейтинги из Проверяшки</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.30.2</p>
        </div>
        <div class="col-4">
          <p>Теперь поиск в ЛОГ невозможен при пустых окнах запроса</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.30.1</p>
        </div>
        <div class="col-4">
          <p>В Отправку добавлен показ общего числа файлов в папке</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.30.0</p>
        </div>
        <div class="col-4">
          <p>Добавлена статистика по проверенным чертежам</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.29.1</p>
        </div>
        <div class="col-4">
          <p>Увеличен объем файла в Пакуй до 100 Мб</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.29.0</p>
        </div>
        <div class="col-4">
          <p>Добавлена возможность выбора имени файла в Пакуй</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.28.0</p>
        </div>
        <div class="col-4">
          <p>Добавлен интерфейс для объединения файлов PDF</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.27.1</p>
        </div>
        <div class="col-4">
          <p>Даты для выбора промежутка времени добавлены в Проверяшку (специально для Кашенковой).</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.27.0</p>
        </div>
        <div class="col-4">
          <p>Добавлены статус для папок в отправке.</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.26.0</p>
        </div>
        <div class="col-4">
          <p>Добавлены графики времени в статистику по TQ.</p>
        </div>
      </div>

      <div class="row ">
        <div class="col-1">
          <p>1.25.0</p>
        </div>
        <div class="col-4">
          <p>Добавлена статистика по TQ.</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.24.0</p>
        </div>
        <div class="col-4">
          <p>Добавлен график по статусам титулов в Статистике.</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.23.1</p>
        </div>
        <div class="col-4">
          <p>Изменен порядок сортировки в Отправке. Добавлена проверка имени загружаемого файла. Изменен максимальный объем загружамого файла.</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.23.0</p>
        </div>
        <div class="col-4">
          <p>Добавлена Отправка. Работает в тестовом режиме.</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.22.2</p>
        </div>
        <div class="col-4">
          <p>Изменено верхнее меню. Испытания Проверяшки успешно завершены.</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.22.1</p>
        </div>
        <div class="col-4">
          <p>Исправлена ошибка вывода записей в Log при нажатии на титул в Title</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.22.0</p>
        </div>
        <div class="col-4">
          <p>Добавлены переходы из Title в Log и обратно по нажатию на титул</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.21.1</p>
        </div>
        <div class="col-4">
          <p>В проверяшке исправлен формат даты</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.21.0</p>
        </div>
        <div class="col-4">
          <p>В проверяшку добавлена возможность скачивать все файлы zip архивом</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.20.1</p>
        </div>
        <div class="col-4">
          <p>В проверяшку добавлено расширение</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.20.0</p>
        </div>
        <div class="col-4">
          <p>В статистику добавлен график объема хранилища</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.19.0</p>
        </div>
        <div class="col-4">
          <p>Добавлена система для хранения результатов проверки чертежей "Проверяшка"</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.18.1</p>
        </div>
        <div class="col-4">
          <p>Добавлены слова на вкладке "Log"</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.18.0</p>
        </div>
        <div class="col-4">
          <p>Теперь можно выбирать и добавлять слова к тексту записи на вкладке "Log"</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.17.0</p>
        </div>
        <div class="col-4">
          <p>Теперь можно увидеть новые сообщения просто нажав на "New Messages"</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.16.0</p>
        </div>
        <div class="col-4">
          <p>В статистику добавлен график зарегистрированных титулов</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.15.2</p>
        </div>
        <div class="col-4">
          <p>Повторно исправлена ошибка в ссылке для скачивания файлов одним архивом</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.15.1</p>
        </div>
        <div class="col-4">
          <p>Исправлена ошибка в ссылке для скачивания файлов одним архивом</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.15.0</p>
        </div>
        <div class="col-4">
          <p>Добавлена возможность скачивания файлов одним архивом</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.14.0</p>
        </div>
        <div class="col-4">
          <p>Добавлена история титулов на вкладке Title</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.13.0</p>
        </div>
        <div class="col-4">
          <p>Добавлена вкладка Статистика. Добавлен график добавления новых записей.</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.12.0</p>
        </div>
        <div class="col-4">
          <p>Исправлена ошибка в удалении записей в Журнале Событий.</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.11.0</p>
        </div>
        <div class="col-4">
          <p>Добавлены кнопки в редактор</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.10.1</p>
        </div>
        <div class="col-4">
          <p>Исправлена ошибка в добавлении пользователя</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.10.0</p>
        </div>
        <div class="col-4">
          <p>Добавлено разделение доступа по областям титулов</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.9.0</p>
        </div>
        <div class="col-4">
          <p>Добавил обозначение @ к записям, у которых есть приложенные файлы</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.8.2</p>
        </div>
        <div class="col-4">
          <p>Переделал уведомления, возможно перестанут глючить..</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.8.1</p>
        </div>
        <div class="col-4">
          <p>Исправлена ошибка в добавлении файлов, возникшая после переезда серверов.</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.8.0</p>
        </div>
        <div class="col-4">
          <p>Добавлена "метла" в Log.</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.7.0</p>
        </div>
        <div class="col-4">
          <p>Добавлена вкладка "News", на которой автоматически обновляются последние записи в Log.</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.6.0</p>
        </div>
        <div class="col-4">
          <p>Добавлена фукция "Новые сообщения".</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.5.1</p>
        </div>
        <div class="col-4">
          <p>Исправлена ошибка с добавлением файлов не в свои записи.</p>
          <p>Можно логиниться, используя Enter.</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.5.0</p>
        </div>
        <div class="col-4">
          <p>Добавлена возможность добавления файлов к записям в Log.</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.4.0</p>
        </div>
        <div class="col-4">
          <p>Теперь пользователь с правами доступа "engineer" может изменять/удалять только свои записи в Log. Пользователь с правами доступа выше "engineer" может удалять/изменять любые записи.</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.3.1</p>
        </div>
        <div class="col-4">
          <p>Исправлена ошибка в назначении даты при переходе из редактирования в добавление в Log</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.3.0</p>
        </div>
        <div class="col-4">
          <p>Добавлены поля "Описание", "Объем" в Title</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.2.0</p>
        </div>
        <div class="col-4">
          <p>Добавлена кнопка "Назад к Добавить" в Log</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.1.0</p>
        </div>
        <div class="col-4">
          <p>Добавлен сброс пароля по умолчанию. Добавлена кнопка сменить пользователей в Log</p>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <p>1.0.0</p>
        </div>
        <div class="col-4">
          <p>Первый пробный релиз / The first deployment</p>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "Home",


  data: function () {
    return {
      selected: "",
      choose_language: "",
      new_password_1: "",
      new_password_2: "",
      version: '1.33.0'
    };
  },

  mounted: function () {
    this.choose_language = this.$store.state.language;

    this.$nextTick(function () {
      this.getUserSettings();
    })
  },

  computed: {
    language: function () {
      return this.$store.state.language;
    },

    isNewPasswordOk_1: function () {
      return (this.new_password_1.indexOf(" ") != -1 || this.new_password_1.length < 4) ? false : true;
    },

    isNewPasswordOk_2: function () {
      return ((this.new_password_2 === this.new_password_1) && (this.isNewPasswordOk_1 === true)) ? true : false;
    },

    isDefaultPassword: function () {
      return this.$store.state.user.isDefaultPassword;
    },

    email: function () {
      return this.$store.state.user.email;
    },

    name: function () {
      return this.$store.state.user.name;
    },

    surname: function () {
      return this.$store.state.user.surname;
    },

    role: function () {
      return this.$store.state.user.role;
    },

    settings: function () {
      return this.$store.getters['user_settings/give'];
    }

  },

  watch: {
    choose_language: function (newLang) {
      this.$store.commit('setLanguage', newLang)
    },

  },

  methods: {
    changePassword: function () {
      this.$store.dispatch('auth/changePassword', {
        new_password: window.$sha256(this.new_password_1)
      });
    },

    getUserSettings: function () {
      this.$store.dispatch('user_settings/get');
    },

    setUserSettings: function () {
      this.$store.dispatch('user_settings/set');
    },

  }

};
</script>

<style>
.container {
  margin-top: 5%;
}

.actual_version_color {
  color: red;
}

.user_setting_checkbox {
  vertical-align: middle;
}
</style>