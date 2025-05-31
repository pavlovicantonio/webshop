<template>
  <v-sheet>
    <v-sheet>
      <AppBar />
      <ShopComponent />
    </v-sheet>
  </v-sheet>
</template>

<script>
import AppBar from './DesktopComponents/AppBar.vue';
import ShopComponent from './DesktopComponents/ShopComponent.vue';
export default {
  components: {
    AppBar,
    ShopComponent
  }
}
</script>
