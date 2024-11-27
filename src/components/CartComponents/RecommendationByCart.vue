<template>
  <div v-if="recomendaciones.length" class="recomendaciones">
    <h3>Productos Recomendados</h3>
    <div class="recomendaciones-container">
      <button v-if="recomendaciones.length > 1" @click="prevProduct" class="nav-button">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <div class="productos">
        <div v-for="(producto, index) in displayedProducts" :key="producto.product_id"
          :class="['producto-card', index === 1 ? 'current' : '']">
          <div class="producto-card-content">
            <div class="discount-badge" v-if="producto.discount && index === 1">
              {{ producto.discount }}% off
            </div>
            <img :src="producto.product_image" alt="Imagen del producto" class="product-image" />
            <h4 class="producto-name">{{ producto.product_name }}</h4>
            <p class="producto-price">₡ {{ producto.product_price }}</p>
            <p v-if="producto.discount" class="original-price">
              Precio Original: ₡ {{ calculateOriginalPrice(producto) }}
            </p>

            <i v-if="producto.isAdding" class="fa-solid fa-spinner fa-spin-pulse fa-2x" :style="{ cursor: 'not-allowed' }"></i>
            <i v-else @click="addProduct(producto)" class="fas fa-cart-plus fa-2x" :style="{ cursor: 'pointer' }"></i>
          </div>
        </div>
      </div>
      <button v-if="recomendaciones.length > 1" @click="nextProduct" class="nav-button">
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      recomendaciones: [],
      currentIndex: 0,
    };
  },
  computed: {
    displayedProducts() {
      const total = this.recomendaciones.length;

      // Si hay menos de 3 productos, muestra solo uno
      if (total < 3) {
        return [this.recomendaciones[this.currentIndex]];
      }

      return [
        this.recomendaciones[(this.currentIndex - 1 + total) % total], // Producto anterior
        this.recomendaciones[this.currentIndex], // Producto actual
        this.recomendaciones[(this.currentIndex + 1) % total] // Producto siguiente
      ];
    }
  },

  async mounted() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/recommendationByCart', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      this.recomendaciones = response.data.map(item => {
        return {
          product_description: item.description,
          product_id: item.product_id,
          product_name: item.name,
          product_price: item.price,
          product_stock: item.stock,
          product_image: item.images[0]?.image_path,
          isAdding: false // Añadir la propiedad isAdding a cada producto
        };
      });
    } catch (error) {
      console.error('Error al obtener recomendaciones:', error);
    }
  },
  methods: {
    ...mapActions('cart', ['addProductToCart']),

    async addProduct(product) {
      product.isAdding = true;
      try {
        await this.addProductToCart(product);
      } catch (error) {
        console.error('Error adding product to cart:', error);
      } finally {
        product.isAdding = false;
      }
    },

    nextProduct() {
      this.currentIndex = (this.currentIndex + 1) % this.recomendaciones.length;
    },

    calculateOriginalPrice(producto) {
      return (producto.product_price / (1 - producto.discount / 100)).toFixed(2);
    },
    prevProduct() {
      this.currentIndex =
        (this.currentIndex - 1 + this.recomendaciones.length) % this.recomendaciones.length;
    }
  }
};
</script>

<style scoped>
.recomendaciones {
  margin-top: 20px;
  text-align: center;
}

.recomendaciones-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.nav-button {
  background-color: #058dc3;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  margin: 0 10px;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-button:hover {
  background-color: #106384;
  transform: scale(1.05);
}

.productos {
  display: flex;
  align-items: center;
  overflow: hidden;
}

.producto-card {
  background: #fff;
  border-radius: 10px;
  width: 200px;
  height: 300px;
  margin: 0 30px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  opacity: 0.6;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
}

.producto-card.current {
  opacity: 1;
  transform: scale(1.1);
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

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 0 auto 10px;
}

.producto-name {
  font-size: 16px;
  font-weight: bold;
}

.producto-price {
  font-size: 18px;
  color: #058dc3;
}

.buy-button {
  background-color: #106384;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.buy-button:hover {
  background-color: #058dc3;
}

.original-price {
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

@media (max-width: 900px) {
  .productos {
    justify-content: center;
  }

  .producto-card:not(.current) {
    display: none;
  }
}
</style>
