
<template>

  <div class="footer">

    <div class="row">
      <a href="#"><i class="fa-brands fa-facebook"></i></a>
      <a href="#"><i class="fa-brands fa-instagram"></i></a>
      <a href="#"><i class="fa-brands fa-x-twitter"></i></a>
    </div>

    <div class="row">
      <ul>
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Business</a></li>
        <li><a href="#">Contáctanos</a></li>
        <div class="footer_carrito"></div>
      </ul>
    </div>

    <div class="row">
      ©2024. || Amason Company. || All rights reserved.
    </div>

  </div>

</template>

<script>
export default {
  name: 'IoniconsLoader',
  mounted() {
    const script1 = document.createElement('script');
    script1.type = 'module';
    script1.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js';
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.nomodule = true;
    script2.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js';
    document.body.appendChild(script2);
  },
}
</script>

<style scoped>
.footer {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #000;
  position: relative;
  padding: 5px 0px;
  height: 180px;
  font-family: 'Play', sans-serif;
  text-align: center;
  justify-content: center;
  overflow: hidden;
}

.footer .row {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0.2% 0%;
  padding: 0.2% 0%;
  color: gray;
  font-size: 1.0em;
}

.footer .row a {
  text-decoration: none;
  color: gray;
  transition: 0.5s;
  margin: 0px 10px;
}

.footer .row a:hover {
  color: #fff;
}

.footer .row ul {
  width: 100%;
  padding-inline-start: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer .row ul li {
  display: inline-block;
  padding: 10px;
}

.footer .row a i {
  font-size: 2em;
  padding: 0px 16px;
}

.footer .footer_carrito {
  background: url('@/assets/carrito_entrega.gif') no-repeat center center;
  width: 132px;
  height: 88px;
  background-size: 100%;
  z-index: 10;
  position: absolute;
  bottom: 0;
  left: 38%;
  -webkit-animation: moverCamion 15s linear infinite;
  animation: moverCamion 15s linear infinite;
}

@-webkit-keyframes moverCamion {
  0% {
    left: -25%;
  }

  100% {
    left: 100%;
  }
}

@keyframes moverCamion {
  0% {
    left: -25%;
  }

  100% {
    left: 100%;
  }
}


@media (max-width:1030px) {
  .footer{
    margin-bottom: 10vh;
  }

  .footer .row ul li {
    display: inline-block;
    margin: 0px 10px;
  }

  .footer .footer_carrito {
    width: 89px;
    bottom: 0;
    height: 60px;
    left: 10%;
    -webkit-animation: moverCamion 7s linear infinite;
    animation: moverCamion 7s linear infinite;

}
}
</style>