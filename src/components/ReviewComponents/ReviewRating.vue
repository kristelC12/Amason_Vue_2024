<template>
  <div class="review-rating-container">
      <div class="review-box">
          <p class="review-title">Valora este producto con estrellas</p>
          <div class="stars">
              <span
                  v-for="star in 5"
                  :key="star"
                  :class="{ filled: star <= currentRating }"
                  @click="setRating(star)"
              >
                  ★
              </span>
          </div>

          <textarea
              v-model="reviewText"
              class="review-text"
              placeholder="Escribe tu reseña aquí..."
          ></textarea>

          <div class="review-buttons">
              <button @click="saveReview" v-if="!isEditing">Guardar</button>
              <button @click="updateReview" v-if="isEditing">Actualizar</button>
              <button @click="deleteReview" v-if="isEditing">Eliminar</button>
          </div>

          <div class="review-preview" v-if="savedReview">
              <p><strong>Tu reseña:</strong> {{ savedReview.text }}</p>
              <p><strong>Rating:</strong> {{ savedReview.rating }} estrellas</p>
              <button @click="editReview">Editar</button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          reviewText: "",
          currentRating: 0,
          savedReview: null,
          isEditing: false,
      };
  },
  methods: {
      setRating(star) {
          this.currentRating = star;
      },
      saveReview() {
          this.savedReview = {
              text: this.reviewText,
              rating: this.currentRating,
          };
          this.reviewText = "";
          this.currentRating = 0;
      },
      editReview() {
          this.isEditing = true;
          this.reviewText = this.savedReview.text;
          this.currentRating = this.savedReview.rating;
      },
      updateReview() {
          this.savedReview = {
              text: this.reviewText,
              rating: this.currentRating,
          };
          this.isEditing = false;
          this.reviewText = "";
          this.currentRating = 0;
      },
      deleteReview() {
          this.savedReview = null;
          this.isEditing = false;
      },
  },
};
</script>

<style scoped>


.review-rating-container {
  position: relative;
  box-sizing: border-box;
  width: 1044px;
  height: 378px;
  background: rgba(255, 255, 255, 0.002);
  border: 1px solid #e0e0e0;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
}

.review-title {
  font-family: 'Roboto';
  font-weight: 700;
  font-size: 24px;
  color: #000000;
}

.stars {
  display: flex;
  align-items: center;
  gap: 5px;
}

.stars span {
  font-size: 24px;
  cursor: pointer;
  color: #e0e0e0;
}

.stars span.filled {
  color: #ffd700;
}

.review-text {
  width: 100%;
  height: 100px;
  margin-top: 10px;
  font-family: 'Roboto';
  font-size: 16px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.review-buttons button {
  margin-top: 10px;
  margin-right: 10px;
  padding: 8px 16px;
  font-size: 16px;
  background-color: #4babe2;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.review-buttons button:hover {
  background-color: #3a9bc0;
}

.review-preview {
  margin-top: 20px;
  font-family: 'Roboto';
  font-size: 16px;
}

.review-preview button {
  margin-top: 10px;
  padding: 6px 12px;
  font-size: 14px;
  background-color: #0066c0;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.review-preview button:hover {
  background-color: #004b8c;
}
</style>
