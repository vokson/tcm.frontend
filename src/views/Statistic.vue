<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h3 v-if="language === 'RUS'">Статистика по Проекту</h3>
        <h3 v-else-if="language === 'ENG'">Statistic for Project</h3>
      </div>
    </div>

    <div class="row">
      <div class="col-2">
        <!-- <b-form-group label="Выберите промежуток времени"> -->
        <b-form-radio-group
          id="chart_intervals"
          v-model="interval"
          name="radioSubComponent"
        >
          <b-form-radio
            value="86400"
            checked
          >{{ (language == 'RUS') ? 'День' : 'Day' }}</b-form-radio>
          <br />
          <b-form-radio value="604800">{{ (language == 'RUS') ? 'Неделя' : 'Week' }}</b-form-radio>
          <br />
          <b-form-radio value="2635200">{{ (language == 'RUS') ? 'Месяц' : 'Month' }}</b-form-radio>

        </b-form-radio-group>
        <!-- </bs-form-group> -->
      </div>

      <div class="col-3">
        <datepicker
          v-model="startDate"
          :format="date_format"
          :bootstrap-styling="true"
          :language="languageForDatePicker"
        ></datepicker>
        <datepicker
          v-model="endDate"
          :format="date_format"
          :bootstrap-styling="true"
          :language="languageForDatePicker"
        ></datepicker>
      </div>

      <div class="col-4">
        <input
          type="text"
          v-model="regExp"
          placeholder="Regular expression (php)"
        />
        <a href="https://regex101.com/"> ? </a>
      </div>

      <div class="col-3">
        <button
          type="button"
          class="btn btn-block btn-success"
          v-on:click="getItemsForLogChart"
        >
          {{ (language == 'RUS') ? 'Найти' : 'Search' }}
        </button>
      </div>

    </div>

    <div class="row">
      <div class="chart">
        <line-log-article
          :chart-data="itemsForLogChart"
          :options="optionsForLogChart"
        ></line-log-article>
      </div>
    </div>

  </div>
</template>

<script>

import LineLogArticle from './LineChart.js'
import { en, ru } from 'vuejs-datepicker/dist/locale'

export default {
  name: "Statistic",

  data () {
    return {
      date_format: "dd.MM.yyyy",
      en: en,
      ru: ru,

      interval: "86400",
      startDate: new Date(),
      endDate: new Date(),
      regExp: "/.*/",

      // chart_data: null,

      optionsForLogChart: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {

          xAxes: [{
            gridLines: {
              display: true,
              color: "white"
            },
            type: 'time',
            time: {
              unit: 'day'
            }
          }],

          yAxes: [{
            gridLines: {
              display: true,
              color: "white"
            },

          }]
        }
      }
    }
  },

  components: {
    LineLogArticle
  },

  computed: {
    language: function () {
      return this.$store.state.language;
    },

    languageForDatePicker: function () {
      if (this.language == "RUS") { return this.ru }
      if (this.language == "ENG") { return this.en }
    },

    itemsForLogChart: function () {
      if (this.rawItemsForLogChart === null) {

        return null;

      } else {

        return {

          color: "red",

          labels: this.rawItemsForLogChart.labels.map(function (value) {
            return new Date(value * 1000);
          }),

          datasets: [
            {
              // fillColor: "rgba(151,249,190,0.5)",
              // strokeColor: "rgba(255,255,255,1)",
              // pointColor: "rgba(220,220,220,1)",
              // pointStrokeColor: "#fff",
              backgroundColor: "rgba(252,147,65,0.5)",
              borderColor: "rgba(0,0,120,0.5)",
              pointBackgroundColor: "rgba(255,0,0,0.7)",
              label: 'Log Records',
              data: this.rawItemsForLogChart.values
            }
          ]
        }

      }
    },

    rawItemsForLogChart: function () {
      return this.$store.getters['stat/giveCreatedLogs'];
    },

  },

  methods: {

    getItemsForLogChart: function () {
      let queryObject = {
        regular_expression: this.regExp,
        interval: this.interval,
        date1: (this.startDate == null) ? "" : Math.round(this.startDate.getTime() / 1000),
        date2: (this.endDate == null) ? "" : Math.round(this.endDate.getTime() / 1000)
      };

      this.$store.dispatch('stat/getCreatedLogs', queryObject);
    },
  }


};
</script>

<style>
.chart {
  background: silver;
  border-radius: 15px;
  box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  /* max-height: 400px; */
}
</style>