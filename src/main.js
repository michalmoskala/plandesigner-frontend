import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App'
import router from './router'

Vue.use(BootstrapVue)

Vue.prototype.$http = Axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
