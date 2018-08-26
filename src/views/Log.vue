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
          <div class="col">
            <label v-if="language === 'RUS'">Номер записи: {{targetItem.id}}</label>
            <label v-else-if="language === 'ENG'">Item's ID: {{targetItem.id}}</label>
          </div>
        </div>

        <div class="row">
          <div class="col-3">
            <label v-if="language === 'RUS'">Дата</label>
            <label v-else-if="language === 'ENG'">Date</label>
          </div>
          <div class="col-9">
            <datepicker v-model="targetItem.date" :format="date_format" :bootstrap-styling="true" :language="languageForDatePicker"></datepicker>
          </div>
        </div>

        <div class="row">
          <div class="col-3">
            <label v-if="language === 'RUS'">От</label>
            <label v-else-if="language === 'ENG'">From</label>
          </div>
          <div class="col-9">
            <select class="form-control" v-bind:value="targetItem.from" v-on:change="targetItem.from = $event.target.value">
              <option v-for="item in users" :key="item.id" v-bind:value="item.id">
                <!-- <option v-for="item in users" :key="item.id" v-bind:value="item.id" v-bind:selected="item.isMe"> -->
                {{item.surname}} {{item.name}}
              </option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col-3">
            <label v-if="language === 'RUS'">Кому</label>
            <label v-else-if="language === 'ENG'">To</label>
          </div>
          <div class="col-9">

            <select class="form-control" v-bind:value="targetItem.to" v-on:change="targetItem.to = $event.target.value">
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
            <input type="text" v-model="targetItem.title" class="form-control" />
            <!-- <select class="form-control" v-bind:value="targetItem.title" v-on:change="targetItem.title = $event.target.value">
              <option v-for="item in titles" :key="item.id" v-bind:value="item.id">{{item.name}}</option>
            </select> -->
          </div>
        </div>

        <div v-if="isNewItemMayBeAdded == true" class="row">
          <div class="col-3" />
          <div class="col-9">
            <button type="button" class="btn btn-block btn-primary" v-on:click="addItem">
              {{ (language == 'RUS') ? 'Добавить' : 'Add' }}
            </button>
          </div>
        </div>

        <div v-else class="row">
          <div class="col-3" />
          <div class="col-9">
            <div class="row">
              <div class="col">
                <button type="button" class="btn btn-block btn-warning" v-on:click="modifyItem">
                  {{ (language == 'RUS') ? 'Изменить' : 'Modify' }}
                </button>
              </div>
              <div class="col">
                <button type="button" class="btn btn-block btn-danger" v-on:click="deleteItem">
                  {{ (language == 'RUS') ? 'Удалить' : 'Delete' }}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="col-8">
        <div class="row">
          <div class="col">
            <editor v-model="targetItem.what" :editorToolbar="customEditorToolbar"></editor>
          </div>
        </div>
      </div>

    </div>

    <br/>
    <div class="row">
      <input type="checkbox" v-model="search.is_only_last" title="Только последние записи / Only last rows">
      <div class="col">
        <button type="button" class="btn btn-block btn-success" v-on:click="getItems">
          {{ (language == 'RUS') ? 'Найти' : 'Search' }}
          <span class="badge badge-light">{{countOfItems}}</span>
        </button>
      </div>
    </div>

    <div class="row">

      <table class="table table-striped">
        <thead>
          <tr>
            <th class="text-center">ID</th>
            <th class="td-date text-center">Date</th>
            <th class="text-center">Title</th>
            <th class="text-center">From (surname)</th>
            <th class="text-center">What</th>
            <th class="text-center">To (surname)</th>
          </tr>
        </thead>
        <tbody>

          <tr v-on:keyup.enter.prevent="getItems">
            <td></td>
            <td class="td-date">
              <datepicker v-model="search.date" :format="date_format" :bootstrap-styling="true" :language="languageForDatePicker"></datepicker>
            </td>
            <td class="text-center"><input type="text" v-model="search.title" placeholder="Титул" /></td>
            <td class="text-center"><input type="text" v-model="search.from" placeholder="От (фамилия)" /></td>
            <td class="text-center"><input type="text" v-model="search.what" placeholder="Текст" /></td>
            <td class="text-center"><input type="text" v-model="search.to" placeholder="Кому (фамилия)" /></td>
          </tr>

          <tr v-for="item in items" :key="item.id" v-on:click="editItem(item.id)">
            <td class="text-center">{{item.id}}</td>
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
import { en, ru } from 'vuejs-datepicker/dist/locale'

