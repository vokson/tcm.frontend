<template>
    <div id="roles">
        <h1>Roles</h1>
        <button type="button" v-on:click="checkGuest">Guest</button>
        <button type="button" v-on:click="checkEngineer">Engineer</button>
        <button type="button" v-on:click="checkPm">PM</button>
        <button type="button" v-on:click="checkAdmin">Admin</button>
    </div>
</template>

<script>
export default {
  name: "Role",

  data: function() {
    return {};
  },

  methods: {
    checkGuest: function() {
      this.$store.dispatch("test_roles/checkGuest");
    },
    checkEngineer: function() {
      this.$store.dispatch("test_roles/checkEngineer");
    },
    checkPm: function() {
      this.$store.dispatch("test_roles/checkPm");
    },
    checkAdmin: function() {
      this.$store.dispatch("test_roles/checkAdmin");
    }
  }
};
</script>

<style scoped>
#login {
  width: 500px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}
</style>