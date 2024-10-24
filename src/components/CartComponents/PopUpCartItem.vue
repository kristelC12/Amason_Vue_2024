<template>
  <ul>
    <li class="minicart--item" v-for="(product, index) in cartItems" :key="index">
      <div class="minicart--item--details--container">
        <div class="placeholder"></div>
        <div class="minicart--item--details">
          <p class="title">{{ product.product_name }}</p>
          <p class="vendedor"><i class="fa-solid fa-bag-shopping"></i> Descripción: {{ product.user_id }}</p>
          <p class="cantidad"><i class="fa-solid fa-hashtag"></i> Cantidad: {{ product.quantity }}</p>
          <p class="price"><i class="fa-solid fa-colon-sign"></i> Precio: {{ product.product_price }}</p>
          <p class="remove">
            <a href="#" @click.prevent="removeProduct(index)">
              <i class="fa-solid fa-trash"></i> Eliminar del carrito
            </a>
          </p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters(['cartItems']),
  },
  methods: {
    ...mapMutations(['removeProduct']), // Usamos la mutación directamente
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
.minicart--item--details--container{
  display: flex;
  gap: 0;
}

.minicart--item--details--container > .placeholder {
  flex: 2;
}

.minicart--item--details--container > .minicart--item--details {
  flex: 3;
}

.placeholder {
  float: left;
  margin-right: 10px;
  width: 100px;
  height: 100px;
  background: #D8D8D8;
}

.minicart--item--details {
  height: 100px;
  display: flex;
  flex-direction: column;;
  justify-content: space-between;
}

.title, .material, .price, .vendedor, .cantidad {
  font-size: .8em;
  margin: 0;
}

.title {
  font-size: 0.9em;
  font-weight: 600;
  margin-bottom: 0;
  margin-top: 0;
}

.remove, a {
  margin-bottom: 0;
  margin-top: 0;
  font-size: .85em;
  font-weight: 500;
  text-decoration: none;
  color: rgb(180, 33, 33);
}

</style>