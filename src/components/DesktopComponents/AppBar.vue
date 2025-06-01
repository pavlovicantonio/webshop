<template>
  <v-sheet class="VS1" style="width: 100vw; height: 10vh; position: fixed; top: 0; left: 0; right: 0;">
    <v-toolbar flat>
      <v-toolbar-title style="font-family: 'Poppins', sans-serif; color: #001220;">
        Webshop
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Total price -->
      <div class="d-flex align-center mr-4" style="font-weight: 600; color: #001220;">
        {{ total }} €
      </div>

      <!-- Icons and Cart Menu -->
      <div class="d-flex align-center mr-4">
        <v-menu offset-y>
          <template #activator="{ props }">
            <v-badge
              :content="itemCount"
              color="red"
              overlap
              bordered
              class="mx-2"
              v-if="itemCount > 0"
            >
              <v-icon v-bind="props" style="color: #fbae3c;">mdi-cart</v-icon>
            </v-badge>
            <v-icon v-else v-bind="props" style="color: #fbae3c;" class="mx-2">mdi-cart</v-icon>
          </template>

          <v-list style="width: 350px; max-height: 65vh; overflow-y: auto;">
            <v-list-item
              v-for="(item, index) in cartItems"
              :key="item.id || index"
            >
              <v-list-item-avatar>
                <v-img :src="item.image" style="height: 128px;" alt="Product image" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">
                  {{ item.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.quantity }} x {{ item.price }} € =
                  <strong>{{ item.quantity * item.price }} €</strong>
                </v-list-item-subtitle>
              </v-list-item-content>

              <!-- Minus button -->
              <v-btn
                icon
                small
                color="red"
                @click.stop="decreaseQuantity(item)"
                class="mr-1"
                title="Remove one"
              >
                <v-icon small>mdi-minus</v-icon>
              </v-btn>

              <!-- Plus button -->
              <v-btn
                icon
                small
                color="green"
                @click.stop="increaseQuantity(item)"
                title="Add one"
              >
                <v-icon small>mdi-plus</v-icon>
              </v-btn>
            </v-list-item>

            <v-divider v-if="itemCount > 0"></v-divider>

            <v-list-item v-if="itemCount > 0">
              <v-list-item-content>
                <v-list-item-title class="text-right font-weight-bold">
                  Total: {{ total }} €
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="itemCount > 0" class="justify-end">
              <v-btn color="primary" @click="orderFormOpen = true">COMPLETE ORDER</v-btn>
            </v-list-item>

            <v-list-item v-if="itemCount === 0">
              <v-list-item-content>
                <v-list-item-title>Your cart is empty.</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- Menu icon -->
        <v-icon style="color: #fbae3c;" class="mx-2">mdi-menu</v-icon>
      </div>
    </v-toolbar>

    <v-sheet style="background-color: transparent; height: 10vh; width: 100vw;"></v-sheet>
  </v-sheet>
  <v-dialog v-model="orderFormOpen" max-width="500">
  <v-card>
    <v-card-title>
      <span class="text-h6">Informations for delivery</span>
      <v-spacer></v-spacer>
      <v-btn icon @click="orderFormOpen = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-form ref="orderForm" v-model="valid" lazy-validation>
        <v-text-field v-model="order.name" label="First Name" :rules="[v => !!v || 'Required']" required />
        <v-text-field v-model="order.surname" label="Last Name" :rules="[v => !!v || 'Required']" required />
        <v-text-field v-model="order.address" label="Adress" :rules="[v => !!v || 'Required']" required />
        <v-text-field v-model="order.city" label="City" :rules="[v => !!v || 'Required']" required />
        <v-text-field v-model="order.postCode" label="POST Code" :rules="[v => !!v || 'Required']" required />
        <v-text-field v-model="order.cardNumber" label="Card Number" :rules="[
          v => !!v || 'Obavezno',
          v => /^\d{16}$/.test(v) || 'Mora biti 16 znamenki'
        ]" required maxlength="16" />
        <v-text-field v-model="order.cvv" label="CVV Number" :rules="[v => !!v || 'Required']" required maxlength="3"/>
      </v-form>
    </v-card-text>
    
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="grey" text @click="orderFormOpen = false">Odustani</v-btn>
      <v-btn color="primary" :disabled="!valid" @click="submitOrder">Završi narudžbu</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
import { computed } from 'vue';
import { cart } from '../../../CartStore.js';
import { ref } from 'vue';

export default {
  setup() {
    const itemCount = computed(() =>
      cart.items.reduce((sum, item) => sum + item.quantity, 0)
    );

    const total = computed(() => cart.total);

    const cartItems = computed(() => cart.items);

    const orderFormOpen = ref(false);
    const valid = ref(false);
    const orderForm = ref(null);

    const order = ref({
      name: '',
      surname: '',
      address: '',
      city: '',
      postCode: '',
      cardNumber: '',
      cvv: ''
    });

    function submitOrder() {
      orderForm.value.validate();
      if (valid.value) {
        alert('Order received');
        cart.items.length = 0;
        orderFormOpen.value = false;
        location.reload();
      }
    }
    // Methods to change quantities
    function decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        const index = cart.items.findIndex(i => i.id === item.id);
        if (index !== -1) {
          cart.items.splice(index, 1);
        }
      }
    }

    function increaseQuantity(item) {
      item.quantity++;
    }

    return {
      cart,
      itemCount,
      total,
      cartItems,
      decreaseQuantity,
      increaseQuantity,
      orderFormOpen,
      valid,
      order,
      orderForm,
      submitOrder,
    };
  }
};
</script>

<style>
.VS1 {
  background-color: #F2F2F2;
  z-index: 10;
}
</style>
