<template>
  <div id="app">
    <notifications group="notify-group" />

    <b-nav tabs>
      <b-nav-item :to="{ name: 'home' }">Home</b-nav-item>
      <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
      <b-nav-item :to="{ name: 'log' }">Log</b-nav-item>
      <b-nav-item :to="{ name: 'title' }">Title</b-nav-item>
      <b-nav-item :to="{ name: 'news' }">News</b-nav-item>
      <b-nav-item :to="{ name: 'stat' }">Statistic</b-nav-item>
      <b-nav-item :to="{ name: 'checker' }">Check</b-nav-item>
      <b-nav-item :to="{ name: 'admin' }">Admin</b-nav-item>
      <b-nav-item
        :to="{ name: 'log' }"
        v-on:click="onNewMessagesClick"
      >
        New Messages
        <span class="badge badge-danger">{{count}}</span>
      </b-nav-item>
    </b-nav>

    <router-view />

  </div>
</template>

<script>

export default {

  mounted: function () {

    this.$nextTick(function () {

      this.$store.commit('setAccessTokenUsingCookie');
      this.$store.dispatch('auth/loginByToken', this.$store.state.user.access_token);

    })
  },

  computed: {
    count: function () {
      return this.$store.getters['log/giveCountOfNewMessages'];
    }
  },

  methods: {

    refreshCountOfNewMessages: function () {
      if (this.$store.state.user.access_token != "") {
        this.$store.dispatch('log/getCountOfNewMessages', {});
      }
    },

    onNewMessagesClick: function () {
      this.$store.commit('log/setIsNewMessagesToBeShown', true, { root: true });
    }
  },

  timers: {
    refreshCountOfNewMessages: { time: 10000, autostart: true, repeat: true }
  },


};
</script>
