<template>
  <div class="summary">
    <div class="information">
      <div class="units">
        <div class="tex">Artículos:</div>
        <div class="bold">{{ cartItems.length }}</div>
      </div>
      <div class="total">
        <div class="tex">Total:</div>
        <div class="bold">{{ formattedTotalAmount }}</div>
      </div>
      <div class="gray-line"></div>
    </div>
      <button class="btn" @click="createOrder">Check Out</button>
    <div class="payments">
      <div class="method">
        <i class="fa-brands fa-cc-visa fa-2xl" style="color: #21246e"></i>
      </div>
      <div class="method">
        <img src="@/assets/mastercard.svg" alt="MasterCard" />
      </div>
      <div class="method">
        <i class="fa-brands fa-apple-pay fa-2xl"></i>
      </div>
      <div class="method">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
          <path fill="#016dd1"
            d="M6,10c0-2.209,1.791-4,4-4h28c2.209,0,4,1.791,4,4v2.5l-0.423,0.492L42,13.5v10l-0.343,0.489L42,24.5	l-0.303,0.736L42,25.874v7.202l-0.31,0.641L42,34.498l-0.397,0.525L42,35.504V37.5c0,2.209-1.791,4.5-4,4.5H10c-2.209,0-4-1.791-4-4	V10z">
          </path>
          <path fill="#016dd1"
            d="M35.041,20.208L32.029,13.5h-3.86v9.635L23.866,13.5h-3.257l-4.393,10h2.6l0.961-2.232h4.916	L25.67,23.5h4.963v-7.427l3.293,7.427h2.239l3.368-7.298V23.5H42v-10h-3.932L35.041,20.208z M20.706,19.108l1.47-3.495l1.527,3.495	H20.706z">
          </path>
          <path fill="#016dd1"
            d="M42,24.5h-3.599l-3.318,3.197L31.802,24.5h-3.577h-0.021h-8.979v10h8.979h0.021h3.566l3.305-3.321	l3.317,3.321H42l-5.059-5.15L42,24.5z M28.225,34.478l-0.002-2.077L21.684,32.4v-1.978h6.212v-1.895h-6.212v-1.873l6.541,0.016	v-2.15l5.001,4.855L28.225,34.478z">
          </path>
          <polygon fill="#fff" points="42,34.5 42,33.073 38.363,29.371 42,25.885 42,24.5 36.941,29.35"></polygon>
          <polygon fill="#fff"
            points="28.225,26.671 21.684,26.654 21.684,28.527 27.896,28.527 27.896,30.422 21.684,30.422 21.684,32.4 28.223,32.401 28.225,34.478 33.225,29.376 28.225,24.521">
          </polygon>
          <polygon fill="#fff" points="23.703,19.108 22.176,15.613 20.706,19.108"></polygon>
          <polygon fill="#fff"
            points="38.413,34.5 35.096,31.179 31.79,34.5 28.225,34.5 28.203,34.5 19.225,34.5 19.225,24.5 19.474,24.5 25.016,24.5 25.67,24.5 28.203,24.5 28.225,24.5 30.633,24.5 31.633,24.5 31.802,24.5 35.084,27.697 38.401,24.5 38.533,24.5 39.533,24.5 42,24.5 42,23.5 39.533,23.5 39.533,16.202 36.166,23.5 33.927,23.5 30.633,16.073 30.633,23.5 28.225,23.5 25.67,23.5 24.693,21.268 19.777,21.268 18.816,23.5 18.225,23.5 16.216,23.5 20.609,13.5 23.866,13.5 28.168,23.135 28.168,13.5 32.029,13.5 35.041,20.208 38.068,13.5 42,13.5 42,12.5 42,12.5 38.068,12.5 37.422,12.5 37.156,13.089 35.043,17.772 32.941,13.09 32.676,12.5 32.029,12.5 28.168,12.5 27.168,12.5 27.168,13.5 27.168,18.442 24.78,13.092 24.515,12.5 23.866,12.5 20.609,12.5 19.956,12.5 19.693,13.098 15.3,23.098 14.684,24.5 16.216,24.5 18.225,24.5 18.225,34.5 18.225,35.5 19.225,35.5 28.203,35.5 31.79,35.5 32.206,35.5 32.499,35.205 35.097,32.595 37.705,35.207 37.998,35.5 38.413,35.5 42,35.5 42,34.5">
          </polygon>
        </svg>
      </div>
      <div class="method">
        <i class="fa-brands fa-google-pay fa-2xl"></i>
      </div>
      <div class="method">
        <img src="@/assets/jcb.svg" alt="AmericanExpress" width="12" height="12"/>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import api from '../../../services/api'
export default {
  name: 'SummaryOrder',
  computed: {
    ...mapGetters('cart', ['cartItems', 'formattedTotalAmount'])
  },

  methods: {
    async createOrder() {
      if (this.cartItems.length > 0) {
        const response = await api.get('/user',
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )

       const orderResponse = await api.post('/order/create',
        {
          'user_id': response.data.user,
          'status': 1
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      
      localStorage.setItem('order_id', orderResponse.data.order_id);
      this.$router.push('/Checkout')
      } else {
        alert('No hay productos en el carrito')
      }

    }
  }


};

</script>

<style scoped>
.summary {
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.information {
  width: 100%;
  height: 130px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.information .units,
.information .total {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.information .units .tex,
.information .total .tex {
  font-size: 18px;
  font-weight: 400;
  color: #4b5563;
  font: Inter;
  line-height: 30px;
}

.information .total .bold,
.information .units .bold {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  font: Inter;
  font-style: normal;
  margin-left: auto;
  line-height: 30px;
}

.information .gray-line {
  content: '';
  display: block;
  align-self: flex-end;
  width: 35%;
  height: 1px;
  background-color: #d1d5db;
  margin: 1px 0 0 0;
}

.btn {
  margin: 30px 0;
  width: 100%;
  height: 60px;
  background-color: #f1a80b;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  justify-self: space-around;
}

.payments {
  width: calc(100% + 40px);
  margin-left: -20px;
  margin-right: -20px;
  margin-bottom: -25px;
  min-height: 80px;
  display: flex;
  align-items: center;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  background-color: #fdfdfd;
  justify-content: space-around;
  border: 1px solid #d1d5db;
  flex-wrap: wrap;
  box-sizing: border-box;
}

.payments .method {
  width: 60px;
  height: 45px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.payments .method img {
  width: 100px;
  height: auto;
}

i {
  font-size: 2.6rem;
}

@media (max-width: 1030px) {
  .summary {
    position: fixed;
    height: 8vh;
    bottom: 70px;
    left: 0;
    padding: 0 20px;
    width: 100%;
    flex-direction: row;
    background-color: #4babe2;
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: flex-end;
  }

  .information {
    display: flex;
    width: auto;
    align-self: center;
    height: 5vw;
  }

  .information .total {
    font-size: 20px;
  }

  .information .total .bold {
    font-size: 1.1rem;
    color: white;
  }

  .payments,
  .information .units,
  .information .gray-line,
  .information .total .tex {
    display: none;
  }

  .btn {
    border-radius: 15px;
    width: auto;
    padding: 1vh;
    height: auto;
    font-size: 1rem;
  }
}
</style>
