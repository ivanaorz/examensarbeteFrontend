<template>
  <div class="register-container">
    <h2>Sign up</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" v-model="username" id="username" required />
      </div>
      <div class="form-group">
        <label for="authorName">Author name</label>
        <input type="text" v-model="authorName" id="authorName" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit" class="submit-button">Create account</button>
    </form>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <p>{{ modalMessage }}</p>
        <div v-if="registrationSuccess">
          <p>Do you want to login?</p>
          <button @click="navigateToLogin">Yes</button>
          <button @click="navigateToHome">No</button>
        </div>
        <div v-else>
          <!-- who already has an account -->
          <p>Do you want to sign in?</p> 
          <button @click="navigateToLogin">Yes</button>
          <button @click="navigateToHome">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '../service/authService';

export default {
  setup() {
    const username = ref('');
    const authorName = ref('');
    const email = ref('');
    const password = ref('');
    const showModal = ref(false);
    const modalMessage = ref('');
    const registrationSuccess = ref<boolean | null>(null);

    const router = useRouter();

    const register = async () => {
      try {
        const authDetails = {
          username: username.value,
          authorName: authorName.value,
          email: email.value,
          password: password.value,
        };

        const message = await AuthService.register(authDetails);
        modalMessage.value = 'Account created successfully!';
        registrationSuccess.value = true;
        showModal.value = true;
      } catch (error: any) {
        if (error.message === 'User with this email already exists') {
          modalMessage.value = 'You already have an account.';
          registrationSuccess.value = false;
        } else {
          modalMessage.value = 'An error occurred. Please try again.';
          registrationSuccess.value = null;
        }
        showModal.value = true;
      }
    };

    const navigateToLogin = () => {
      showModal.value = false;
      router.push('/login');
    };

    const navigateToHome = () => {
      showModal.value = false;
      router.push('/');
    };

    const closeModal = () => {
      showModal.value = false;
    };

    return {
      username,
      authorName,
      email,
      password,
      showModal,
      modalMessage,
      registrationSuccess,
      register,
      navigateToLogin,
      navigateToHome,
      closeModal,
    };
  },
};
</script>

<style scoped>
.register-container {
  background-color: #8eb8c6;
  padding: 2rem;
  border-radius: 8px;
  width: 300px;
  margin: auto;
  text-align: center;
}

.form-group {
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

.submit-button {
  background-color: #2c3e50;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #1a252f;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
}

.modal button {
  margin: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal button:hover {
  background-color: #ddd;
}
</style>