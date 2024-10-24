<template>
<div class="login">
    <component :is="currentComponent" @toggle="toggleComponent">
        <img src="../../assets/Logo.png" alt="Amason Logo">
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
  background-color: #91ebff;
  background: linear-gradient(to top, #e2e2e2, #e8faff);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}

:deep(.container) {
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
    position:relative;
    overflow: hidden;
    width: 45vw;
    height: 35vh;
    max-width: 768px;
    min-height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    transition: width 0.3s, height 0.3s;
}

:deep(h1) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #333;
    text-align: center;
}

:deep(.container p) {
    font-size: 1rem;
    line-height: 1.5rem;
    letter-spacing: 0.3px;
    margin: 20px 0;
}

:deep(.container button) {
    background-color: #00aed5;
    color: #fff;
    font-size: 0.875rem;
    padding: 10px 2.5rem;
    border: 1px solid transparent;
    border-radius: 8px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-top: 10px;
    cursor: pointer;
}

:deep(.container button:hover) {
    background-color: black;
    color: white;
    transition: all 0.3s;
    transform: scale(1.05);
}

:deep(.container .Enviar:hover) {
    background-color: #b5c5fb;
    color: black;
    font-weight: bold;
}

:deep(.container img) {
    width: 36%;
    position: absolute;
    top: 10px;
    margin-top: 1.5rem;
    margin-bottom: 1rem;

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
    width: 30vw;
}

:deep(.container input) {
    background-color: #e6e6e6;
    border: none;
    margin: 8px 2px;
    padding: 10px 30px;
    font-size: 1rem;
    border-radius: 8px;
    width: 60%;
    outline: none;
}

:deep(.form-container) {
    margin-top: 60px;
    position: relative;
    height: 80%;
    transition: all 0.6s ease-in-out;
    display: flex;
    justify-content: center;

}

:deep(.sign) {
    width: 100%;
    z-index: 2;
}

:deep(h1) {
    
    margin-bottom: 1rem;
}



@media (max-width: 1024px) {
    :depp(.container) {
        width: 70vw;
    }
}

@media (max-width: 768px) {
    :deep(.container) {
        width: 70vw;
        min-height: 80vh;
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