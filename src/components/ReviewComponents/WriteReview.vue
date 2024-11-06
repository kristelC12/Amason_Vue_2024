<template>
    <div class="write-review">
      <h3>Escribe tu opinión sobre este producto</h3>
      <textarea v-model="reviewText" placeholder="Escribe tu opinión" maxlength="100"></textarea>
      <div class="actions">
        <button @click="submitReview">Enviar</button>
        <button @click="clearReview">Eliminar</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "WriteReview",
    data() {
      return {
        reviewText: ""
      };
    },
    methods: {
      submitReview() {
        // Lógica para enviar la reseña
        alert("Reseña enviada: " + this.reviewText);
      },
      clearReview() {
        this.reviewText = "";
      }
    }
  };
  </script>
  
  <!-- <style scoped>
  .write-review { /* Estilos de la caja de reseña */ }
  textarea { width: 100%; height: 80px; resize: none; }
  .actions { display: flex; gap: 10px; margin-top: 10px; }
  </style> -->
  
    <style scoped>
    
        .write-review {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .write-review h3 {
            font-size: 1.6em;
            color: #333;
            margin-bottom: 10px;
        }

        .write-review label {
            display: block;
            font-size: 1em;
            color: #555;
            margin-top: 15px;
            margin-bottom: 5px;
        }

        .write-review textarea {
            width: 100%;
            min-height: 100px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            resize: vertical;
            font-size: 1em;
            color: #333;
        }

        .write-review button.submit-button {
            background-color: #0073e6;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            font-size: 1em;
            cursor: pointer;
            margin: 15px 0; transition: background-color 0.3s; 
        }

        .write-review button.submit-button { 
            background-color: #005bb5; 
        }

    </style>