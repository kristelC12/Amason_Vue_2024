<template>
    <div class="page-wrapper">
    <div class="background"></div>
    <div class="ticket-container">
      <h2 class="form-title">Crear Nuevo Ticket</h2>
      <form @submit.prevent="submitTicket" class="ticket-form">
       
        <div class="form-group">
          <label for="order-package">Orden o Paquete</label>
          <select v-model="ticket.orderPackage" class="form-input" required>
            <option value="" disabled selected>Selecciona una opción</option>
            <option value="Orden 1">Orden 1</option>
            <option value="Orden 2">Orden 2</option>
            <option value="Paquete A">Paquete A</option>
            <option value="Paquete B">Paquete B</option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="category">Tipo de Reclamo</label>
          <select v-model="ticket.category" class="form-input" required>
            <option value="" disabled selected>Selecciona un reclamo</option>
            <option value="No se encuentra el paquete">No se encuentra el paquete</option>
            <option value="Producto dañado">Producto dañado</option>
            <option value="Error en la factura">Error en la factura</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="subject">Asunto</label>
          <input type="text" v-model="ticket.subject" class="form-input" required placeholder="Escribe el asunto" />
        </div>
  
        <div class="form-group">
          <label for="description">Descripción</label>
          <textarea v-model="ticket.description" class="form-input" required placeholder="Describe el problema..."></textarea>
        </div>
  
        <div class="form-group">
          <label>Subir Fotos/Archivos</label>
          <div v-for="index in 1" :key="index" class="file-upload">
            <input type="file" @change="handleFileUpload(index)" class="file-input" />
            <span>No hay archivo seleccionado</span>
          </div>
        </div>
  
        <div class="form-group notification">
          <label>Notificarme por:</label>
          <div class="notification-options">
            <label class="checkbox-label">
              <input type="checkbox" v-model="ticket.notifyEmail" /> Email
            </label>
            <label class="checkbox-label">
              <input type="checkbox" v-model="ticket.notifySMS" /> Mensaje de texto
            </label>
          </div>
          <input v-if="ticket.notifySMS" type="texto" v-model="ticket.phoneNumber" class="form-input" placeholder="Número de teléfono (ej. 6098 8877)" />
        </div>
  
        <button type="submit" class="btn-submit">Crear Ticket</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      ticket: {
        orderPackage: '',
        category: '',
        subject: '',
        description: '',
        notifyEmail: false,
        notifySMS: false,
        phoneNumber: '',
        files: Array(5).fill(null)
      }
    };
  },
  methods: {
    handleFileUpload(index) {
      const input = event.target;
      if (input.files.length > 0) {
        this.ticket.files[index - 1] = input.files[0];
        input.nextElementSibling.textContent = input.files[0].name;
      }
    },
    submitTicket() {
      console.log("Ticket creado:", this.ticket);
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

html, body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  font-family: 'Montserrat', sans-serif;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  align-items: center;
  overflow: hidden;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1; 
  background-color: #91ebff;
  background: linear-gradient(to top, #e2e2e2, #e8faff);
}

.ticket-container {
  max-width: 650px;
  margin: 50px auto;
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Montserrat', sans-serif;
  position: relative;
  z-index: 1; 
}

.form-title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
}

.ticket-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  color: #333;
  background-color: #f9f9f9;
}

.form-input:focus {
  outline: none;
  border-color: #7f8c8d;
}

.file-upload {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.file-input {
  width: 100%;
}

.notification-options {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-submit {
  padding: 12px;
  background-color: #27ae60;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-submit:hover {
  background-color: #2ecc71;
}
</style>
