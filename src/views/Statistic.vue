<template>
  <div class="container">

    <b-nav
      vertical
      class="w-70"
    >

      <b-nav-item :to="{ name: 'chart_created_logs' }">
        <h4>{{ (language == 'RUS') ? 'График созданных записей в системе' : 'Chart of created logs' }}</h4>
      </b-nav-item>

      <b-nav-item :to="{ name: 'chart_created_titles' }">
        <h4>{{ (language == 'RUS') ? 'График зарегистрированных титулов' : 'Chart of registered titles' }}</h4>
      </b-nav-item>

      <b-nav-item :to="{ name: 'chart_title_status' }">
        <h4>{{ (language == 'RUS') ? 'График, показывающий кол-во титулов, имеющих данный статус' : 'Chart showing count of titles, which have current status' }}</h4>
      </b-nav-item>

      <br />

      <b-nav-item :to="{ name: 'chart_file_storage' }">
        <h4>{{ (language == 'RUS') ? 'График объема места, занятого файлами' : 'Chart of storage volume' }}</h4>
      </b-nav-item>

    </b-nav>

  </div>

</template>

<script>
export default {
  name: "Statistic",

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