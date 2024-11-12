<template>
  <div class="container">
    <div class="card-information">
      <!-- Información de envío -->
      <div class="payment__shipping">
        <div class="payment__title"><i class="icon icon-plane"></i> Shipping Information</div>

        <!-- Mostrar la información de envío o el formulario de edición -->
        <div class="details__user">
          <div class="form-group">
            <label for="shippingName">Name</label>
            <input type="text" v-model="shippingInfo.name" id="shippingName" :readonly="!isEditing"
              placeholder="Enter your name" />
          </div>
          <div class="form-group">
            <label for="shippingDob">Date of Birth</label>
            <input type="text" v-model="shippingInfo.dob" id="shippingDob" :readonly="!isEditing"
              placeholder="Enter your date of birth" />
          </div>
          <div class="form-group">
            <label for="shippingAddress">Address</label>
            <input type="text" v-model="shippingInfo.address" id="shippingAddress" :readonly="!isEditing"
              placeholder="Enter your address" />
          </div>
          <div class="form-group">
            <label for="shippingCountry">Country</label>
            <input type="text" v-model="shippingInfo.country" id="shippingCountry" :readonly="!isEditing"
              placeholder="Enter your country" />
          </div>

          <!-- Botón de editar o guardar -->
          <button @click="toggleEditing" class="btn-edit">
            {{ isEditing ? 'Save' : 'Edit' }}
          </button>
        </div>
      </div>
    </div>
    <div class="card-pay">
      <div class="payment">
        <form>
          <div class="row-container">
            <!-- Métodos de pago -->
            <div class="payment__methods">
              <div class="payment__types">
                <div class="payment__type payment__type--cc active">
                  <i class="fa-solid fa-credit-card fa-xl" style="color: #21246e"></i>
                  <p>Credit/Debit Card</p>
                </div>
                <div class="payment__type payment__type--paypal">
                  <i class="fa-brands fa-paypal fa-2xl" style="color: #21246e"></i>
                  <p>Paypal</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Información personal y de tarjeta -->
          <div class="payment__info">
            <div class="payment__cc">
              <div class="form-group">
                <label for="cname">Card Owner</label>
                <input type="text" id="cname" name="cname" placeholder="Card Owner Name" />
              </div>
              <div class="form-group">
                <label for="cardNumber">Card Number</label>
                <div class="input-container">
                  <input type="text" id="cardNumber" v-model="cardNumber" placeholder="Enter Card Number" />
                  <div class="payment-icons">
                    <i class="fa-brands fa-cc-mastercard fa-xl" style="color: #21246e"></i>
                    <i class="fa-brands fa-cc-visa fa-xl" style="color: #21246e"></i>
                    <i class="fa-brands fa-cc-apple-pay  fa-xl" style="color: #21246e"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="input-row">
              <div class="form-group">
                <label for="exp">Expiration Date</label>
                <input type="text" id="exp" name="exp" placeholder="MM/YY" />
              </div>
              <div class="form-group">
                <div class="tooltip-container">
                  <label for="cvv">CVV</label>
                  <span class="tooltip-icon" @mouseover="showTooltip" @mouseleave="hideTooltip">?</span>
                  <div v-if="tooltipVisible" class="tooltip-text">
                    Three-digit code on the back of your card
                  </div>
                  <input type="password" id="cvv" name="cvv" placeholder="***" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

  </div>
  <!-- Botón de acción -->
  <div class="container">
    <div class="actions">
      <button type="submit" class="btn action__submit">
        Place your Order
        <i class="icon icon-arrow-right-circle"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutComponent',
  data() {
    return {
      tooltipVisible: false, // Controla la visibilidad del tooltip
      isEditing: false,
      shippingInfo: {
        name: 'no especificado',
        dob: 'no especificado',
        address: 'no especificado',
        country: 'no especificado'
      },
      paymentMethods: [
        { name: 'Credit Card', icon: 'fa-cc-visa' },
        { name: 'Paypal', icon: 'fa-paypal' }
      ],
      selectedMethod: 'Credit Card'
    }
  },
  methods: {
    showTooltip() {
      this.tooltipVisible = true
    },
    hideTooltip() {
      this.tooltipVisible = false
    },
    editShippingInfo() {
      this.isEditing = true
    },
    saveShippingInfo() {
      this.isEditing = false
      console.log(this.shippingInfo)
    },
    validateCardInfo() {
      const cardNumberPattern = /^\d{16}$/
      const expPattern = /^(0[1-9]|1[0-2])\/\d{2}$/
      const cvvPattern = /^\d{3}$/

      if (!cardNumberPattern.test(this.shippingInfo.cardNumber)) {
        alert('Invalid Card Number')
        return false
      }
      if (!expPattern.test(this.shippingInfo.exp)) {
        alert('Invalid Expiration Date')
        return false
      }
      if (!cvvPattern.test(this.shippingInfo.cvv)) {
        alert('Invalid CVV')
        return false
      }
      return true
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  flex-direction: row;
  /* Asegura que las secciones estén una debajo de la otra */
  margin-top: 20px;
  /* Reduce el margen superior */
  gap: 50px;
}

/* Estilos generales */
.card-pay {
  width: 500px;

  padding: 20px 50px;
  border-radius: 10px;
  border: none;
  box-shadow: 1px 5px 10px 1px rgba(0, 0, 0, 0.2);
}

.payment {
  padding: 10px 0;
}

/* Contenedor de filas para métodos de pago e información de envío */
.row-container {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

/* Métodos de pago */
.payment__types {
  display: flex;
  justify-content: center;

  align-content: center;
  align-self: center;
  gap: 20px;
  width: 500px;
  height: 70px;
}

.payment_methods,
.payment__shipping {
  flex: 1;
  justify-content: center;
  align-content: center;
  align-self: center;
}

.payment__type {
  border: 2px solid #ddd;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  flex: 1;
  text-align: center;
  display: flex;

  align-items: center;
  /* Alinea la imagen y el texto verticalmente */
  gap: 10px;
  /* Espacio entre la imagen y el texto */
}

.payment__type.active {
  border-color: #7dc855;
  background-color: #f0fdf4;
}

/* Información de la tarjeta */

/* Estilo para filas de inputs */
.input-row {
  display: flex;
  flex-wrap: wrap;
  gap: 60px;
  margin-bottom: 25px;
}

/* Establece el ancho mínimo de los inputs */
.input-row .form-group {
  flex: 1;
}

/* Mejorar el estilo de los inputs */

.input-container {
  position: relative;
  width: 100%;

}

.payment-icons {
  height: auto;
  position: absolute;
  top: 50%;
  right: -20px;
  transform: translateY(50%);
  display: flex;
  gap: 10px;
}

input {
  width: 100%;
  /* Asegura que el input ocupe todo el ancho del contenedor */
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
}

/* Ajustes adicionales para asegurar mejor separación */
.payment__info {
  margin-top: 30px;
}

.form-group {
  margin-bottom: 20px;
  /* Aumenta el margen inferior */
  display: flex;
  flex-direction: column;
}

/* Contenedor del tooltip */
.tooltip-container {
  position: relative;
  display: inline-block;
}

/* Icono del tooltip */
.tooltip-icon {
  display: inline-block;
  margin-left: 8px;
  margin-bottom: -2px;
  color: #246eea;
  background: #e6f0ff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  line-height: 25px;
}

/* Texto del tooltip */
.tooltip-text {
  position: absolute;
  bottom: 125%;
  /* Aparece sobre el input */
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  white-space: nowrap;
  font-size: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease-in-out;
}

/* Mostrar tooltip al pasar el mouse */
.tooltip-icon:hover+.tooltip-text,
.tooltip-text:hover {
  opacity: 1;
  visibility: visible;
}

/* Información de envío */
.card-information {
  width: auto;
  padding: 20px 50px;
  border-radius: 10px;
  border: none;
  box-shadow: 1px 5px 10px 1px rgba(0, 0, 0, 0.2);
}

.payment__shipping {
  background: #f9f9f9;
  padding: 10px;
  border-radius: 10px;
}

.details__user {
  font-size: 14px;
  line-height: 1.5;
}

.user__name {
  font-weight: bold;
  margin-bottom: 5px;
}

.btn-edit,
.btn-save {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
}

.btn-edit:hover,
.btn-save:hover {
  background-color: #45a049;
}

/* Botón de enviar */
.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 60px 0 40px 0;
}

.btn {
  font-family: 'Josefin Sans', sans-serif;
  border-radius: 8px;
  border: 0;
  letter-spacing: 1px;
  color: #fff;
  background: #246eea;
  padding: 20px 60px;
  white-space: nowrap;
  font-size: 16px;
  line-height: 1;
  text-transform: uppercase;
  transition: all 0.15s ease;
  text-decoration: none;
}

.btn .icon {
  margin-left: 10px;
  font-size: 20px;
}

.btn:hover {
  -webkit-transform: translateY(-1px);
  transform: translateY(-1px);
  background: #4984ea;
}

/* Responsivo */
/* @media (max-width: 768px) {
  .row-container {
    flex-direction: column;
  }

  .form-group {
    width: 100%;
  }
}

@media (max-width: 500px) {

  .card-pay,
  .card-information {
    width: 100%;
    padding: 10px 20px;
  }

  .form-group input {
    padding: 10px;
    font-size: 12px;
  }
} */

@media (width < 990px) {
  main {
    display: flex;
  }

  .container {
    flex-direction: column;
    align-items: center;
  }

  .card-pay {
    width: 70vw;
  }

  .row-container{
    width: 100%;
    align-content: space-evenly;
    
  }

  .payment__methods {
    width: 100%;
    box-sizing: border-box;
  }

  .payment__types {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }

  .payment__type {
    display: flex;
    width: auto;
    padding: 0 10px;
    justify-content: center;
  }

  .card-information {
    width: 70vw;
    
  }

  .payment__shipping {
    width: 100%;
    box-sizing: border-box;
  }

  input {
    box-sizing: border-box;
    width: 100%;
    /* Asegura que el input ocupe todo el ancho del contenedor */
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 14px;
  }
}
</style>
