<template>
  <nav>
    <router-link to="/Menu">
      <img
        src="@/assets/Amason_White.svg"
        alt="Logo"
        class="logo-img"
        style="width: 128px; height: auto"
      />
    </router-link>

    
    <div class="search-container">
  <input
    type="text"
    placeholder="Buscar artículo"
    aria-label="Buscar"
    v-model="searchQuery"
    @keyup.enter="handleSearch"
  />
  <button
  type="button"
  aria-label="Buscar"
  @click.prevent="handleSearch"
>
  <i class="fas fa-search" aria-hidden="true"></i>
</button>

</div>

<!-- Combobox de categorías -->
<div class="category-dropdown">
      <select v-model="selectedCategory" @change="filterByCategory">
        <option disabled value="">Selecciona una categoría</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>


    <ul>
      <li>
        <router-link to="/Orders">
          <div class="line-1">Mis</div>
          <div class="line-2">Pedidos</div>
        </router-link>
      </li>
      
      <!-- Opción "Ver Tickets" para admin -->
      <!-- Opción "Ver Tickets" para admin -->
<li v-if="isAdminOrUser" class="dropdown">
  <a href="#">
    <div class="line-1">Devoluciones y</div>
    <div class="line-2">Servicio al cliente</div>
  </a>
  <ul class="dropdown-content">
    <li><a href="#" @click.prevent="goToTickets">Ver Tickets</a></li>
    <li><a href="#" @click.prevent="goToReturnPanel">Devoluciones</a></li>  
  </ul>
</li>
      <li class="cart-container">
        <router-link to="/Carrito">
          <div class="line-1"><i class="fa-solid fa-cart-shopping"></i></div>
          <div class="line-2">Carrito</div>
        </router-link>
        <div class="cart-toggle">
          <PopUpCart />
        </div>
      </li>
      <li>
        <a href="#" @click.prevent="logout">
          <div class="line-1">Cerrar</div>
          <div class="line-2">sesión</div>
        </a>
      </li>
      <li>
        <router-link to="/trending">
          <a class="trending" href="">Trending</a>
        </router-link>
       
      </li>
    </ul>

    <div class="bottom-nav">
      <div class="containerOption">
        <router-link to="/Menu" class="nav-icon" aria-label="Inicio">
          <i class="fas fa-home"></i>
          <span>Inicio</span>
        </router-link>
      </div>
      <div class="containerOption">
        <router-link to="/account" class="nav-icon" aria-label="Cuenta">
          <i class="fas fa-user"></i>
          <span>Cuenta</span>
        </router-link>
      </div>
      <div class="containerOption">
        <router-link to="/orders" class="nav-icon" aria-label="Pedidos">
          <i class="fas fa-box"></i>
          <span>Pedidos</span>
        </router-link>
      </div>
      <div class="containerOption">
        <router-link to="/Carrito" class="nav-icon" aria-label="Carrito">
          <i class="fas fa-shopping-cart"></i>
          <span>Carrito</span>
        </router-link>
      </div>

      <div class="containerOption">
      <a href="#" @click.prevent="logout">
        <i class="logout-icon fa-solid fa-power-off fa-xl" style="color: #ff0000;"></i>
      </a>
    </div>
    </div>
  </nav>
</template>

