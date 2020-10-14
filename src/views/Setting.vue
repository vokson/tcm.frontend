<template>
  <div>

    <div class="container">
      <div class="row">
        <div class="col-2">
          <h3>{{ (language == 'RUS') ? 'Настройки' : 'Settings' }}</h3>
        </div>
        <div class="col-10">
          <h6> {{ (language == 'RUS') ? 'Регулярные выражения для бэкенда должны быть в формате PHP, для фронтенда в формате Javascript' : 'Regular expression for backend must be in PHP format, for frontend in Javascript format' }}</h6>
        </div>
      </div>

      <div class="row" />

      <div
        v-for="item in items"
        :key="item.name"
        class="row align-items-center"
      >

        <div class="col-8">
          <p>{{ item.name}}</p>
        </div>
        <div class="col-4">
          <input
            type="text"
            class="form-control"
            v-model="item.value"
          >
        </div>

      </div>

      <div class="row">

        <div class="col-2">
          <button
            type="button"
            class="btn btn-primary"
            v-on:click="get"
          >{{ (language == 'RUS') ? 'Обновить' : 'Refresh' }}</button>
        </div>

        <div class="col-2">
          <button
            type="button"
            class="btn btn-danger"
            v-on:click="set"
          >{{ (language == 'RUS') ? 'Сохранить' : 'Save' }}</button>
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
    language: function () {
      return this.$store.state.language;
    },

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