<template>
  <div id="app">
    <notifications group="notify-group" />

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/roles">Roles</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState({
      show: state => state.notify.show
    })
  },
  watch: {
    show() {
      if (this.show) {
        this.$notify({
          title: this.$store.state.notify.title,
          text: this.$store.state.notify.text,
          type: this.$store.state.notify.type,
          group: "notify-group"
        });
      }
      this.disableNotify();
    }
  },
  methods: {
    ...mapMutations("notify", ["disableNotify"])
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
