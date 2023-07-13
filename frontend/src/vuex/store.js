import { createStore } from 'vuex'
import axios from 'axios';

// Create a new store instance.
export default createStore({
  state: {
    token : null,
    userId : null,
    isAdmin : null,
  },
  getters: {
    getToken(state){
      return state.token;
    },
    getUserId(state){
      return state.userId;
    },
    getIsAdmin(state){
      return state.isAdmin;
    }
  },
  mutations: {
    SET_TOKEN(state, token){
      state.token = token;
    },
    SET_USERID(state, userId){
      state.userId = userId;
    },
    SET_ISADMIN(state, isAdmin){
      state.isAdmin = isAdmin;
    },
    clearAuth(state) {
      state.token = null;
      state.userId = null;
      state.isAdmin = null;
      delete axios.defaults.headers.common['Authorization'];
    }
  },
  actions: {
    logout({ commit }) {
      commit('clearAuth');
    }
  }
})
