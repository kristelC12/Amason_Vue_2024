<template>
    <div class="menu-view">
      <div class="return-action-container">
        <h2>Detalles de la Devolución</h2>
        <p>ID de Devolución: {{ returnId }}</p>
        <div class="form-group">
          <textarea v-model="adminNotes" placeholder="Agregar notas de administrador"></textarea>
        </div>
        <div>
          <button @click="acceptReturn" class="accept-button">Aceptar Devolución</button>
          <button @click="cancelReturn" class="cancel-button">Cancelar Devolución</button>
          <button @click="exitView" class="exit-button">Salir</button>
        </div>
      </div>
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
      async acceptReturn() {
      this.actionType = 'accept';
      await this.submitAction();
    },
    async cancelReturn() {
      this.actionType = 'cancel';
      await this.submitAction();
    },
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
      },
      exitView() {
        this.$router.push('/return-admin-panel');
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
  
  .accept-button, .cancel-button, .exit-button {
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
  
  .menu-view {
    display: flex;
    flex-direction: column;
    min-height: 66vh;
  }

  .exit-button {
    background-color: #34495e;
  }
  </style>