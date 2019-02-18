import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Modal from 'buefy/dist/components/modal'

import '@/assets/scss/main.scss'

Vue.config.productionTip = false

Vue.use(Modal)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
