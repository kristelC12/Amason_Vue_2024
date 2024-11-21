<template>
  <div class="reviews-container">
    <!-- Sección de la barra lateral del producto -->
    <div class="product-sidebar">
      <!-- Cuadro de información del producto -->
      <div class="product-info">
        <img src="@/assets/images/laptop-image.jpg" alt="Laptop Thunderbolt 15" class="product-image" />
        <h3 class="product-name">Laptop Thunderbolt 15</h3>
        <p class="product-price">₡ 534.000,00</p>
        <button class="cart-button">🛒</button>
      </div>

      <!-- Botón para escribir una opinión -->
      <button class="opinion-button" @click="navigateToWriteReview">Escribir mi opinión del producto</button>

      <!-- Cuadro de calificación general -->
      <div class="rating-summary">
        <h4>Calificación general</h4>
        <p class="average-rating">4.1 de 5</p>
        <div class="stars-container">
          <div class="stars">★★★★★</div>
          <p>55%</p>
        </div>
        <div class="stars-container">
          <div class="stars">★★★★☆</div>
          <p>19%</p>
        </div>
        <div class="stars-container">
          <div class="stars">★★★☆☆</div>
          <p>14%</p>
        </div>
        <div class="stars-container">
          <div class="stars">★★☆☆☆</div>
          <p>5%</p>
        </div>
        <div class="stars-container">
          <div class="stars">★☆☆☆☆</div>
          <p>8%</p>
        </div>
      </div>
    </div>

    <!-- Lista de opiniones -->
    <div class="reviews-list">
      <div class="review-card">
        <div class="review-header">
          <img src="@/assets/images/user-avatar.jpg" alt="Avatar" class="user-avatar" />
          <div class="user-info">
            <h5 class="user-name">Rebecca D. Condoriano</h5>
            <div class="rating">★★★★☆</div>
            <p class="review-date">20 de septiembre 2024</p>
          </div>
        </div>
        <p class="review-text">
          Buscaba una pc que me hiciera todos los trabajos universitarios y esta fue la ideal.
        </p>
        <div class="review-actions">
          <button class="useful-button">Útil</button>
          <button class="report-button">Reportar</button>
        </div>
      </div>
      <!-- Puedes añadir más opiniones aquí -->
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navigateToWriteReview() {
      // Redirige a la vista de escritura de opiniones
      this.$router.push("/reviews-write");
    }
  }
};
</script>

<style scoped>
/* Estilos del contenedor principal */
.reviews-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

/* Estilos de la barra lateral del producto */
.product-sidebar {
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 8px;
}

/* Información del producto */
.product-info {
  text-align: center;
  margin-bottom: 20px;
}

.product-image {
  width: 100%;
  max-width: 200px;
  border-radius: 8px;
}

.product-name {
  font-size: 1.2em;
  margin: 10px 0;
}

.product-price {
  font-size: 1.1em;
  color: #555;
}

.cart-button {
  background-color: #ff9900;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cart-button:hover {
  background-color: #e68a00;
}

/* Botón para escribir una opinión */
.opinion-button {
  background-color: #0073e6;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.opinion-button:hover {
  background-color: #005bb5;
}

/* Resumen de calificaciones */
.rating-summary {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}

.average-rating {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 10px;
}

.stars-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
}

.stars {
  color: #ffcc00;
  font-size: 1.2em;
}

/* Lista de opiniones */
.reviews-list {
  width: 65%;
}

.review-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.review-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: bold;
  margin: 0;
}

.rating {
  color: #ffcc00;
  font-size: 1em;
}

.review-date {
  font-size: 0.9em;
  color: #777;
}

.review-text {
  margin: 15px 0;
  font-size: 1em;
  color: #333;
}

.review-actions {
  display: flex;
  gap: 10px;
}

.useful-button, .report-button {
  background-color: #f0f0f0;
  border: none;
  padding: 8px 12px;
  font-size: 0.9em;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.useful-button:hover {
  background-color: #d9d9d9;
}

.report-button:hover {
  background-color: #f9dcdc;
}
</style>
