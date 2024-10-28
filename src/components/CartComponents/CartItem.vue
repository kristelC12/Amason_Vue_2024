<template>
  <div class="details-card">
    <CarritoCheckbox :checked="isSelected" @update:checked="updateSelection" />
    <div class="image-card">
      <img
        src="https://www.steren.cr/media/catalog/product/cache/b69086f136192bea7a4d681a8eaf533d/image/21867108a/audifonos-bluetooth-con-cancelacion-de-ruido-negros.jpg">
    </div>
    <div class="description-item">
      <div class="bold">
        <p>{{ product.product_name }}</p>
      </div>
      <div class="description">
        <p>Descripción: {{ product.product_description }}</p>
      </div>
      <div class="bold">
        <p>Precio: ₡{{ product.product_price }}</p>
      </div>
      <div class="group">
        <div class="quantity">
          <button class="quantity-btn" @click="decreaseQuantity">-</button>
          <p class="quantity-display">{{ product.quantity }}</p>
          <button class="quantity-btn" @click="increaseQuantity">+</button>
        </div>
        <button class="btn-delete" @click.prevent="removeProduct(product.product_id)">
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
    isSelected: Boolean
  },
  methods: {
    ...mapActions('cart', ['removeProductFromCart', 'updateProductQuantity']),
    removeProduct(product_id) {
      this.removeProductFromCart(product_id);
    },
    updateSelection() {
      this.$emit('update-selection', !this.isSelected);
    },
    increaseQuantity(index) {
      const product = this.cartItems[index];
      this.updateProductQuantity({ productId: product.product_id, quantity: product.quantity + 1, action: 'add' });
    },
    decreaseQuantity(index) {
      const product = this.cartItems[index];
      if (product.quantity > 1) {
        this.updateProductQuantity({ productId: product.product_id, quantity: product.quantity - 1, action: 'remove' });
      }
    },
    updateQuantity(productId, quantity) {
      const parsedQuantity = parseInt(quantity, 10);
      if (parsedQuantity >= 0) {
        this.updateProductQuantity({ productId, quantity: parsedQuantity });
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
  font-family: Arial;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
}

.details-card .description-item .bold {
  align-self: flex-start;
  line-height: 140%;
  color: #000;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  text-align: right;
}

.details-card .description-item .delivery {
  align-self: flex-start;
  line-height: 140%;
  color: #000;
  font-family: Inter;
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
  font-size: 1vw;
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

@media (min-width: 768px) {
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
    width: 80px;
    height: 40px;
  }

  .details-card .group .quantity button.quantity-btn {
    width: 30px;
    height: 30px;
  }

  .description-item .group .btn-delete {
    padding: 30px;
  }
}

@media (max-width: 768px) {
  .details-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .details-card .image-card {
    width: 100%;
    text-align: center;
  }

  .details-card .image-card img {
    width: 100%;
    max-width: 150px;
    height: auto;
  }

  .details-card .description-item {
    margin-left: 0;
    width: 100%;
    padding: 10px 0;
  }

  .details-card .group .quantity {
    width: 100%;
    justify-content: space-between;
  }

  .details-card .group .quantity button.quantity-btn {
    width: 30px;
    height: 30px;
    font-size: 3vw;
  }

  .description-item .group {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  .description-item .group .btn-delete {
    align-self: flex-end;
    order: -1;
    margin-top: -60px;
  }
}
</style>
