<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h3>{{ (language == 'RUS') ? 'Просмотр трансмитталов' : 'Search in transmitals' }}</h3>
      </div>
    </div>

    <div class="row">

      <div class="col-2">
        <b-dropdown
          id="dropdown-form"
          text="Настройки"
          ref="dropdown"
          variant="success"
          class="col-4"
        >
          <b-dropdown-form>

            <b-form-checkbox
              style="width: 240px;"
              v-model="view.date"
            >{{ (language == 'RUS') ? 'Дата' : 'Date' }}
            </b-form-checkbox>

            <b-form-checkbox v-model="view.transmittal">{{ (language == 'RUS') ? 'Трансмиттал' : 'Transmittal' }}
            </b-form-checkbox>

            <b-form-checkbox v-model="view.code_1">{{ property_code_1 }}
            </b-form-checkbox>

            <b-form-checkbox v-model="view.code_2">{{ property_code_2 }}
            </b-form-checkbox>

            <b-form-checkbox v-model="view.revision">{{ (language == 'RUS') ? 'Ревизия' : 'Revision' }}
            </b-form-checkbox>

            <b-form-checkbox v-model="view.class">{{ (language == 'RUS') ? 'Класс' : 'Class' }}
            </b-form-checkbox>

            <b-form-checkbox v-model="view.title_en">{{ (language == 'RUS') ? 'Имя ENG' : 'Title ENG' }}
            </b-form-checkbox>

            <b-form-checkbox v-model="view.title_ru">{{ (language == 'RUS') ? 'Имя RUS' : 'Title RUS' }}
            </b-form-checkbox>

            <b-dropdown-divider></b-dropdown-divider>

            <b-form-group label="Сортировать по / Sort by">

              <b-form-radio
                v-model="sortBy"
                name="sort-by-radios"
                value="date"
              >{{ (language == 'RUS') ? 'Дата' : 'Date' }}</b-form-radio>

              <b-form-radio
                v-model="sortBy"
                name="sort-by-radios"
                value="transmittal"
              >{{ (language == 'RUS') ? 'Трансмиттал' : 'Transmittal' }}</b-form-radio>

              <b-form-radio
                v-model="sortBy"
                name="sort-by-radios"
                value="code_1"
              >{{ property_code_1 }}</b-form-radio>

              <b-form-radio
                v-model="sortBy"
                name="sort-by-radios"
                value="code_2"
              >{{ property_code_1 }}</b-form-radio>


              <b-form-radio
                v-model="sortBy"
                name="sort-by-radios"
                value="revision"
              >{{ (language == 'RUS') ? 'Ревизия' : 'Revision' }}</b-form-radio>

              <b-form-radio
                v-model="sortBy"
                name="sort-by-radios"
                value="class"
              >{{ (language == 'RUS') ? 'Класс' : 'Class' }}</b-form-radio>

              <b-form-radio
                v-model="sortBy"
                name="sort-by-radios"
                value="title_en"
              >{{ (language == 'RUS') ? 'Имя ENG' : 'Title ENG' }}</b-form-radio>

              <b-form-radio
                v-model="sortBy"
                name="sort-by-radios"
                value="title_ru"
              >{{ (language == 'RUS') ? 'Имя RUS' : 'Title RUS' }}</b-form-radio>
            </b-form-group>

            <b-dropdown-divider></b-dropdown-divider>

            <b-form-checkbox v-model="search.is_only_last">
              {{ (language == 'RUS') ? 'Только последние ревизии' : 'Only last revisions' }}
            </b-form-checkbox>

          </b-dropdown-form>
        </b-dropdown>
      </div>

      <div class="col-10">
        <button
          type="button"
          class="btn btn-outline-success btn-block"
          v-bind:class="{ disabled: isSearchInProgress }"
          v-on:click="getDocs"
        >
          {{ (language == 'RUS') ? 'Найти' : 'Search' }}
          {{ (isSearchInProgress) ? '(...)' : '' }}
          <span class="badge badge-light">{{countOfDocs}}</span>
        </button>
      </div>
    </div>

    <div class="row">

      <table class="table table-striped">
        <thead>
          <tr>
            <th
              class="td-date text-center"
              v-if="view.date"
            >{{ (language == 'RUS') ? 'Дата' : 'Date' }}</th>
            <th
              class="td-transmittal text-center"
              v-if="view.transmittal"
            >{{ (language == 'RUS') ? 'Трансмиттал' : 'Transmittal' }}</th>
            <th
              class="td-code text-center"
              v-if="view.code_1"
            >{{ property_code_1 }}</th>
            <th
              class="td-code text-center"
              v-if="view.code_2"
            >{{ property_code_2 }}</th>
            <th
              class="td-revision text-center"
              v-if="view.revision"
            >{{ (language == 'RUS') ? 'Рев' : 'Rev' }}</th>
            <th
              class="td-class text-center"
              v-if="view.class"
            >{{ (language == 'RUS') ? 'Класс' : 'Class' }}</th>
            <th
              class="td-title text-center"
              v-if="view.title_en"
            >{{ (language == 'RUS') ? 'Имя ENG' : 'Title ENG' }}</th>
            <th
              class="td-title text-center"
              v-if="view.title_ru"
            >{{ (language == 'RUS') ? 'Имя RUS' : 'Title RUS' }}</th>
          </tr>
        </thead>
        <tbody>

          <tr v-on:keyup.enter.prevent="getDocs">

            <td v-if="view.date">
              <datepicker
                v-model="search.date1"
                :format="date_format"
                :bootstrap-styling="true"
                :language="languageForDatePicker"
              ></datepicker>
              <datepicker
                v-model="search.date2"
                :format="date_format"
                :bootstrap-styling="true"
                :language="languageForDatePicker"
              ></datepicker>
            </td>

            <td
              class="text-center"
              v-if="view.transmittal"
            ><input
                type="text"
                v-model="search.transmittal"
                class="full-width"
              /></td>

            <td
              class="text-center"
              v-if="view.code_1"
            ><input
                type="text"
                v-model="search.code_1"
                class="full-width"
              /></td>

            <td
              class="text-center"
              v-if="view.code_2"
            ><input
                type="text"
                v-model="search.code_2"
                class="full-width"
              /></td>

            <td
              class="text-center"
              v-if="view.revision"
            ><input
                type="text"
                v-model="search.revision"
                class="full-width"
              /></td>

            <td
              class="text-center"
              v-if="view.class"
            ><input
                type="text"
                v-model="search.class"
                class="full-width"
              /></td>

            <td v-if="view.title_en"><input
                type="text"
                v-model="search.title_en"
                class="full-width"
              /></td>

            <td v-if="view.title_ru"><input
                type="text"
                v-model="search.title_ru"
                class="full-width"
              /></td>

          </tr>

          <tr
            v-for="item in docs"
            :key="item.id"
          >
            <td
              class="text-center"
              v-if="view.date"
            >{{formatDate(item.date)}}</td>
            <td
              class="text-center"
              v-if="view.transmittal"
            >{{item.transmittal}}</td>

            <td v-if="view.code_1">
              <div v-if="item.files.length > 0">
                <b-dropdown
                  class="m-2"
                  size="sm"
                >
                  <b-dropdown-item
                    v-for="file in item.files"
                    :key="file.id"
                    href="#"
                    v-on:click="downloadFile(file.id, false)"
                  >{{file.name}}</b-dropdown-item>
                </b-dropdown>
                <a
                  href="#"
                  v-on:click="downloadFile(item.primaryPdfFileId, true)"
                >{{item.code_1}}</a>
              </div>
              <div v-else>
                {{item.code_1}}
              </div>
            </td>

            <td
              class="text-center"
              v-if="view.code_2"
            >{{item.code_2}}</td>
            <td
              class="text-center"
              v-if="view.revision"
            >{{item.revision}}</td>
            <td
              class="text-center"
              v-if="view.class"
            >{{item.class}}</td>
            <td v-if="view.title_en">{{item.title_en}}</td>
            <td v-if="view.title_ru">{{item.title_ru}}</td>

          </tr>

        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import { en, ru } from 'vuejs-datepicker/dist/locale'

