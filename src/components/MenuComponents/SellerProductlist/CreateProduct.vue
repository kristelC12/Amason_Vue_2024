<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2 class="modal-title">Crear Nuevo Producto</h2>
      <form @submit.prevent="handleSubmit">
        <!-- Nombre del Producto -->
        <div class="form-group">
          <label for="name">Nombre del Producto</label>
          <input type="text" id="name" v-model="product.name" required />
        </div>
        
        <!-- Categoría -->
        <div class="form-group">
          <label for="category_id">Category</label>
          <select id="category" v-model.number="product.category_id" required>
            <option disabled value="">Select category</option>
            <option value="1">Electronics</option>
            <option value="2">Clothing</option>
            <option value="3">Books</option>
            <option value="4">Toys & Games</option>
            <option value="5">Automotive</option>
            <option value="6">Beauty & Personal Care</option>
          </select>
        </div>

        <!-- Precio -->
        <div class="form-group">
          <label for="price">Precio</label>
          <input type="text" id="price" v-model="product.price" required />
        </div>

        <!-- Stock -->
        <div class="form-group">
          <label for="stock">Stock</label>
          <input type="number" id="stock" v-model="product.stock" required />
        </div>

        <!-- Descripción -->
        <div class="form-group">
          <label for="description">Descripción</label>
          <textarea id="description" v-model="product.description" rows="3" required></textarea>
        </div>

        <!-- Links de Imágenes -->
        <div class="form-group">
          <label for="image_links">Links de Imágenes (separados por comas)</label>
          <textarea id="image_links" v-model="imageLinksText" rows="3" placeholder="Ingresa los links de las imágenes, separados por comas"></textarea>
        </div>

        <!-- Botones de acción -->
        <div class="form-actions">
          <button type="button" @click="closeModal" class="cancel-button">Cancelar</button>
          <button type="submit" class="save-button">Crear Producto</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { createProduct } from '../../../../api/auth'; // O la ruta correcta

export default {
  props: {
    showModal: {
      type: Boolean,
      required: true, // Opción si es obligatorio
    }
  },
  data() {
    return {
      product: {
        name: '',
        category_id: '',  // Este será el ID numérico de la categoría
        price: '',
        stock: '',
        description: '',
        id_store: 1 // Asignar directamente aquí el ID de la tienda
      },
      imageLinksText: '', // Aquí se almacenarán las URLs ingresadas por el usuario
      
    };
  },
  methods: {
    closeModal() {
      this.$emit('close-modal'); // Emitir el evento para cerrar el modal
    },
    async handleSubmit() {
  try {
    // Convertimos el texto de los links de imágenes en un array
    const imageLinks = (this.imageLinksText || '')
      .split(',') // Separa los links por comas
      .map((link) => link.trim()) // Remueve espacios innecesarios
      .filter((link) => link); // Filtramos posibles valores vacíos

    // Agregamos los links al objeto de producto
    const newProduct = {
      ...this.product,
      image_links: imageLinks, // Asignamos los links de imágenes
    };

    console.log('Enviando nuevo producto:', newProduct);

    // Llamar a la API para crear el producto
    await createProduct(newProduct);

    // Emitir evento para notificar al componente padre que el producto fue creado
    this.$emit('product-created');

    // Limpiar el formulario
    this.product = {
      name: '',
      price: '',
      stock: '',
      category_id: '',
      id_store: 1,
    };
    this.imageLinksText = ''; // Limpiar el campo de links de imágenes

    // Cerrar el modal
    this.closeModal();
  } catch (error) {
    console.error('Error al crear el producto:', error.message);
  }
},


  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 350px;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  color: #333;
  cursor: pointer;
}

.modal-title {
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  color: #007098;
  margin-bottom: 5px;
  display: block;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.cancel-button {
  background-color: #e74c3c;
  color: #f0f0f0;
  border: 1px solid #e74c3c;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.save-button {
  background-color: #0ea5e9;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
