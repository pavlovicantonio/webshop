<template>
  <v-container class="py-6">
    <v-row dense>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card elevation="3">
          <v-img
            :src="product.image"
            :alt="product.name"
            height="200"
            cover
          />
          <v-card-title class="text-h6">{{ product.name }}</v-card-title>
          <v-card-subtitle class="text-subtitle-1 font-weight-bold">{{ product.price }} €</v-card-subtitle>
          <v-card-text class="description-clamp">{{ product.description }}</v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="openInfo(product)">
              Info
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal v-sheet -->
    <v-sheet
      v-if="infoDialog"
      class="info-dialog"
      elevation="12"
      tile
      style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
             width: 80vw; height: 70vh; background: white; z-index: 2000; overflow-y: auto; border-radius: 12px; padding: 24px;"
    >
      <v-row class="fill-height" align="center" justify="space-between">
        
        <!-- Lijevi stupac sa carouselom -->
        <v-col cols="12" md="6" class="d-flex flex-column align-center">
  <div v-if="selectedProduct && selectedProduct.id === equilibriumId" style="width: 100%;">
    <v-carousel
      v-model="carouselIndex"
      hide-delimiters
      height="300"
      class="rounded-lg"
    >
      <v-carousel-item
        v-for="item in equilibriumItems"
        :key="item.id"
      >
        <v-img
          :src="item.image"
          :alt="item.name"
          class="main-image"
          height="300"
          contain
          style="width: 100%;"
        />
      </v-carousel-item>
    </v-carousel>
    <p class="text-center mt-2 font-weight-bold text-subtitle-1">
      {{ equilibriumItems[carouselIndex].name }}
    </p>
  </div>

  <div v-else>
    <v-img
      :src="selectedImage"
      max-width="300"
      max-height="300"
      contain
      class="main-image"
    />
  </div>
</v-col>


        <!-- Desni stupac s informacijama -->
        <v-col cols="12" md="6" class="d-flex flex-column justify-space-between">
          <div>
            <h2>{{ selectedProduct.name }}</h2>
            <h4 class="font-weight-bold">{{ selectedProduct.price }} €</h4>
            <p style="white-space: pre-line;">{{ selectedProduct.description }}</p>

            <!-- Checkboxovi za kolekciju -->
            <div v-if="selectedProduct.id === equilibriumId" style="margin-top: 16px;">
              <p><strong>Choose pieces from the Equilibrium Collection:</strong></p>
              <v-checkbox
                v-for="item in equilibriumItems"
                :key="item.id"
                v-model="selectedItems"
                :label="item.name + ' - ' + item.price + ' €'"
                :value="item"
              />
            </div>
          </div>

          <div>
            <v-btn color="primary" block class="mb-3" @click="addSelectedToCart">
              Add to Cart
            </v-btn>
            <v-btn color="secondary" block outlined @click="closeInfo">
              Close
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-sheet>

    <div v-if="infoDialog" class="modal-backdrop" @click="closeInfo"></div>
  </v-container>
</template>

<script setup>
import { ref, watch } from 'vue';
import { cart } from '../../../CartStore'; // prilagodi putanju
import pic3 from '@/assets/pic3.jpg';
import pic33 from '@/assets/pic33.jpg';
import pic333 from '@/assets/pic333.jpg';
import pic2 from '@/assets/pic2.jpg';
import pic1 from '@/assets/pic1.jpg';
import pic5 from '@/assets/pic5.jpg';




const products = ref([
  {
    id: 1,
    name: 'Mariposa Royale Necklace',
    price: 99,
    description: 'Let your elegance take flight. ✨🦋 The Mariposa Royale Necklace is a radiant butterfly pendant crafted from real gold and adorned with dazzling stones. Symbolizing transformation, grace, and freedom, it’s your everyday reminder to shine unapologetically.',
    image: pic2
  },
  {
    id: 2,
    name: 'Celeste Pearl Bracelet',
    price: 120,
    description: 'Grace never goes out of style. 🤍 The Celeste Pearl Bracelet is a modern homage to timeless beauty. A radiant string of luminous pearls paired with a delicate real gold chain — elegance with a whisper of nostalgia. Crafted from genuine materials, this bracelet is made with real gold and is 100% waterproof — designed for the woman who carries grace effortlessly, from day to night. Wear it. Feel it. Be unforgettable. ✨',
    image: pic1
  },
  {
    id: 3,
    name: 'Dual Aura Bangles',
    price: 45,
    description: 'Two tones. One statement. ⚡ The Dual Aura Bangles blend the timeless strength of real gold and silver into a powerful minimalist silhouette. Crafted from genuine precious metals and fully waterproof, these bangles are your everyday armor — refined, radiant, and ready for anything. Wear them solo for subtle elegance, or stack for a modern bold edge. This is balance. This is brilliance. This is Éclat.',
    image: pic5
  },
  {
    id: 100,
    name: 'Equilibrium Collection',
    price: 50 +'-'+60,
    description: `✨ Introducing the Equilibrium Collection ✨
Crafted from genuine gold and sterling silver, these anti-stress necklace and ring sets are more than just jewelry — they are wearable symbols of serenity and self-expression.

Each pendant spins effortlessly, designed to soothe your senses while adding a touch of timeless elegance. Let your fingers find peace in motion, and your mind find calm in beauty.

🌙 Celestial Balance – For those seeking harmony within.
🌞 Soluna Duality – For the dreamers balancing light and dark.
🦋 Lumen Bloom – For the ones who bloom through change.

🔄 Spin to release tension.
🛡 Made with real gold and silver.
🎁 Perfect for daily mindfulness or as a meaningful gift.`,
    image: pic3
  },
]);

const equilibriumId = 100;

const equilibriumItems = ref([
  { id: 101, name: 'Celestial Balance', price: 50, description: 'For those seeking harmony within.', image: pic333 },
  { id: 102, name: 'Soluna Duality', price: 60, description: 'For the dreamers balancing light and dark.', image: pic33 },
  { id: 103, name: 'Lumen Bloom', price: 55, description: 'For the ones who bloom through change.', image: pic3 },
]);

const infoDialog = ref(false);
const selectedProduct = ref(null);
const selectedItems = ref([]);
const selectedImage = ref('');
const carouselIndex = ref(0);

function openInfo(product) {
  selectedProduct.value = product;
  selectedItems.value = [];
  if (product.id === equilibriumId) {
    selectedImage.value = equilibriumItems.value[0].image;
    carouselIndex.value = 0;
  } else {
    selectedImage.value = product.image;
  }
  infoDialog.value = true;
}

function closeInfo() {
  infoDialog.value = false;
  selectedProduct.value = null;
  selectedItems.value = [];
  selectedImage.value = '';
  carouselIndex.value = 0;
}

function addSelectedToCart() {
  if (selectedProduct.value.id === equilibriumId) {
    if (selectedItems.value.length === 0) {
      alert('Please select at least one item from the collection.');
      return;
    }
    selectedItems.value.forEach(item => {
      cart.addToCart(item);
    });
  } else {
    cart.addToCart(selectedProduct.value);
  }
  alert('Added to cart!');
  closeInfo();
}

watch(carouselIndex, (newIndex) => {
  if (selectedProduct.value && selectedProduct.value.id === equilibriumId) {
    selectedImage.value = equilibriumItems.value[newIndex].image;
  }
});

</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.4);
  z-index: 1000;
}

.description-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.main-image {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
</style>