export default {
  name: "Log",


  data: function () {
    return {

      date_format: "dd.MM.yyyy",
      en: en,
      ru: ru,
      isNewItemMayBeAdded: true,


      customEditorToolbar: [
        ['bold', 'underline'],
        // [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        // ['image', 'code-block']
      ],

      targetItem: {
        id: null,
        to: 0,
        from: 0,
        what: "",
        title: "",
        date: new Date()
      },

      search: {
        to: "",
        from: "",
        what: "",
        title: "",
        date: null,
        is_only_last: true
      }

    };
  },

  mounted: function () {

    this.$nextTick(function () {
      this.getTitles();
      this.getUsers();
      this.targetItem.from = this.$store.state.user.id;
      this.targetItem.to = 0;
      // this.targetItem.title = 0;
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
      return this.$store.getters['log/giveItems'];
    },

    titles: function () {
      return this.$store.getters['title/give'];
    },

    users: function () {
      return this.$store.getters['users/give'];
    },

    countOfItems: function () {
      return (this.items == null) ? 0 : this.items.length;
    },

  },

  methods: {
    formatDate: function (timestamp) {
      let date = new Date();
      date.setTime(timestamp * 1000); // переводим в миллисекунды
      return ("0" + date.getDate()).slice(-2) + '.' + ("0" + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear()
    },

    getTitles: function () {
      this.$store.dispatch('title/get', {});
    },

    getUsers: function () {
      this.$store.dispatch('users/get', {});
    },

    getItems: function () {
      this.$store.dispatch('log/getItems', {
        to: this.search.to,
        from: this.search.from,
        title: this.search.title,
        what: this.search.what,
        is_only_last: this.search.is_only_last,
        date: (this.search.date == null) ? "" : Math.round(this.search.date.getTime() / 1000)
      });
    },

    getTargetItemTitleId: function () {
      //    Ищем id от title
      let localTitle = this.titles.filter(obj => {
        return obj.name === this.targetItem.title
      });

      return (localTitle.length > 0) ? localTitle[0].id : 0;
    },

    addItem: function () {

      let titleId = this.getTargetItemTitleId();

      if (titleId == 0) {
        this.$store.dispatch('notify/showNotifyByCode', 303, { root: true });
        return;
      }

      this.$store.dispatch('log/setItem', {
        to: this.targetItem.to,
        from: this.targetItem.from,
        title: titleId,
        what: this.targetItem.what,
        date: Math.round(this.targetItem.date.getTime() / 1000)
      });
    },

    modifyItem: function () {

      let titleId = this.getTargetItemTitleId();

      if (titleId == 0) {
        this.$store.dispatch('notify/showNotifyByCode', 303, { root: true });
        return;
      }

      this.$store.dispatch('log/setItem', {
        id: this.targetItem.id,
        to: this.targetItem.to,
        from: this.targetItem.from,
        title: titleId,
        what: this.targetItem.what,
        date: Math.round(this.targetItem.date.getTime() / 1000)
      });
    },

    deleteItem: function () {
      this.$store.dispatch('log/deleteItem', {
        id: this.targetItem.id,
      });
    },

    editItem: function (id) {

      let itemToBeModified = this.items.filter(obj => {
        return obj.id === id
      })[0];

      let localTo = this.users.filter(obj => {
        return (obj.surname + ' ' + obj.name) === itemToBeModified.to
      })[0].id;

      let localFrom = this.users.filter(obj => {
        return (obj.surname + ' ' + obj.name) === itemToBeModified.from
      })[0].id;

      // let localTitle = this.titles.filter(obj => {
      //   return obj.name === itemToBeModified.title
      // })[0].id;

      this.targetItem.id = itemToBeModified.id;

      // this.targetItem.title = localTitle;
      this.targetItem.title = itemToBeModified.title;
      this.targetItem.to = localTo;
      this.targetItem.from = localFrom;
      this.targetItem.what = itemToBeModified.what;

      let date = new Date();
      date.setTime(itemToBeModified.date * 1000);
      this.targetItem.date = date;

      this.isNewItemMayBeAdded = false;
    }
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