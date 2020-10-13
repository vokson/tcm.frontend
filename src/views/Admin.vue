<template>
  <div class="container">

    <b-nav vertical class="w-50">

      <b-nav-item :to="{ name: 'user' }">
        <h4>Users</h4>
      </b-nav-item>

      <b-nav-item :to="{ name: 'action' }">
        <h4>Roles</h4>
      </b-nav-item>

      <b-nav-item :to="{ name: 'setting' }">
        <h4>Settings</h4>
      </b-nav-item>

      <b-nav-item :to="{ name: 'status' }">
        <h4>Edit Statuses</h4>
      </b-nav-item>

      <b-nav-item v-on:click="getDatabaseBackup">
        <h4>Database Backup</h4>
      </b-nav-item>

      <b-nav-item v-on:click="deleteFilesWithoutArticles">
        <h4>Delete Files Without Articles</h4>
      </b-nav-item>

    </b-nav>

  </div>

</template>

<script>
export default {
  name: "Admin",

  data: function () {
    return {};
  },

  methods: {
    getDatabaseBackup: function () {
      this.$store.dispatch("service/getDatabaseBackup");
    },

    deleteFilesWithoutArticles: function () {
      this.$store.dispatch("service/deleteFilesWithoutArticles");
    }


  }

};
</script>