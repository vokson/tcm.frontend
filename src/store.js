import Vue from 'vue'
import Vuex from 'vuex'

import auth from "./modules/auth";
import action from "./modules/action";
import query from "./modules/query";
import response from "./modules/response";
import notify from "./modules/notify";
import setting from "./modules/setting";
import roles from "./modules/roles";
import log from "./modules/log";
import title from "./modules/title";
import title_history from "./modules/title_history";
import users from "./modules/users";
import status from "./modules/status";
import service from "./modules/service";
import log_file from "./modules/log_file";
import last_logs from "./modules/last_logs";
import chart_created_logs from "./modules/chart_created_logs";
import chart_created_titles from "./modules/chart_created_titles";
import chart_file_storage from "./modules/chart_file_storage";
import chart_title_status from "./modules/chart_title_status";
import chart_tq_status from "./modules/chart_tq_status";
import chart_checked_drawings from "./modules/chart_checked_drawings";
import chart_checker_rating from "./modules/chart_checker_rating";
import checker from "./modules/checker";
import checker_file from "./modules/checker_file";
import sender from "./modules/sender";
import sender_file from "./modules/sender_file";
import pdf_merge from "./modules/pdf_merge";
import pdf_merge_file from "./modules/pdf_merge_file";
import user_settings from "./modules/user_settings";
import task from "./modules/task";
import docs_edit from "./modules/docs_edit";
import docs_edit_file from "./modules/docs_edit_file";
import docs_search from "./modules/docs_search";
import download from "./modules/download";
import counts from "./modules/counts";

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
      email: "",
      isDefaultPassword: false
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
      state.user.id = data.id;
      state.user.isDefaultPassword = data.isDefaultPassword;

      window.$cookies.set("access_token", data.access_token);
    },

    setAccessTokenUsingCookie: (state) => {
      state.user.access_token = window.$cookies.get("access_token");
    },

  },

  modules: {
    auth,
    action,
    query,
    response,
    notify,
    setting,
    roles,
    log,
    title,
    title_history,
    users,
    status,
    service,
    log_file,
    last_logs,
    chart_created_logs,
    chart_created_titles,
    chart_title_status,
    chart_tq_status,
    chart_file_storage,
    chart_checked_drawings,
    chart_checker_rating,
    checker,
    checker_file,
    sender,
    sender_file,
    pdf_merge,
    pdf_merge_file,
    user_settings,
    task,
    docs_edit,
    docs_edit_file,
    docs_search,
    download,
    counts
  }
});