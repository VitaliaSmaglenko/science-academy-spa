import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import vueAxios from 'vue-axios'
import axios from './api/axios'

Vue.config.productionTip = false
Vue.use(vueAxios, axios)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
