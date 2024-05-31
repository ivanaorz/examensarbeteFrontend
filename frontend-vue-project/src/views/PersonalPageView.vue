<template>
  <div class="personal-page">
    <header class="header">
      <h1>Welcome to your personal page</h1>
    </header>
    <div class="content">
      <div class="sidebar">
        <ul>
          <li @click="navigateTo('CreateBookEntry')">Create book entry</li>
          <li @click="navigateTo('ListBookEntries')">See all book entries</li>
          <li @click="navigateTo('UpdateBookEntry')">Update book entry</li>
          <li @click="navigateTo('DeleteBookEntry')">Delete book entry</li>
          <li><LogoutButton /></li>
        </ul>
      </div>
      <div class="main">
        <img src="@/assets/pile of books.png" alt="Pile of Books" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '../service/authService';
import LogoutButton from '../components/LogoutButton.vue';



export default defineComponent({
  name: 'PersonalPageView',
  components: {
    LogoutButton
  },
  setup() {
    const router = useRouter();

    const navigateTo = (view: string) => {
      router.push({ name: view });
    };

    const logout = async () => {
      try {
        await AuthService.logout();
        await router.push({ name: 'home' });
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    return {
      navigateTo,
      logout
    };
  }
});
</script>
  
  <style scoped>
  .personal-page {
    background-color: lightblue;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  
  .h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
}
  
  .content {
    display: flex;
    width: 80%;
    margin: 0 auto;
  }
  .sidebar {
  flex: 1;
  background-color: white;
  padding: 1rem;
  margin-right: 2rem;
  border-radius: 10px;
}
  
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar li {
    margin: 1rem 0;
    cursor: pointer;
  }
  
  .sidebar li:hover {
    text-decoration: underline;
  }
  
  .main {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .main img {
    max-width: 100%;
    border-radius: 10px;
  }
  </style>
  