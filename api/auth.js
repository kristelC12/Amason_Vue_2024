import apiClient from '../services/api'
import axios from 'axios'

export async function loginUser(userData) {
  try {
    // Enviar solicitud de inicio de sesión
    const response = await apiClient.post('/login', userData)
    const token = response.data.token
    const pivotId = response.data.roles[0].pivot.user_id
    const roles = response.data.roles
    const roleNames = roles.map((role) => role.name)

    // Guardar token y pivotId en localStorage
    localStorage.setItem('token', token)
    localStorage.setItem('pivotId', pivotId)
    localStorage.setItem('roles', roleNames)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    return response
  } catch (error) {
    // Analizar el tipo de error
    if (error.response) {
      // Errores de respuesta del servidor
      switch (error.response.status) {
        case 404:
          return Promise.reject(new Error('Usuario no encontrado'))
        case 401:
          return Promise.reject(new Error('Credenciales incorrectas'))
        case 500:
          return Promise.reject(new Error('Error del servidor, intenta más tarde'))
        default:
          return Promise.reject(new Error('Ocurrió un error, intenta de nuevo'))
      }
    } else if (error.request) {
      // Sin respuesta del servidor
      return Promise.reject(new Error('No se pudo conectar con el servidor'))
    } else {
      // Errores en la configuración de la solicitud
      return Promise.reject(new Error('Error al configurar la solicitud'))
    }
  }
}

export async function registerUser(userData) {
  try {
    // Enviar solicitud de registro
    const response = await apiClient.post('/register', userData)
    return response
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 409:
          return Promise.reject(new Error('El correo ya está registrado'))
        case 400:
          return Promise.reject(new Error('Datos de registro inválidos'))
        case 422:
          return Promise.reject(new Error('El correo ya está registrado o datos inválidos'))
        case 500:
          return Promise.reject(new Error('Error del servidor, intenta más tarde'))
        default:
          return Promise.reject(new Error('Ocurrió un error, intenta de nuevo'))
      }
    } else if (error.request) {
      // Sin respuesta del servidor
      return Promise.reject(new Error('No se pudo conectar con el servidor'))
    } else {
      // Errores en la configuración de la solicitud
      return Promise.reject(new Error('Error al configurar la solicitud'))
    }
  }
}

export function logoutUser() {
  localStorage.removeItem('token')
  localStorage.removeItem('pivotId')
  localStorage.removeItem('roles')

  delete axios.defaults.headers.common['Authorization']

  window.location.href = '/'
}
