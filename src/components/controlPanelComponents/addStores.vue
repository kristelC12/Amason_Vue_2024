<template>
  <div>
    <h2 class="title">Crear Nueva Tienda</h2>
    <div class="form-group">
      <input type="text" v-model="newStoreName" placeholder="Nombre de la Tienda" />
      <textarea v-model="newStoreDescription" placeholder="Descripción de la Tienda" rows="4"></textarea>
      <input type="email" v-model="newStoreEmail" placeholder="Email de la Tienda" />
      <button class="btn-create" @click="addStore">Agregar Tienda</button>
    </div>

    <!-- Ventana emergente -->
    <div v-if="showAlert" class="popup">
      <div class="popup-content">
        <img :src="alertImage" alt="Alerta" class="popup-image" />
        <h3 class="popup-title">¡Atención!</h3>
        <p class="popup-message">{{ alertMessage }}</p>
        <button @click="closeAlert" class="popup-close">Aceptar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      newStoreName: "",
      newStoreDescription: "",
      newStoreEmail: "",
      showAlert: false,
      alertMessage: "",
      alertImage: "",
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type === "image/png") {
        this.newStoreLogo = file;
      } else {
        this.showAlertMessage("Por favor sube un archivo PNG.", "https://cdn-icons-png.flaticon.com/512/1828/1828665.png");
        this.newStoreLogo = null;
      }
    },
    async addStore() {
      const sellerId = localStorage.getItem("pivotId");

      if (!sellerId) {
        this.showAlertMessage(
          "Error: No se encontró un ID de vendedor. Inicia sesión nuevamente.",
          "https://cdn-icons-png.flaticon.com/512/753/753345.png"
        );
        return;
      }

      const formData = new FormData();
      formData.append("seller_id", sellerId);
      formData.append("store_name", this.newStoreName);
      formData.append("description", this.newStoreDescription);
      formData.append("email", this.newStoreEmail);

      try {
        const response = await axios.post("http://127.0.0.1:8000/api/store", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.status === 201) {
          this.showAlertMessage("¡Tienda creada exitosamente!", "https://cdn-icons-png.flaticon.com/512/190/190411.png");
          this.$emit("update-stores", response.data.vendedor);

         
          this.newStoreName = "";
          this.newStoreDescription = "";
          this.newStoreEmail = "";
        } else {
          this.showAlertMessage(response.data.message, "https://cdn-icons-png.flaticon.com/512/753/753345.png");
        }
      } catch (error) {
        this.showAlertMessage("Ocurrió un error al intentar crear la tienda.", "https://cdn-icons-png.flaticon.com/512/753/753345.png");
        console.error("Error:", error);
      }
    },
    showAlertMessage(message, imageUrl) {
      this.alertMessage = message;
      this.alertImage = imageUrl;
      this.showAlert = true;
    },
    closeAlert() {
      this.showAlert = false;
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 2em;
  color: #0077b6;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 2px 2px 5px rgba(0, 119, 182, 0.5);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input,
textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-create {
  background-color: #0096c7;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-create:hover {
  background-color: #0077b6;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background: #f9f9f9;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  width: 350px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.4s ease-in-out;
  border-top: 5px solid #0077b6;
}

.popup-image {
  width: 80px;
  height: 80px;
  margin-bottom: 15px;
}

.popup-title {
  font-size: 1.5em;
  color: #0077b6;
  margin-bottom: 10px;
}

.popup-message {
  font-size: 1.1em;
  color: #333;
}

.popup-close {
  background-color: #0096c7;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
}

.popup-close:hover {
  background-color: #0077b6;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>