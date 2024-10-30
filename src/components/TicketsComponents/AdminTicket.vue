<template>
    <div class="main-container">
      <h1 class="header">Admin Tickets</h1>
      <div class="header-actions">
        <button class="btn" @click="viewUnassigned">Tickets No Asignados</button>
        <button class="btn" @click="viewAssigned">Mis Tickets</button>
      </div>
  
      <!-- Vista de tickets no asignados -->
      <div v-if="currentView === 'unassigned'">
        <h2>Tickets No Asignados</h2>
        <table class="ticket-table">
          <thead>
            <tr>
              <th>Asunto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ticket in unassignedTickets" :key="ticket.id">
              <td>{{ ticket.subject }}</td>
              <td>
                <button class="btn btn-update" @click="assignTicket(ticket.id)">Asignar a mí</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Vista de tickets asignados -->
      <div v-if="currentView === 'assigned'">
        <h2>Mis Tickets</h2>
        <table class="ticket-table">
          <thead>
            <tr>
              <th>Asunto</th>
              <th>Orden o Paquete</th>
              <th>Tipo de Reclamo</th>
              <th>Asunto</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ticket in assignedTickets" :key="ticket.id">
              <td>{{ ticket.subject }}</td>
              <td>{{ ticket.order }}</td>
                <td>{{ ticket.claimType }}</td>
                <td>{{ ticket.subject }}</td>
                <td>{{ ticket.description }}</td>
              <td>{{ ticket.status }}</td>
                
              <td>
                <button v-if="ticket.status !== 'closed'" class="btn btn-details" @click="closeTicket(ticket.id)">Cerrar Ticket</button>
                <router-link v-if="ticket.status !== 'closed'" :to="`/update-ticket/${ticket.id}`">
                  <button class="btn btn-update">Actualizar Ticket</button>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import apiClient from '../../../services/api'
  
  export default {
    data() {
      return {
        unassignedTickets: [],
        assignedTickets: [],
        currentView: 'unassigned', // Estado para controlar la vista
      };
    },
    methods: {
      async viewUnassigned() {
        this.currentView = 'unassigned';
        try {
          const response = await apiClient.get('/unassigned-tickets', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.unassignedTickets = response.data;
        } catch (error) {
          console.error('Error al cargar tickets no asignados:', error);
        }
      },
      async viewAssigned() {
        this.currentView = 'assigned';
        try {
          const response = await apiClient.get('/assigned-tickets', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.assignedTickets = response.data;
        } catch (error) {
          console.error('Error al cargar mis tickets:', error);
        }
      },
      async assignTicket(ticketId) {
    try {
        await apiClient.post(`/assign-ticket/${ticketId}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        this.viewUnassigned(); // Recargar los tickets no asignados
        this.viewAssigned();   // Recargar los tickets asignados
    } catch (error) {
        console.error('Error al asignar el ticket:', error);
    }
},
async closeTicket(ticketId) {
    try {
      await apiClient.put(`/tickets/${ticketId}/close`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Actualizar la vista de tickets asignados después de cerrar un ticket
      this.viewAssigned();
    } catch (error) {
      console.error('Error al cerrar el ticket:', error);
    }
  }

    },
    mounted() {
      this.viewUnassigned(); // Cargar la vista de tickets no asignados al montar
    }
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
  
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
    font-size: 2rem;
    color: #34495e;
  }
  
  .header-actions {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 10px;
    flex-wrap: wrap;
  }
  
  .ticket-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }
  
  .ticket-table th,
  .ticket-table td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .ticket-table th {
    background-color: #00aed5;
    color: white;
    font-weight: bold;
  }
  
  .ticket-table tr:hover {
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
  
  .btn-details {
    background-color: #e74c3c;
  }
  
  .btn-details:hover {
    background-color: #c0392b;
  }
  
  @media (max-width: 768px) {
    .main-container {
      padding: 10px;
    }
  
    .header h2 {
      font-size: 1.5rem;
    }
  
    .ticket-table th, .ticket-table td {
      padding: 10px;
      font-size: 0.9rem;
    }
  
    .btn {
      padding: 6px 10px;
      font-size: 0.9rem;
    }
  }
  </style>
  