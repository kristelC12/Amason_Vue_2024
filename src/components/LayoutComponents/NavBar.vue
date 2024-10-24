<template>
  <nav>
    <label class="logo">Amason</label>

    <div class="search-container">
      <input type="text" placeholder="Buscar artículo" aria-label="Buscar">
      <button type="button" aria-label="Buscar">
        <i class="fas fa-search" aria-hidden="true"></i>
      </button>
    </div>

    <ul>
      <li>
        <a href="#">
          <div class="line-1">Hola, usuario</div>
          <div class="line-2">Cuenta y listas</div>
        </a>
      </li>
      <li>
        <a href="#">
          <div class="line-1">Devoluciones y</div>
          <div class="line-2">pedidos</div>
        </a>
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
        <router-link to="/carrito" class="nav-icon" aria-label="Carrito">
          <i class="fas fa-shopping-cart"></i>
          <span>Carrito</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>


<script>
import PopUpCart from '../CartComponents/PopUpCart.vue';

export default {
  components: {
    PopUpCart
  },
};
</script>

<style scoped>
nav {
  background-color: #4babe2;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 35px 20px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.logo {
  font-size: 2rem;
  font-weight: bold;
  margin: 0 10px;
}

.search-container {
  display: flex;
  align-items: center;
  width: 100%;
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
  transition: opacity 0.3s ease, transform 0.3s ease;
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

@media (max-width: 854px) {
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
