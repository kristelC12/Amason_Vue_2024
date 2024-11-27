
<template>
    <div class="return-action-container">
      <h2>Acción de Devolución</h2>
      <form @submit.prevent="submitAction">
        <div class="form-group">
          <label for="notes">Notas del Administrador:</label>
          <textarea id="notes" v-model="adminNotes" required></textarea>
        </div>
        <button type="button" @click="actionType = 'accept'" class="accept-button">Aceptar</button>
        <button type="button" @click="actionType = 'cancel'" class="cancel-button">Cancelar</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from '../../../services/api'
  
  export default {
    data() {
      return {
        adminNotes: '',
        actionType: null
      }
    },
    computed: {
      returnId() {
        return this.$route.params.returnId;
      }
    },
    methods: {
      async submitAction() {
        if (!this.actionType) {
          alert('Por favor, selecciona una acción.');
          return;
        }
  
        try {
          const response = await api.put(`/order-return/${this.returnId}`, {
            status: this.actionType === 'accept' ? 'approved' : 'rejected',
            admin_notes: this.adminNotes
          }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
  
          if (response.status === 200) {
            alert('Acción realizada con éxito.');
            this.$router.push({ name: 'ReturnAdminPanel' }); // Redirigir al panel de administración
          }
        } catch (error) {
          alert('Hubo un error al realizar la acción.');
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* ... estilos existentes ... */
  .return-action-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .accept-button, .cancel-button {
    padding: 10px 20px;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
  }
  
  .accept-button {
    background-color: #27ae60;
  }
  
  .cancel-button {
    background-color: #e74c3c;
  }
  </style>