<template>
  <div class="container">
    <div class="row">
      <div class="col ">
        <h3 v-if="language === 'RUS'">Статистика по TQ</h3>
        <h3 v-else-if="language === 'ENG'">TQ statistic</h3>
      </div>
    </div>

    <div class="row">
      <div class="col-2 settings">

        <div class="row">
          <datepicker
            v-model="startDate"
            :format="date_format"
            :bootstrap-styling="true"
            :language="languageForDatePicker"
          ></datepicker>
          <datepicker
            class="date-container"
            v-model="endDate"
            :format="date_format"
            :bootstrap-styling="true"
            :language="languageForDatePicker"
          ></datepicker>
        </div>

        <div class="row">
          {{ (language == 'RUS') ? 'Регулярное выражение наименования титула:' : 'Regular expression for name of title:' }}
          <br />
          <input
            type="text"
            v-model="titleRegExp"
            placeholder="/^TQ.*/"
          />
          <a href="https://regex101.com/"> ? </a>
        </div>

        <div class="row">
          {{ (language == 'RUS') ? 'Регулярное выражение описания титула:' : 'Regular expression for description of title:' }}
          <br />
          <input
            type="text"
            v-model="descriptionRegExp"
            placeholder="/.*NVK.*/"
          />
        </div>

        <div class="row">
          <button
            type="button"
            class="btn btn-block btn-success"
            v-on:click="get"
          >
            {{ (language == 'RUS') ? 'Получить данные' : 'Get data' }}
          </button>
        </div>

      </div>

      <div
        class="col-9"
        v-if="items !== null"
      >

        <label>{{ (language == 'RUS') ? 'Отклонено' : 'Rejected' }}: {{items.count.rejected}}</label>
        <br />
        <label>{{ (language == 'RUS') ? 'Согласовано без изменения чертежей' : 'Approved without modification of drawings' }}: {{items.count.approvedWithoutChanges}}</label>
        <br />
        <label>{{ (language == 'RUS') ? 'Согласовано c изменениями чертежей' : 'Approved with modification of drawings' }}: {{items.count.approvedWithChanges}}</label>
        <br />
        <br />
        <h5> {{ (language == 'RUS') ? 'Причины изменений (кол-во измененных документов):' : 'Reason of modification (count of changed docs):' }}</h5>
        <label>1) {{ (language == 'RUS') ? 'Введение усовершенствований' : 'Incorporation of improvements' }}: {{items.changes.code_1}}</label>
        <br />
        <label>2) {{ (language == 'RUS') ? 'Изменение стандартов и норм' : 'Change of norms and standarts' }}: {{items.changes.code_2}}</label>
        <br />
        <label>3) {{ (language == 'RUS') ? 'Дополнительные требования заказчика' : 'Additional requirements of client' }}: {{items.changes.code_3}}</label>
        <br />
        <label>4) {{ (language == 'RUS') ? 'Устранение ошибок' : 'Correction of mistakes' }}: {{items.changes.code_4}}</label>

      </div>

    </div>

  </div>
</template>

<script>

import { en, ru } from 'vuejs-datepicker/dist/locale'

export default {
  name: "TqStatisticChart",

  data () {
    return {
      date_format: "dd.MM.yyyy",
      en: en,
      ru: ru,

      startDate: new Date(),
      endDate: new Date(),
      titleRegExp: "/^TQ.*/",
      descriptionRegExp: "/.*NVK.*/",

    }
  },

  computed: {
    language: function () {
      return this.$store.state.language;
    },

    languageForDatePicker: function () {
      if (this.language == "RUS") { return this.ru }
      if (this.language == "ENG") { return this.en }
    },

    items: function () {
      return this.$store.getters['chart_tq_status/give'];
      // return {
      //   count: {
      //     rejected: 10,
      //     approvedWithoutChanges: 20,
      //     approvedWithChanges: 30
      //   },
      //   changes: {
      //     code_1: 10,
      //     code_2: 20,
      //     code_3: 30,
      //     code_4: 40
      //   }
      // }
    },

  },

  methods: {

    get: function () {
      let queryObject = {
        title_regular_expression: this.titleRegExp,
        description_regular_expression: this.descriptionRegExp,
        date1: (this.startDate == null) ? "" : Math.round(this.startDate.getTime() / 1000),
        date2: (this.endDate == null) ? "" : Math.round(this.endDate.getTime() / 1000)
      };

      this.$store.dispatch('chart_tq_status/get', queryObject);
    },


  }


};
</script>

<style>
.settings {
  margin-right: 20px;
}

.date-container {
  margin-top: 3px;
}
</style>