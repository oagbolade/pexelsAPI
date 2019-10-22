import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import routes from "./router";


Vue.use(VueRouter);

Vue.config.productionTip = false

// Just Pass in routes, no need for value and key pair
// Will Save you countless hours
const router = new VueRouter({
    routes,
    mode: 'history'
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
