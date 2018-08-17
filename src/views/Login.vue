<template>
  <div>
    <h1>Login</h1>
    <input type="text" name="email" v-model="email" placeholder="E-mail" />
    <input type="password" name="password" v-model="password" placeholder="Password" />
    <br/>
    <button type="button" v-on:click="login">Login</button>
    <button type="button" v-on:click="logout">Logout</button>
    <button type="button" v-on:click="getTokenFromCookie">Get Cookie Token</button>
    <button type="button" v-on:click="checkToken">Check Token</button>
  </div>
</template>

<script>
export default {
  name: "Login",

  data: function () {
    return {
      email: "",
      password: "",
      // isLoggedIn: false,
    };
  },

  computed: {
    newToken: function () {
      return this.$store.state.user.access_token;
    }
  },

  watch: {
    newToken: function (val) {
      if (val != "") {
        this.$router.push('home');
      }
    },

    // isLoggedIn: function () {
    //   if (this.isLoggedIn === true) {
    //     this.isLoggedIn = false;

    //   }
    // }
  },

  methods: {
    getTokenFromCookie: function () {
      this.$store.commit("setAccessTokenUsingCookie");
    },

    checkToken: function () {
      this.$store.dispatch("auth/checkAccessToken");
    },

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