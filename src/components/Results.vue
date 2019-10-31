<template>
  <div class="container-fluid">
    <div class="resultHeader">
      <button class="backButton btn btn-lg btn-outline-success" @click="goToHome">Back</button>
      <h3 class="pageHeader">Search Results</h3>
    </div>
    <Spinner v-if="this.loading" />

    <div class="box">
      <div v-bind:key="imageResult.id" v-for="imageResult in imageResults">
        <div class="card" @click="toggleModal(imageResult.id), toggleSpinner()">
          <div class="imgBx">
            <img :src="imageResult.src.landscape" alt="..." />
          </div>
        </div>
      </div>
    </div>

    <div class="buttomButtons">
      <button class="btn btn-success nextButton" @click="nextPage">Next</button>
      <button
        v-if="this.currentPage > 1"
        class="btn btn-success previousButton"
        @click="previousPage"
      >Previous</button>
    </div>
    <Modal
      v-if="this.showModal"
      v-bind:currentPhotoId="currentPhotoId"
      v-bind:showModal="showModal"
      v-on:toggleModal="toggleModal"
      @toggleSpinner="toggleSpinner"
    />
  </div>
</template>

<script>
import axios from "axios";
import Modal from "./Modal";
import Spinner from "./Spinner";
import isEmptyArray from "../isEmptyArray.js";

export default {
  name: "Results",
  components: {
    Modal,
    Spinner
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
      this.loading = true;
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

          if (isEmptyArray(this.imageResults)) {
            return false;
          }
          this.loading = false;
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

    toggleModal(currentPhotoId) {
      this.showModal = !this.showModal;
      this.currentPhotoId = currentPhotoId;
    },

    toggleSpinner() {
      this.loading = !this.loading;
    }
  },
  mounted() {
    this.searchImage(this.currentPage);
  }
};
</script>

<style scoped>
/* Card CSS Code Start */

.box {
  display: grid;
  grid-template-columns: repeat(4, 2fr);
  grid-gap: 40px;
  margin: 0 auto;
}
.card {
  position: relative;
  width: 400px;
  height: 300px;
  background: #fff;
  margin: 0 auto;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
.card:before,
.card:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background: #fff;
  transition: 0.5s;
  z-index: -1;
}
.card:hover:before {
  transform: rotate(20deg);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
}
.card:hover:after {
  transform: rotate(10deg);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
}
.card .imgBx {
  position: absolute;
  top: 10px;
  left: 10px;
  bottom: 10px;
  right: 10px;
  background: #222;
  transition: 0.5s;
  z-index: 1;
}

.card:hover .imgBx {
  bottom: 20px;
}

.card .imgBx img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
/* Card CSS Code End */

.nextButton {
  position: absolute;
  right: 2%;
}

.previousButton {
  position: absolute;
  margin-left: 2%;
}

.buttomButtons {
  margin-top: 20px;
  margin-bottom: 60px;
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
  .box {
    justify-items: center;
    display: grid;
    grid-template-columns: repeat(2, 3fr);
  }
}

@media screen and (max-width: 710px) {
  .box {
    justify-items: center;
    display: grid;
    grid-template-columns: repeat(1, 3fr);
  }

  .btn-lg {
    width: 90px;
  }

  .pageHeader {
    font-size: 25px;
    margin-top: 10px;
  }

  .resultHeader {
    display: grid;
    grid-template-columns: repeat(1, 2fr);
    margin: 10px;
  }
}
</style>