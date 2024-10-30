<template>
  <div class="details-card"  >
    <CarritoCheckbox :checked="isSelected" @update:checked="updateSelection" />
    <div class="image-card">
      <img
        :src="product.product_image" :alt="product.product_name">
    </div>
    <div class="description-item">
      <div class="bold">
        <p>{{ product.product_name }}</p>
      </div>
      <div class="description">
        <p>{{ product.product_description }}</p>
      </div>
      <div class="bold">
        <p>₡{{ product.product_price }}</p>
      </div>
      <div class="group">
        <div class="quantity">
          <button class="quantity-btn" @click="decreaseQuantity(product)">-</button>
          <p class="quantity-display">{{ product.quantity }}</p>
          <button class="quantity-btn" @click="increaseQuantity(product)">+</button>
        </div>
        <button class="btn-delete" @click="removeProduct(product.product_id)">
          <i class="fa-solid fa-trash-can fa-2xl" style="color: #c8240d"></i>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import CarritoCheckbox from './CheckboxCart.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    CarritoCheckbox
  },
  props: {
    product: Object,
    isSelected: Boolean,
  },
  methods: {
    ...mapActions('cart', ['removeProductFromCart', 'updateProductQuantity']),

    removeProduct(product_Id) {
      if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        this.removeProductFromCart(product_Id);
      }
    },

    updateSelection() {
      this.$emit('update-selection', !this.isSelected);
    },

    increaseQuantity(product) {
      this.updateProductQuantity({ productId: product.product_id, quantity: product.quantity + 1, action: 'add' });
    },

    decreaseQuantity(product) {
      if (product.quantity > 1) {
        this.updateProductQuantity({ productId: product.product_id, quantity: product.quantity - 1, action: 'remove' });
      }
    },
  },
}
</script>

<style>
.details-card {
  margin-left: 15px;
  margin-right: 15px;
  display: flex;
  justify-content: space-between;
  border-top: var(--sds-size-stroke-border) solid rgba(0, 0, 0, 0.46);
  padding: 10px;
  margin-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
  flex-wrap: wrap;
}

.details-card .image-card {
  flex-shrink: 0;
  margin-left: -1vh;
  align-content: center;
}

.details-card .image-card img {
  width: 170px;
  height: auto;
}

.details-card .description-item {
  flex-grow: 1;
  margin-left: 26px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.details-card .description-item .description,
.details-card .description-item .bold,
.details-card .description-item .delivery {
  margin-bottom: 1px;
}

.details-card .description-item .description {
  width: 100%;
  flex-shrink: 0;
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
}

.details-card .description-item .bold {
  align-self: flex-start;
  line-height: 140%;
  color: #000;
  font-size: 18px;
  font-weight: 700;
  line-height: 140%;
  text-align: right;
}

.details-card .description-item .delivery {
  align-self: flex-start;
  line-height: 140%;
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
}

.details-card .description-item .group {
  width: 100%;
  align-self: flex-end;
  justify-content: space-between;
  align-items: center;
  display: flex;
}

.details-card .group .quantity {
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #e2e2e2;
  width: 20vw;
  height: auto;
}

.details-card .group .quantity button.quantity-btn {
  width: 1vw;
  height: 1vw;
  background: none;
  border: none;
  font-size: 1.5vw;
  color: #808080;
  cursor: pointer;
}

.description-item .group .btn-delete {
  padding: 2vw;
  line-height: 140%;
  border: none;
  background: transparent;
  cursor: pointer;
}

@media (min-width: 860px) {
  .details-card {
    flex-wrap: nowrap;
    padding: 20px;
  }

  .details-card .image-card img {
    width: 150px;
  }

  .details-card .description-item {
    margin-left: 20px;
  }

  .details-card .description-item .description,
  .details-card .description-item .bold,
  .details-card .description-item .delivery {
    font-size: 16px;
  }

  .details-card .group .quantity {
    width: 100px;
    height: 40px;
  }

  .details-card .group .quantity button.quantity-btn {
    width: 30px;
    height: 60px;
   
  }

  .description-item .group .btn-delete {
    padding: 30px;
  }
}

@media (max-width: 550px) {
  
  .details-card {
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .details-card .image-card img {
    width: 90px;
    align-self: flex-start;
    }

  .details-card .description-item {
    margin-left: 10px;
    height: auto;
  } 

  .details-card .description-item .description,
  .details-card .description-item .bold,
  .details-card .description-item .delivery {
    font-size: 14px;
    line-height: 0.1;
    
  }

  .details-card .group .quantity {
    width: 100px;
    height: 35px;
   
  }

  .details-card .group .quantity button.quantity-btn {
    width: 30px;
    height: 30px;
      font-size: 4.5vw; 
}
}

</style>
