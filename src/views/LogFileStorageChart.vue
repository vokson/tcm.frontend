<template>
  <div class="container">
    <div class="row">
      <div class="col ">
        <h3 v-if="language === 'RUS'">График объема занятого места для файлов, прикрепленных к записям</h3>
        <h3 v-else-if="language === 'ENG'">Chart of storage volume for files attached to log records</h3>
      </div>
    </div>

    <div class="row">
      <div class="col-2 settings">

        <div class="row">
          <label
            for="cumulativeCheckBox"
            class="form-check-label"
          >{{ (language == 'RUS') ? 'Кумулятивный график?' : 'Is cumulative chart?' }}</label>
          <input
            type="checkbox"
            class="form-check-input"
            id="cumulativeCheckBox"
            v-model="isCumulativeChart"
          >

        </div>

        <div class="row">
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
        </div>

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
      </div>

      <div class="col-9">

        <div class="row">
          <div class="chart">
            <line-log-article
              :chart-data="itemsForChart"
              :options="optionsForChart"
            ></line-log-article>
          </div>
        </div>

        <div class="row">
          <button
            type="button"
            class="btn btn-block btn-success"
            v-on:click="getItemsForChart"
          >
            {{ (language == 'RUS') ? 'Построить график' : 'Draw diagram' }}
          </button>
        </div>

      </div>

    </div>

  </div>
</template>

<script>

import LineLogArticle from './LineChart.js'
import { en, ru } from 'vuejs-datepicker/dist/locale'

export default {
  name: "LogFileStorageChart",

  data () {
    return {
      date_format: "dd.MM.yyyy",
      en: en,
      ru: ru,

      interval: "86400",
      startDate: new Date(),
      endDate: new Date(),
      // regExp: "/.*/",

      isCumulativeChart: false,

      // chart_data: null,

      optionsForChart: {
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

    itemsForChart: function () {
      if (this.rawItemsForChart === null) {

        return null;

      } else {

        return {

          color: "red",

          labels: this.rawItemsForChart.labels.map(function (value) {
            return new Date(value * 1000);
          }),

          datasets: [
            {
              backgroundColor: "rgba(252,147,65,0.5)",
              borderColor: "rgba(0,0,120,0.5)",
              pointBackgroundColor: "rgba(255,0,0,0.7)",
              label: 'Volume of storage space / Объем занимаемого места на диске - ' + this.countOfItemsForChart,
              data: this.rawItemsForChart.values
            }
          ]
        }

      }
    },

    rawItemsForChart: function () {
      return (this.isCumulativeChart === false) ? (this.$store.getters['chart_log_file_storage/giveItems']) : (this.$store.getters['chart_log_file_storage/giveItemsCumulative']);
    },

    countOfItemsForChart: function () {
      return this.$store.getters['chart_log_file_storage/giveItemsCount'];
    },

  },

  methods: {

    getItemsForChart: function () {
      let queryObject = {
        interval: this.interval,
        date1: (this.startDate == null) ? "" : Math.round(this.startDate.getTime() / 1000),
        date2: (this.endDate == null) ? "" : Math.round(this.endDate.getTime() / 1000)
      };

      this.$store.dispatch('chart_log_file_storage/getItems', queryObject);
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
  width: 100%;
}

.settings {
  margin-right: 20px;
}

.date-container {
  margin-top: 3px;
}
</style>