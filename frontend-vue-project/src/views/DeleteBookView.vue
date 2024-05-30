<template>
    <div class="delete-book-view">
      <LogoutButton class="logout-button" />
      <h1>Delete book entry</h1>
      <form @submit.prevent="deleteBook">
        <label for="title">Title of the book you want to delete</label>
        <input v-model="title" id="title" type="text" required />
        <button type="submit">Delete</button>
      </form>
      <div v-if="message" class="message">{{ message }}</div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import BookService from '../service/bookService';
  import LogoutButton from '../components/LogoutButton.vue';
  
  export default defineComponent({
    name: 'DeleteBookView',
    components: {
      LogoutButton
    },
    setup() {
      const title = ref('');
      const message = ref('');
  
      const deleteBook = async () => {
        try {
          const responseMessage = await BookService.deleteBook(title.value);
          message.value = responseMessage;
          title.value = '';  
        } catch (error) {
          message.value = (error as Error).message;
        }
      };
  
      return {
        title,
        message,
        deleteBook
      };
    }
  });
  </script>
  
  <style scoped>
  .delete-book-view {
    text-align: center;
    padding: 20px;
    background-color: #add8e6; 
  }
  
  h1 {
    color: white;
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin: 10px 0 5px;
    color: black;
  }
  
  input {
    width: calc(100% - 20px);
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #555;
  }
  
  .message {
    color: red;
    margin-top: 20px;
  }
  
  .logout-button {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
  </style>
  