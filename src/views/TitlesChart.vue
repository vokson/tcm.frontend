<template>
  <div class="container">
    <div class="row">
      <div class="col ">
        <h3 v-if="language === 'RUS'">График зарегистрированных титулов</h3>
        <h3 v-else-if="language === 'ENG'">Chart of registered titles</h3>
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
          {{ (language == 'RUS') ? 'Регулярное выражение:' : 'Regular expression:' }}
          <br />
          <input
            type="text"
            v-model="regExp"
            placeholder="/.*/"
          />
          <a href="https://regex101.com/"> ? </a>
        </div>
        <div class="row">
          <a
            v-on:click='setRegExpToAll'
            href="#"
          > All / Все </a>
        </div>
        <div class="row">
          <a
            v-on:click='setRegExpToKJDRW'
            href="#"
          > KJ*.DRW </a>
        </div>
        <div class="row">
          <a
            v-on:click='setRegExpToKJRR'
            href="#"
          > KJ*.RR </a>
        </div>
        <div class="row">
          <a
            v-on:click='setRegExpToAR'
            href="#"
          > AR* </a>
        </div>
        <div class="row">
          <a
            v-on:click='setRegExpToNVK'
            href="#"
          > NVK* </a>
        </div>
        <div class="row">
          <a
            v-on:click='setRegExpToGP'
            href="#"
          > GP*, GT* </a>
        </div>
        <div class="row">
          <a
            v-on:click='setRegExpToER'
            href="#"
          > ER*, ES* </a>
        </div>

        <div class="row">
          <a
            v-on:click='setRegExpToPS'
            href="#"
          > PS*, AK* </a>
        </div>

        <div class="row">
          <a
            v-on:click='setRegExpToTQ'
            href="#"
          > TQ*</a>
        </div>

      </div>

      <div class="col-9">

        <div class="row">
          <div class="line-chart">
            <line-log-article
              :chart-data="itemsForLogChart"
              :options="optionsForLogChart"
            ></line-log-article>
          </div>
        </div>

        <div class="row">
          <button
            type="button"
            class="btn btn-block btn-success"
            v-on:click="getItemsForLogChart"
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
  name: "TitlesChart",

  data () {
    return {
      date_format: "dd.MM.yyyy",
      en: en,
      ru: ru,

      interval: "86400",
      startDate: new Date(),
      endDate: new Date(),
      regExp: "/.*/",

      isCumulativeChart: false,

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
              backgroundColor: "rgba(252,147,65,0.5)",
              borderColor: "rgba(0,0,120,0.5)",
              pointBackgroundColor: "rgba(255,0,0,0.7)",
              label: 'Count of Log Records / Кол-во новых записей - ' + this.countOfItemsForLogChart,
              data: this.rawItemsForLogChart.values
            }
          ]
        }

      }
    },

    rawItemsForLogChart: function () {
      return (this.isCumulativeChart === false) ? (this.$store.getters['chart_created_titles/giveCreatedTitles']) : (this.$store.getters['chart_created_titles/giveCreatedTitlesCumulative']);
    },

    countOfItemsForLogChart: function () {
      return this.$store.getters['chart_created_titles/giveCreatedTitlesCount'];
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

      this.$store.dispatch('chart_created_titles/getCreatedTitles', queryObject);
    },

    setRegExpToAll: function () {
      this.regExp = "/.*/";
    },

    setRegExpToKJDRW: function () {
      this.regExp = '/.*[-]{1}KJ[\\d]*\\.DRW$/';
    },

    setRegExpToKJRR: function () {
      this.regExp = '/.*[-]{1}KJ[\\d]*\\.RR$/';
    },

    setRegExpToAR: function () {
      this.regExp = '/.*[-]{1}AR[\\d]*$/';
    },

    setRegExpToNVK: function () {
      this.regExp = '/.*[-]{1}NVK[\\d]*$/';
    },

    setRegExpToGP: function () {
      this.regExp = '/.*[-]{1}(GP|GT){1}[\\d]*$/';
    },

    setRegExpToER: function () {
      this.regExp = '/.*[-]{1}(ER|ES){1}[\\d]*$/';
    },

    setRegExpToPS: function () {
      this.regExp = '/.*[-]{1}(PS|AK){1}[\\d]*$/';
    },


    setRegExpToTQ: function () {
      this.regExp = '/^TQ.*/';
    },

  }


};
</script>

<style>
.line-chart {
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