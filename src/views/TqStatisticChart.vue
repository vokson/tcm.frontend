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
        <!-- 
        <div class="row">
          {{ (language == 'RUS') ? 'Регулярное выражение статуса титула:' : 'Regular expression for status of title:' }}
          <br />
          <input
            type="text"
            v-model="statusRegExp"
            placeholder="/BACKLOG/"
          />
        </div> -->

      </div>

      <div class="col-9">

        <label> {{ (language == 'RUS') ? 'Отклонено' : 'Rejected' }}: {{items.count.rejected}}</label><br />
        <label> {{ (language == 'RUS') ? 'Согласовано без изменения чертежей' : 'Approved without modification of drawings' }}: {{items.count.approvedWithoutChanges}}</label><br />
        <label> {{ (language == 'RUS') ? 'Согласовано c изменениями чертежей' : 'Approved with modification of drawings' }}: {{items.count.approvedWithСhanges}}</label><br />

        <!-- <div class="row">
          <div class="chart">
            <line-chart
              :chart-data="itemsForChart"
              :options="optionsForChart"
            ></line-chart>
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
        </div> -->

      </div>

    </div>

  </div>
</template>

<script>

// import LineChart from './LineChart.js'
import { en, ru } from 'vuejs-datepicker/dist/locale'

export default {
  name: "TqStatisticChart",

  data () {
    return {
      date_format: "dd.MM.yyyy",
      en: en,
      ru: ru,

      // interval: "86400",
      startDate: new Date(),
      endDate: new Date(),
      titleRegExp: "/^TQ.*/",
      descriptionRegExp: "/.*NVK.*/",
      // statusRegExp: "/BACKLOG/",


      // optionsForChart: {
      //   elements: {
      //     line: {
      //       tension: 0, // disables bezier curves
      //     }
      //   },
      //   responsive: true,
      //   maintainAspectRatio: false,
      //   scales: {

      //     xAxes: [{
      //       gridLines: {
      //         display: true,
      //         color: "white"
      //       },
      //       type: 'time',
      //       time: {
      //         unit: 'day'
      //       }
      //     }],

      //     yAxes: [{
      //       gridLines: {
      //         display: true,
      //         color: "white"
      //       },

      //     }]
      //   }
      // }
    }
  },

  // components: {
  //   LineChart
  // },

  computed: {
    language: function () {
      return this.$store.state.language;
    },

    languageForDatePicker: function () {
      if (this.language == "RUS") { return this.ru }
      if (this.language == "ENG") { return this.en }
    },

    // itemsForChart: function () {
    //   if (this.rawItemsForChart === null) {

    //     return null;

    //   } else {

    //     return {

    //       color: "red",

    //       labels: this.rawItemsForChart.labels.map(function (value) {
    //         return new Date(value * 1000);
    //       }),

    //       datasets: [
    //         {
    //           backgroundColor: "rgba(252,147,65,0.5)",
    //           borderColor: "rgba(0,0,120,0.5)",
    //           pointBackgroundColor: "rgba(255,0,0,0.7)",
    //           label: 'Count of titles / Кол-во титулов',
    //           data: this.rawItemsForChart.values
    //         }
    //       ]
    //     }

    //   }
    // },

    items: function () {
      return {
        count: {
          rejected: 10,
          approvedWithoutChanges: 20,
          approvedWithChanges: 30
        }
      }
      // return this.$store.getters['chart_title_status/give'];
    },

  },

  methods: {

    get: function () {
      let queryObject = {
        title_regular_expression: this.titleRegExp,
        description_regular_expression: this.descriptionRegExp,
        // status_regular_expression: this.statusRegExp,
        // interval: this.interval,
        date1: (this.startDate == null) ? "" : Math.round(this.startDate.getTime() / 1000),
        date2: (this.endDate == null) ? "" : Math.round(this.endDate.getTime() / 1000)
      };

      this.$store.dispatch('chart_title_status/get', queryObject);
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