<template>
  <div class="minicart">
    <div class="minicart--item-container">
      <span class="cart--vacio" v-if="cartItems.length === 0">¡Tu carrito está vacío!</span>
      <span v-else>¡Tienes <span class="minicart--item-count" style="font-weight: 600">{{ cartItems.length }} item(s)</span> en tu carrito!</span>
    </div>
    <hr v-if="cartItems.length > 0">
    <div class="cartItem--container" v-if="cartItems.length > 0">
      <transition-group name="fade" tag="list">
      <popUpCartItem
        v-for="(product, index) in cartItems"
        :key="product.product_id"
        :item="product"
        :index="index"
      />
    </transition-group>
    </div>
    
    <hr v-if="cartItems.length > 0">
    <div class="minicart--subtotal" v-if="cartItems.length > 0">
      <p class="minicart--subtotal-title">Subtotal</p>
      <p class="minicart--subtotal-amount">{{ formattedTotalAmount }}</p>
    </div>

    <div v-if="cartItems.length > 0">
      <input type="button" value="Ver detalles del carrito" @click="goToCart">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import popUpCartItem from './PopUpCartItem.vue';


export default {
  components: {
    popUpCartItem,
  },
  computed: {

    ...mapGetters('cart', ['cartItems', 'formattedTotalAmount']),
  
  },
  methods: {

    goToCart() {

      this.$router.push('/carrito');
    },

  },

};
</script>

<style scoped>
.minicart {
  font-family: sans-serif;
  width: 290px;
  height: auto;
  max-height: 500px;
  padding: 20px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0px 30px 130px -8px rgba(0, 0, 0, 0.25);
  color: black;
  text-align: left;
  box-sizing: content-box;
}

.minicart input {
  margin-top: 20px;
  width: 100%;
  height: 43px;
  font-weight: 600;
  background: white;
  border: 2px solid #4babe2;
  outline: none;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
}

.minicart input:hover {
  color: #fff;
  background: #4babe2;
}

.cartItem--container {
  max-height: 340px;
  overflow-y: auto;
  overflow-x: hidden;
}

.minicart--item-container {
  display: flex;
  text-align: center;
  margin: 0;
  font-size: .8em;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active en Vue <2.1.8 */ {
  opacity: 0;
  transform: scale(0.95);
}

.cart--vacio {
  width:100%;
  font-weight: 600;
}

.minicart hr {
  margin-bottom: 20px;
  width: 100%;
}

.minicart--subtotal {
  margin: 0;
}

.minicart--subtotal-title {
  float: left;
  margin: 0;
}

.minicart--subtotal-amount {
  float: right;
  font-weight: 600;
  font-size: 1.2em;
  margin: 0;
}

@media (max-height: 660px) {
  .minicart {
    max-height: 400px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
}
</style>
