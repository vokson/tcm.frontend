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
        <button type="button" class="btn" v-on:click="getTitles">getTitles</button>
        <button type="button" class="btn" v-on:click="getUsers">getUsers</button>
      </div>

    </div>

    <br/>

    <div class="row">

      <table class="table table-striped">
        <thead>
          <tr>
            <th class="td-date text-center">Date</th>
            <th class="td-title">Title</th>
            <th class="text-center">From</th>
            <th class="text-center">What</th>
            <th class="text-center">To</th>
          </tr>
        </thead>
        <tbody>

          <tr v-for="item in items" :key="item.id">
            <td>{{item.date}}</td>
            <td>{{item.title}}</td>
            <td>{{item.from}}</td>
            <td>{{item.what}}</td>
            <td>{{item.to}}</td>
          </tr>

        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  name: "Log",


  data: function () {
    return {

      titleId: null,
      toId: null,
      fromId: null,
      text: "",

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

  },

  methods: {
    getTitles: function () {
      this.$store.dispatch('title/get');
    },

    getUsers: function () {
      this.$store.dispatch('users/get');
    },

    // getItems: function () {
    //   this.$store.dispatch('log/getItems');
    // },

    addItem: function () {
      this.$store.dispatch('log/setItem', {
        to: this.toId,
        from: this.fromId,
        title: this.titleId,
        what: this.text
      });
    },
  }
};
</script>

<style>
.td-date {
  width: 120px;
}

.td-title {
  width: 160px;
}

.text-center {
  text-align: center;
}
</style>