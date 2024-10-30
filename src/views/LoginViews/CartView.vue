<template>
  <div class="body">
    <div class="container">
      <div class="container--title-options">
        <div class="title--container">
          <h2>Carrito de compras</h2>
          <a href="#" @click.prevent="toggleSelectAll">
            {{
              selectedAll ? 'Deseleccionar todos los artículos' : 'Seleccionar todos los artículos'
            }}
          </a>
        </div>
        <div class="delete-container" v-if="selectedCount > 0">
          <button class="delete-btn" @click.prevent="deleteSelectedItems">
            Eliminar artículos
          </button>
        </div>
      </div>
      <transition-group name="fade" tag="list">
        <CarritoItem
          v-for="(item, index) in cartItems"
          :key="item.product_id"
          :product="item"
          :is-selected="selectedItems[index] || false"
          @update-selection="updateSelection(index, $event)"
          ref="cartItem"
        />
      </transition-group>
    </div>
    <div class="order">
      <SummaryOrder />
      
    </div>
    
    
  </div>
  <div class="recommendation">
      <RecommendationByCart />
    </div>
</template>

<script>
import CarritoItem from '../../components/CartComponents/CartItem.vue'
import SummaryOrder from '../../components/CartComponents/SummaryOrder.vue'
import RecommendationByCart from '../../components/CartComponents/RecommendationByCart.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    CarritoItem,
    SummaryOrder,
    RecommendationByCart
  },
  data() {
    return {
      selectedAll: false,
      selectedItems: []
    }
  },
  computed: {
    ...mapGetters('cart', ['cartItems', 'formattedTotalAmount']),

    selectedCount() {
      return this.selectedItems.filter((item) => item).length
    }
  },
  methods: {
    ...mapActions('cart', ['removeAllProductsFromCart']),

    toggleSelectAll() {
      this.selectedAll = !this.selectedAll
      this.selectedItems = this.cartItems.map(() => this.selectedAll)
    },

    updateSelection(index, isSelected) {
      this.$set(this.selectedItems, index, isSelected)
    },
    deleteSelectedItems() {
  try {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.removeAllProductsFromCart();
      this.selectedItems = [];
      this.selectedAll = false;
    }
  } catch (error) {
    console.error('Hubo un error al vaciar el carrito');
    console.error(error);
  }
}


  }
}
</script>

<style scoped>
.body {
  display: flex;
  background-color: #f3f3f3;
  font-family: 'Montserrat', sans-serif;
  padding: 15px 10vh;
  box-sizing: border-box;
  justify-content: space-around;
  align-items: space-around;
  gap: 40px;
  min-height: 70vh;
}

.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 12px 0;
  flex-direction: column;
  margin-bottom: 2%;
  border-radius: 12px;
  background-color: white;
  box-sizing: border-box;
}

.container--title-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title--container {
  display: inline-block;
  padding: 10px 30px;
}

.title--container h2 {
  font-size: 24px;
  font-weight: bolder;
  margin: 10px 0;
}

.title--container a {
  font-size: 18px;
  font-weight: 500;
  color: #058dc3;
  text-decoration: none;
}

hr {
  border: 0;
  height: 1.5px;
  background: rgb(106, 106, 106);
  margin-top: 20px;
}

.body > .container {
  flex: 3;
}

.body > .order {
  flex: 1;
}

.body > .recommendation {
  flex: 1;
}

.order {
  position: relative;
  max-width: 376px;
  height: fit-content;
  gap: 40px;
  border-radius: 12px;
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
}

.recommendation {
  max-width: 376px;
  height: fit-content;
  gap: 40px;
  border-radius: 12px;
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  margin: 0px auto; /* Centrando y agregando espacio superior */
}

.delete-container {
  margin: 15px;
}

.delete-btn {
  background-color: #c8240d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.delete-btn:hover {
  background-color: #b71c1c;
}

::view-transition-group {
  display: block;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active en Vue <2.1.8 */ {
  opacity: 0;
  transform: scale(0.95);
}

.order-bottom {
  display: none;
}

@media (max-width: 1030px) {
  .body {
    height: 100%;
  }

  .order {
    position: fixed;
    bottom: 10.8vw;
    left: 0;
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    z-index: 2000;
  }

  .body {
    padding: 0;
    gap: 0px;
  }

  .container {
    height: auto;
  }
}

@media (max-width: 550px) {
  .container {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100%;
    padding: 12px 0;
    margin-bottom: 2%;
    background-color: white;
  }
}
</style>
