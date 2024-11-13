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
              :readonly="!isEditingShipping"
            />
          </div>
          <div class="form-group">
            <label for="shippingPhoN">Número de Telefono</label>
            <input
              type="text"
              id="shippingPhoN"
              name="shippingPhoN"
              placeholder="Ingrese su número de teléfono"
              :readonly="!isEditingShipping"
            />
          </div>
          <div class="form-group">
            <label for="shippingAddress">Dirección</label>
            <input
              type="text"
              id="shippingCountry"
              name="shippingCountry"
              placeholder="Ingrese su País"
              :readonly="!isEditingShipping"
            />

            <input
              type="text"
              id="shippingCity"
              name="shippingCity"
              placeholder="Ingrese su Ciudad"
              :readonly="!isEditingShipping"
            />

            <textarea
              id="shippingAddress"
              name="shippingAddress"
              placeholder="Ingrese su Dirección"
              rows="2"
              :readonly="!isEditingShipping"
            ></textarea>

            <input
              type="text"
              id="shippingPCode"
              name="shippingPCode"
              placeholder="Ingrese su Código Postal"
              :readonly="!isEditingShipping"
            />
          </div>

          <!-- Botón de editar o guardar -->
          <button @click="toggleEditingShipping" class="btn-edit">
            {{ isEditingShipping ? 'Save' : 'Edit' }}
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
                  @click="selectPaymentMethod('Paypal')"
                >
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
                  :readonly="!isEditingPayment"
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
                    :readonly="!isEditingPayment"
                 pattern="\d{16}"
                    @input="validateCardInfo"
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
                :readonly="!isEditingPayment"
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
                  :readonly="!isEditingPayment"
                  pattern="\d{3}"
                  @input="validateCVV"
                />
              </div>
            </div>
          </div>
        </form>
        <button @click="toggleEditingPayment" class="btn-edit">
          {{ isEditingPayment ? 'Save' : 'Edit' }}
        </button>
      </div>
    </div>
  </div>
  <!-- Botón de acción -->
  <div class="container">
    <div class="actions">
      <button type="submit" class="btn action__submit">
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
      isEditingShipping: false,
      isEditingPayment: false,
      selectedMethod: 'Credit Card',
      paymentMethods: [
        { name: 'Credit Card', icon: 'fa-cc-visa' },
        { name: 'Paypal', icon: 'fa-paypal' }
      ]
    }
  },
  methods: {
    showTooltip() {
      this.tooltipVisible = true
    },
    hideTooltip() {
      this.tooltipVisible = false
    },
    toggleEditingShipping() {
      this.isEditingShipping = !this.isEditingShipping
      if (!this.isEditingShipping) {
        console.log(this.shippingInfo)
      }
    },
    toggleEditingPayment() {
      this.isEditingPayment = !this.isEditingPayment
      if (!this.isEditingPayment) {
        console.log(this.paymentInfo)
      }
    },
    validateCVV(event) {
      const value = event.target.value
      if (!/^\d{0,3}$/.test(value)) {
        event.target.value = value.slice(0, 3)
      }
    },
    selectPaymentMethod(method) {
      this.selectedMethod = method
    },
    validateCardInfo(event) {
      const credit = event.target.value
      if (!/^\d{0,16}$/.test(credit)) {
        event.target.value = credit.slice(0, 16)
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

.btn-edit,
.btn-save {
  width: 100px;
  height: 50px;
  background-color: #4babe2;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
  display: block;
  margin: 0 auto;
}

.btn-edit:hover,
.btn-save:hover {
  background-color: #3584b3;
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
