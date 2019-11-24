import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Import vuex modules from store directory
const files = require.context('./store', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default new Vuex.Store({
  modules,
  actions: {
    resetAllState (context) {
      context.commit(`users/reset`)
      context.commit(`departments/reset`)
      context.commit(`completedWorks/reset`)
      context.commit(`plannedWorks/reset`)
      context.commit(`works/reset`)
      context.commit(`scienceProfiles/reset`)
    }
  }
})
