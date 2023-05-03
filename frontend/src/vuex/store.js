import { createStore } from 'vuex'
import axios from 'axios';

// Create a new store instance.
export default createStore({
  state: {
    token : null,
    userId : null,
  },
  getters: {
    getToken(state){
      return state.token;
    },
    getUserId(state){
      return state.userId;
    }
  },
  mutations: {
    SET_TOKEN(state, token){
      state.token = token;
    },
    SET_USERID(state, userId){
      state.userId = userId;
    },
    clearAuth(state) {
      state.userId = null;
      state.token = null;
      delete axios.defaults.headers.common['Authorization'];
    }
  },
  actions: {
    logout({ commit }) {
      commit('clearAuth');
    }
  }
})
