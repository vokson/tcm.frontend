<template>
  <div class="container">

    <b-nav vertical class="w-25">

      <b-nav-item :to="{ name: 'user' }">
        <h4>Users</h4>
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

      <b-nav-item v-on:click="updateAttachmentStatus">
        <h4>Update Statues of Logs With Attachments</h4>
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

    updateAttachmentStatus: function () {
      this.$store.dispatch("service/updateAttachmentStatus");
    }


  }

};
</script>