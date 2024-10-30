<template>
  <div class="product-list-container">
    <h2>Mis Productos</h2>

    <!-- Botón para agregar producto -->
    <button class="add-product-button" @click="openCreateModal">Agregar Producto</button>

    <table class="product-table">
      <thead>
        <tr>
          <th>ID</th> <!-- Añadir el ID del producto -->
          <th>Imagen</th>
          <th>Nombre del Producto</th>
          <th>Categoría</th> <!-- Añadir la categoría -->
          <th>Descripción</th> <!-- Añadir la descripción -->
          <th>Stock</th> <!-- Añadir el stock -->
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in localProducts" :key="product.product_id">
          <td>{{ product.product_id }}</td> <!-- Mostrar el ID del producto -->
          <td>
            <!-- Mostrar la imagen del producto -->
            <img :src="getImageUrl(product)" class="product-image" />
          </td>
          <td>{{ product.name }}</td>
          <td>{{ product.category_name }}</td> <!-- Mostrar la categoría -->
          <td>{{ product.description }}</td> <!-- Mostrar la descripción -->
          <td>{{ product.stock }}</td> <!-- Mostrar el stock -->
          <td>{{ formatCurrency(product.price) }}</td>
          <td class="action-buttons">
            <button class="edit-button" @click="openEditModal(product)">Editar</button>
            <button class="delete-button" @click="confirmDelete(product.product_id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <EditProductModal
      v-if="showEditModal"
      :product="selectedProduct"
      @close="closeEditModal"
      @save="saveProductChanges"
    />

    <!-- Modal para crear producto -->
    <CreateProduct
      v-if="showCreateModal"
      :showModal="showCreateModal"
      @close-modal="closeCreateModal"
      @create="addNewProduct"
    />

    <DeleteConfirmationModal
      v-if="showDeleteModal"
      :showModal="showDeleteModal"
      :productId="deleteProductId"
      @close="cancelDelete"
      @confirm="deleteProduct"
    />
  </div>
</template>

<script>
import EditProductModal from './EditProductModal.vue';
import CreateProduct from './CreateProduct.vue';
import DeleteConfirmationModal from './DeleteConfirmationModal.vue';
import axios from 'axios';

export default {
  components: {
    EditProductModal,
    CreateProduct,
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
    };
  },
  props: {
    products: Array,
    showModal: Boolean,
    productId: Number
  },
  watch: {
    products(newProducts) {
      // Sincronizar la copia local cuando products cambie
      this.localProducts = [...newProducts];
    }
  },
  methods: {
    
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
    },
    saveProductChanges(updatedProduct) {
  const index = this.localProducts.findIndex((p) => p.product_id === updatedProduct.product_id);
  
  if (index !== -1) {
    // Llamada a la API para actualizar el producto en la base de datos
    axios.put(`http://localhost:8000/api/products/${updatedProduct.product_id}`, updatedProduct)
      .then((response) => {
        // Actualizamos el producto en la lista con la respuesta del servidor
        this.localProducts[index] = response.data.product;

        // Confirmación de la actualización
        console.log('Producto actualizado en la base de datos:', response.data.product);
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
        const response = await axios.get('http://localhost:8000/api/products/store/1');
        this.localProducts = response.data;
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    },
    getImageUrl(product) {
      // Asegurarse de que la URL de la imagen esté bien formada o use una imagen por defecto
      console.log("URL de imagen del producto:", product.image);
      return product.image ? product.image : 'default_image_path';
    }
  }
};
</script>

<style scoped>
.product-list-container {
  max-width: 900px;
  margin: 0 auto;
}
h2 {
  text-align: left;
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
  color: #555;
  font-size: 16px;
}
.product-image {
  width: auto; 
  max-width: 200px; 
  height: auto; 
  max-height: 200px; 
  object-fit: contain; 
}

.action-buttons {
  text-align: left;
  white-space: nowrap;
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
.edit-button {
  background-color: #f0f0f0;
  color: #333;
}
.delete-button {
  background-color: #e74c3c;
  color: white;
}

.delete-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.delete-modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.modal-buttons {
  margin-top: 20px;
}

.cancel-button {
  background-color: #ccc;
  color: #333;
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 4px;
}

.confirm-delete-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
}
</style>
