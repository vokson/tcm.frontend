import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import sha256 from 'sha256'
import auth from "./modules/auth";
import query from "./modules/query";
import response from "./modules/response";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: null,
    apiResponse: null,
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
    response
  }
});


// store.$axios = axios.create({
//   baseURL: "http://tcm.api/api",
//   method: 'post'
// });

window.$axios = axios.create({
  baseURL: "http://tcm.api/api",
  method: 'post'
});

window.$sha256 = sha256


// export default store;
