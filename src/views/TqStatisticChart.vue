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
        class="col-7"
        v-if="items !== null"
      >
        <div class="row">
          {{ (language == 'RUS') ? 'Отклонено' : 'Rejected' }}: {{items.count.rejected}}
        </div>
        <div class="row">{{ (language == 'RUS') ? 'Согласовано без изменения чертежей' : 'Approved without modification of drawings' }}: {{items.count.approvedWithoutChanges}}</div>
        <div class="row">{{ (language == 'RUS') ? 'Согласовано c изменениями чертежей' : 'Approved with modification of drawings' }}: {{items.count.approvedWithChanges}}</div>
        <div class="row"><br /></div>
        <div class="row">
          <h5> {{ (language == 'RUS') ? 'Причины изменений (кол-во измененных документов):' : 'Reason of modification (count of changed docs):' }}</h5>
        </div>
        <div class="row">1) {{ (language == 'RUS') ? 'Введение усовершенствований' : 'Incorporation of improvements' }}: {{items.changes.code_1}}</div>
        <div class="row">2) {{ (language == 'RUS') ? 'Изменение стандартов и норм' : 'Change of norms and standarts' }}: {{items.changes.code_2}}</div>
        <div class="row">3) {{ (language == 'RUS') ? 'Дополнительные требования заказчика' : 'Additional requirements of client' }}: {{items.changes.code_3}}</div>
        <div class="row">4) {{ (language == 'RUS') ? 'Устранение ошибок' : 'Correction of mistakes' }}: {{items.changes.code_4}}</div>
        <div class="row"><br /></div>

        <div class="row">
          <div class="tq-statistic-line-chart">
            <line-chart
              :chart-data="itemsForChart_3"
              :options="optionsForLineChart"
            ></line-chart>
          </div>
        </div>

        <div class="row">
          <div class="tq-statistic-line-chart">
            <line-chart
              :chart-data="itemsForChart_4"
              :options="optionsForLineChart"
            ></line-chart>
          </div>
        </div>

        <div class="row">
          <div class="tq-statistic-line-chart">
            <line-chart
              :chart-data="itemsForChart_5"
              :options="optionsForLineChart"
            ></line-chart>
          </div>
        </div>

      </div>

      <div
        class="col-2"
        v-if="items !== null"
      >

        <div class="row">
          <div class='doughnut-chart'>
            <doughnut-chart
              :chart-data="itemsForChart_1"
              :options="optionsForDoughnutChart"
            ></doughnut-chart>
          </div>
        </div>

        <div class="row">
          <div class='doughnut-chart'>
            <doughnut-chart
              :chart-data="itemsForChart_2"
              :options="optionsForDoughnutChart"
            ></doughnut-chart>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
import DoughnutChart from './DoughnutChart.js'
import LineChart from './LineChart.js'
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

      optionsForDoughnutChart: {},

      optionsForLineChart: {
        elements: {
          line: {
            tension: 0, // disables bezier curves
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {

          xAxes: [{
            gridLines: {
              display: true,
              color: "gray"
            },
          }],

          yAxes: [{
            gridLines: {
              display: true,
              color: "gray"
            },

          }]
        }
      }
    }
  },

  components: {
    DoughnutChart,
    LineChart
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
    },

    itemsForChart_1: function () {
      return {
        datasets: [{
          data: [this.items.count.rejected, this.items.count.approvedWithoutChanges, this.items.count.approvedWithChanges],
          backgroundColor: ['rgba(255, 0, 0, 0.5)', 'rgba(0,255, 0, 0.5)', 'rgba(0, 0, 255, 0.5)']
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'Отклонено',
          'Согласовано без изменений',
          'Согласовано с изменениями'
        ]
      }
    },

    itemsForChart_2: function () {
      return {
        datasets: [{
          data: [
            this.items.changes.code_1,
            this.items.changes.code_2,
            this.items.changes.code_3,
            this.items.changes.code_4
          ],
          backgroundColor: [
            'purple',
            'green',
            'yellow',
            'orange'
          ]
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: ['(1)', '(2)', '(3)', '(4)']
      }
    },

    itemsForChart_3: function () {
      return {
        labels: this.items.days.labels,

        datasets: [{
          borderColor: "rgba(255,0,0,0.8)",
          pointBackgroundColor: "rgba(255,0,0,0.7)",
          backgroundColor: "rgba(255,255,0,0.2)",
          label: 'Rejected / Отклонено',
          data: this.items.days.rejected,
        },]
      }


    },

    itemsForChart_4: function () {
      return {
        labels: this.items.days.labels,

        datasets: [{
          borderColor: "rgba(0,255,0,0.8)",
          pointBackgroundColor: "rgba(255,0,0,0.7)",
          backgroundColor: "rgba(255,255,0,0.2)",
          label: 'Approved without chnages / Согласовано без изменений',
          data: this.items.days.approvedWithoutChanges,
        },]
      }


    },

    itemsForChart_5: function () {
      return {
        labels: this.items.days.labels,

        datasets: [{
          borderColor: "rgba(0,0,255,0.8)",
          pointBackgroundColor: "rgba(255,0,0,0.7)",
          backgroundColor: "rgba(255,255,0,0.2)",
          label: 'Approved with changes / Согласовано с изменениями',
          data: this.items.days.approvedWithChanges,
        },]
      }


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
.tq-statistic-line-chart {
  border-radius: 15px;
  box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.doughnut-chart {
  width: 300px;
  height: 300px;
}

.settings {
  margin-right: 20px;
}

.date-container {
  margin-top: 3px;
}
</style>