<template>
  <div>
    <!-- Shop Button to open cart -->
    <v-btn color="primary" @click="cartOpen = true">Open Cart ({{ totalQuantity }})</v-btn>

    <!-- Cart Modal -->
    <v-dialog v-model="cartOpen" max-width="80vw" max-height="65vh" persistent scrollable>
      <v-card>
        <v-card-title class="justify-space-between">
          <span>Your Cart</span>
          <v-btn icon @click="cartOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <div v-if="cartItems.length === 0">Your cart is empty.</div>
          <v-list v-else>
            <v-list-item
              v-for="item in cartItems"
              :key="item.id"
              class="align-center"
            >
              <v-list-item-avatar>
                <v-img :src="item.image" contain />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>Price: ${{ item.price.toFixed(2) }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn
                  icon
                  small
                  color="red"
                  @click="decreaseQuantity(item.id)"
                  class="mr-1"
                >
                  <v-icon small>mdi-minus</v-icon>
                </v-btn>

                <span class="mx-2">{{ item.quantity }}</span>

                <v-btn
                  icon
                  small
                  color="green"
                  @click="increaseQuantity(item.id)"
                  class="ml-1"
                >
                  <v-icon small>mdi-plus</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions class="justify-space-between">
          <div>Total: ${{ totalPrice.toFixed(2) }}</div>

          <div>
            <v-btn color="grey" text @click="cartOpen = false">Close</v-btn>
            <v-btn
              color="primary"
              :disabled="cartItems.length === 0"
              @click="openOrderForm"
            >
              Finish Order
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Order Form Modal -->
    <v-dialog v-model="orderFormOpen" max-width="80vw" max-height="65vh" persistent>
      <v-card>
        <v-card-title>
          <span>Order Details</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="orderFormOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-form ref="orderForm" v-model="valid" lazy-validation>
            <v-text-field
              v-model="order.name"
              label="First Name"
              :rules="[v => !!v || 'First name is required']"
              required
            ></v-text-field>

            <v-text-field
              v-model="order.surname"
              label="Last Name"
              :rules="[v => !!v || 'Last name is required']"
              required
            ></v-text-field>

            <v-text-field
              v-model="order.address"
              label="Address"
              :rules="[v => !!v || 'Address is required']"
              required
            ></v-text-field>

            <v-text-field
              v-model="order.city"
              label="City"
              :rules="[v => !!v || 'City is required']"
              required
            ></v-text-field>

            <v-text-field
              v-model="order.postCode"
              label="Post Code"
              :rules="[v => !!v || 'Post code is required']"
              required
            ></v-text-field>

            <v-text-field
              v-model="order.cardNumber"
              label="Card Number"
              :rules="[
                v => !!v || 'Card number is required',
                v => /^\d{16}$/.test(v) || 'Card number must be 16 digits'
              ]"
              required
              maxlength="16"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="orderFormOpen = false">Cancel</v-btn>
          <v-btn
            color="primary"
            :disabled="!valid"
            @click="submitOrder"
          >
            Finish Order
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartOpen: false,
      orderFormOpen: false,
      valid: false,
      cartItems: [
        // Sample data for demonstration, replace with your real data
        { id: 1, name: 'Product A', price: 10.99, quantity: 2, image: 'https://via.placeholder.com/50' },
        { id: 2, name: 'Product B', price: 5.49, quantity: 1, image: 'https://via.placeholder.com/50' },
      ],
      order: {
        name: '',
        surname: '',
        address: '',
        city: '',
        postCode: '',
        cardNumber: '',
      },
    };
  },
  computed: {
    totalQuantity() {
      return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    },
    totalPrice() {
      return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
  },
  methods: {
    increaseQuantity(id) {
      const item = this.cartItems.find(i => i.id === id);
      if (item) item.quantity++;
    },
    decreaseQuantity(id) {
      const item = this.cartItems.find(i => i.id === id);
      if (item && item.quantity > 1) {
        item.quantity--;
      } else if (item && item.quantity === 1) {
        // Remove item completely
        this.cartItems = this.cartItems.filter(i => i.id !== id);
      }
    },
    openOrderForm() {
      this.orderFormOpen = true;
    },
    submitOrder() {
      this.$refs.orderForm.validate();
      if (this.valid) {
        alert('Order received');
        // Reset cart and order form
        this.cartItems = [];
        this.order = {
          name: '',
          surname: '',
          address: '',
          city: '',
          postCode: '',
          cardNumber: '',
        };
        this.orderFormOpen = false;
        this.cartOpen = false;
        location.reload(); // refresh page
      }
    },
  },
};
</script>

<style scoped>
.v-list-item-avatar {
  max-width: 50px;
  max-height: 50px;
}
</style>
