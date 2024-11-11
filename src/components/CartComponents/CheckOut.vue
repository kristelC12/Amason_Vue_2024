<template>
  <div class="card">
    <div class="payment">
      <form>
        <div class="row-container">
          <!-- Métodos de pago -->
          <div class="payment__methods">
            <div class="payment__title">Payment Method</div>
            <div class="payment__types">
              <div class="payment__type payment__type--cc active">
                <p>Credit/Debit Card</p>
                <img src="@/assets/mastercard.svg" alt="" />
                <i class="fa-brands fa-cc-visa fa-2xl" style="color: #21246e"></i>
              </div>
              <div class="payment__type payment__type--paypal">
                <p>Paypal</p>
                <img src="@/assets/paypal.svg" alt="" />
              </div>
            </div>
          </div>

          <!-- Información de envío -->
          <div class="payment__shipping">
            <div class="payment__title"><i class="icon icon-plane"></i> Shipping Information</div>
            
            <!-- Mostrar la información de envío o el formulario de edición -->
            <div v-if="!isEditing" class="details__user">
              <div class="user__name">
                {{ shippingInfo.name }} <br />
                {{ shippingInfo.dob }}
              </div>
              <div class="user__address">
                Shipping Address: {{ shippingInfo.address }} <br />{{ shippingInfo.country }}
              </div>
              <button @click="editShippingInfo" class="btn-edit">Edit</button>
            </div>

            <div v-if="isEditing" class="details__user">
              <div class="form-group">
                <label for="shippingName">Name</label>
                <input type="text" v-model="shippingInfo.name" id="shippingName" />
              </div>
              <div class="form-group">
                <label for="shippingDob">Date of Birth</label>
                <input type="text" v-model="shippingInfo.dob" id="shippingDob" />
              </div>
              <div class="form-group">
                <label for="shippingAddress">Address</label>
                <input type="text" v-model="shippingInfo.address" id="shippingAddress" />
              </div>
              <div class="form-group">
                <label for="shippingCountry">Country</label>
                <input type="text" v-model="shippingInfo.country" id="shippingCountry" />
              </div>
              <button @click="saveShippingInfo" class="btn-save">Save</button>
            </div>
          </div>
        </div>

        <!-- Información personal y de tarjeta -->
        <div class="payment__info">
          <div class="payment__cc">
            <div class="payment__title"><i class="icon icon-user"></i> Personal Information</div>
            <div class="input-row">
              <div class="form-group">
                <label for="cname">Name on Card</label>
                <input type="text" id="cname" name="cname" placeholder="Johnny Doe" />
              </div>
              <div class="form-group">
                <label for="cnum">Card Number</label>
                <input type="text" id="cnum" name="cnum" placeholder="1111 2222 3333 4444" />
              </div>
            </div>
            <div class="input-row">
              <div class="form-group">
                <label for="exp">Expiration Date</label>
                <input type="text" id="exp" name="exp" placeholder="MM/YYYY" />
              </div>
              <div class="form-group">
                <label for="cvv">CVV</label>
                <input type="password" id="cvv" name="cvv" placeholder="***" />
              </div>
            </div>
          </div>
        </div>
        
 </form>
</div></div>
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
      isEditing: false,  // Estado para controlar si se está editando
      shippingInfo: {    // Información de envío
        name: 'no especificado',
        dob: 'no especificado',
        address: 'no especificado',
        country: 'no especificado'
      }
    }
  },
  methods: {
    editShippingInfo() {
      this.isEditing = true;  // Cambiar a modo de edición
    },
    saveShippingInfo() {
      this.isEditing = false; // Guardar y salir del modo de edición
      // Aquí puedes añadir la lógica para guardar la información de envío
      console.log(this.shippingInfo);  // Solo para probar
    }
  }
}

</script>

<style scoped>
/* Estilos generales */
.card {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 50px;
  border-radius: 20px; 
  border: none;
  box-shadow: 1px 5px 10px 1px rgba(0, 0, 0, 0.2);
}

.payment {
  padding: 20px;
}

/* Contenedor de filas para métodos de pago e información de envío */
.row-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.payment__methods,
.payment__shipping {
  flex: 1;
}

/* Estilo de los títulos */
.payment__title {
  font-size: 18px;
  margin-bottom: 10px;
}

/* Métodos de pago */
.payment__types {
  display: flex;
  justify-content: space-around;
  gap: 10px;
}

.payment__type {
  border: 2px solid #ddd;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  flex: 1;
  text-align: center;
}

.payment__type.active {
  border-color: #7dc855;
  background-color: #f0fdf4;
}

/* Información de envío */
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

.btn-edit, .btn-save {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
}

.btn-edit:hover, .btn-save:hover {
  background-color: #45a049;
}

/* Información de la tarjeta */

/* Estilo para filas de inputs */
.input-row {
  display: flex;
  flex-wrap: wrap;
  gap: 25px; /* Aumenta el espacio entre los inputs */
  margin-bottom: 25px; /* Aumenta el margen inferior entre filas */
}

/* Ajustar tamaño de los form-group para que sean del mismo tamaño */
.input-row .form-group {
  flex: 1;
  min-width: 200px; /* Tamaño mínimo para evitar inputs demasiado pequeños */
}

/* Mejorar el estilo de los inputs */
input {
  width: 90%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
}

/* Ajustes adicionales para asegurar mejor separación */
.payment__info {
  margin-top: 30px; /* Aumenta el margen superior */
}

.form-group {
  margin-bottom: 20px; /* Aumenta el margen inferior */
  display: flex;
  flex-direction: column;
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
@media (max-width: 768px) {
  .row-container {
    flex-direction: column;
  }

  .form-group {
    width: 100%;
  }
}
</style>
