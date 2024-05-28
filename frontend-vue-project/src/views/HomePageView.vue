<template>
  <div class="home-page">
    <h1>Welcome to Self Published Writers' Web Page</h1>
    <div class="options">
      <div class="option">
        <p>Are you a self published writer and want to list your works? Great! Then press the button to sign up!</p>
        <button @click="goToRegister">Sign up</button>
      </div>
      <div class="option">
        <p>Here you can see the list with self published writers and their works!</p>
        <button @click="goToList">List with writers</button>
      </div>
      <div class="option">
        <p>Already have an account? Then just sign in!</p>
        <button @click="goToLogin">Sign in</button>
      </div>
    </div>
    <div class="books-image">
      <img src="@/assets/books.png" alt="Books">
      <img src="@/assets/tea.png" alt="Tea">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'HomePageView',
  setup() {
    const router = useRouter();

    const goToRegister = () => {
      router.push({ name: 'Register' });
    };

    const goToList = () => {
      router.push({ name: 'SeeWriters' });
    };

    const goToLogin = () => {
      router.push({ name: 'Login' });
    };

    return {
      goToRegister,
      goToList,
      goToLogin,
    };
  },
});
</script>

<style scoped>
.home-page {
  text-align: center;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.options {
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
}

.option {
  background-color: #87CEEB;
  padding: 1rem;
  border-radius: 10px;
  width: 25%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.option p {
  font-size: 1rem;
  margin-bottom: 1rem;
}

button {
  background-color: #4682B4;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #5A9BD4;
}

.books-image {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.books-image img {
  width: 100px;
  height: auto;
}
</style>

