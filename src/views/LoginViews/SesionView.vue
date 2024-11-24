<template>
    <div class="login">
      <component :is="currentComponent" @toggle="toggleComponent">
        <img
          src="@/assets/Amason_Black.svg"
          alt="Logo"
          class="logo-img"
        />
      </component>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import SignInCard from '../../components/LoginComponents/SignInCard.vue';
  import SignUpCard from '../../components/LoginComponents/SignUpCard.vue';
  
  localStorage.clear();
  const isSignUp = ref(false);
  
  const currentComponent = computed(() => (isSignUp.value ? SignUpCard : SignInCard));
  
  const toggleComponent = () => {
    isSignUp.value = !isSignUp.value;
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
  
  .login {
    background: linear-gradient(to top, #e2e2e2, #e8faff);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    padding: 20px; 
  }
  
  :deep(.container) {
    background-color: #ffffff;
    border-radius: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    position: relative;
    max-width: 768px;
    width: 100%; 
    height: auto; 
    min-height: 400px; 
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px; 
    transition: all 0.3s ease;
  }
  
  :deep(h1) {
    font-size: 1.8rem; 
    font-weight: 600;
    margin-bottom: 1rem;
    color: #333;
    text-align: center;
  }
  
  :deep(.container p) {
    font-size: 1rem;
    line-height: 1.5rem;
    letter-spacing: 0.3px;
    color: #666; 
  }
  
  :deep(.container button) {
    background-color: #00aed5;
    color: #ffffff;
    font-size: 0.875rem;
    padding: 12px 30px; 
    border: none; 
    border-radius: 8px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-top: 10px;
    cursor: pointer;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s;
  }
  
  :deep(.container button:hover) {
    background-color: black;
    color: white;
    transform: scale(1.05);
  }
  
  :deep(.container img) {
    width: 36%;
    position: absolute;
    top: 20px; 
  }
  
  :deep(.container form) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 2.5rem;
    height: 100%;
    border-radius: 10px;
    margin-top: 1rem;
    width: 100%;
  }
  
  :deep(.container input) {
    background-color: #e6e6e6;
    border: none;
    margin: 8px 0; 
    padding: 12px 30px; 
    font-size: 1rem;
    border-radius: 8px;
    width: 100%; 
    max-width: 300px; 
    outline: none;
  }
  
  :deep(.form-container) {
    margin-top: 60px;
    position: relative;
    height: auto; 
    transition: all 0.6s ease-in-out;
    display: flex;
    justify-content: center;
  }
  
  :deep(.sign) {
    width: 100%;
    z-index: 2;
  }
  
  @media (max-width: 1024px) {
    :deep(.container) {
      width: 80%; 
    }
  }
  
  @media (max-width: 768px) {
    :deep(.container) {
      width: 90%; 
      padding: 15px;
    }
  
    :deep(.container form) {
      padding: 0 20px;
    }
  
    :deep(.container input) {
      font-size: 0.95rem;
      padding: 8px 12px;
    }
  }
  </style>
  