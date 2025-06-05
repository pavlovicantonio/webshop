<template>
  <v-carousel
    cycle
    height="400"
    interval="3000"
    hide-delimiters
    :show-arrows="false"
  >
    <v-carousel-item
      v-for="(image, i) in images"
      :key="i"
      :src="image"
      cover
    />
  </v-carousel>
</template>

<script>
export default {
  name: 'PhotoCarousel',
  data() {
    return {
      images: [
        require('@/assets/pic1.jpg'),
        require('@/assets/pic2.jpg'),
        require('@/assets/pic3.jpg'),
        require('@/assets/pic4.jpg'),
      ]
    };
  }
};
</script>

<style>
.v-carousel-item {
  transition: 0.6s ease-in-out;
}
.v-carousel__controls {
  display: none !important;
}
</style>
