<template>
    <button @click="handleLogout" class="logout-button">Logout</button>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import AuthService from '../service/authService';
  
  export default defineComponent({
    name: 'LogoutButton',
    setup() {
      const router = useRouter();
  
      const handleLogout = async () => {
        try {
          await AuthService.logout();
          await router.push({ name: 'home' });
        } catch (error) {
          console.error('Error during logout:', error);
        }
      };
  
      return {
        handleLogout
      };
    }
  });
  </script>
  
  <style scoped>
  .logout-button {
    padding: 0.5rem 1rem;
    background-color: #2c3e50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .logout-button:hover {
    background-color: #ff4c4c;
  }
  </style>
  