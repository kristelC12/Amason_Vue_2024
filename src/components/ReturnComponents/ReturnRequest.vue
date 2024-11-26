<template>
    <div class="return-request-container">
      <h2>Solicitar Devolución</h2>
      <form @submit.prevent="submitReturnRequest">
        <div class="form-group">
          <label for="reason">Razón de la Devolución:</label>
          <textarea id="reason" v-model="reason" required></textarea>
        </div>
        <button type="submit" class="submit-button">Enviar Solicitud</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from '../../../services/api'
  
  export default {
    data() {
      return {
        reason: ''
      }
    },
    computed: {
      orderId() {
        return this.$route.params.orderId;
      }
    },
    methods: {
      async submitReturnRequest() {
        try {
          const response = await api.post('/order-return', {
            order_id: this.orderId,
            reason: this.reason
          }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
  
          if (response.status === 200) {
            alert('Solicitud de devolución enviada con éxito.');
            this.$router.push({ name: 'OrdersList' }); 
          }
        } catch (error) {
          alert('Hubo un error al enviar la solicitud de devolución.');
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* ... estilos existentes ... */
  .return-request-container {
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
  
  .submit-button {
    padding: 10px 20px;
    background-color: #f1a80b;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>