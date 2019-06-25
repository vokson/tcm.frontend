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
          {{ (language == 'RUS') ? 'Кто ?' : 'Who ?' }}
          <select
            class="form-control"
            v-bind:value="userId"
            v-on:change="userId = $event.target.value"
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
        class="col-9"
        v-if="items !== null"
      >
        <div class="row">
          <div class="checked-drawings-line-chart">
            <line-chart
              :chart-data="itemsForChart_1"
              :options="optionsForLineChart"
            ></line-chart>
          </div>
        </div>

        <div class="row">
          <div>
            <doughnut-chart
              :chart-data="itemsForChart_3"
              :options="optionsForDoughnutChart"
            ></doughnut-chart>
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

        <div class="row">
          <div>
            <doughnut-chart
              :chart-data="itemsForChart_4"
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
      interval: "86400",

      optionsForDoughnutChart: {},

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


    }
  },

  components: {
    DoughnutChart,
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
            borderColor: "rgba(0, 0, 255, 0.5)",
            fill: false,
            pointBackgroundColor: "rgba(255,0,0,0.7)",
          },

          {
            data: this.items.in.mistakes.values,
            label: 'Найдено чужих ошибок',
            borderColor: "rgba(255, 0, 0, 0.5)",
            fill: false,
            pointBackgroundColor: "rgba(255,0,0,0.7)",
          },

          {
            data: this.divideOneArrayTwoSecond(this.items.in.mistakes.values, this.items.in.drawings.values, 10),
            label: 'Ошибки/Чертежи',
            borderColor: "rgba(0, 255, 0, 0.5)",
            fill: false,
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
            borderColor: "rgba(0, 0, 255, 0.5)",
            fill: false,
            pointBackgroundColor: "rgba(255,0,0,0.7)",
          },

          {
            data: this.items.out.mistakes.values,
            label: 'В них найдено ошибок',
            borderColor: "rgba(255, 0, 0, 0.5)",
            fill: false,
            pointBackgroundColor: "rgba(255,0,0,0.7)",
          },

          {
            data: this.divideOneArrayTwoSecond(this.items.out.mistakes.values, this.items.out.drawings.values, 10),
            label: 'Ошибки/Чертежи',
            borderColor: "rgba(0, 255, 0, 0.5)",
            fill: false,
            pointBackgroundColor: "rgba(255,0,0,0.7)",
          }

        ],

        labels: this.items.out.drawings.labels.map(function (value) {
          return new Date(value * 1000);
        }),

      }
    },

    itemsForChart_3: function () {
      return {
        datasets: [{

          data: this.items.in.distribution.values,

          backgroundColor: this.items.in.distribution.labels.map(function () {
            return this.getRandomColor();
          }, this),

        }],

        labels: this.items.in.distribution.labels.map(function (id) {
          return this.getSurnameAndNameOfUserById(id);
        }, this),

      }
    },

    itemsForChart_4: function () {
      return {
        datasets: [{

          data: this.items.out.distribution.values,

          backgroundColor: this.items.out.distribution.labels.map(function () {
            return this.getRandomColor();
          }, this),

        }],

        labels: this.items.out.distribution.labels.map(function (id) {
          return this.getSurnameAndNameOfUserById(id);
        }, this),
      }
    }
  },



  methods: {

    getUsers: function () {
      this.$store.dispatch('users/get', {});
    },

    get: function () {
      let queryObject = {
        file_regular_expression: this.fileRegExp,
        user_id: this.userId,
        interval: this.interval,
        date1: (this.startDate == null) ? "" : Math.round(this.startDate.getTime() / 1000),
        date2: (this.endDate == null) ? "" : Math.round(this.endDate.getTime() / 1000)
      };

      this.$store.dispatch('chart_checked_drawings/get', queryObject);
    },

    getRandomColor: function () {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },

    getSurnameAndNameOfUserById: function (id) {

      let filteredUsers = this.users.filter(function (obj) {
        return obj.id == id;
      }, this);

      return (filteredUsers.length > 0) ? (filteredUsers[0].surname + ' ' + filteredUsers[0].name) : id;
    },

    divideOneArrayTwoSecond: function (arr1, arr2, mult) {

      // console.log(arr1);

      let result = arr1.slice();

      for (let i = 0; i < result.length; i++) {
        if (arr2[i] === 0) {
          result[i] = 0;
        } else {
          result[i] = result[i] / arr2[i] * mult;
        }
      }

      return result;

    }

  },



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
</style>