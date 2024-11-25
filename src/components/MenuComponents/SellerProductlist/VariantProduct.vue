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
              <button type="button" @click="removeVariant(index)">Eliminar Variante</button>
            </div>
            <button type="button" @click="addVariant" class="add-variant-button">
              Agregar Variante
            </button>
          </div>
  
          <!-- Botones de acción -->
          <div class="form-actions">
            <button type="button" @click="closeModal" class="cancel-button">Cancelar</button>
            <button type="submit" class="save-button">Guardar Variantes</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    props: {
      productId: Number, // ID del producto al que se agregarán las variantes
    },
    data() {
      return {
        showModal: true,
        variants: [], // Lista de variantes creadas
      };
    },
    methods: {
      closeModal() {
        this.$emit("close");
      },
      addVariant() {
        this.variants.push({ type: "", options: "" });
      },
      removeVariant(index) {
        this.variants.splice(index, 1);
      },
      async saveVariants() {
  try {
    const formattedVariants = this.variants.map((variant) => ({
      ...variant,
      options: variant.options
        .split(',')
        .map((option) => option.trim())
        .filter(Boolean), // Elimina opciones vacías
    }));

    // Llamada a la API para guardar variantes
    await axios.post(
      `http://localhost:8000/api/products/${this.productId}/variants`,
      { variants: formattedVariants }
    );

    console.log('Variantes guardadas con éxito.');
    this.$emit('variants-saved', formattedVariants); // Emitir evento al padre
    this.closeModal();
  } catch (error) {
    console.error('Error al guardar las variantes:', error.response?.data || error.message);
    alert('Hubo un problema al guardar las variantes. Verifique los datos.');
  }
}

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
  }
  
  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    position: relative;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    overflow-y: auto;
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
  
  .add-variant-button {
    margin-top: 10px;
    padding: 10px;
    background-color: #0ea5e9;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
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
  