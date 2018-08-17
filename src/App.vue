<template>
  <div id="app">
    <notifications group="notify-group" />

    <b-nav tabs>
      <b-nav-item :to="{ name: 'home' }">Home</b-nav-item>
      <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
      <b-nav-item :to="{ name: 'roles' }">Test Role</b-nav-item>
      <b-nav-item :to="{ name: 'admin' }">Admin</b-nav-item>
    </b-nav>

    <router-view/>

  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {

  mounted: function () {

    this.$nextTick(function () {
      this.$store.commit('setAccessTokenUsingCookie');
      this.$store.dispatch('auth/loginByToken', this.$store.state.user.access_token);
    })
  },

  computed: {
    ...mapState({
      show: state => state.notify.show
    })
  },
  watch: {
    show () {
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
