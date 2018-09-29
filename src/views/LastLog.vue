<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h3 v-if="language === 'RUS'">Последние записи</h3>
        <h3 v-else-if="language === 'ENG'">Latest Logs</h3>
      </div>
    </div>

    <div class="row">

      <table class="table table-striped">

        <thead>
          <tr>
            <th class="text-center">ID</th>

            <th class="td-date text-center" v-if="language === 'ENG'">Date</th>
            <th class="td-date text-center" v-else-if="language === 'RUS'">Дата</th>

            <th class="text-center" v-if="language === 'ENG'">Title</th>
            <th class="text-center" v-else-if="language === 'RUS'">Титул</th>

            <th class="text-center" v-if="language === 'ENG'">From</th>
            <th class="text-center" v-else-if="language === 'RUS'">От кого</th>

            <th class="text-center" v-if="language === 'ENG'">What ?</th>
            <th class="text-center" v-else-if="language === 'RUS'">Что ?</th>

            <th class="text-center" v-if="language === 'ENG'">To</th>
            <th class="text-center" v-else-if="language === 'RUS'">Кому</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td class="text-center"> {{item.id}} </td>
            <td class="text-center">{{formatDate(item.date)}}</td>
            <td class="text-center">{{item.title}}</td>
            <td class="text-center">{{item.from}}</td>
            <td v-html="item.what"></td>
            <td class="text-center">{{item.to}}</td>
          </tr>
        </tbody>

      </table>
    </div>

  </div>
</template>

<script>

export default {
  name: "LastLog",

  mounted: function () {
    this.refreshItems();
  },

  computed: {
    language: function () {
      return this.$store.state.language;
    },

    items: function () {
      return this.$store.getters['last_logs/give'];
    },

  },

  methods: {
    formatDate: function (timestamp) {
      let date = new Date();
      date.setTime(timestamp * 1000); // переводим в миллисекунды
      return ("0" + date.getDate()).slice(-2) + '.' + ("0" + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear()
    },

    refreshItems: function () {
      this.$store.dispatch('last_logs/get', {});
    }

  },

  timers: {
    refreshItems: { time: 10000, autostart: true, repeat: true }
  },

};
</script>

<style>
.td-date {
  width: 130px;
}

.td-title {
  width: 120px;
}

.text-center {
  text-align: center;
}
</style>