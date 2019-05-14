<template>
  <div class="container">
    <div class="row">
      <div class="col ">
        <h3 v-if="language === 'RUS'">Рейтинги из Проверяшки</h3>
        <h3 v-else-if="language === 'ENG'">Ratings from Checker</h3>
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
        <div class="row">

          <table class="table table-striped">
            <thead>
              <tr>
                <th class="td-owner text-center">{{ (language == 'RUS') ? 'Пользователь' : 'User' }}</th>
                <th class="text-center">{{ (language == 'RUS') ? 'Рейтинг' : 'Rating' }} (+)</th>
                <th class="text-center">{{ (language == 'RUS') ? 'Рейтинг' : 'Rating' }} (-)</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in items"
                :key="item.id"
              >
                <td class="text-center">{{item.owner}}</td>
                <td class="text-center">{{adoptPositiveRating(item.positiveRating)}}</td>
                <td class="text-center">{{adoptNegativeRating(item.negativeRating)}}</td>
              </tr>
            </tbody>
          </table>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { en, ru } from 'vuejs-datepicker/dist/locale'

export default {
  name: "CheckerRatingChart",

  data () {
    return {
      date_format: "dd.MM.yyyy",
      en: en,
      ru: ru,

      startDate: new Date(),
      endDate: new Date(),
    }
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

    items: function () {
      return this.$store.getters['chart_checker_rating/give'];
    },



  },

  methods: {

    get: function () {
      let queryObject = {
        date1: (this.startDate == null) ? "" : Math.round(this.startDate.getTime() / 1000),
        date2: (this.endDate == null) ? "" : Math.round(this.endDate.getTime() / 1000)
      };

      this.$store.dispatch('chart_checker_rating/get', queryObject);
    },

    adoptPositiveRating: function (r) {
      return (r * 10).toFixed(2);
    },

    adoptNegativeRating: function (r) {
      return ((1 - r) * 10).toFixed(2);
    },

  }


};
</script>

<style>
.checked-drawings-line-chart {
  background: silver;
  border-radius: 15px;
  box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.settings {
  margin-right: 20px;
}

.date-container {
  margin-top: 3px;
}

.rating-text {
  text-align: center;
}
</style>