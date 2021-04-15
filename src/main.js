import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'

import './styles/element-variables.scss'
import '@/styles/index.scss' // global css

import '@/icons' // icon

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  ElementUI,
  render: h => h(App)
}).$mount('#app')
