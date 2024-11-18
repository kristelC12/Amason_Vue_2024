<template>
  <div class="background"></div>
  <div class="chat-container">
    <div class="chat-header">
      <h2>Asistente de Soporte</h2>
    </div>
    <div ref="chatMessagesContainer" class="chat-messages">
      <!-- Mostrar mensajes del servidor -->
      <div
        v-for="(message, index) in chatMessages"
        :key="index"
        class="message-container"
        :class="{
          'my-message': message.user_id === currentUserId,
          'other-message': message.user_id !== currentUserId
        }"
      >
        <div class="message-bubble">
          <p>{{ message.message }}</p>
        </div>
      </div>
    </div>
    <div class="chat-input">
      <textarea
        v-model="userMessage"
        placeholder="Escribe tu mensaje aquí..."
        class="form-input"
        @keydown.enter.prevent="sendMessage"
      ></textarea>
      <button @click="sendMessage" class="btn-send">Enviar</button>
    </div>
    <div class="footer1">
      <button @click="submitTicket" class="btn-update">Actualizar</button>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/LayoutComponents/NavBar.vue';
import FooterLayout from '@/components/LayoutComponents/FooterLayout.vue';
import apiClient from '../../../services/api'; // Importar el apiClient

export default {
  components: { NavBar, FooterLayout },
  props: ['id'],
  data() {
    return {
      ticket: {
        category: '',
        subject: '',
        description: '',
        notifyEmail: false,
        notifySMS: false,
        phoneNumber: '',
      },
      userMessage: '',
      chatMessages: [],
      ticketId: this.id,
      currentUserId: null, // Almacena el ID del usuario logueado
    };
  },
  mounted() {
    this.currentUserId = parseInt(localStorage.getItem('userId')); // Asegúrate de que esto se ajuste a tu implementación
    this.loadMessages();
  },
  methods: {
    async loadMessages() {
      try {
        const response = await apiClient.get(`/tickets/${this.ticketId}/messages`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Reemplaza con tu método de obtención del token
          }
        });
        this.chatMessages = response.data;
        this.scrollToBottom();
      } catch (error) {
        console.error('Error cargando los mensajes:', error);
      }
    },
    async sendMessage() {
      if (this.userMessage.trim()) {
        const newMessage = {
          message: this.userMessage,
        };
        try {
          await apiClient.post(`/tickets/${this.ticketId}/messages`, newMessage, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.chatMessages.push({ message: this.userMessage, user_id: this.currentUserId }); // Asegúrate de que se guarda el ID del usuario
          this.userMessage = '';
          this.scrollToBottom();
        } catch (error) {
          console.error('Error enviando el mensaje:', error);
        }
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.chatMessagesContainer;
        container.scrollTop = container.scrollHeight;
      });
    },
    async submitTicket() {
      try {
        // Lógica para actualizar el ticket (si hay alguna)
        console.log("Ticket actualizado:", this.ticket);
        
        // Verifica el rol del usuario
        const userRole = localStorage.getItem('userRole'); // Asegúrate de que esto se ajuste a tu implementación
        if (userRole === 'admin') {
          // Redirigir a la vista de tickets para administradores
          this.$router.push('/admin-tickets'); // Cambia '/admin-tickets' por la ruta adecuada para admin
        } else {
          // Redirigir a la vista de tickets para usuarios
          this.$router.push('/tickets'); // Cambia '/tickets' por la ruta adecuada para usuarios
        }
      } catch (error) {
        console.error('Error actualizando el ticket:', error);
      }
    }
  },
};
</script>

<style scoped>
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

.chat-container {
  max-width: 650px;
  width: 100%;
  height: 700px;
  margin: 20px auto;
  background-color: #f4f6f9;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.chat-header {
  background-color:  #00aed5;
  color: white;
  text-align: center;
  padding: 15px;
  font-size: 1.2rem;
}

.chat-messages {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  flex-grow: 1;
}

.message-container {
  display: flex;
  width: 100%;
  margin: 5px 0;
}



.other-message {
  justify-content: left; /* Mensajes de otros a la derecha */
}

.my-message {
  justify-content: right; /* Mis mensajes a la izquierda */
}
.message-bubble {
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 15px;
  word-wrap: break-word;
}

.my-message .message-bubble {
  background-color: #e9eff6;
  color: #333;
}

.other-message .message-bubble {
  background-color: #00aed5;
  color: white;
}

.chat-input {
  display: flex;
  padding: 10px;
  background-color: #f4f6f9;
  border-top: 1px solid #ddd;
}

.form-input {
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 0.9rem;
  margin-right: 10px;
  resize: none;
}

.btn-send {
  padding: 8px 16px;
  background-color: #00aed5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-send:hover {
  background-color:  #00aed5;
}

.footer1 {
  padding: 15px;
  background-color: #f4f6f9;
  text-align: center;
  border-top: 1px solid #ddd;
}

.btn-update {
  padding: 10px 20px;
  background-color:  #00aed5;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-update:hover {
  background-color: #0079a1;
}

@media (max-width: 768px) {
  .chat-container {
    width: 90%;
    height: 75vh;
    margin: 10px;
  }
  .chat-header {
    font-size: 1rem;
  }
  .btn-update {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
}

@media (max-width: 768px) {
  .btn-update {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
}

@media (max-width: 480px) {
  .chat-container {
    max-width: 100%;
    height: auto;
  }

  .chat-header {
    font-size: 1rem;
    padding: 10px;
  }

  .btn-update {
    width: 100%;
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .chat-container {
    max-width: 90%;
    height: auto;
  }

  .chat-header {
    font-size: 1.1rem;
  }

  .btn-update {
    font-size: 0.95rem;
  }
}
</style>