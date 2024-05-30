<template>
    <div class="login-container">
      <h2>Sign in</h2>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="authDetails.username" required />
        </div>
        <div class="input-group">
          <label for="authorName">Author Name</label>
          <input type="text" id="authorName" v-model="authDetails.author_name" required />
        </div>
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="authDetails.email" required />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="authDetails.password" required />
        </div>
        <button type="submit">Sign in</button>
      </form>
      <div v-if="showPopup" class="popup">
        <p>An account is needed to sign in. Do you want to leave this page?</p>
        <button @click="navigateToHomePage">Yes</button>
        <button @click="closePopup">No</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import AuthService from '../service/authService';

export default defineComponent({
  name: 'LoginView',
  setup() {
    const router = useRouter();
    const authDetails = ref({
      username: '',
      author_name: '',
      email: '',
      password: ''
    });
    const showPopup = ref(false);

    const login = async () => {
      try {
        await AuthService.login(authDetails.value.email, authDetails.value.password, authDetails.value.username, authDetails.value.author_name);
        router.push('/personal-page');
      } catch (error: unknown) {
        if (error instanceof Error && error.message === 'Account does not exist') {
          showPopup.value = true;
        } else {
          console.error('Unexpected error:', error);
        }
      }
    };

    const navigateToHomePage = () => {
      showPopup.value = false;
      router.push('/');
    };

    const closePopup = () => {
      showPopup.value = false;
    };

    return {
      authDetails,
      login,
      showPopup,
      navigateToHomePage,
      closePopup
    };
  }
});
</script>
  
  <style scoped>
  .login-container {
  background-color: #8eb8c6;
  padding: 2rem;
  border-radius: 8px;
  width: 300px;
  margin: auto;
  text-align: center;
  }
  
  h2 {
  margin-bottom: 20px;
  }
  
  .input-group {
  margin-bottom: 1rem;
  }
  
  label {
  display: block;
  margin-bottom: 0.5rem;
  }

  input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #000;
  border-radius: 4px;
  }
  
  button {
  background-color: #2c3e50;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  }
  
  button:hover {
  background-color: #1a252f;
  }
  

  .popup p {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  }
  
  .popup button {
  margin: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  }
  
  .popup button:hover {
  background-color: #ddd;
  }
  </style>
  