<template>
  <div>

    <div class="container">
      <div class="row">
        <div class="col">
          <h3 v-if="language === 'RUS'">Проектный офис АГПЗ</h3>
          <h3 v-else-if="language === 'ENG'">AGPP Design Office</h3>
        </div>
      </div>
      <div class="row">

        <div class="col-5">
          <p v-if="language === 'RUS'">Choose language:</p>
          <p v-else-if="language === 'ENG'">Выберите язык:</p>
        </div>

        <div class="col-5">
          <b-form-radio-group id="language-radio" v-model="choose_language" name="radioSubComponent">
            <b-form-radio value="RUS">RU</b-form-radio>
            <b-form-radio value="ENG">EN</b-form-radio>
          </b-form-radio-group>
        </div>

      </div>

      <div class="row">
        <div class="col-5">
          <p> E-mail:</p>
        </div>
        <div class="col-5">
          <p>{{email}}</p>
        </div>
      </div>

      <div class="row">
        <div class="col-5">
          <p v-if="language === 'RUS'">Имя:</p>
          <p v-else-if="language === 'ENG'">Name:</p>
        </div>
        <div class="col-5">
          <p>{{name}}</p>
        </div>
      </div>

      <div class="row">
        <div class="col-5">
          <p v-if="language === 'RUS'">Фамилия:</p>
          <p v-else-if="language === 'ENG'">Surname:</p>
        </div>
        <div class="col-5">
          <p>{{surname}}</p>
        </div>
      </div>

      <div class="row">
        <div class="col-5">
          <p v-if="language === 'RUS'">Права доступа:</p>
          <p v-else-if="language === 'ENG'">Permissions:</p>
        </div>
        <div class="col-5">
          <p>{{role}}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Home",


  data: function () {
    return {
      selected: "",
      choose_language: ""
    };
  },

  mounted: function () {
    this.choose_language = this.$store.state.language;
  },

  computed: {
    language: function () {
      return this.$store.state.language;
    },

    email: function () {
      return this.$store.state.user.email;
    },

    name: function () {
      return this.$store.state.user.name;
    },

    surname: function () {
      return this.$store.state.user.surname;
    },

    role: function () {
      return this.$store.state.user.role;
    },

  },

  watch: {
    choose_language: function (newLang) {
      this.$store.commit('setLanguage', newLang)
    },
  }
};
</script>

<style>
.container {
  margin-top: 5%;
}
</style>