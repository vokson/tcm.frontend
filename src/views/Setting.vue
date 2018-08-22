<template>
  <div>

    <div class="container">
      <div class="row">
        <div class="col">
          <h3>Settings</h3>
        </div>
      </div>

      <div class="row" />

      <div v-for="item in items" :key="item.name" class="row align-items-center">

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

  </div>

</template>

<script>
export default {
  name: "Setting",

  data: function () {
    return {};
  },

  mounted: function () {
    this.$nextTick(function () {
      this.get();
    })

  },


  computed: {
    items: function () {
      return this.$store.getters['setting/give'];
    }
  },

  methods: {
    get: function () {
      this.$store.dispatch('setting/get');
    },

    set: function () {
      this.$store.dispatch('setting/set');
    },
  }
};
</script>