<template>
  <div class="container">
    <div class="card-information">
      <!-- Información de envío -->
      <div class="payment__shipping">
        <!-- Mostrar la información de envío o el formulario de edición -->
        <div class="details__user">
          <div class="form-group">
            <label for="shippingName">Nombre Completo</label>
            <input
              type="text"
              id="shippingName"
              name="shippingName"
              placeholder="Ingrese su nombre"
            />
          </div>
          <div class="form-group">
            <label for="shippingPhoN">Número de Teléfono</label>
            <input
              type="text"
              id="shippingPhoN"
              name="shippingPhoN"
              placeholder="Ingrese su número de teléfono"
            />
          </div>
          <div class="form-group">
            <label for="shippingAddress">Dirección</label>
            <input
              type="text"
              id="shippingCountry"
              name="shippingCountry"
              placeholder="Ingrese su País"
            />
            <input
              type="text"
              id="shippingCity"
              name="shippingCity"
              placeholder="Ingrese su Ciudad"
            />
            <textarea
              id="shippingAddress"
              name="shippingAddress"
              placeholder="Ingrese su Dirección Exacta"
              rows="2"
            ></textarea>
            <input
              type="text"
              id="shippingPCode"
              name="shippingPCode"
              placeholder="Ingrese su Código Postal"
            />
          </div>
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
                <div
                  class="payment__type payment__type--cc"
                  :class="{ active: selectedMethod === 'Credit Card' }"
                  @click="selectPaymentMethod('Credit Card')"
                >
                  <i class="fa-solid fa-credit-card fa-xl" style="color: #21246e"></i>
                  <p>Tarjeta Crédito/Débito</p>
                </div>
                <div
                  class="payment__type payment__type--paypal"
                  :class="{ active: selectedMethod === 'Paypal' }"
                  @click="selectPaymentMethod('Paypal')">
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
                <label for="cname">Nombre del propietario de la tarjeta</label>
                <input
                  type="text"
                  id="cname"
                  name="cname"
                  placeholder="Card Owner Name"
                />
              </div>
              <div class="form-group">
                <label for="cardNumber">Número de tarjeta</label>
                <div class="input-container">
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="Enter Card Number"
                    pattern="\d{4}-\d{4}-\d{4}-\d{4}"
                  />
                  <div class="payment-icons">
                    <i class="fa-brands fa-cc-mastercard fa-xl" style="color: #21246e"></i>
                    <i class="fa-brands fa-cc-visa fa-xl" style="color: #21246e"></i>
                    <i class="fa-brands fa-cc-apple-pay fa-xl" style="color: #21246e"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="exp">Fecha de expiración</label>
              <input
                type="text"
                id="exp"
                name="exp"
                placeholder="MM/YY"
                pattern="(0[1-9]|1[0-2])\/\d{2}"
              />
            </div>
            <div class="form-group">
              <div class="tooltip-container">
                <label for="cvv">CVV</label>
                <span class="tooltip-icon" @mouseover="showTooltip" @mouseleave="hideTooltip"
                  >?</span
                >
                <div v-if="tooltipVisible" class="tooltip-text">
                  Los tres dígitos en la parte posterior de tu tarjeta
                </div>
                <input
                  type="password"
                  id="cvv"
                  name="cvv"
                  placeholder="***"
                  pattern="\d{3}"
                />
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
      <button @click="completeOrder" type="button" class="btn action__submit">
        Completar la Orden
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
      selectedMethod: 'Credit Card'
    }
  },
  methods: {
    // Mostrar y ocultar tooltip
    showTooltip() {
      this.tooltipVisible = true
    },
    hideTooltip() {
      this.tooltipVisible = false
    },

    // Validar información de envío
    validateShippingInfo() {
      const shippingName = document.getElementById('shippingName').value
      const shippingPhoN = document.getElementById('shippingPhoN').value
      const shippingCountry = document.getElementById('shippingCountry').value
      const shippingCity = document.getElementById('shippingCity').value
      const shippingAddress = document.getElementById('shippingAddress').value
      const shippingPCode = document.getElementById('shippingPCode').value

      if (
        !shippingName ||
        !shippingPhoN ||
        !shippingCountry ||
        !shippingCity ||
        !shippingAddress ||
        !shippingPCode
      ) {
        alert('Por favor, complete toda la información de envío.')
        return false
      }
      if (!/^\d{8,15}$/.test(shippingPhoN)) {
        alert('Número de teléfono inválido.')
        return false
      }

      return true
    },

    // Validar información de pago
    validatePaymentInfo() {
      const cardName = document.getElementById('cname').value
      const cardNumber = document.getElementById('cardNumber').value
      const expDate = document.getElementById('exp').value
      const cvv = document.getElementById('cvv').value

      if (!cardName || !cardNumber || !expDate || !cvv) {
        alert('Por favor, complete toda la información de pago.')
        return false
      }
      if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
        alert('Número de tarjeta inválido.')
        return false
      }

      const expPattern = /^(0[1-9]|1[0-2])\/\d{2}$/
      if (!expPattern.test(expDate)) {
        alert('Fecha de expiración inválida.')
        return false
      }

      const [month, year] = expDate.split('/').map(Number)
      const currentYear = new Date().getFullYear() % 100
      const currentMonth = new Date().getMonth() + 1

      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        alert('La tarjeta ha expirado.')
        return false
      }

      if (!/^\d{3}$/.test(cvv)) {
        alert('CVV inválido.')
        return false
      }

      return true
    },

    // Validar y completar la orden
    completeOrder() {
      if (this.validateShippingInfo() && this.validatePaymentInfo()) {
        alert('Orden completada con éxito.')
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 30px;
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
  gap: 10px;
}

/* Métodos de pago */
.payment__types {
  display: flex;
  justify-content: center;
  align-content: center;
  align-self: center;
  gap: 10px;
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
  gap: 10px;
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

input,
textarea {
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
}

/* Ajustes adicionales para asegurar mejor separación */
.payment__info {
  margin-top: 30px;
}

.form-group {
  margin-bottom: 10px;
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
.tooltip-icon:hover + .tooltip-text,
.tooltip-text:hover {
  opacity: 1;
  visibility: visible;
}

/* Información de envío */
.card-information {
  width: 320px;
  height: auto;
  padding: 20px 50px;
  border-radius: 10px;
  border: none;
  box-shadow: 1px 5px 10px 1px rgba(0, 0, 0, 0.2);
}

.payment__shipping {
  padding: 10px 0;
  margin: 0;
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

/* Botón de enviar */
.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px 0 40px 0;
}

.btn {
  border-radius: 8px;
  border: 0;
  letter-spacing: 1px;
  color: #fff;
  background-color: #f1a80b;
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
  background-color: #f0ba47;
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

  .row-container {
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
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 14px;
  }

  .payment-icons {
    right: 7px;
  }
}
</style>
