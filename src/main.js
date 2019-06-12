import Vue from 'vue'
import App from './App.vue'

require('./mystyles.scss');

new Vue({
  el: '#app',
  render: h => h(App)
})
