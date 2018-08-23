<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h3>List of users</h3>
      </div>
    </div>

    <div class="row">

      <div class="col-4">

        <div class="row">
          <div class="col">
            <label>Item's ID: {{targetItem.id}}</label>
          </div>
        </div>

        <div class="row">
          <div class="col-5">
            <label>E-mail</label>
          </div>
          <div class="col-7">
            <input type="text" class="form-control" v-model="targetItem.email">
          </div>
        </div>

        <div class="row">
          <div class="col-5">
            <label>Surname</label>
          </div>
          <div class="col-7">
            <input type="text" class="form-control" v-model="targetItem.surname">
          </div>
        </div>

        <div class="row">
          <div class="col-5">
            <label>Name</label>
          </div>
          <div class="col-7">
            <input type="text" class="form-control" v-model="targetItem.name">
          </div>
        </div>

        <div class="row">
          <div class="col-5">
            <label>Role</label>
          </div>
          <div class="col-7">
            <input type="text" class="form-control" v-model="targetItem.role">
          </div>
        </div>

        <div class="row">
          <div class="col-5">
            <label>Is active</label>
          </div>
          <div class="col-7">
            <input type="text" class="form-control" v-model="targetItem.active">
          </div>
        </div>

        <div v-if="isNewItemMayBeAdded == true" class="row">
          <div class="col-5" />
          <div class="col-7">
            <button type="button" class="btn btn-block btn-primary" v-on:click="addItem">Add</button>
          </div>
        </div>

        <div v-else class="row">
          <div class="col-5" />
          <div class="col-7">
            <div class="row">
              <div class="col">
                <button type="button" class="btn btn-block btn-warning" v-on:click="modifyItem">Modify</button>
              </div>
              <div class="col">
                <button type="button" class="btn btn-block btn-danger" v-on:click="deleteItem">Delete</button>
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
          Search
          <span class="badge badge-light">{{countOfItems}}</span>
        </button>
      </div>
    </div>

    <div class="row">

      <table class="table table-striped">
        <thead>
          <tr class="text-center">
            <th>ID</th>
            <th>E-mail</th>
            <th>Surname</th>
            <th>Name</th>
            <th>Role</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>

          <tr v-on:keyup.enter.prevent="getItems" class="text-center">
            <td></td>
            <td><input type="text" v-model="search.email" /></td>
            <td><input type="text" v-model="search.surname" /></td>
            <td><input type="text" v-model="search.name" /></td>
            <td><input type="text" v-model="search.role" /></td>
            <td><input type="text" v-model="search.active" /></td>
          </tr>

          <tr class="text-center" v-for="item in items" :key="item.id" v-on:click="editItem(item.id)">
            <td>{{item.id}}</td>
            <td>{{item.email}}</td>
            <td>{{item.surname}}</td>
            <td>{{item.name}}</td>
            <td>{{item.role}}</td>
            <td>{{item.active}}</td>
          </tr>

        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  name: "User",

  data: function () {
    return {

      isNewItemMayBeAdded: true,

      targetItem: {
        id: null,
        email: "",
        surname: "",
        name: "",
        role: "",
        active: ""
      },

      search: {
        email: "",
        surname: "",
        name: "",
        role: "",
        active: ""
      }

    };
  },

  computed: {
    items: function () {
      return this.$store.getters['users/give'];
    },

    countOfItems: function () {
      return (this.items == null) ? 0 : this.items.length;
    }

  },

  methods: {

    getItems: function () {
      this.$store.dispatch('users/get', {
        email: this.search.email,
        surname: this.search.surname,
        name: this.search.name,
        role: this.search.role,
        active: this.search.active,
      });
    },

    addItem: function () {
      this.$store.dispatch('users/set', {
        email: this.targetItem.email,
        surname: this.targetItem.surname,
        name: this.targetItem.name,
        role: this.targetItem.role,
        active: this.targetItem.active,
      });
    },

    modifyItem: function () {
      this.$store.dispatch('users/set', {
        id: this.targetItem.id,
        email: this.targetItem.email,
        surname: this.targetItem.surname,
        name: this.targetItem.name,
        role: this.targetItem.role,
        active: this.targetItem.active,
      });
    },

    deleteItem: function () {
      this.$store.dispatch('users/del', {
        id: this.targetItem.id,
      });
    },

    editItem: function (id) {

      let itemToBeModified = this.items.filter(obj => {
        return obj.id === id
      })[0];

      this.targetItem.id = itemToBeModified.id;
      this.targetItem.email = itemToBeModified.email;
      this.targetItem.surname = itemToBeModified.surname;
      this.targetItem.name = itemToBeModified.name;
      this.targetItem.role = itemToBeModified.role;
      this.targetItem.active = itemToBeModified.active;

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