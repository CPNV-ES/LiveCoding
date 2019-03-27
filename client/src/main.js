import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Modal from 'buefy/dist/components/modal'
import Snackbar from 'buefy/dist/components/snackbar'

import '@/assets/scss/main.scss'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(Modal)
Vue.use(Snackbar)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
