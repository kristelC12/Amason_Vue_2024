<template>
  <div class="menu-view">
    <div class="header-container">
      <h2>Mis Órdenes</h2>
    </div>
    <div v-if="loading" class="loading-indicator">
      <p>Cargando órdenes...</p>
    </div>
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
            <button class="options-button" @click="toggleMenu(index)">⋮</button>
            <div v-if="order.showMenu" class="dropdown-menu">
            <button v-if="order.status === 2" @click="requestReturn(order.order_id)" class="dropdown-item">
            Solicitar Devolución
          </button>
        </div>
          </div>
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
        orders: [],  
        loading: false,
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
              if (order.status === 4) {
                order.statusText = 'Devolución Solicitada';
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
      toggleMenu(index) {
      this.orders[index].showMenu = !this.orders[index].showMenu;
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
.loading-indicator {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin: 20px 0;
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
.header h2 {
    font-size: 2rem;
    color: #34495e;
    margin-bottom: 10px;
  }

.options-button {
  border: none;
  background: none;
  font-size: 40px;
  cursor: pointer;
  color: #f1a80b;
}

.dropdown-menu {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 5px;
  z-index: 1000;
}

.dropdown-item {
  padding: 10px;
  cursor: pointer;
  background-color: #f1a80b;
  color: #fff;
  border: none;
  border-radius: 5px;
  display: block;
  text-align: left;
  width: 100%;
}

.dropdown-item:hover {
  background-color: #e09b0a;
}
.menu-view {
  
  flex-direction: column;
  min-height: 66vh;
}
.header-container {
  display: flex;
  justify-content: center; /* Centra el contenido horizontalmente */
  align-items: center; /* Centra el contenido verticalmente */
  padding: 20px; /* Espaciado alrededor del texto */
  border-radius: 5px; /* Bordes redondeados */
  margin-bottom: 20px; /* Espacio debajo del contenedor */
}

.header-container h2 {
  font-size: 2rem; /* Tamaño de fuente */
  color: #34495e; /* Color del texto */
  margin: 0; /* Elimina el margen por defecto */
}
</style>
