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
            {{ (language == 'RUS') ? 'Получить данные (это не быстро)' : 'Get data (not fast)' }}
          </button>
        </div>

      </div>

      <div class="col-9">

        <div class="row rating-description">
          Рейтинг разделен на позитивный и негативный. Позитивный рейтинг R(+) отражает % чертежей, получивший
          одобрение с первого раза, по 10-ти балльной шкале. Негативный рейтинг сильно сложнее. Он рассчитывается
          следующим образом. Исходя из статистики по всем пользователям за все время, находим кол-во ошибок, более которого
          пользователи не совершают с вероятностью {{ (settingRatingMistakeProbability*100).toFixed() }}%.
          На данный момент данное кол-во ошибок Emax = {{ settingRatingMistakeCount }}. Далее для
          каждого пользователя находим все значения Ei количества ошибок, которые он получил за выбранный перииод
          от других пользователей. Находим рейтинг по каждому значению Rui = min(Ei/Emax; 1.0). Rui представляют
          собой числа от 0.0 до 1.0. Далее находим суммарный рейтинг R по формуле при Rq = {{ settingRatingInitialValue}}
        </div>

        <div class="row">
          <a href="https://yandex.ru/support/partnermarket/calculate.html">https://yandex.ru/support/partnermarket/calculate.html</a>
        </div>

        <div class="row">
          Окончательно рейтинг по 10-ти балльной шкале R(-) = (1-R)*10
        </div>

        <div
          class="row"
          v-if="items !== null"
        >

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

  mounted: function () {
    this.$nextTick(function () {
      this.getSettings();
    })

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
      return this.$store.getters['chart_checker_rating/give'];
    },

    settings: function () {
      let elems = this.$store.getters['setting/give']

      if (elems === null) return null;

      let obj = {};
      elems.map((e) => {
        obj[e.name] = e.value;
      });

      return obj;
    },

    settingRatingMistakeCount: function () {
      return (this.settings == null) ? null : Number(this.settings['RATING_MISTAKE_COUNT']);
    },

    settingRatingMistakeProbability: function () {
      return (this.settings == null) ? null : Number(this.settings['RATING_MISTAKE_PROBABILITY']);
    },

    settingRatingInitialValue: function () {
      return (this.settings == null) ? null : Number(this.settings['RATING_INITIAL_VALUE']);
    }

  },

  methods: {

    get: function () {
      let queryObject = {
        date1: (this.startDate == null) ? "" : Math.round(this.startDate.getTime() / 1000),
        date2: (this.endDate == null) ? "" : Math.round(this.endDate.getTime() / 1000)
      };

      this.$store.dispatch('chart_checker_rating/get', queryObject);
    },

    getSettings: function () {
      this.$store.dispatch('setting/get');
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

.rating-description {
  text-align: justify;
}
</style>