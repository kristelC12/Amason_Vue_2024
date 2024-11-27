<template>
  <div class="discount-products">
    <h3 class="title">Black Amason</h3>
    <div class="discount-products-container">
      <div
        v-for="product in products"
        :key="product.product_id"
        class="product-card"
      >
        <div class="image-container">
          <img
            :src="product.images[0]?.image_path || 'placeholder.jpg'"
            alt="Imagen del producto"
            class="product-image"
          />
          <span class="discount-badge">
            {{ product.discount }}% off
          </span>
        </div>
        <div class="product-details">
          <h4 class="product-name">{{ product.name }}</h4>
          <p class="price">Precio: ${{ product.price }}</p>
          <p class="original-price">Precio Original: ${{ calculateOriginalPrice(product) }}</p>
        </div>
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [], // Almacenaremos los productos aquí
    };
  },
  methods: {
    calculateOriginalPrice(product) {
      return (product.price / (1 - product.discount / 100)).toFixed(2);
    },
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
  async mounted() {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/recommendationByDiscount"
      );
      if (response.data && Array.isArray(response.data)) {
        this.products = response.data;
      } else {
        console.error("No se encontraron productos en descuento.");
      }
    } catch (error) {
      console.error("Error al obtener productos con descuento:", error);
    }
  },
};
</script>

<style scoped>
.discount-products {
  margin-top: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #ff4500;
}

.discount-products-container {
  display: flex;
  flex-wrap: nowrap; /* Para simular un carrusel */
  overflow-x: auto; /* Habilita el desplazamiento horizontal */
  padding: 20px;
  gap: 20px;
}

.product-card {
  width: 250px;
  min-width: 250px; /* Garantiza tamaño mínimo */
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: scale(1.05);
}

.image-container {
  position: relative;
}

.product-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.discount-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #ff4500;
  color: white;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 20px;
  font-weight: bold;
}

.product-details {
  padding: 10px;
}

.product-name {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
  color: #333;
}

.price {
  font-size: 16px;
  color: #28a745;
  font-weight: bold;
}

.original-price {
  font-size: 14px;
  color: #777;
  text-decoration: line-through;
}

i {
  margin-left: 5px;
  cursor: pointer;
  color: black;
}

.fa-spinner {
  color: #f1a80b;
}
</style>
