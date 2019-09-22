import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import vueAxios from 'vue-axios'
import axios from './api/axios'

import './assets/styles.scss'

Vue.config.productionTip = false
Vue.use(vueAxios, axios)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
