<template>
    <div class="menu-view">
      <div class="page-wrapper" v-if="!loading">
        <div class="background"></div> 
        <div class="main-container"> 
          <div class="header">
            <h2>Devoluciones</h2>
            <div class="header-actions">
            </div>
          </div>
          <table class="return-table">
            <thead>
              <tr>
                <th>Orden</th>
           
                <th>Motivo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="returnItem in returns" :key="returnItem.id">
                <td data-label="Orden">{{ returnItem.id }}</td>
              
                <td data-label="Motivo">{{ returnItem.reason }}</td>
                <td data-label="Estado">{{ returnItem.status }}</td>
                <td data-label="Acciones">
                  <button class="btn btn-accept" @click="navigateTo(`/return-admin-notes/${returnItem.id}`)">Añadir Notas</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else class="loading">Cargando...</div>
    </div>
  </template>


<script>
import api from '../../../services/api'

export default {
  data() {
    return {
      loading: true, // Inicialmente en true mientras se cargan los datos
      returns: [] // Array para almacenar las devoluciones
    };
  },
  created() {
    this.fetchReturns(); // Llama a la función para obtener los datos cuando el componente se crea
  },
  methods: {
  async fetchReturns() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token de autorización no encontrado');
      }

      const response = await api.get('/order-returns', {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Accede directamente a response.data
      const data = response.data;
      // Accede al array de devoluciones dentro del objeto de respuesta
      this.returns = data.returns.map(returnItem => ({
        id: returnItem.id,
        date: returnItem.date,
        returnDate: returnItem.return_date,
        status: returnItem.status,
        reason: returnItem.reason,
        adminNotes: returnItem.admin_notes,
        orderId: returnItem.order_id,
        userId: returnItem.user_id,
        createdAt: returnItem.created_at,
        updatedAt: returnItem.updated_at
      }));
    } catch (error) {
      console.error('Error al obtener las devoluciones:', error);
    } finally {
      this.loading = false; // Cambia loading a false una vez que los datos se han cargado
    }
  },
  navigateTo(path) {
    this.$router.push(path);
  }
} 
};
</script>
<style scoped>
/* Reutiliza los estilos de TicketComponent.vue */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

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

.main-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h2 {
  font-size: 2rem;
  color: #34495e;
  margin-bottom: 10px;
}

.header-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
  flex-wrap: wrap;
}

.return-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.return-table th,
.return-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.return-table th {
  background-color: #00aed5;
  color: white;
  font-weight: bold;
}

.return-table tr:hover {
  background-color: #f1f1f1;
}

.btn {
  padding: 8px 12px;
  font-size: 1rem;
  background-color: #00aed5;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #2980b9;
}

.btn-accept {
  background-color: #27ae60;
}

.btn-accept:hover {
  background-color: #1e8449;
}

.btn-cancel {
  background-color: #e74c3c;
}

.btn-cancel:hover {
  background-color: #c0392b;
}

.loading {
  text-align: center;
  font-size: 1.5rem;
  color: #34495e;
  margin-top: 50px;
}

.menu-view {
  display: flex;
  flex-direction: column;
  min-height: 66vh;
}
</style>