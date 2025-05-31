import { reactive } from 'vue';

export const cart = reactive({
    items: [],

    addToCart(product) {
        const item = this.items.find(p => p.id === product.id);
        if (item) {
            item.quantity++;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
    },

    get total() {
        return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },

    removeFromCart(id) {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    },

    clearCart() {
        this.items.splice(0, this.items.length);
    }
});
