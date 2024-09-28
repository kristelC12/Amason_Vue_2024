<template>


  <div class="container-router">
    <RouterView />
  </div>
  

</template>

<script setup>

</script>




<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}


header {
  display: flex;
  justify-content: center;
  align-items: center;
  position:fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #53b2de;
  margin-bottom: 2rem;
}

.navbar {
  display: flex;
  width: 100%;
  padding: 0.5rem 2rem;
}


.container-router {
  display: block;
  justify-content: center;
  align-items: center;
  
}

@media (max-width: 1034px) {
  .navbar {
    width: 1034px;
  }
}

</style>