import apiClient from '../services/api'
import axios from 'axios'

export async function loginUser(userData) {
  try {
    const response = await apiClient.post('/login', userData)
    const token = response.data.token
    const pivotId = response.data.roles[0].pivot.user_id;
    localStorage.setItem('token', token)
    localStorage.setItem('pivotId', pivotId);
    console.log(localStorage.getItem('pivotId'));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
