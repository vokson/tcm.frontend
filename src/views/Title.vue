<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h3 v-if="language === 'RUS'">Список титулов</h3>
        <h3 v-else-if="language === 'ENG'">List of titles</h3>
      </div>
    </div>

    <div class="row">

      <div class="col-4">

        <div class="row">
          <div class="col">
            <label v-if="language === 'RUS'">Номер записи: {{targetItem.id}}</label>
            <label v-else-if="language === 'ENG'">Item's ID: {{targetItem.id}}</label>
            <a
              v-on:click='getHistoryItems'
              v-if="targetItem.id !== null"
              href="#"
            > {{ (language == 'RUS') ? '(история)' : '(history)' }}</a>
          </div>
        </div>

        <div class="row">
          <div class="col-5">
            <label v-if="language === 'RUS'">Титул</label>
            <label v-else-if="language === 'ENG'">Title</label>
          </div>
          <div class="col-7">
            <input
              type="text"
              class="form-control"
              v-model="targetItem.name"
            >
          </div>
        </div>

        <div class="row">
          <div class="col-5">
            <label v-if="language === 'RUS'">Статус</label>
            <label v-else-if="language === 'ENG'">Status</label>
          </div>

          <div class="col-7">
            <select
              class="form-control"
              v-bind:value="targetItem.status"
              v-on:change="targetItem.status = $event.target.value"
            >
              <option
                v-for="item in statuses"
                :key="item.id"
                v-bind:value="item.id"
              >{{item.name}}</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col-5">
            <label>{{property_field_1_name}}</label>
          </div>

          <div class="col-7">
            <input
              type="text"
              class="form-control"
              v-model="targetItem.predecessor"
            >
          </div>
        </div>

        <div class="row">
          <div class="col-5">
            <label>{{property_field_2_name}}</label>
          </div>

          <div class="col-7">
            <input
              type="text"
              class="form-control"
              v-model="targetItem.description"
            >
          </div>
        </div>

        <div class="row">
          <div class="col-5">
            <label>{{property_field_3_name}}</label>
          </div>

          <div class="col-7">
            <input
              type="text"
              class="form-control"
              v-model="targetItem.volume"
            >
          </div>

        </div>

        <div
          v-if="isNewItemMayBeAdded == true"
          class="row"
        >
          <div class="col-5" />
          <div class="col-7">
            <button
              type="button"
              class="btn btn-block btn-primary"
              v-on:click="addItem"
            >
              {{ (language == 'RUS') ? 'Добавить' : 'Add' }}
            </button>
          </div>
        </div>

        <div
          v-else
          class="row"
        >
          <div class="col-5" />
          <div class="col-7">
            <div class="row">
              <div class="col">
                <button
                  type="button"
                  class="btn btn-block btn-warning"
                  v-on:click="modifyItem"
                >
                  {{ (language == 'RUS') ? 'Изменить' : 'Modify' }}
                </button>
              </div>
              <div class="col">
                <button
                  type="button"
                  class="btn btn-block btn-danger"
                  v-on:click="deleteItem"
                >
                  {{ (language == 'RUS') ? 'Удалить' : 'Delete' }}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>

    <!-- Таблица с историей данного титула -->
    <div class="row">

      <table class="table table-striped history-table">
        <tbody>

          <tr
            class="text-center"
            v-for="item in history_items"
            :key="item.id"
            v-on:click="editItem(item.id)"
          >
            <td>{{ new Date(item.date*1000).toLocaleString(language, dateOptions)}}</td>
            <td>{{item.name}}</td>
            <td>{{item.status}}</td>
            <td>{{item.predecessor}}</td>
            <td>{{item.description}}</td>
            <td>{{item.volume}}</td>
          </tr>

        </tbody>
      </table>
    </div>

    <!-- Кнопка НАЙТИ -->
    <div class="row">
      <div class="col">
        <button
          type="button"
          class="btn btn-block btn-success"
          v-on:click="getItems"
        >
          {{ (language == 'RUS') ? 'Найти' : 'Search' }}
          <span class="badge badge-light">{{countOfItems}}</span>
        </button>
      </div>
    </div>

    <!-- Таблица поиска титулов -->
    <div class="row">

      <table class="table table-striped">
        <thead>
          <tr class="text-center">
            <th>ID</th>
            <th>{{ (language == 'RUS') ? 'Титул' : 'Title' }}</th>
            <th>{{ (language == 'RUS') ? 'Статус' : 'Status' }}</th>
            <th>{{property_field_1_name}}</th>
            <th>{{property_field_2_name}}</th>
            <th>{{property_field_3_name}}</th>
          </tr>
        </thead>
        <tbody>

          <tr
            v-on:keyup.enter.prevent="getItems"
            class="text-center"
          >
            <td><img
                src="./img/clean.png"
                width="35"
                height="35"
                v-on:click="cleanSearch"
              > </td>
            <td><input
                type="text"
                v-model="search.name"
              /></td>
            <td><input
                type="text"
                v-model="search.status"
              /></td>
            <td><input
                type="text"
                v-model="search.predecessor"
              /></td>
            <td><input
                type="text"
                v-model="search.description"
              /></td>
            <td><input
                type="text"
                v-model="search.volume"
              /></td>
          </tr>

          <tr
            class="text-center"
          
            v-for="item in items"
            :key="item.id"
            v-on:click="editItem(item.id)"
          >
            <td>{{item.id}}</td>
            <td><a
                href="#"
                v-on:click="onTitleClick(item.name)"
              >{{item.name}}</a></td>
            <td>{{item.status}}</td>
            <td>{{item.predecessor}}</td>
            <td>{{item.description}}</td>
            <td>{{item.volume}}</td>
          </tr>

        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  name: "Title",


  data: function () {
    return {

      isNewItemMayBeAdded: true,
      formatOfDate: '',
      dateOptions: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      },

      targetItem: {
        id: null,
        name: "",
        status: 0,
        predecessor: "",
        description: "",
        volume: ""
      },

      search: {
        name: "",
        status: "",
        predecessor: "",
        description: "",
        volume: ""
      }

    };
  },

  mounted: function () {

    this.$nextTick(function () {
      this.getStatuses();
      this.targetItem.status = 0;
    });

    this.showRecordForTitle();

  },

  computed: {
    language: function () {
      return this.$store.state.language;
    },

    items: function () {
      return this.$store.getters['title/give'];
    },

    history_items: function () {
      return this.$store.getters['title_history/give'];
    },

    statuses: function () {
      return this.$store.getters['status/give'];
    },

    countOfItems: function () {
      return (this.items == null) ? 0 : this.items.length;
    },

    isRecordForTitleToBeShown: function () {
      return this.$store.getters['title/giveIsRecordForTitleToBeShown'];
    },

    nameOfTitleToBeShown: function () {
      return this.$store.getters['title/giveNameOfTitleToBeShown'];
    },

    property_field_1_name: function () {
        if (this.language == "RUS") { return this.$store.getters['setting/give_property']('FRONTEND_TITLES_FIELD_1_NAME_RU'); }
        if (this.language == "ENG") { return this.$store.getters['setting/give_property']('FRONTEND_TITLES_FIELD_1_NAME_EN'); }
    },

    property_field_2_name: function () {
        if (this.language == "RUS") { return this.$store.getters['setting/give_property']('FRONTEND_TITLES_FIELD_2_NAME_RU'); }
        if (this.language == "ENG") { return this.$store.getters['setting/give_property']('FRONTEND_TITLES_FIELD_2_NAME_EN'); }
    },

    property_field_3_name: function () {
        if (this.language == "RUS") { return this.$store.getters['setting/give_property']('FRONTEND_TITLES_FIELD_3_NAME_RU'); }
        if (this.language == "ENG") { return this.$store.getters['setting/give_property']('FRONTEND_TITLES_FIELD_3_NAME_EN'); }
    },

  },

  methods: {

    getStatuses: function () {
      this.$store.dispatch('status/get');
    },

    getItems: function () {
      this.$store.dispatch('title/get', {
        name: this.search.name,
        status: this.search.status,
        predecessor: this.search.predecessor,
        description: this.search.description,
        volume: this.search.volume,
      });
    },

    getHistoryItems: function () {
      if (this.targetItem.id === null) return;

      this.$store.dispatch('title_history/get', {
        id: this.targetItem.id
      });
    },

    addItem: function () {
      this.$store.dispatch('title/set', {
        name: this.targetItem.name,
        status: this.targetItem.status,
        predecessor: this.targetItem.predecessor,
        description: this.targetItem.description,
        volume: this.targetItem.volume,
      });
    },

    modifyItem: function () {
      this.$store.dispatch('title/set', {
        id: this.targetItem.id,
        name: this.targetItem.name,
        status: this.targetItem.status,
        predecessor: this.targetItem.predecessor,
        description: this.targetItem.description,
        volume: this.targetItem.volume,
      });
    },

    deleteItem: function () {
      this.$store.dispatch('title/del', {
        id: this.targetItem.id
      });
    },

    editItem: function (id) {

      let itemToBeModified = this.items.filter(obj => {
        return obj.id === id
      })[0];

      let localStatus = this.statuses.filter(obj => {
        return obj.name === itemToBeModified.status
      })[0].id;

      this.targetItem.id = itemToBeModified.id;
      this.targetItem.name = itemToBeModified.name;
      this.targetItem.status = localStatus;
      this.targetItem.predecessor = itemToBeModified.predecessor;
      this.targetItem.description = itemToBeModified.description;
      this.targetItem.volume = itemToBeModified.volume;

      this.isNewItemMayBeAdded = false;

      this.$store.commit('title_history/clear', {}, { root: true });
    },

    showRecordForTitle: function () {
      if (this.isRecordForTitleToBeShown == true) {
        this.cleanSearch();
        this.search.name = this.nameOfTitleToBeShown;
        this.getItems();
        this.$store.commit('title/setIsRecordForTitleToBeShown', false, { root: true });
      }

    },

    onTitleClick: function (title) {
      this.$store.commit('log/setNameOfTitleToBeShown', title, { root: true });
      this.$store.commit('log/setIsRecordForTitleToBeShown', true, { root: true });
      this.$router.push('log');
    },

    cleanSearch: function () {
      this.search.name = "";
      this.search.status = "";
      this.search.predecessor = "";
      this.search.description = "";
      this.search.volume = "";
    },
  },

  watch: {
    isRecordForTitleToBeShown: function () {
      this.showRecordForTitle();
    }
  }

};
</script>

<style>
.text-center {
  text-align: center;
}

.history-table {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>