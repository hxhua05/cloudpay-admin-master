import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'


import './styles/element-variables.scss'
import '@/styles/index.scss' // global css

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters


Vue.use(ElementUI)

// register global utility filters
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

// new Vue({
//   router,
//   store,
//   ElementUI,
//   render: h => h(App)
// }).$mount('#app')


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
