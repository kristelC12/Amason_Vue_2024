<template>
    <div class="rating-summary">
      <h3>Calificación general</h3>
      <div class="average-rating">
        <span class="stars">⭐⭐⭐⭐☆</span>
        <span class="rating-value">4.1 de 5</span>
      </div>
      <div class="rating-breakdown">
        <div v-for="(percentage, index) in ratings" :key="index" class="rating-bar">
          <span>{{ 5 - index }} estrellas</span>
          <div class="bar">
            <div class="fill" :style="{ width: percentage + '%' }"></div>
          </div>
          <span>{{ percentage }}%</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "RatingSummary",
    data() {
      return {
        ratings: [55, 19, 14, 5, 8] // Porcentajes de ejemplo para cada calificación
      };
    }
  };
  </script>
  
  <!-- <style scoped>
  .rating-summary { /* Estilos del resumen de calificaciones */ }
  .average-rating { display: flex; align-items: center; gap: 10px; }
  .rating-breakdown { margin-top: 10px; }
  .rating-bar { display: flex; align-items: center; gap: 5px; }
  .bar { width: 100px; height: 8px; background: #e0e0e0; }
  .fill { height: 8px; background: #ffc107; }
  </style> -->

<style scoped>

.rating-summary {
  width: 100%;
  text-align: center;
  margin-top: 20px;
  background-color: #f1f1f1;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.average-rating {
  font-size: 1.8em;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.stars-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.stars {
  color: #ffcc00;
  font-size: 1.2em;
  display: inline-block;
}

.rating-percentage {
  font-size: 0.9em;
  color: #666;
}


</style>
  