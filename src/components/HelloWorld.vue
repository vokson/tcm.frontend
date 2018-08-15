<template>
  <div>
    <h1>{{ msg }}</h1>
    <a href="http://tcm.api/api/test">TEST</a>
    <br/>
    <a href="#" v-on:click="getTokenFromCookie"> GET TOKEN FROM COOKIE </a>
    <br/>
    <a href="#" v-on:click="checkToken"> CHECK TOKEN </a>
  </div>
</template>

<script>
var axios = require("axios");
var sha256 = require("sha256");
// console.log(sha256("123456"));

const axiosInstance = axios.create({
  baseURL: "http://tcm.api/api"
});

export default {
  name: "HelloWorld",

  props: {
    msg: String
  },

  methods: {
    getTokenFromCookie: function() {
      this.$store.commit("getAcessTokenFromCookie");
    },

    checkToken: function() {
      this.$store.dispatch("checkAccessToken");
    },

    login: function() {
      this.$store.dispatch("login");
    }
  }
};
</script>