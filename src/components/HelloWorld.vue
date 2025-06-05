<template>
  <v-sheet>
    <v-sheet>
      <AppBar />
      <AboutUs />
      <ShopComponent />
    </v-sheet>
  </v-sheet>
</template>

<script>
import AppBar from './DesktopComponents/AppBar.vue';
import ShopComponent from './DesktopComponents/ShopComponent.vue';
import AboutUs from './DesktopComponents/AboutUs.vue'
export default {
  components: {
    AppBar,
    ShopComponent,
    AboutUs
  }
}
</script>
