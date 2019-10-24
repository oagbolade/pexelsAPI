<template>
  <div id="search-component">
    <div class="textDescription">
      <h2>Pexels API</h2>
      <h6>Over 10 thousand free images available for download</h6>
    </div>
    <SearchBar />
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
.textDescription{
    font-size: xx-large;
    font-family: Arial, Helvetica, sans-serif;
    color: white;
    text-align: center;
    padding-top: 25vmin;
}

#search-component {
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

@media screen and (max-width: 680px) {
  #search-component {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url("../assets/pexelsAPIBackgroundSmall.jpg");
    background-repeat: no-repeat;
    background-color: #57c0fa; /* Used if the image is unavailable */
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover; /* Resize the background image to cover the entire container */
    max-width: 100%;
    height: 100vh;
  }
}
</style>
