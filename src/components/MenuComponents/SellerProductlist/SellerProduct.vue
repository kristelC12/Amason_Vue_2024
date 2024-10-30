<template>
  <div class="bg-gray-100 min-h-screen">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Panel de Vendedor</h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <SellerProductList v-if="!showCreateProduct" :products="sellerProducts" @product-deleted="fetchProducts"/>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import SellerProductList from './SellerProductList.vue';

export default {
  components: {
    SellerProductList,
  },
  setup() {
    const sellerProducts = ref([]);
    const showCreateProduct = ref(false);

    const fetchProducts = async () => {
      try {
        // Realiza una llamada a la API para obtener los productos de la tienda 1
        const response = await axios.get('http://localhost:8000/api/products/store/1');
        // Asigna la respuesta de los productos al array de sellerProducts
        sellerProducts.value = response.data;
        console.log("Productos obtenidos:", sellerProducts.value);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    onMounted(fetchProducts);

    // Método para manejar cuando un nuevo producto es creado
    const handleProductCreated = (newProduct) => {
      sellerProducts.value.push(newProduct);
      showCreateProduct.value = false;
    };

    return {
      sellerProducts,
      showCreateProduct,
      handleProductCreated,
      fetchProducts
    };
  },
};
</script>

<style scoped>
/* Estilos para el layout y la funcionalidad del botón de "Crear Producto" */
.bg-gray-100 {
  background-color: #f9f9f9;
}
.min-h-screen {
  min-height: 100vh;
}
.bg-white {
  background-color: white;
}
.shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.text-3xl {
  font-size: 1.875rem;
}
.font-bold {
  font-weight: bold;
}
.text-gray-900 {
  color: #1a202c;
}
.max-w-7xl {
  max-width: 1120px;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.sm\:px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.lg\:px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}
.flex {
  display: flex;
}
.justify-between {
  justify-content: space-between;
}
.items-center {
  align-items: center;
}
.bg-blue-500 {
  background-color: #4299e1;
}
.hover\:bg-blue-600:hover {
  background-color: #3182ce;
}
.text-white {
  color: white;
}
.font-bold {
  font-weight: bold;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.rounded {
  border-radius: 0.25rem;
}
</style>