<script>
import PopUpCart from '../CartComponents/PopUpCart.vue';
import { logoutUser } from '../../../api/auth';
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '', // Campo de búsqueda
      selectedCategory: null, // Para la categoría abierta (si es necesario)
      categories: [], // Lista de categorías
    };
  },
  components: {
    PopUpCart,
  },
  computed: {
    isAdminOrUser() {
      const role = localStorage.getItem('userRole');
      return role && (role.includes('admin') || role.includes('user'));
    },
  },
  watch: {
  '$route.query.name': {
    handler(newQuery) {
      console.log(`Buscando productos con el término: ${newQuery}`);
      this.fetchProducts(newQuery); // Llama al método de búsqueda con el nuevo término
    },
    immediate: true, // Ejecuta el handler al montar el componente
  },
},
async created() {
    await this.fetchCategories(); // Cargar categorías al montar el componente
  },
  methods: {

    async fetchCategories() {
      try {
        const response = await axios.get('http://localhost:8000/api/categories');
        this.categories = response.data; // Suponiendo que devuelve un array de categorías
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    },

    async filterByCategory() {
      if (this.selectedCategory) {
        this.$router.push({
          name: 'ProductList',
          query: { categoryId: this.selectedCategory },
        });
      }
    },
    
    async fetchProducts(query) {
  try {
    const response = await axios.get('http://localhost:8000/api/products/search', {
      params: { name: query },
    });
    this.products = response.data; // Actualiza la lista de productos
  } catch (error) {
    console.error('Error al buscar productos:', error);
    this.products = []; // Limpia la lista si ocurre un error
  }
}
,
    goToTickets() {
      const role = localStorage.getItem('userRole');
      if (role && role.includes('admin')) {
        this.$router.push('/admin-tickets'); // Si es admin, redirigir a la vista de admin-tickets
      } else {
        this.$router.push('/tickets'); // Si es usuario normal, redirigir a la vista de tickets
      } 
    },
    goToReturnPanel() {
      const role = localStorage.getItem('userRole');
      if (role && role.includes('admin')) {
        this.$router.push('/return-admin-panel');
      } else {
        this.$router.push('/return-panel');
      }
    },
    logout() {
      logoutUser(); // Llamada a la función que elimina el token y redirige
      this.$router.push('/login'); // Redirige al login después del logout
    },
    handleSearch() {
  console.log('handleSearch ejecutado');
  if (!this.searchQuery.trim()) {
    alert('Por favor, ingrese un término de búsqueda.');
    return;
  }

  this.$router.push({
    name: 'ProductList', // Nombre correcto de la ruta
    query: { name: this.searchQuery.trim() },
  }).catch(err => {
    if (err.name !== 'NavigationDuplicated') {
      console.error(err);
    }
  });
},
  }
};
</script>

<style scoped>
nav {
  background-color: #4babe2;
  color: white;
  display: flex;
  align-items: center;
  padding: 35px 20px;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
}
.trending{
  color: white;
  font-weight: bold;}
  
/* Estilo del combobox */
.category-dropdown {
  margin-left: 20px;
}

.category-dropdown select {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
  color: #333;
  background-color: #f9f9f9;
  outline: none;
  cursor: pointer;
  transition: box-shadow 0.3s;
}

.category-dropdown select:focus {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
.logo-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.search-container {
  display: flex;
  align-items: center;
  width: 20rem;
  justify-content: center;
  margin: 0 10px;
}

.search-container input {
  padding: 5px 15px;
  border: none;
  border-radius: 5px 0 0 5px;
  outline: none;
  width: 90%;
  line-height: 2rem;
  font-size: 1rem;
  background-color: #fff;
}

.search-container button {
  padding: 5px 10px;
  border: none;
  background-color: #f1a80b;
  cursor: pointer;
  line-height: 2rem;
  border-radius: 0 5px 5px 0;
  
}

.line-1 {
  position: relative;
  white-space: nowrap;
}

.line-1 i{
  font-size: .8em;
  margin: 0;
}

.line-2 {
  position: relative;
  white-space: nowrap;
  font-weight: bold;
}

.cart-container {
  position: relative;
}

.cart-toggle {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: none;
  z-index: 1000;
  border-radius: 8px;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  opacity: 0;
  transform: translateY(-10px);
}

.cart-container:hover .cart-toggle {
  display: block;
  opacity: 1;
  transform: translateY(0);
}

ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  justify-content: center;
  align-items: center;
}

ul li {
  padding: 0 8px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

ul li a {
  display: block;
  padding: 5px 0;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s;
}

ul li a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.checkbtn {
  font-size: 30px;
  color: white;
  cursor: pointer;
  display: none;
}

.bottom-nav {
  display: none;
}

.logout-icon {
  font-size: 2em;
}

@media (max-width: 1030px) {
  nav {
    height: 12vh;
  }

  .logo {
    font-size: 1.5rem;
  }

  .search-container {
    width: 100%;
  }

  ul {
    display: none;
  }

  .bottom-nav {
    position: fixed;
    height: 8vh; /* Aumenta la altura si es necesario */
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #4babe2;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    z-index: 999;
  }

  .containerOption {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 10px;
  }

  .nav-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }
}

.router-link-active .fas,
.router-link-active span {
  color: rgb(48, 45, 45);
  font-weight: bold;
}

i {
  margin-bottom: 7px;
}

.bottom-nav a {
  color: rgb(255, 255, 255);
  font-size: 0.9em;
  margin: 5px 0;
}
</style>

<style>
.no-scroll {
  overflow: hidden;
}
</style>

<style scoped>
/* ... código existente ... */

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 5px;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

/* ... código existente ... */
</style>
