import Vue from 'vue'
import Vuex from 'vuex'

import auth from "./modules/auth";
import query from "./modules/query";
import response from "./modules/response";
import notify from "./modules/notify";
import admin from "./modules/admin";
import roles from "./modules/roles";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // accessToken: null,
    apiResponse: null,
    language: "RUS",
    user: {
      access_token: "",
      name: "",
      surname: "",
      role: "guest",
      email: ""
    },
  },

  getters: {
    isAuthenticated: function (state) {
      return (state.user.access_token == "") ? false : true;
    }
  },

  mutations: {
    setLanguage: (state, data) => {
      state.language = data;
    },

    setApiResponse: (state, data) => {
      state.apiResponse = data;
    },

    setUser: (state, data) => {
      state.user.access_token = data.access_token;
      state.user.name = data.name;
      state.user.surname = data.surname;
      state.user.role = data.role;
      state.user.email = data.email;

      window.$cookies.set("access_token", data.access_token);
    },

    setAccessTokenUsingCookie: (state) => {
      state.user.access_token = window.$cookies.get("access_token");
    },

  },

  modules: {
    auth,
    query,
    response,
    notify,
    admin,
    roles
  }
});