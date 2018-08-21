<template>
  <div>

    <div class="container">
      <div class="row">
        <div class="col">
          <h3>Administration Panel</h3>
        </div>
      </div>

      <div class="row" />

      <div v-for="item in settings" :key="item.name" class="row align-items-center">

        <div class="col-3">
          <p>{{ item.name}}</p>
        </div>
        <div class="col-3">
          <input type="text" class="form-control" v-model="item.value">
        </div>
        <div class="col-6" />

      </div>

      <div class="row">

        <div class="col-1">
          <button type="button" class="btn btn-primary" v-on:click="get">Refresh</button>
        </div>

        <div class="col-1">
          <button type="button" class="btn btn-danger" v-on:click="set">Save</button>
        </div>

      </div>

    </div>

    <b-nav-item :to="{ name: 'status' }">Edit Statuses</b-nav-item>
  </div>

</template>

<script>
export default {
  name: "Admin",

  data: function () {
    return {};
  },

  mounted: function () {
    this.$nextTick(function () {
      this.get();
    })

  },


  computed: {
    settings: function () {
      return this.$store.getters['admin/giveSettings'];
    }
  },

  methods: {
    get: function () {
      this.$store.dispatch('admin/getSettings');
    },

    set: function () {
      this.$store.dispatch('admin/setSettings');
    },
  }
};
</script>