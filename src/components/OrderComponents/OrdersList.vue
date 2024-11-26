<template>
    <div class="task-list-container">
      <div class="task-item" v-for="(order, index) in orders" :key="index">
        <div class="task-header">
          <div class="task-status">
            <span class="status-icon">&#x2714;</span>
          </div>
          <div class="task-info">
            <h3 class="task-title">Número de Orden: {{ order.order_id }}</h3>
            <p class="task-total">Total de la Orden: ₡{{ order.total_amount }}</p>
          </div>
          <div class="task-meta">
            <span class="status">{{ order.statusText }}</span>
            <span class="time">{{ new Date(order.created_at).toLocaleString() }}</span>
          </div>
          <div class="task-options">
            <button class="options-button">⋮</button>
            <button v-if="order.status === 2" @click="requestReturn(order.order_id)" class="return-button">
            Solicitar Devolución
          </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from '../../../services/api'  
  
  export default {
    data() {
      return {
        orders: []  
      }
    },
  
    async mounted() {
      await this.ordersList();  
    },
  
    methods: {
      async ordersList() {
        try {
          const response = await api.get('/orders/user-history', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          })
  
          if (response.status === 200) {
            
            this.orders = response.data;  
            this.orders = response.data.map(order => {
              if (order.status === 1) {
              order.statusText = 'Creada';
              }if (order.status === 2) {
                order.statusText = 'Finalizada';
              }
              if (order.status === 3) {
                order.statusText = 'Cancelada';
              }
              return order;
            });
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            alert('No se encontró información de las órdenes.');
          } else {
            alert('Hubo un error al obtener las órdenes.');
          }
          return false;
        }
      },
    requestReturn(orderId) {
      // Redirigir a la vista ReturnRequestView con el ID de la orden
      this.$router.push({ name: 'ReturnRequestView', params: { orderId } });
    }
      }
    }
  
  </script>

<style scoped>
.task-list-container {
  max-width: 800px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
  color: #333;
}

.task-item {
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-status {
  display: flex;
  align-items: center;
  font-weight: bold;
}

.status-icon {
  font-size: 16px;
  color: #28a745;
  margin-right: 10px;
}

.task-info {
  flex-grow: 1;
}

.task-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.task-total {
  font-size: 14px;
  color: #666;
  margin: 5px 0 0;
}

.task-meta {
  text-align: right;
  margin: 10px;
}

.status {
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #000;
}

.time {
  font-size: 12px;
  color: #000;
}

.options-button {
  border: none;
  background: none;
  font-size: 40px;
  cursor: pointer;
  color: #f1a80b;
}
.return-button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #f1a80b;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

</style>
