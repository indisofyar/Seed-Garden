import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      userName: ''
    }
  },
  mutations: {
    // your mutation functions go here
  },
  actions: {
    // your action functions go here
  },
  getters: {
    // your getter functions go here
  }
})

export default store