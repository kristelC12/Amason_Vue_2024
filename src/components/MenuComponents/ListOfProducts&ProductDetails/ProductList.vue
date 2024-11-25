<template>
  <div class="list-cotainer">

    <h2>{{ title }}</h2>
    <div class="product-list-cotainer">
       <!-- Mostrar mensaje después de un tiempo si no hay productos -->
    <p v-if="showNoProductsMessage && products.length === 0">
      No hay productos en esta categoría.
    </p>

    <!-- Renderizar productos si los hay -->
    <ProductCard
      v-for="product in products"
      :key="product.product_id"
      :product="product"
    />
    </div>

  </div>
</template>

<script>
import ProductCard from "./ProductCard.vue";
import axios from "axios";

export default {
  components: { ProductCard },
  data() {
    return {
      products: [],
      title: '',
      showNoProductsMessage: false, // Controla si mostrar el mensaje
    };
  },
  async created() {
      // Retraso antes de mostrar el mensaje
      setTimeout(() => {
      if (this.products.length === 0) {
        this.showNoProductsMessage = true;
      }
    }, 1000); // Tiempo de espera (3 segundos en este caso)
    const categoryId = this.$route.query.categoryId;
    const title = this.$route.query.title;
    const name = this.$route.query.name; // Obtener el parámetro de búsqueda por nombre

    if (categoryId) {
      this.title = title;
      await this.fetchProductsByCategory(categoryId);
    } else if (name) {
      this.title = `Resultados de búsqueda para: "${name}"`;
      await this.fetchProductsByName(name); // Llamar al método de búsqueda por nombre
    }
    
  },
  watch: {
    '$route.query.name': {
      immediate: true,
      handler(newName) {
        if (newName) {
          this.title = `Resultados de búsqueda para: "${newName}"`;
          this.fetchProductsByName(newName);
        }
      },
    },
    '$route.query.categoryId': {
      immediate: true,
      handler(newCategoryId) {
        if (newCategoryId) {
          const title = this.$route.query.title || '';
          this.title = title;
          this.fetchProductsByCategory(newCategoryId);
        }
      },
    },
  },
  methods: {
    async fetchProductsByCategory(categoryId) {
      try {
        const response = await axios.get(`http://localhost:8000/api/recommended/products/category/${categoryId}`);
        console.log(response.data);

        // Reestructurar el JSON recibido
        this.products = response.data.map(product => ({
          product_id: product.product_id,
          product_description: product.description,
          product_name: product.name,
          product_price: product.price,
          product_stock: product.stock,
          product_image: product.image_path,
        }));
      } catch (error) {
        console.error("Error al cargar productos por categoría:", error);
      }
    },
    async fetchProductsByName(name) {
      try {
        const response = await axios.get(`http://localhost:8000/api/products/search`, {
          params: { name },
        });
        console.log(response.data);

        // Reestructurar el JSON recibido
        this.products = response.data.map(product => ({
          product_id: product.product_id,
          product_description: product.description,
          product_name: product.name,
          product_price: product.price,
          product_stock: product.stock,
          product_image: product.image
        }));
      } catch (error) {
        console.error("Error al cargar productos por nombre:", error);
      }
    },
  },
};
</script>



<style scoped>
.list-cotainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10vh;
}

.product-list-cotainer {
  display: grid;
  align-items: center;
  width: 80vw;
  grid-template-columns: repeat(auto-fill, minmax(300px, 0.4fr));
  justify-content: center;
  gap: 1rem;
}

@media (width <=1030) {
  .product-list-cotainer {
    width: 90vw;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}
</style>