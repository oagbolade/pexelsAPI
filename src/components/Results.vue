<template>
  <div>
    <h1>Resilts Page</h1>
  </div>
</template>

<script>
//import SearchBar from "./components/SearchBar.vue";

export default {
  name: "Results",
  components: {},
  methods: {
    sayHello(){
      // eslint-disable-next-line no-console
      console.log(this.$route.params.imageSearch);
    }
  },
  mounted() {
    this.sayHello();
  }
};
</script>

<style scoped>
</style>
