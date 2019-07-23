<template>
  <div class="container">

    <b-nav
      vertical
      class="w-70"
    >

      <b-nav-item :to="{ name: 'docs_search' }">
        <h4>{{ (language == 'RUS') ? 'Поиск' : 'Search' }}</h4>
      </b-nav-item>

      <b-nav-item :to="{ name: 'docs_edit' }">
        <h4>{{ (language == 'RUS') ? 'Редактирование' : 'Edit' }}</h4>
      </b-nav-item>

    </b-nav>

  </div>

</template>

<script>
export default {
  name: "Docs",

  data: function () {
    return {};
  },

  computed: {
    language: function () {
      return this.$store.state.language;
    },
  },

  methods: {}

};
</script>