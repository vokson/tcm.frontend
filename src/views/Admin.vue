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

        <div class="col-5">
          <p>{{ item.name}}</p>
        </div>
        <div class="col-5">
          <input type="text" class="form-control" v-model="item.value">
        </div>
      </div>

    </div>
    <button type="button" v-on:click="get">Get</button>
    <button type="button" v-on:click="set">Set</button>
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