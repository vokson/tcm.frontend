
<template>
  <div>

    <div class="container">
      <div class="row">
        <div class="col">
          <h3 v-if="language === 'RUS'">Вход</h3>
          <h3 v-else-if="language === 'ENG'">Login</h3>
        </div>
      </div>

      <div class="row" v-on:keyup.enter.prevent="login">
        <div class="col-2">
          <input type="e-mail" name="email" v-model="email" placeholder="E-mail" />
        </div>

        <div class="col-2">
          <input type="password" name="password" v-model="password" placeholder="Password" />
        </div>

        <div class="col-6" />
      </div>

      <div class="row">

        <div class="col-1">
          <button v-if="language === 'ENG'" type="button" class="btn btn-primary" v-on:click="login">Login</button>
          <button v-else-if="language === 'RUS'" type="button" class="btn btn-primary" v-on:click="login">Войти</button>
        </div>

        <div class="col-1">
          <button v-if="language === 'ENG'" type="button" class="btn btn-secondary" v-on:click="logout">Logout</button>
          <button v-else-if="language === 'RUS'" type="button" class="btn btn-secondary" v-on:click="logout">Выйти</button>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Login",

  data: function () {
    return {
      email: "",
      password: "",
    };
  },

  computed: {
    newToken: function () {
      return this.$store.state.user.access_token;
    },

    language: function () {
      return this.$store.state.language;
    }

  },

  watch: {
    newToken: function (val) {
      if (val != "") {
        this.$router.push('home');
      }
    },

  },

  methods: {

    login: function () {
      this.$store.dispatch("auth/login", {
        email: this.email,
        password: window.$sha256(this.password)
      });
    },

    logout: function () {
      this.$store.dispatch("auth/logout");
    }
  }
};
</script>

<style>
.row {
  margin-top: 5px;
}
</style>