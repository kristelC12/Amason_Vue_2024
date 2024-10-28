<template>
  <div>
    <NavBar />
    <main>
      <router-view />
    </main>
    <footer>
      <FooterLayout />
    </footer>
  </div>
</template>

<script>

import NavBar from '@/components/LayoutComponents/NavBar.vue';
import FooterLayout from '@/components/LayoutComponents/FooterLayout.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    NavBar,
    FooterLayout,
  },
  methods: {
    ...mapActions('cart', ['fetchCartItems']),
  },
  
  async created() {
    const response = await this.fetchCartItems();
    console.log('response', response);
  },
};

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

</style>