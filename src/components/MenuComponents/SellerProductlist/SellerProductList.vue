<template>
  <div class="product-list-container">
    <h2>Mis Productos</h2>

    <!-- Botón para agregar producto -->
    <button class="add-product-button" @click="openCreateModal">Agregar Producto</button>

    <!-- Tabla de productos -->
    <div class="table-wrapper">
      <table class="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>Descuento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in localProducts" :key="product.product_id">
            <td data-label="ID">{{ product.product_id }}</td>
            <td data-label="Imagen">
              <img :src="getImageUrl(product)" class="product-image" alt="Imagen del producto" />
            </td>
            <td data-label="Nombre">{{ product.name }}</td>
            <td data-label="Categoría">{{ product.category_name }}</td>
            <td data-label="Descripción">{{ product.description }}</td>
            <td data-label="Stock">{{ product.stock }}</td>
            <td data-label="Precio">{{ formatCurrency(product.price) }}</td>
            <td data-label="Descuento">{{ product.discount }}</td>
            <td data-label="Acciones" class="action-buttons">
              <button class="edit-button" @click="openEditModal(product)">Editar</button>
              <button class="delete-button" @click="confirmDelete(product.product_id)">Eliminar</button>
              <button class="variant-button" @click="handleVariant(product.product_id)">Variante</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modales -->
    <EditProductModal v-if="showEditModal" :product="selectedProduct" @close="closeEditModal" @save="saveProductChanges" />
    <CreateProduct v-if="showCreateModal" :showModal="showCreateModal" :store-id="storeId" @close-modal="closeCreateModal" @create="addNewProduct" />
    <DeleteConfirmationModal v-if="showDeleteModal" :showModal="showDeleteModal" :productId="deleteProductId" @close="cancelDelete" @confirm="deleteProduct" />
   <!-- Codigo variante -->
    <VariantProduct v-if="showVariantModal" :productId="selectedProductId" @close="closeVariantModal" @variants-saved="fetchProducts"
  />
  </div>
</template>

<script>
import EditProductModal from './EditProductModal.vue';
import CreateProduct from './CreateProduct.vue';
import DeleteConfirmationModal from './DeleteConfirmationModal.vue';
import VariantProduct from './VariantProduct.vue';   

import axios from 'axios';

export default {
  components: {
    EditProductModal,
    CreateProduct,
    //CODE VARIANTES
    VariantProduct,
    DeleteConfirmationModal
  },
  data() {
    return {
      localProducts: [...this.products], // Copia local de products
      showEditModal: false,
      showCreateModal: false,
      showDeleteModal: false,
      deleteProductId: null, // ID del producto a eliminar
      selectedProduct: null,
      //Codigo de variantes
      showVariantModal: false,
      selectedProductId: null,
      
    };
  },
  props: {
  products: Array,
  showModal: Boolean,
  productId: Number,
  storeId: { 
    type: Number,
    required: true,
  },
},
  watch: {
    products(newProducts) {
      // Sincronizar la copia local cuando products cambie
      this.localProducts = [...newProducts];
    }
  },
  methods: {
    mounted() {
  console.log("ID de tienda recibido en SellerProductList:", this.storeId);
},

    formatCurrency(value) {
      return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'USD',
      }).format(value);
    },
    openEditModal(product) {
  // Crear una copia del producto seleccionado
  this.selectedProduct = { ...product };

  // Verificar si el producto tiene una propiedad images (que viene del backend)
  if (product.images && Array.isArray(product.images)) {
    // Mapear los enlaces de las imágenes
    const imageLinks = product.images.map(image => image.image_path);
    // Asignar los enlaces como un string separado por comas
    this.selectedProduct.imageLinksText = imageLinks.join(', ');
  } else {
    // Si no hay imágenes, dejar el campo vacío
    this.selectedProduct.imageLinksText = '';
  }

  // Mostrar el modal de edición
  this.showEditModal = true;
}

,
closeEditModal() {
  this.showEditModal = false;
  this.fetchProducts(); // Refresca la lista de productos
},



    saveProductChanges(updatedProduct) {
  const index = this.localProducts.findIndex((p) => p.product_id === updatedProduct.product_id);

  if (index !== -1) {
    // Llamada a la API para actualizar el producto en la base de datos
    axios.put(`http://localhost:8000/api/products/${updatedProduct.product_id}`, updatedProduct)
      .then((response) => {
        console.log('Producto actualizado:', response.data.product);

        // Sincronizar los productos desde el backend
        this.fetchProducts();
      })
      .catch((error) => {
        console.error('Error al actualizar el producto:', error);
      });
  }

  this.showEditModal = false;
}

  

