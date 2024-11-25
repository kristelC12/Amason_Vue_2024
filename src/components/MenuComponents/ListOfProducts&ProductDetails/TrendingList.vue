<template>
    <div class="list-cotainer">
  
      <h2>Productos en tendencia</h2>
      <div class="product-list-cotainer">
        <ProductCard v-for="product in products" :key="product.product_id" :product="product" />
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
      };
    },
    async created() {
      
        await this.fetchProductsByCategory();

    },
    methods: {
          async fetchProductsByCategory() {
        try {
          const response = await axios.get(`http://localhost:8000/api/recommended/tending/products`);
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
      }
    }
  
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