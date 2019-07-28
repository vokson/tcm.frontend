<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h3 v-if="language === 'RUS'">Просмотр трансмитталов</h3>
        <h3 v-else-if="language === 'ENG'">Search in transmitals</h3>
      </div>
    </div>

    <div class="row">
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

    <div class="row">

      <table class="table table-striped">
        <thead>
          <tr>
            <th class="td-date text-center">Дата</th>
            <th class="td-transmittal text-center">Трансмиттал</th>
            <th class="td-code text-center">Код TCM</th>
            <th class="td-code text-center">Код НИИК</th>
            <th class="td-revision text-center">Рев</th>
            <th class="td-class text-center">Класс</th>
            <th class="td-title text-center">Имя ENG</th>
            <th class="td-title text-center">Имя RUS</th>
          </tr>
        </thead>
        <tbody>

          <tr v-on:keyup.enter.prevent="getDocs">

            <td>
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

            <td class="text-center"><input
                type="text"
                v-model="search.transmittal"
                placeholder="Transmittal"
                class="full-width"
              /></td>

            <td class="text-center"><input
                type="text"
                v-model="search.code_1"
                placeholder="TCM Code"
                class="full-width"
              /></td>

            <td class="text-center"><input
                type="text"
                v-model="search.code_2"
                placeholder="NIIK Code"
                class="full-width"
              /></td>

            <td class="text-center"><input
                type="text"
                v-model="search.revision"
                placeholder="Rev"
                class="full-width"
              /></td>

            <td class="text-center"><input
                type="text"
                v-model="search.class"
                placeholder="Class"
                class="full-width"
              /></td>

            <td><input
                type="text"
                v-model="search.title_en"
                placeholder="Title ENG"
                class="full-width"
              /></td>

            <td><input
                type="text"
                v-model="search.title_ru"
                placeholder="Title RUS"
                class="full-width"
              /></td>

          </tr>

          <tr
            v-for="item in docs"
            :key="item.id"
          >
            <td class="text-center">{{formatDate(item.date)}}</td>
            <td class="text-center">{{item.code_1}}</td>
            <td class="text-center">{{item.code_2}}</td>
            <td class="text-center">{{item.revision}}</td>
            <td class="text-center">{{item.class}}</td>
            <td>{{item.title_en}}</td>
            <td>{{item.title_ru}}</td>

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
      return this.$store.getters['docs_search/give'];
    },

    countOfDocs: function () {
      return (this.docs == null) ? 0 : this.docs.length;
    },

    isSearchInProgress: function () {
      return this.$store.getters['docs_search/isProgress'];
    },

  },

  methods: {

    formatDate: function (timestamp) {
      let date = new Date();
      date.setTime(timestamp * 1000); // переводим в миллисекунды
      return ("0" + date.getHours()).slice(-2) + ':' +
        ("0" + date.getMinutes()).slice(-2) + ':' +
        ("0" + date.getSeconds()).slice(-2) + ' ' +
        ("0" + date.getDate()).slice(-2) + '.' +
        ("0" + (date.getMonth() + 1)).slice(-2) + '.' +
        date.getFullYear()
    },

    getDocs: function () {

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

    // downloadFile: function (file_id) {
    //   this.$store.dispatch('sender_file/download', {
    //     id: file_id
    //   });
    // },

    // downloadAllFiles: function () {
    //   if (this.files === null) {
    //     this.$store.dispatch('notify/showNotifyByCode', "E_FILE_006", { root: true });
    //     return;
    //   }

    //   this.$store.dispatch('sender_file/downloadAll', {
    //     ids: this.files.map(function (item) {
    //       return item.id;
    //     }).filter(function (id) {
    //       return id !== null;
    //     })
    //   });
    // },

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