export default {
  name: "DocsSearch",


  data: function () {
    return {

      date_format: "dd.MM.yyyy",
      en: en,
      ru: ru,
      sortBy: "transmittal",

      view: {
        date: true,
        transmittal: true,
        code_1: true,
        code_2: true,
        class: false,
        revision: true,
        title_en: true,
        title_ru: false,
      },

      search: {
        transmittal: "",
        code_1: "",
        code_2: "",
        class: "",
        revision: "",
        title_en: "",
        title_ru: "",
        date1: null,
        date2: null,
        is_only_last: false
      }

    };
  },

  mounted: function () { },

  computed: {
      language: function () {
        return this.$store.state.language;
      },

      languageForDatePicker: function () {
        if (this.language == "RUS") { return this.ru }
        if (this.language == "ENG") { return this.en }
      },

      docs: function () {
        let nonSortedDocs = this.$store.getters['docs_search/give'];

        let compareFunction = function (a, b) {

          if (a[this.sortBy] < b[this.sortBy]) {
            return -1;
          }
          if (a[this.sortBy] > b[this.sortBy]) {
            return 1;
          }
          return 0;

        };

        if (nonSortedDocs != null) {

          return nonSortedDocs.sort(compareFunction.bind(this));

        } else {
          return null;
        }

      },



      countOfDocs: function () {
        return (this.docs == null) ? 0 : this.docs.length;
      },

      isSearchInProgress: function () {
        return this.$store.getters['docs_search/isProgress'];
      },

      property_code_1: function () {
        if (this.language == "RUS") { return this.$store.getters['setting/give_property']('FRONTEND_CODE_1_NAME_RU'); }
        if (this.language == "ENG") { return this.$store.getters['setting/give_property']('FRONTEND_CODE_1_NAME_EN'); }
      },

      property_code_2: function () {
        if (this.language == "RUS") { return this.$store.getters['setting/give_property']('FRONTEND_CODE_2_NAME_RU'); }
        if (this.language == "ENG") { return this.$store.getters['setting/give_property']('FRONTEND_CODE_2_NAME_EN'); }
      },

  },

  methods: {

    formatDate: function (timestamp) {
      let date = new Date();
      date.setTime(timestamp * 1000); // переводим в миллисекунды
      return ("0" + date.getDate()).slice(-2) + '.' +
        ("0" + (date.getMonth() + 1)).slice(-2) + '.' +
        date.getFullYear()
    },

    getDocs: function () {

      if (this.isSearchInProgress) {
        this.$store.dispatch('notify/showNotifyByCode', "E_DOCS_005", { root: true });
      }

      let queryObject = {
        transmittal: this.search.transmittal,
        code_1: this.search.code_1,
        code_2: this.search.code_2,
        class: this.search.class,
        revision: this.search.revision,
        title_en: this.search.title_en,
        title_ru: this.search.title_ru,
        is_only_last: this.search.is_only_last,
        date1: (this.search.date1 == null) ? "" : Math.round(this.search.date1.getTime() / 1000),
        date2: (this.search.date2 == null) ? "" : Math.round(this.search.date2.getTime() / 1000)
      };

      this.$store.dispatch('docs_search/get', queryObject);
    },

    downloadFile: function (file_id, isInline) {
      this.$store.dispatch('log_file/download', {
        id: file_id,
        isInline: isInline
      });
    },

  },


};
</script>

<style>
.td-code {
  width: 200px;
}

.td-transmittal {
  width: 200px;
}

.td-revision,
.td-class,
.td-date {
  width: 40px;
}

.td-title {
  width: 200px;
}

.text-center {
  text-align: center;
}

.full-width {
  width: 100%;
}
</style>