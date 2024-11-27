<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2 class="modal-title">Crear Variantes</h2>
      <form @submit.prevent="saveVariants">
        <!-- Variantes -->
        <div class="form-group">
          <label>Variantes</label>
          <div v-for="(variant, index) in variants" :key="index" class="variant-group">
            <div>
              <label for="variant-type">Tipo</label>
              <input
                type="text"
                v-model="variant.type"
                placeholder="Ej: Talla, Color"
                required
              />
            </div>
            <div>
              <label for="variant-options">Opciones</label>
              <input
                type="text"
                v-model="variant.options"
                placeholder="Ej: S,M,L (separar con comas)"
                required
              />
            </div>
            <button type="button" class="remove-variant" @click="removeVariant(index)">
              Eliminar Variante
            </button>
          </div>
          <button type="button" @click="addVariant" class="add-variant-button">
            Agregar Variante
          </button>
        </div>

        <!-- Botones de acción -->
        <div class="form-actions">
          <button type="button" @click="closeModal" class="cancel-button">Cancelar</button>
          <button type="submit" class="save-button">Guardar Variantes</button>
          <button type="button" @click="openViewVariantsModal" class="view-button">Ver Variantes</button>
        </div>
      </form>
    </div>

    <!-- Modal para ver y editar variantes -->
    <div v-if="showViewVariantsModal" class="modal-overlay">
      <div class="modal-content">
        <span class="close" @click="closeViewVariantsModal">&times;</span>
        <h2 class="modal-title">Editar Variantes</h2>
        <div v-if="loadingVariants" class="loading-message">Cargando variantes...</div>
        <div v-else-if="viewVariants.length === 0" class="no-variants-message">
          No hay variantes disponibles para este producto.
        </div>
        <div v-else v-for="(variant, index) in viewVariants" :key="index" class="variant-group">
          <div>
            <label for="variant-type">Tipo</label>
            <input
              type="text"
              v-model="variant.type"
              placeholder="Ej: Talla, Color"
              disabled
            />
          </div>
          <div>
            <label for="variant-options">Opciones</label>
            <input
              type="text"
              v-model="variant.options"
              placeholder="Ej: S,M,L (separar con comas)"
            />
          </div>
          <button type="button" class="remove-variant" @click="removeVariantFromView(index)">
            Eliminar
          </button>
          <!-- Botón de actualizar -->
          <button type="button" class="update-variant" @click="updateVariant(index)">
  Actualizar
</button>
        </div>
        <div class="form-actions">
          <button type="button" @click="closeViewVariantsModal" class="cancel-button">
            Cerrar
          </button>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    productId: Number,
  },
  data() {
    return {
      showModal: true,
      showViewVariantsModal: false,
      variants: [],
      viewVariants: [], // Variantes cargadas desde la API
      loadingVariants: false, // Estado de carga
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    openViewVariantsModal() {
      this.loadVariants(); // Cargar las variantes desde la API
      this.showViewVariantsModal = true;
    },
    closeViewVariantsModal() {
      this.showViewVariantsModal = false;
    },
    addVariant() {
      this.variants.push({ type: "", options: "" });
    },
    removeVariant(index) {
      this.variants.splice(index, 1);
    },
    
   // No recargar las variantes después de la actualización
async updateVariant(index) {
  const variantToUpdate = this.viewVariants[index];
  try {
    await axios.put(
      `http://localhost:8000/api/products/${this.productId}/variation`, 
      {
        type: variantToUpdate.type, 
        options: variantToUpdate.options.split(',').map(option => option.trim())
      }
    );
    
    // Actualiza la variante en el estado local
    this.viewVariants[index] = { ...variantToUpdate }; // Solo actualiza la variante modificada
    alert("La variante se actualizó correctamente.");
    console.log("Variante actualizada con éxito");
    
  } catch (error) {
    console.error("Error al actualizar la variante:", error.response?.data || error.message);
    alert("Hubo un problema al actualizar la variante.");
  }
}
,

    async removeVariantFromView(index) {
  const variantToDelete = this.viewVariants[index];
  try {
    await axios.delete(
      `http://localhost:8000/api/products/${this.productId}/variation`,
      {
        data: {
          type: variantToDelete.type, 
        },
      }
    );

    // Si la eliminación es exitosa, eliminar de la vista
    this.viewVariants.splice(index, 1);
    console.log("Variante eliminada con éxito");
    alert("Variante eliminada con éxito");

  } catch (error) {
    console.error("Error al eliminar la variante:", error.response?.data || error.message);
    alert("Hubo un problema al eliminar la variante.");
  }
},

    async loadVariants() {
      this.loadingVariants = true; // Mostrar mensaje de carga
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/${this.productId}/variation`
        );
        this.viewVariants = response.data.map((variant) => ({
          ...variant,
          options: variant.options.join(", "), // Combina las opciones en una cadena
        }));
      } catch (error) {
        console.error(
          "Error al cargar las variantes:",
          error.response?.data || error.message
        );
        alert("No se pudieron cargar las variantes del producto.");
      } finally {
        this.loadingVariants = false; // Ocultar mensaje de carga
      }
    },
    
    async saveVariants() {
  try {
    for (const variant of this.variants) {
      if (variant.type && variant.options) {
        const formattedOptions = variant.options
          .split(',')
          .map((option) => option.trim())
          .filter(Boolean);

        await axios.post(
         `http://localhost:8000/api/products/${this.productId}/variation`, 
          {
            type: variant.type,
            options: formattedOptions
          }
        );
      }
    }

    console.log('Variantes guardadas con éxito');
    alert("Variantes guardadas con éxito");

    this.$emit('variants-saved', this.variants);
    this.closeModal();
  } catch (error) {
    console.error('Error al guardar las variantes:', error.response?.data || error.message);
    alert('Hubo un problema al guardar las variantes. Verifique los datos.');
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
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;  
  width: 100%;
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

.variant-group {
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.variant-group input {
  flex: 1;
}

.add-variant-button,
.view-button,
.remove-variant,
.update-variant {  /* Estilo para el nuevo botón de actualizar */
  margin-top: 10px;
  padding: 10px;
  background-color: #0ea5e9;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.update-variant {
  background-color: #28a745;  /* Color verde */
  transition: background-color 0.3s ease;
}

.update-variant:hover {
  background-color: #218838;  /* Color más oscuro */
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.cancel-button {
  background-color: #e74c3c;
  color: #fff;
  padding: 10px 15px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.save-button {
  background-color: #0ea5e9;
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

</style>
