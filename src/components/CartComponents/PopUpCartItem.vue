<template>
  <ul>
    <li class="minicart--item">
      <div class="minicart--item--details--container">
        <div class="placeholder">
          <img
          src="https://www.steren.cr/media/catalog/product/cache/b69086f136192bea7a4d681a8eaf533d/image/21867108a/audifonos-bluetooth-con-cancelacion-de-ruido-negros.jpg">
          <a href="#" class="remove" @click.prevent="removeProduct(item.product_id)">
            <i class="fa-solid fa-trash"></i>
          </a>
        </div>
        <div class="minicart--item--details">
          <p class="title">{{ item.product_name }}</p>
          <p class="vendedor"><i class="fa-solid fa-bag-shopping"></i> Descripción: {{ item.user_id }}</p>
          <p class="quantity"><i class="fa-solid fa-hashtag"></i> Cantidad:
            <span>
              <button class="quantity-btn" @click="decreaseQuantity(item)">-</button>
              {{ item.quantity }}
              <button class="quantity-btn" @click="increaseQuantity(item)">+</button>
            </span>
          </p>
          <p class="price"><i class="fa-solid fa-colon-sign"></i> Precio: {{ item.product_price }}</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex';


export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions('cart', ['removeProductFromCart', 'updateProductQuantity']),
    removeProduct(product_id) {
      
        this.removeProductFromCart(product_id);
      
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
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

.minicart--item {
  margin-bottom: 10px;
  width: 100%;
  float: left;
}

.minicart--item>* {
  margin-bottom: 5px;
}

.minicart--item--details--container {
  display: flex;
  gap: 10px;
}

.minicart--item--details--container>.placeholder {
  flex: 2;
  position: relative;
}

.minicart--item--details--container>.minicart--item--details {
  flex: 3;
}

.placeholder {
  float: left;
  width: 100px;
  height: 100px;
  background: #D8D8D8;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.minicart--item--details {
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title,
.material,
.price,
.vendedor,
.quantity {
  font-size: .8em;
  margin: 0;
}

.quantity {
  display: block;
  align-items: center;
}

.quantity span {
  width: 60px;
  align-items: center;
  gap: 5px;
  justify-content: center;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #e2e2e2;
}

.quantity button.quantity-btn {
  font-size: 1.2em;
  font-weight: 500;
  background: none;
  border: none;
  color: #808080;
  cursor: pointer;
}

.title {
  font-size: 0.9em;
  font-weight: 600;
  margin-bottom: 0;
  margin-top: 0;
}

.remove {
  position: absolute;
  bottom: 0;
  right: 0;
}

a {
  font-size: 1em;
  font-weight: 500;
  text-decoration: none;
  color: rgb(180, 33, 33);
}
</style>