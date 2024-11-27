<template>
  <div class="menu-view">
    <div class="categories-card">
      <CategoryCard
        v-for="(category, index) in categories"
        :key="index"
        :category="category"
        @category-selected="goToProductList"
      />
    </div>
    <DiscountProducts />
  </div>
</template>

<script>
import CategoryCard from '@/components/MenuComponents/CategoryCard.vue';
import DiscountProducts from '@/components/MenuComponents/DiscountProducts.vue';
import api from '../../../services/api';

export default {
  components: {
    CategoryCard,
    DiscountProducts,
  },
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await api.get('/categories');
        if (response.status === 200) {
          this.categories = response.data.map((category) => {
            const dummyItems = [
              { title: 'Celular', name: 'item1', img: 'item1.jpg' },
              { title: 'Laptop', name: 'item2', img: 'item2.jpg' },
              { title: 'Audifonos', name: 'item3', img: 'item3.jpg' },
              { title: 'Camaras', name: 'item4', img: 'item4.jpg' },
            ];
            return {
              ...category,
              items: dummyItems,
            };
          });
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    goToProductList(category) {
      this.$router.push({
        name: 'ProductList',
        query: { categoryId: category.id, title: category.name },
      });
    },
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>


<style scoped>
.categories-card {
  display: flex;
  margin-left: 1vh;
  margin-right: 1vh;
  margin-bottom: 6vh;
  flex-wrap: wrap;
  width: auto;
  background-color: transparent;
  padding: 2.4% 3%;
  gap: 20px;
  justify-content: space-around;
  overflow: hidden;
}

.menu-view {
  display: flex;
  flex-direction: column;
  min-height: 66vh;
}

/* Productos en descuento */
.discount-products {
  margin-top: 20px;
  text-align: center;
}

.discount-products-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  padding: 20px;
}

.product-card {
  width: 200px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: scale(1.05);
}

.product-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
}

.product-card h4,
.product-card p {
  margin: 5px 0;
}
</style>
