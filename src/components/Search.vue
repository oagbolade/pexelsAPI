<template>
  <div id="search-component">
    <SearchBar msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import SearchBar from "./SearchBar";

export default {
  name: "app",
  components: {
    SearchBar
  }
};
</script>

<style scoped>
#search-component {
  margin: 0;
  padding: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../assets/pexelsAPIBackground.jpg");
  background-repeat: no-repeat;
  background-color: #57c0fa; /* Used if the image is unavailable */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  max-width: 100%;
  height: 100vh;
}
</style>
