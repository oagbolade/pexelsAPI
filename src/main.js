import Vue from 'vue'
import SearchPage from './Search.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(SearchPage)
}).$mount("#app");
