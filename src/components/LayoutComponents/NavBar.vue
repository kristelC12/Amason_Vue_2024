<template>
  <nav>
    <input type="checkbox" id="check" aria-label="Toggle navigation">
    <label for="check" class="checkbtn">
      <i class="fas fa-bars" aria-hidden="true"></i>
    </label>
    <label class="logo">Amason</label>
    <div class="search-container">
      <input type="text" placeholder="Buscar un artículo" aria-label="Buscar">
      <button type="button" aria-label="Buscar">
        <i class="fas fa-search" aria-hidden="true"></i>
      </button>
    </div>
    <ul>
      <li>
        <a class="active" href="#">
          <div class="line-1">Hola, usuario</div>
          <div class="line-2">Cuenta y listas</div>
        </a>
      </li>
      <li>
        <a href="#">
          <div class="line-1">Devoluciones y</div>
          <div class="line-2"> pedidos</div>
        </a>
      </li>
      <li>
        <a href="#">
          <div class="line-2"> Carrito</div>
        </a>
      </li>
    </ul>
  </nav>
</template>



<style scoped>
nav {
  background-color: #4babe2;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 35px 20px;
}

.logo {
  font-size: 2rem;
  font-weight: bold;
}

.search-container {
  display: flex;
  align-items: center;
  width: 80%;
  justify-content: center;
}

.search-container input {
  padding: 5px;
  padding-left: 15px;
  border: none;
  border-radius: 5px 0 0 5px;
  outline: none;
  width: 80%;
  line-height: 2rem;
  font-size: 1rem;
  background-color: #fff;
}

.search-container button {
  padding: 5px 10px;
  border: none;
  background-color: white;
  color: #4babe2;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  line-height: 2rem;
  background-color: #f1a80b;
}

.search-container button i {
  line-height: 1.5;
  color: black;
}

.line-1 {
  display: inline-block;
  white-space: nowrap;
}

.line-2 {
  display: inline-block;
  white-space: nowrap;
  font-weight: bold;
}

ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  justify-content:center;
  align-items: center;
  
}

ul li {
  margin-right: 20px;
  width: 100%;
  text-align: center;
  display: flex;
  
  flex-direction: column;
  align-items: center;

}

ul li a {
  display: flex;
  
  flex-direction: column;
  align-items: center;
  color: white;
  text-decoration: none;
  transition: color 0.3s;

}

.checkbtn {
  font-size: 30px;
  color: white;
  cursor: pointer;
  display: none;
}

#check {
  display: none;
}

@media (max-width: 768px) {

  .logo {
    font-size: 1.5rem;
  }
  .checkbtn {
    display: block;
    order: 1;
    margin-right: 20px;
  }

  .search-container {
    width: 50%;
  }

  .line-1{
    display: none;
  }

  ul {
    position: fixed;
    top: 80px;
    right: -100%;
    background-color: #4babe2;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
  }

  ul li {
    margin: 20px 0;
  }

  ul li a {
    font-size: 20px;
  }

  #check:checked ~ ul {
    right: 0;
  }
}
</style>