,
    openCreateModal() {
      this.showCreateModal = true; // Abre el modal de creación
    },
    async closeCreateModal() {
      this.showCreateModal = false; // Cierra el modal de creación
      await this.fetchProducts();
    },
    addNewProduct(newProduct) {
      this.localProducts.push(newProduct); // Añadimos el nuevo producto a la copia local     
     
      this.$emit('update-products', this.localProducts); // Emitimos el cambio al componente padre      
      this.showCreateModal = false;
    },
    confirmDelete(productId) {
      if (productId) {
        this.deleteProductId = productId;
        this.showDeleteModal = true;
      } else {
        console.error("ID del producto no está definido");
      }
    },
    cancelDelete() {
      this.showDeleteModal = false;
      this.deleteProductId = null;
    },
    async deleteProduct(productId) {
      try {
        console.log("Producto a eliminar:", productId);
        // Llamada a la API para eliminar el producto
        await axios.delete(`http://localhost:8000/api/products/${productId}`);

        // Volver a obtener la lista de productos después de eliminar uno
        await this.fetchProducts();

        // Actualizamos la lista de productos localmente
        this.localProducts = this.localProducts.filter(product => product.product_id !== productId);

        // Emitimos el cambio al componente padre para actualizar la lista global
        this.$emit('update-products', this.localProducts);

        // Ocultar el modal y limpiar el ID del producto
        this.showDeleteModal = false;
        this.deleteProductId = null;
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
      }
    },
    async fetchProducts() {
  try {
    // Llamada a la API para obtener la lista de productos
    const response = await axios.get(`http://localhost:8000/api/products/store/${this.storeId}`);

    this.localProducts = response.data;
    console.log('Productos actualizados:', this.localProducts);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
  }
}



,
getImageUrl(product) {
  return product.image && product.image.startsWith('http')
    ? product.image
    : `${window.location.origin}/storage/${product.image}`;
}
,    

  //Metodo de variantes 
  handleVariant(productId) {
        this.selectedProductId = productId;
        this.showVariantModal = true;
      },
      closeVariantModal() {
        this.showVariantModal = false;
        this.selectedProductId = null;
      },
  }
  
};
</script>

<style scoped>
.product-list-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.add-product-button {
  display: inline-block;
  background-color: #0ea5e9;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
}
.edit-button,
.delete-button {
  display: inline-block;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 10px;
}

.variant-button {
  display: inline-block;
  background-color: #34a853;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.variant-button:hover {
  background-color: #2c8c47;
}

.edit-button {
  background-color: #f0f0f0;
  color: #333;
}
.delete-button {
  background-color: #e74c3c;
  color: white;
}
.add-product-button:hover {
  background-color: #0077b6;
}

.table-wrapper {
  overflow-x: auto; /* Permitir desplazamiento horizontal en pantallas pequeñas */
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #f9f9f9;
}

.product-table th,
.product-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  vertical-align: middle;
}

.product-table th {
  background-color: #0077b6;
  color: white;
  font-size: 14px;
  text-transform: uppercase;
}

.product-table td {
  font-size: 14px;
}

.product-table tr {
  transition: background-color 0.3s;
}

.product-table tr:hover {
  background-color: #e8f4fc;
}

.product-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* Responsivo */
@media (max-width: 768px) {
  .product-list-container {
    padding: 10px;
  }

  .add-product-button {
    width: 100%;
    font-size: 16px;
  }

  .product-table thead {
    display: none;
  }

  .product-table tr {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    border-bottom: 2px solid #ddd;
    padding-bottom: 10px;
  }

  .product-table td {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }

  .product-table td::before {
    content: attr(data-label);
    font-weight: bold;
    text-transform: uppercase;
    color: #555;
  }

  .product-table td[data-label="Imagen"] {
    display: flex;
    justify-content: center;
  }

  .product-image {
    width: 80px;
    height: 80px;
  }

  .action-buttons {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
}

@media (max-width: 480px) {
  h2 {
    font-size: 20px;
  }

  .add-product-button {
    font-size: 14px;
    padding: 8px;
  }

  .product-image {
    width: 60px;
    height: 60px;
  }
}
</style>