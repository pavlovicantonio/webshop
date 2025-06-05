<script setup>
import PhotoCarousel from '../PhotoCarousel.vue';

</script>

<template>
  <v-sheet id="aboutUs" class="d-flex align-center">
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" md="6">
            <PhotoCarousel />
        </v-col>

        <v-col cols="12" md="6">
          <h2 class="text-h4 font-weight-bold mb-4" style="font-family: 'Poppins', sans-serif; color: #fbae3c;">Welcome to Éclat</h2>
          <p class="text-body-1 mb-3">
            Where elegance meets timeless craftsmanship.
          </p>
          <p class="text-body-1 mb-3">
            At <span style="color: #fbae3c;">Éclat</span>, we celebrate the brilliance of pure gold and sterling silver in every handcrafted piece. Our jewelry is more than an accessory – it’s a symbol of your story, your glow, your Éclat.
          </p>
          <p class="text-body-1 mb-3">
            With a passion for detail and dedication to quality, we offer collections that fuse modern sophistication with classic beauty. Whether you’re looking for a statement ring, a delicate bracelet, or a meaningful gift – you’ll find it here, crafted to shine forever.
          </p>
          <p class="text-subtitle-1 font-italic mt-4 text-center text-md-left">
            ✨ True Gold. Pure Silver. Eternal Elegance. ✨
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<style scoped>
#aboutUs {
  width: 100vw;
  min-height: 90vh;
  background-color: #fdf7e3; /* svjetla, elegantna nijansa */
  padding-top: 40px;
  padding-bottom: 40px;
}

.v-container p {
  font-family: 'Poppins', sans-serif;
}

.rounded {
  border-radius: 16px;
}
</style>
