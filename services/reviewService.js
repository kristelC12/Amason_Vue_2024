import axios from 'axios';

const API_URL = 'http://localhost:8000/api/reviews';

export default {
  getReviews(productId) {
    return axios.get(`${API_URL}/${productId}`);
  },
  addReview(reviewData) {
    return axios.post(API_URL, reviewData);
  },
  deleteReview(reviewId) {
    return axios.delete(`${API_URL}/${reviewId}`);
  },
};
