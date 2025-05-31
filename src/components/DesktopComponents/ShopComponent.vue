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
            height="200px"
            cover
          ></v-img>

          <v-card-title class="text-h6">
            {{ product.name }}
          </v-card-title>

          <v-card-subtitle class="text-subtitle-1 font-weight-bold">
            {{ product.price }} €
          </v-card-subtitle>

          <v-card-text>
            {{ product.description }}
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" @click="addToCart(product)" block>
              Add to Cart
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { cart } from '../../../CartStore';

export default {
  data() {
    return {
      products: [
        {
          id: 1,
          name: 'Nike Air Max',
          price: 99,
          description: 'Comfortable and stylish sneakers for everyday wear.',
          image: 'https://static.nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/5c934a01-b207-4975-9429-c66fc9ecddb0/nike-air-max-90-golf-release-date.jpg'
        },
        {
          id: 2,
          name: 'Adidas Ultraboost',
          price: 120,
          description: 'High-performance running shoes with superior cushioning.',
          image: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/f96bc6605bde4187b473af3300f4646f_9366/Ultraboost_22_Shoes_Black_GX5464_01_standard.jpg'
        },
        {
          id: 3,
          name: 'Apple AirPods Pro',
          price: 199,
          description: 'Noise-cancelling wireless earbuds with premium sound.',
          image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-pro-gen2-2023_FMT_WHH?wid=940&hei=1112&fmt=png-alpha&.v=1693591513201'
        },
        {
          id: 4,
          name: 'Samsung Galaxy S22',
          price: 799,
          description: 'Powerful smartphone with a stunning AMOLED display.',
          image: 'https://images.samsung.com/is/image/samsung/p6pim/hr/2202/gallery/hr-galaxy-s22-s901-sm-s901bzadeub-530427658'
        },
        {
          id: 5,
          name: 'Sony WH-1000XM4',
          price: 349,
          description: 'Top-tier wireless headphones with noise cancellation.',
          image: 'https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg'
        },
        {
          id: 6,
          name: 'Fitbit Charge 5',
          price: 129,
          description: 'Fitness tracker with built-in GPS and health monitoring.',
          image: 'https://m.media-amazon.com/images/I/61ZXwnk9GUL._AC_SL1500_.jpg'
        },
        {
          id: 7,
          name: 'Dell XPS 13',
          price: 999,
          description: 'Sleek and powerful ultrabook for productivity.',
          image: 'https://i.dell.com/sites/imagecontent/products/PublishingImages/xps-13-9315-laptop/spi/ng/notebook-xps-13-9315-hero-504x350.jpg'
        },
        {
          id: 8,
          name: 'Canon EOS R10',
          price: 899,
          description: 'Compact mirrorless camera for professional photography.',
          image: 'https://www.canon-europe.com/media/eos-r10-product-front_tcm13-2118122.jpg'
        },
        {
          id: 9,
          name: 'GoPro HERO11',
          price: 399,
          description: 'Rugged action camera with 5.3K video and stabilization.',
          image: 'https://gopro.com/content/dam/gopro/en/productpage/hero11-black/gallery-1.png'
        },
        {
          id: 10,
          name: 'Logitech MX Master 3S',
          price: 99,
          description: 'Advanced wireless mouse designed for productivity.',
          image: 'https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-top-view-graphite.png?v=1'
        },
        {
          id: 11,
          name: 'Amazon Echo Dot (5th Gen)',
          price: 49,
          description: 'Smart speaker with Alexa and improved sound.',
          image: 'https://m.media-amazon.com/images/I/61jovjd+f9L._AC_SL1000_.jpg'
        },
        {
          id: 12,
          name: 'Lenovo Legion 5 Pro',
          price: 1299,
          description: 'Gaming laptop with Ryzen processor and RTX graphics.',
          image: 'https://p1-ofp.static.pub/medias/22736823564_Lenovo_Legion_5_Pro_16ACH6H_Hero_Front_Facing_Right_Thunder_Black.png'
        },
        {
          id: 13,
          name: 'Samsung 4K Smart TV 55"',
          price: 599,
          description: 'Crystal-clear 4K UHD TV with smart features.',
          image: 'https://images.samsung.com/hr/tvs/uhd-4k/tv-uhd-4k-au7092-55-inch-ue55au7092uxxh-frontblack-401894126.png'
        },
        {
          id: 14,
          name: 'Apple Watch Series 9',
          price: 399,
          description: 'Smartwatch with advanced fitness and health tracking.',
          image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s9-digitalmat-gallery-1-202309?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1693186509784'
        },
        {
          id: 15,
          name: 'Bose SoundLink Flex',
          price: 149,
          description: 'Portable Bluetooth speaker with rich sound.',
          image: 'https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/speakers/soundlink_flex/product_silo_images/SoundLink_Flex_LuxeBlue_EC_hero.psd/jcr:content/renditions/cq5dam.web.320.320.png'
        },
        {
          id: 16,
          name: 'Nintendo Switch OLED',
          price: 349,
          description: 'Gaming console with vibrant OLED display.',
          image: 'https://www.nintendo.com/eu/media/images/11_character/nintendo/switch/nintendo_switch_oled_model_white_set-01.png'
        },
        {
          id: 17,
          name: 'Harman Kardon Aura Studio 3',
          price: 279,
          description: 'Elegant Bluetooth speaker with 360° sound.',
          image: 'https://www.harmankardon.co.in/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw2025150e/HK_Aura_Studio3_Hero.png'
        },
        {
          id: 18,
          name: 'Microsoft Surface Pro 9',
          price: 1099,
          description: '2-in-1 laptop for work and creativity.',
          image: 'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Surface-Pro-9-Platinum-Wallpaper-03?wid=828&hei=620&fit=crop'
        },
        {
          id: 19,
          name: 'Asus ROG Strix G17',
          price: 1499,
          description: 'Gaming laptop with high refresh rate screen.',
          image: 'https://dlcdnwebimgs.asus.com/files/media/33FE1BB1-587E-48D7-97D4-874D57AD11D1/v1/img/kv.png'
        },
        {
          id: 20,
          name: 'Philips Hue Starter Kit',
          price: 199,
          description: 'Smart lighting kit with customizable colors.',
          image: 'https://images.philips.com/is/image/PhilipsConsumer/046677530172-A1P-global-001?wid=420&hei=360&$jpglarge$'
        }
      ]
    };
  
  },
  methods: {
    addToCart(product) {
      cart.addToCart(product);
    }
  }
};
</script>

<style scoped>
.v-card {
  transition: 0.3s ease-in-out;
}
.v-card:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}
</style>
