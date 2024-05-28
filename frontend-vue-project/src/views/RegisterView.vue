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
          <button @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </template>



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