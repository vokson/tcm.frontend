<template>
  <div class="container">
    <div class="row">
      <div class="col ">
        <h3 v-if="language === 'RUS'">Статистика по проверенным чертежам</h3>
        <h3 v-else-if="language === 'ENG'">Statistic of checked drawings</h3>
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
          {{ (language == 'RUS') ? 'Регулярное выражение имени файла:' : 'Regular expression for name of file:' }}
          <br />
          <input
            type="text"
            v-model="fileRegExp"
            placeholder="/.*/"
          />
          <a href="https://regex101.com/"> ? </a>
        </div>

        <div class="row">
          <!-- <div class="col-3">
            <label v-if="language === 'RUS'">Кто ?</label>
            <label v-else-if="language === 'ENG'">Who ?</label>
          </div>
          <div class="col-9"> -->
          {{ (language == 'RUS') ? 'Кто ?' : 'Who ?' }}
          <select
            class="form-control"
            v-bind:value="userId"
          >
            <option
              v-for="item in users"
              :key="item.id"
              v-bind:value="item.id"
            >
              {{item.surname}} {{item.name}}
            </option>
          </select>
          <!-- </div> -->
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
        <!-- <div class="row">
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
        <div class="row"><br /></div> -->

        <div class="row">
          <div class="checked-drawings-line-chart">
            <line-chart
              :chart-data="itemsForChart_1"
              :options="optionsForLineChart"
            ></line-chart>
          </div>
        </div>

        <div class="row">
          <div class="checked-drawings-line-chart">
            <line-chart
              :chart-data="itemsForChart_2"
              :options="optionsForLineChart"
            ></line-chart>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import LineChart from './LineChart.js'
import { en, ru } from 'vuejs-datepicker/dist/locale'

export default {
  name: "CheckedDrawingsChart",

  data () {
    return {
      date_format: "dd.MM.yyyy",
      en: en,
      ru: ru,

      startDate: new Date(),
      endDate: new Date(),
      fileRegExp: "/.*/",
      userId: null,


      optionsForLineChart: {
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

      // optionsForLineChart: {
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
      //         color: "gray"
      //       },
      //     }],

      //     yAxes: [{
      //       gridLines: {
      //         display: true,
      //         color: "gray"
      //       },

      //     }]
      //   }
      // }

    }
  },

  components: {
    LineChart
  },

  mounted: function () {

    this.$nextTick(function () {
      this.getUsers();
      this.userId = this.$store.state.user.id;
    });

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
      return this.$store.getters['chart_checked_drawings/give'];
    },

    users: function () {
      return this.$store.getters['users/give'];
    },

    itemsForChart_1: function () {
      return {

        color: "red",

        datasets: [
          {
            data: this.items.in.drawings.values,
            label: 'Проверено чужих чертежей',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            borderColor: "rgba(0,0,120,0.5)",
            pointBackgroundColor: "rgba(255,0,0,0.7)",
          },

          {
            data: this.items.in.mistakes.values,
            label: 'Найдено чужих ошибок',
            backgroundColor: 'rgba(0, 255, 0, 0.5)',
            borderColor: "rgba(0,0,120,0.5)",
            pointBackgroundColor: "rgba(255,0,0,0.7)",
          }

        ],

        labels: this.items.in.drawings.labels.map(function (value) {
          return new Date(value * 1000);
        }),

      }
    },

    itemsForChart_2: function () {
      return {

        color: "red",

        datasets: [
          {
            data: this.items.out.drawings.values,
            label: 'Отправлено чертежей на проверку',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            borderColor: "rgba(0,0,120,0.5)",
            pointBackgroundColor: "rgba(255,0,0,0.7)",
          },

          {
            data: this.items.out.mistakes.values,
            label: 'В них найдено ошибок',
            backgroundColor: 'rgba(0, 255, 0, 0.5)',
            borderColor: "rgba(0,0,120,0.5)",
            pointBackgroundColor: "rgba(255,0,0,0.7)",
          }

        ],

        labels: this.items.out.drawings.labels.map(function (value) {
          return new Date(value * 1000);
        }),

      }
    },

  },

  methods: {

    getUsers: function () {
      this.$store.dispatch('users/get', {});
    },

    get: function () {
      let queryObject = {
        file_regular_expression: this.fileRegExp,
        user_id: this.userId,
        interval: 60 * 60 * 24,
        date1: (this.startDate == null) ? "" : Math.round(this.startDate.getTime() / 1000),
        date2: (this.endDate == null) ? "" : Math.round(this.endDate.getTime() / 1000)
      };

      this.$store.dispatch('chart_checked_drawings/get', queryObject);
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

/* .doughnut-chart {
  width: 300px;
  height: 300px;
} */

.settings {
  margin-right: 20px;
}

.date-container {
  margin-top: 3px;
}
</style>