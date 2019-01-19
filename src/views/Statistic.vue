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

      <b-nav-item :to="{ name: 'chart_log_file_storage' }">
        <h4>{{ (language == 'RUS') ? 'График объема занятого места для файлов, прикрепленных к записям' : 'Chart of storage volume for files attached to log records' }}</h4>
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