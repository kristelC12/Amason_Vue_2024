
import Vuex from 'vuex';
import api from '../services/api';  // Asegúrate de que la ruta al archivo de la API sea correcta


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
        const response = await api.get(`/cart/view?userId=${userId}`);
        commit('setCart', response.data.listcartproducts);
        commit('setTotalAmount', response.data.totalamount);
        
        console.log('Total amount fetched:', response.data.totalamount);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    },
  },
  getters: {
    cartItems: (state) => state.cart,
    totalAmount: (state) => state.totalAmount,
  },
});