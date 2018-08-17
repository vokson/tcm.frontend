<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button type="button" v-on:click="note">notification</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },

  methods: {
    note: function() {
      console.log(this.$notify);
      this.$notify({
        group: "foo",
        type: "error",
        text: "Ошибка авторизации"
      });
    }
  }
};
</script>
