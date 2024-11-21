<template>
    <div class="star-rating">
      <h3>Valora este producto con estrellas</h3>
      <div class="stars">
        <span v-for="star in 5" :key="star" class="star" :class="{ active: star <= rating }" @click="setRating(star)">
          ★
        </span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "StarRating",
    data() {
      return {
        rating: 0
      };
    },
    methods: {
      setRating(star) {
        this.rating = star;
      }
    }
  };
  </script>
  
  <!-- <style scoped>
  .star-rating { /* Estilos de calificación con estrellas */ }
  .stars { display: flex; gap: 5px; font-size: 24px; cursor: pointer; }
  .star { color: #e0e0e0; }
  .star.active { color: #ffc107; }
  </style> -->
  
    <style scoped>

        .star-rating {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 1.5em;
        color: #ffcc00;
        cursor: pointer;
        }

        .star-rating .star {
        transition: color 0.3s;
        }

        .star-rating .star:hover,
        .star-rating .star.selected {
        color: #ffa500;
        }

    </style>