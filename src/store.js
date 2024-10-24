import Vuex from 'vuex';
import api from '../services/api';

export default new Vuex.Store({
  state: {
    cart: [],
    totalAmount: 0,
  },
  mutations: {
    setCart(state, products) {
      state.cart = products;
    },
    setTotalAmount(state, totalAmount) {
      state.totalAmount = totalAmount;
    },
    removeProduct(state, index) {
      state.cart.splice(index, 1);
    },
  },
  actions: {
    async fetchCartItems({ commit }) {
      try {
        const userId = localStorage.getItem('pivotId');
        if (!userId) {
          throw new Error('User ID not found in localStorage');
        }
        const response = await api.get(`/cart/${userId}`);
        commit('setCart', response.data.cart_products);
        commit('setTotalAmount', response.data.total_amount);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    },
  },
  getters: {
    cartItems: (state) => state.cart,
    totalAmount: (state) => state.totalAmount,
    formattedTotalAmount: (state) => {
      return new Intl.NumberFormat('es-CR', {
        style: 'currency',
        currency: 'CRC',
      }).format(state.totalAmount); // Formatea el total a colones
    },
  },
});
