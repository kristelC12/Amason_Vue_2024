<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2 class="modal-title">Editar Producto</h2>
      <form @submit.prevent="saveChanges">
        <!-- Nombre del Producto -->
        <div class="form-group">
          <label for="name">Nombre del Producto</label>
          <input type="text" id="name" v-model="localProduct.name" required />
        </div>

        <!-- Categoría -->
        <div class="form-group">
          <label for="category_id">Categoría</label>
          <select id="category" v-model="localProduct.category_id" required>
            <option disabled value="">Seleccione una categoría</option>
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
          <input type="text" id="price" v-model="localProduct.price" required />
        </div>

        <!-- Descuento -->
        <div class="form-group">
          <label for="discount">Descuento (%)</label>
          <input
            type="number"
            id="discount"
            v-model.number="localProduct.discount"
            min="0"
            max="100"
            required
          />
        </div>

        <!-- Stock -->
        <div class="form-group">
          <label for="stock">Stock</label>
          <input type="number" id="stock" v-model="localProduct.stock" required />
        </div>

        <!-- Descripción -->
        <div class="form-group">
          <label for="description">Descripción</label>
          <textarea id="description" v-model="localProduct.description" rows="3" required></textarea>
        </div>

        <!-- Subir Imágenes -->
        <div class="form-group">
          <label for="images">Subir Imágenes</label>
          <input type="file" id="images" @change="handleImageUpload" multiple />
        </div>

        <!-- Botones de acción -->
        <div class="form-actions">
          <button type="button" @click="closeModal" class="cancel-button">Cancelar</button>
          <button type="submit" class="save-button">Guardar Cambios</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    product: Object,
    categories: Array, // Recibimos las categorías desde el padre
  },
  data() {
    return {
      showModal: true,
      localProduct: { ...this.product },
      selectedImages: [], // Imágenes seleccionadas
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },

    handleImageUpload(event) {
      this.selectedImages = Array.from(event.target.files); // Guardar las imágenes seleccionadas
      console.log("Imágenes seleccionadas:", this.selectedImages);
    },

    async saveChanges() {
      try {
        // Actualizar datos básicos del producto
        const updatedProduct = {
          name: this.localProduct.name,
          description: this.localProduct.description,
          price: this.localProduct.price,
          stock: this.localProduct.stock,
          category_id: this.localProduct.category_id,
          discount: this.localProduct.discount, // Agregar el descuento
        };

        // Realiza la actualización de datos básicos
        await axios.put(
          `http://localhost:8000/api/products/${this.localProduct.product_id}`,
          updatedProduct
        );

        // Si hay imágenes seleccionadas, actualízalas por separado
        if (this.selectedImages.length > 0) {
          await this.updateProductImages(this.localProduct.product_id);
        }

        // Emitir evento para sincronizar con el padre
        this.$emit("save", this.localProduct);
        this.closeModal();
      } catch (error) {
        console.error(
          "Error al guardar los datos del producto:",
          error.response?.data || error.message
        );
      }
    },

    async updateProductImages(productId) {
      try {
        const formData = new FormData();

        // Adjuntar cada imagen seleccionada al FormData
        this.selectedImages.forEach((image, index) => {
          formData.append(`images[${index}]`, image);
        });

        // Llamada a la API para actualizar las imágenes
        const response = await axios.post(
          `http://localhost:8000/api/products/${productId}/images`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Imágenes actualizadas:", response.data);
      } catch (error) {
        console.error(
          "Error al actualizar las imágenes:",
          error.response?.data || error.message
        );
        throw error; // Lanzar error para manejarlo en el método padre
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
  padding: 10px; /* Espacio interno para pantallas pequeñas */
  box-sizing: border-box;
  overflow-y: auto; /* Permite desplazamiento en caso de contenido largo */
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 100%; /* Ancho completo para pantallas pequeñas */
  max-width: 500px; /* Ancho máximo en pantallas grandes */
  max-height: 90vh; /* Limitar altura al 90% de la ventana */
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  overflow-y: auto; /* Desplazamiento interno si el contenido supera el tamaño */
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
  flex-wrap: wrap; /* Permitir ajuste en pantallas pequeñas */
}

.cancel-button,
.save-button {
  flex: 1;
  margin: 5px;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.cancel-button {
  background-color: #e74c3c;
  color: #f0f0f0;
  border: 1px solid #e74c3c;
}

.save-button {
  background-color: #0ea5e9;
  color: white;
  border: none;
}

@media (max-width: 768px) {
  .modal-title {
    font-size: 18px;
  }

  .form-group label {
    font-size: 14px;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 8px;
    font-size: 14px;
  }

  .cancel-button,
  .save-button {
    font-size: 14px;
    padding: 8px 10px;
  }
}
</style>

