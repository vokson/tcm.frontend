<template>
  <div>

    <div class="container">
      <div class="row">
        <div class="col">
          <h3>{{ (language == 'RUS') ? 'Статусы выполнения работ по титулу' : 'Statuses of current title' }}</h3>
        </div>
      </div>

      <div class="row" />

      <div v-for="item in items" :key="item.id" class="row align-items-center">

        <div class="col-1">
          <p>{{ item.id}}</p>
        </div>

        <div class="col-6">
          <input type="text" class="form-control" v-model="item.name" v-on:click="edit(item.id)">
        </div>

      </div>

      <div class="row">
        <button type="button" class="btn btn-primary" v-on:click="get">
          {{ (language == 'RUS') ? 'Обновить' : 'Refresh' }}
        </button>
        <button type="button" class="btn btn-success" v-on:click="add">
          {{ (language == 'RUS') ? 'Добавить' : 'Add' }}
        </button>
        <button type="button" class="btn btn-warning" v-on:click="set">
          {{ (language == 'RUS') ? 'Сохранить' : 'Save' }}
        </button>
        <button type="button" class="btn btn-danger" v-on:click="del">
          {{ (language == 'RUS') ? 'Удалить' : 'Delete' }}
        </button>
      </div>

    </div>
  </div>

</template>

<script>
export default {
  name: "Status",

  data: function () {
    return {

      targetItem: {
        id: null
      },

    };
  },

  mounted: function () {
    this.$nextTick(function () {
      this.get();
    })

  },


  computed: {
    language: function () {
      return this.$store.state.language;
    },

    items: function () {
      return this.$store.getters['status/give'];
    }
  },

  methods: {
    add: function () {
      this.$store.dispatch('status/add');
    },

    del: function () {
      this.$store.dispatch('status/del', {
        id: this.targetItem.id
      });
    },

    get: function () {
      this.$store.dispatch('status/get');
    },

    set: function () {
      this.$store.dispatch('status/set');
    },

    edit: function (id) {
      this.targetItem.id = id;
    }

  }
};
</script>

<style>
button {
  margin-right: 10px;
}
</style>