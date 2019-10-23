<template>
  <div class="container-fluid">
    <div class="resultHeader">
      <button class="backButton btn btn-lg btn-outline-success" @click="goToHome">Back</button>
      <h3 class="pageHeader">Search Results</h3>
    </div>

    <div class="resultContainer">
      <div v-bind:key="imageResult.id" v-for="imageResult in imageResults">
        <div @click="toggleModal(imageResult.id)">
          <img :src="imageResult.src.landscape" alt="..." />
        </div>
      </div>
    </div>

    <div>
      <button class="btn btn-success nextButton" @click="nextPage">Next</button>
      <button
        v-if="this.currentPage > 1"
        class="btn btn-success previousButton"
        @click="previousPage"
      >Previous</button>
    </div>
    <Modal v-if="this.showModal" v-bind:currentPhotoId="currentPhotoId" v-bind:showModal="showModal" v-on:toggleModal="toggleModal"/>
  </div>
</template>

<script>
import axios from "axios";
import Modal from "./Modal";

export default {
  name: "Results",
  components: {
    Modal
  },
  data() {
    return {
      url: "https://api.pexels.com/v1/search?",
      proxy: "https://cors-anywhere.herokuapp.com/",
      key: process.env.VUE_APP_API_KEY || process.env.API_KEY,
      loading: false,
      imageSearch: this.$route.params.imageSearch,
      currentPage: 1,
      errorMessage: "",
      imageResults: [],
      showModal: false,
      currentPhotoId: 0
    };
  },
  methods: {
    // API Fetch
    searchImage(currentPage) {
      axios
        .get(`${this.proxy}${this.url}`, {
          headers: {
            Authorization: this.key
          },
          params: {
            page: currentPage,
            per_page: 20,
            query: this.imageSearch
          }
        })
        .then(res => {
          if (res.data.photos.length === 0) {
            this.errorMessage =
              "Your search returned no results, please check that you entered your address correctly";
            return false;
          }

          this.imageResults = res.data.photos;
         // console.log(res);
        })
        .catch(err => {
          if (err) {
            console.log(err);
          }
        });
    },

    // Button Functions
    nextPage() {
      this.currentPage++;
      this.searchImage(this.currentPage);
    },

    previousPage() {
      this.currentPage--;
      this.searchImage(this.currentPage);
    },

    goToHome() {
      this.$router.push("/");
    },

    toggleModal(currentPhotoId){
      this.showModal = !this.showModal
      this.currentPhotoId = currentPhotoId;
      console.log(currentPhotoId);
    }
  },
  mounted() {
    this.searchImage(this.currentPage);
  }
};
</script>

<style scoped>
.resultContainer {
  justify-items: center;
  display: grid;
  grid-template-columns: repeat(4, 2fr);
}

img {
  margin: 10px;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
}

.nextButton {
  position: absolute;
  right: 2%;
}

.previousButton {
  position: absolute;
  margin-left: 2%;
}
.resultHeader {
  display: grid;
  grid-template-columns: 10% 80%;
  margin: 10px;
}

.pageHeader {
  text-align: center;
}

@media screen and (max-width: 1200px) {
  .resultContainer {
    justify-items: center;
    display: grid;
    grid-template-columns: repeat(2, 3fr);
  }
}

@media screen and (max-width: 710px) {
  .resultContainer {
    justify-items: center;
    display: grid;
    grid-template-columns: repeat(1, 3fr);
  }
}
</style>