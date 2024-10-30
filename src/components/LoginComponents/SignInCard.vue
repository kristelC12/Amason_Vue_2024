<template>
  <div class="container" id="container">
    <slot></slot>
    <div class="form-container sign">
      <form @submit.prevent="submitForm">
        <h1>Iniciar Sesión</h1>
        <label for="email">Email</label>
        <input type="email" v-model="email" required />
        
        <label for="password">Password</label>
        <input type="password" v-model="password" required />

        <button type="submit">Login</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p>¿No tienes una cuenta?</p>
        <button type="button" @click="$emit('toggle')">Registrarse</button>
      </form>
    </div>
  </div>
</template>

<script>
import { loginUser } from '../../../api/auth'

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: null,
      error: null
    }
  },
  methods: {
    async submitForm() {
      this.errorMessage = null

      try {
        await loginUser({ email: this.email, password: this.password })
        const role = localStorage.getItem('roles')

        // Almacenar el rol en el localStorage o en el estado de Vuex si es necesario
        localStorage.setItem('userRole', role)

        if (role.includes('seller')) {
          this.$router.push('/sellerDashboard')
        } else {
          this.$router.push('/Menu')
        }
      } catch (error) {
        this.errorMessage = error.message
      }
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
  font-size: 17px;
  font-weight: 400;
  text-align: center;
}
</style>
