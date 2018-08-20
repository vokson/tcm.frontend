<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h3 v-if="language === 'RUS'">Журнал событий проекта</h3>
        <h3 v-else-if="language === 'ENG'">Project Log</h3>
      </div>
    </div>

    <div class="row">

      <div class="col-4">

        <div class="row">
          <div class="col-3">
            <label v-if="language === 'RUS'">От</label>
            <label v-else-if="language === 'ENG'">From</label>
          </div>
          <div class="col-9">
            <select class="form-control" v-bind:value="fromId" v-on:change="fromId = $event.target.value">
              <option v-for="item in users" :key="item.id" v-bind:value="item.id">{{item.surname}} {{item.name}}</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col-3">
            <label v-if="language === 'RUS'">Кому</label>
            <label v-else-if="language === 'ENG'">To</label>
          </div>
          <div class="col-9">

            <select class="form-control" v-bind:value="toId" v-on:change="toId = $event.target.value">
              <option v-for="item in users" :key="item.id" v-bind:value="item.id">{{item.surname}} {{item.name}}</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col-3">

            <label v-if="language === 'RUS'">Титул</label>
            <label v-else-if="language === 'ENG'">Title</label>
          </div>
          <div class="col-9">

            <select class="form-control" v-bind:value="titleId" v-on:change="titleId = $event.target.value">
              <option v-for="item in titles" :key="item.id" v-bind:value="item.id">{{item.name}}</option>
            </select>
          </div>
        </div>

      </div>

      <div class="col-6">
        <textarea v-model="text" class="form-control" rows="4"></textarea>
      </div>

      <div class="col-2">
        <button type="button" class="btn btn-success" v-on:click="addItem">{{ (language == 'RUS') ? 'Добавить' : 'Add' }}</button>

        <!-- <button type="button" class="btn" v-on:click="getTitles">getTitles</button> -->
        <!-- <button type="button" class="btn" v-on:click="getUsers">getUsers</button> -->
      </div>

    </div>

    <br/>
    <div class="row">
      <div class="col">
        <button type="button" class="btn btn-block btn-warning" v-on:click="getItems">
          {{ (language == 'RUS') ? 'Найти' : 'Search' }}
          <span class="badge badge-light">{{countOfItems}}</span>
        </button>
      </div>
      <!-- <div class="col-6">
        <label v-if="language === 'RUS'">Кол-во найденных результатов: {{countOfItems}}</label>
        <label v-if="language === 'ENG'">Count of results: {{countOfItems}}</label>
      </div> -->
    </div>

    <div class="row">

      <table class="table table-striped">
        <thead>
          <tr>
            <th class="td-date text-center">Date</th>
            <th class="text-center">Title</th>
            <th class="text-center">From</th>
            <th class="text-center">What</th>
            <th class="text-center">To</th>
          </tr>
        </thead>
        <tbody>

          <tr>
            <td class="td-date">
              <datepicker v-model="search.date" :format="date_format" :bootstrap-styling="true" :language="ru"></datepicker>
            </td>
            <td class="text-center"><input type="text" v-model="search.title" placeholder="Титул" /></td>
            <td class="text-center"><input type="text" v-model="search.from" placeholder="От" /></td>
            <td class="text-center"><input type="text" v-model="search.what" placeholder="Текст" /></td>
            <td class="text-center"><input type="text" v-model="search.to" placeholder="Кому" /></td>
          </tr>

          <!-- <tr>
            <td>
              <label v-if="language === 'RUS'">Кол-во найденных результатов: {{countOfItems}}</label>
              <label v-if="language === 'ENG'">Count of results: {{countOfItems}}</label>
            </td>
          </tr> -->

          <tr v-for="item in items" :key="item.id">
            <td class="text-center">{{formatDate(item.date)}}</td>
            <td class="text-center">{{item.title}}</td>
            <td class="text-center">{{item.from}}</td>
            <td>{{item.what}}</td>
            <td class="text-center">{{item.to}}</td>
          </tr>

        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import { ru } from 'vuejs-datepicker/dist/locale'

export default {
  name: "Log",


  data: function () {
    return {

      date_format: "dd.MM.yyyy",
      ru: ru,

      titleId: null,
      toId: null,
      fromId: null,
      text: "",

      search: {
        to: "",
        from: "",
        what: "",
        title: "",
        date: null,
      }

    };
  },

  mounted: function () {

    this.$nextTick(function () {
      this.getTitles();
      this.getUsers();
    })
  },

  computed: {
    language: function () {
      return this.$store.state.language;
    },

    items: function () {
      return this.$store.getters['log/giveItems'];
    },

    titles: function () {
      return this.$store.getters['title/give'];
    },

    users: function () {
      return this.$store.getters['users/give'];
    },

    countOfItems: function () {
      return this.items.length;
    }

  },

  methods: {
    formatDate: function (timestamp) {
      let date = new Date();
      date.setTime(timestamp * 1000); // переводим в миллисекунды
      return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
    },

    getTitles: function () {
      this.$store.dispatch('title/get');
    },

    getUsers: function () {
      this.$store.dispatch('users/get');
    },

    getItems: function () {
      this.$store.dispatch('log/getItems', {
        to: this.search.to,
        from: this.search.from,
        title: this.search.title,
        what: this.search.what,
        date: (this.search.date == null) ? "" : Math.round(this.search.date.getTime() / 1000)
      });
    },

    addItem: function () {
      this.$store.dispatch('log/setItem', {
        to: this.toId,
        from: this.fromId,
        title: this.titleId,
        what: this.text,
      });
    },
  }
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