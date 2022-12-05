import { createStore } from 'vuex'

// Create a new store instance.
export default createStore({
  state: {
    token : null,
  },
  getters: {
    getToken(state){
      return state.token;
    }
  },
  mutations: {
    SET_TOKEN(state, token){
      state.token = token;
    }
  }
})
