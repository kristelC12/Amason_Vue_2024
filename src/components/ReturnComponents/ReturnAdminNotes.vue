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
  export default {
    props: {
      returnId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        adminNotes: ''
      };
    },
    methods: {
      acceptReturn() {
        // Lógica para aceptar la devolución
        console.log('Devolución aceptada:', this.returnId, this.adminNotes);
      },
      cancelReturn() {
        // Lógica para cancelar la devolución
        console.log('Devolución cancelada:', this.returnId, this.adminNotes);
      },
      exitView() {
        this.$router.push('/return-admin-panel');
      }
    }
  };
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