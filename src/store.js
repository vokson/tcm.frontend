import Vue from 'vue'
import Vuex from 'vuex'

import auth from "./modules/auth";
import query from "./modules/query";
import response from "./modules/response";
import notify from "./modules/notify";
import test_roles from "./modules/test_roles";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: null,
    apiResponse: null,
    language: "RUS"
  },

  mutations: {
    setApiResponse: (state, data) => {
      state.apiResponse = data;
    },

    setAccessToken: (state, token) => {
      state.accessToken = token;
      window.$cookies.set("access_token", token);
    },

    setAccessTokenUsingCookie: (state) => {
      state.accessToken = window.$cookies.get("access_token");
    },

  },

  modules: {
    auth,
    query,
    response,
    notify,
    test_roles
  }
});