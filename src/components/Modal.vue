<template>
  <div>
    <div class="col-md-6 offset-md-5 col-sm-4"></div>
    <transition name="modal">
      <div>
        <div class="modal-mask" @click="$emit('toggleModal')">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header">
                <h3>
                  <b>Photo by:</b>
                  {{this.photoMetaData.photographer}}
                </h3>
              </slot>
            </div>
            <div class="modal-body">
              <slot name="body">
                <div class="photo">
                  <div>
                    <h3>Image Preview</h3>
                    <img
                      :src="(this.photoMetaData.src.medium !== '')?this.photoMetaData.src.medium:false"
                      alt="..."
                    />
                  </div>
                  <p>
                    Want to see more works by
                    <b>{{this.photoMetaData.photographer}}</b>
                    visit
                    <a
                      :href="this.photoMetaData.photographer_url"
                      target="blank"
                    >{{this.photoMetaData.photographer_url}}</a>
                  </p>
                  <p>
                    <a :href="this.photoMetaData.url" target="blank">
                      <button class="btn btn-lg btn-primary">Download Image</button>
                    </a>
                  </p>
                </div>
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <!--default footer here-->
                <button class="btn btn-danger" @click="$emit('toggleModal')">Close</button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import isEmptyObject from "../isEmptyObject.js";

export default {
  name: "Modal",
  props: {
    currentPhotoId: Number
  },
  data() {
    return {
      url: "https://api.pexels.com/v1/photos/",
      proxy: "https://cors-anywhere.herokuapp.com/",
      key: process.env.VUE_APP_API_KEY || process.env.API_KEY,
      photoMetaData: {}
    };
  },
  methods: {
    getPhotoData() {
      axios
        .get(`${this.proxy}${this.url}${this.currentPhotoId}`, {
          headers: {
            Authorization: this.key
          }
        })
        .then(res => {
          //   if (res.data.photos.length === 0) {
          //     this.errorMessage =
          //       "Your search returned no results, please check that you entered your address correctly";
          //     return false;
          //   }

          this.photoMetaData = res.data;

          if (isEmptyObject(this.photoMetaData)) {
            console.log("Empty");
            return false;
          }
          this.$emit("toggleSpinner");

          console.log(this.photoMetaData);
        })
        .catch(err => {
          if (err) {
            console.log(err);
          }
        });
    }
  },
  mounted() {
    this.getPhotoData();
  }
};
</script>

<style scoped>
/* Image CSS */
img {
  width: 20%;
  height: 20%;
}

.hideContent {
  display: none;
}

/*Loading Spinner Start*/
.loader {
  margin-top: 200px;
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
/*Loading Spinner End*/

/* Modal CSS Code Start */
.modal-mask {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 70%;
  height: auto;
  margin: 5% auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 0;
  padding: 5px;
}

.modal-default-button {
  float: right;
}
/* Modal CSS Code Start */

/*
     * The following styles are auto-applied to elements with
     * transition="modal" when their visibility is toggled
     * by Vue.js.
     *
     * You can easily play with the modal transition by editing
     * these styles.
     */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

@media screen and (max-width: 750px) {
  img {
    width: 50%;
    height: 50%;
  }
}

@media screen and (max-width: 650px) {
  #map {
    height: 230px;
  }

  .modal-container {
    width: 97%;
  }
}
</style>