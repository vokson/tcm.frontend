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
                <th class="text-center">{{ (language == 'RUS') ? 'Рейтинг' : 'Rating' }}+</th>
                <th class="text-center">{{ (language == 'RUS') ? 'Рейтинг' : 'Rating' }}-</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in items"
                :key="item.id"
              >
                <td class="text-center">{{item.owner}}</td>
                <td class="text-center">{{item.positiveRating}}</td>
                <td class="text-center">{{item.negativeRating}}</td>
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
      return this.$store.getters['chart_checked_drawings/give'];
    },

    // users: function () {
    //   return this.$store.getters['users/give'];
    // },

    // itemsForChart_1: function () {
    //   return {

    //     color: "red",

    //     datasets: [
    //       {
    //         data: this.items.in.drawings.values,
    //         label: 'Проверено чужих чертежей',
    //         borderColor: "rgba(0, 0, 255, 0.5)",
    //         fill: false,
    //         pointBackgroundColor: "rgba(255,0,0,0.7)",
    //       },

    //       {
    //         data: this.items.in.mistakes.values,
    //         label: 'Найдено чужих ошибок',
    //         borderColor: "rgba(255, 0, 0, 0.5)",
    //         fill: false,
    //         pointBackgroundColor: "rgba(255,0,0,0.7)",
    //       }

    //     ],

    //     labels: this.items.in.drawings.labels.map(function (value) {
    //       return new Date(value * 1000);
    //     }),

    //   }
    // },

    // itemsForChart_2: function () {
    //   return {

    //     color: "red",

    //     datasets: [
    //       {
    //         data: this.items.out.drawings.values,
    //         label: 'Отправлено чертежей на проверку',
    //         borderColor: "rgba(0, 0, 255, 0.5)",
    //         fill: false,
    //         pointBackgroundColor: "rgba(255,0,0,0.7)",
    //       },

    //       {
    //         data: this.items.out.mistakes.values,
    //         label: 'В них найдено ошибок',
    //         borderColor: "rgba(255, 0, 0, 0.5)",
    //         fill: false,
    //         pointBackgroundColor: "rgba(255,0,0,0.7)",
    //       }

    //     ],

    //     labels: this.items.out.drawings.labels.map(function (value) {
    //       return new Date(value * 1000);
    //     }),

    //   }
    // },

    // itemsForChart_3: function () {
    //   return {
    //     datasets: [{

    //       data: this.items.in.distribution.values,

    //       backgroundColor: this.items.in.distribution.labels.map(function () {
    //         return this.getRandomColor();
    //       }, this),

    //     }],

    //     labels: this.items.in.distribution.labels.map(function (id) {
    //       return this.getSurnameAndNameOfUserById(id);
    //     }, this),

    //   }
    // },

    // itemsForChart_4: function () {
    //   return {
    //     datasets: [{

    //       data: this.items.out.distribution.values,

    //       backgroundColor: this.items.out.distribution.labels.map(function () {
    //         return this.getRandomColor();
    //       }, this),

    //     }],

    //     labels: this.items.out.distribution.labels.map(function (id) {
    //       return this.getSurnameAndNameOfUserById(id);
    //     }, this),
    //   }
    // },

    adoptPositiveRating: function (r) {
      return (r * 10).toFixed(2);
    },

    adoptNegativeRating: function (r) {
      return ((1 - r) * 10).toFixed(2);
    },

  },

  methods: {

    // getUsers: function () {
    //   this.$store.dispatch('users/get', {});
    // },

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

    testRating: function () {
      let queryObject = {
        user_id: this.userId,
        date1: (this.startDate == null) ? "" : Math.round(this.startDate.getTime() / 1000),
        date2: (this.endDate == null) ? "" : Math.round(this.endDate.getTime() / 1000)
      };

      this.$store.dispatch('checker_rating/get', queryObject);
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