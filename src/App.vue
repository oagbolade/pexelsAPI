<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Found out that as at vue-router version 3.1.3, you do not have to do any import
// Took me some minutes to figure this out
// import Search from './components/Search.vue';
// import Results from './components/Results.vue';

export default {
  name: 'app',
  components: {
    
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
