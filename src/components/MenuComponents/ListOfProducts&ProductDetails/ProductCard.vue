<template>
  <div class="product-container">
    <img
  :src="product.product_image ? product.product_image : 'https://via.placeholder.com/150'"
  :alt="product.product_name"
  :discount="product.product_discount"
/>
    <h3>{{ product.product_name }}</h3>
    <p
          v-if="product.product_discount"
          class="original-price"
        >
          ₡ {{ product.product_price.toFixed(2) }}
        </p>
    <div class="price-container">
        <!-- Mostrar el precio original si hay descuento -->
        
        <p class="price">
          ₡ {{ discountedPrice.toFixed(2) }}
        </p>
        <span v-if="product.product_discount" class="discount-badge">
          {{ product.product_discount }}% off
        </span>

      
      <i
        v-if="isAdding"
        class="fa-solid fa-spinner fa-spin-pulse fa-2x"
        :style="{ cursor: 'not-allowed' }"
      ></i>
      <i
        v-else
        @click="addProduct(product)"
        class="fas fa-cart-plus fa-2x"
        :style="{ cursor: 'pointer' }"
      ></i>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      isAdding: false,
    };
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    // Calcular el precio con descuento
    discountedPrice() {
      if (this.product.product_discount) {
        return this.product.product_price - (this.product.product_price * this.product.product_discount / 100);
      }
      return this.product.product_price;
    },
  },
  methods: {
    ...mapActions('cart', ['addProductToCart']),

    async addProduct(product) {
      this.isAdding = true; 
      try {
        await this.addProductToCart(product);
      } catch (error) {
        console.error('Error adding product to cart:', error);
      } finally {
        this.isAdding = false; 
      }
    },
  },
};
</script>

<style scoped>
.product-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 40px 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s;
  margin: 5px 8px;
  position: relative; /* Necesario para posicionar correctamente el badge */
}

img {
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-radius: 8px;
}

.product-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.discount-badge {
  position: absolute;
  top: 10px;
  left: 10px; /* Ajusta la posición según tus necesidades */
  background-color: #ff4500;
  color: white;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 20px;
  font-weight: bold;
  z-index: 10; /* Asegura que el badge siempre esté por encima de otros elementos */
}

.price-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
}

.original-price {
  margin-top: -10px;
  margin-bottom: -5px;
  font-size: 14px;
  color: #777;
  text-decoration: line-through;
}

i {
  cursor: pointer;
  color: black;
}

.fa-spinner {
  color: #f1a80b;
}
</style>
