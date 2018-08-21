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
          </div>
        </div>

        <div class="row">
          <div class="col-5">
            <label v-if="language === 'RUS'">Титул</label>
            <label v-else-if="language === 'ENG'">Title</label>
          </div>
          <div class="col-7">
            <input type="text" class="form-control" v-model="targetItem.name">
          </div>
        </div>

        <div class="row">
          <div class="col-5">
            <label v-if="language === 'RUS'">Статус</label>
            <label v-else-if="language === 'ENG'">Status</label>
          </div>

          <div class="col-7">
            <select class="form-control" v-bind:value="targetItem.status" v-on:change="targetItem.status = $event.target.value">
              <option v-for="item in statuses" :key="item.id" v-bind:value="item.id">{{item.name}}</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col-5">

            <label v-if="language === 'RUS'">Предшественник</label>
            <label v-else-if="language === 'ENG'">Predecessor</label>
          </div>

          <div class="col-7">
            <input type="text" class="form-control" v-model="targetItem.predecessor">
          </div>

          <!-- <div class="col-7">
            <select class="form-control" v-bind:value="targetItem.predecessor" v-on:change="targetItem.predecessor = $event.target.value">
              <option v-for="item in items" :key="item.id" v-bind:value="item.id">{{item.name}}</option>
            </select>
          </div> -->
        </div>

        <div v-if="isNewItemMayBeAdded == true" class="row">
          <div class="col-5" />
          <div class="col-7">
            <button type="button" class="btn btn-block btn-primary" v-on:click="addItem">
              {{ (language == 'RUS') ? 'Добавить' : 'Add' }}
            </button>
          </div>
        </div>

        <div v-else class="row">
          <div class="col-5" />
          <div class="col-7">
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

    </div>

    <br/>
    <div class="row">
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
          <tr class="text-center">
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Predecessor</th>
          </tr>
        </thead>
        <tbody>

          <tr class="text-center">
            <td></td>
            <td><input type="text" v-model="search.name" placeholder="Титул" /></td>
            <td><input type="text" v-model="search.status" placeholder="Статус" /></td>
            <td><input type="text" v-model="search.predecessor" placeholder="Предшественник" /></td>
          </tr>

          <tr class="text-center" v-for="item in items" :key="item.id" v-on:click="editItem(item.id)">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.status}}</td>
            <td>{{item.predecessor}}</td>
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

      targetItem: {
        id: null,
        name: "",
        status: 0,
        predecessor: ""
      },

      search: {
        name: "",
        status: "",
        predecessor: ""
      }

    };
  },

  mounted: function () {

    this.$nextTick(function () {
      this.getStatuses();
      this.targetItem.status = 0;
      // this.targetItem.predecessor = 0;
    })

  },

  computed: {
    language: function () {
      return this.$store.state.language;
    },

    items: function () {
      return this.$store.getters['title/give'];
    },

    statuses: function () {
      return this.$store.getters['status/give'];
    },

    countOfItems: function () {
      return (this.items == null) ? 0 : this.items.length;
    }

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
      });
    },

    addItem: function () {
      this.$store.dispatch('title/set', {
        name: this.targetItem.name,
        status: this.targetItem.status,
        predecessor: this.targetItem.predecessor
      });
    },

    modifyItem: function () {
      this.$store.dispatch('title/set', {
        id: this.targetItem.id,
        name: this.targetItem.name,
        status: this.targetItem.status,
        predecessor: this.targetItem.predecessor
      });
    },

    deleteItem: function () {
      this.$store.dispatch('title/del', {
        id: this.targetItem.id,
      });
    },

    editItem: function (id) {

      let itemToBeModified = this.items.filter(obj => {
        return obj.id === id
      })[0];

      let localStatus = this.statuses.filter(obj => {
        return obj.name === itemToBeModified.status
      })[0].id;

      // let localPredecessor = 0;
      // if (itemToBeModified.predecessor !== "") {
      //   localPredecessor = this.items.filter(obj => {
      //     return obj.name === itemToBeModified.predecessor
      //   })[0].id;
      // }

      this.targetItem.id = itemToBeModified.id;
      this.targetItem.name = itemToBeModified.name;
      this.targetItem.status = localStatus;
      this.targetItem.predecessor = itemToBeModified.predecessor;
      // this.targetItem.predecessor = localPredecessor;

      this.isNewItemMayBeAdded = false;
    }
  }
};
</script>

<style>
.text-center {
  text-align: center;
}
</style>