<template>
    <div class="update-book-view">
      <LogoutButton />
      <h1>Update book entry</h1>
      <form @submit.prevent="updateBook">
        <label for="title">Title of the book you want to update</label>
        <input v-model="title" id="title" type="text" required />
  
        <label for="new_author_name">Author name</label>
        <input v-model="newAuthorName" id="new_author_name" type="text" required />
  
        <label for="new_title">New title</label>
        <input v-model="newTitle" id="new_title" type="text" required />
  
        <label for="new_genre">New Genre</label>
        <input v-model="newGenre" id="new_genre" type="text" required />
  
        <label for="new_year">New year of publication</label>
        <input v-model="newYear" id="new_year" type="number" required />
  
        <button type="submit">Update</button>
      </form>
      <div v-if="message" class="message">{{ message }}</div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import BookService from '../service/bookService';
  import LogoutButton from '../components/LogoutButton.vue';
  import type { UpdateBookDetails }  from '../model/bookDetails';
  
  export default defineComponent({
    name: 'UpdateBookView',
    components: {
      LogoutButton
    },
    setup() {
      const title = ref('');
      const newAuthorName = ref('');
      const newTitle = ref('');
      const newGenre = ref('');
      const newYear = ref<number | null>(null);
      const message = ref('');
  
      const updateBook = async () => {
        if (newYear.value === null) {
          message.value = 'New year of publication is required';
          return;
        }
  
        const bookDetails: UpdateBookDetails = {
        title: title.value,
        new_title: newTitle.value,
        new_author_name: newAuthorName.value,
        new_genre: newGenre.value,
        new_year: newYear.value
      };
  
        try {
          const responseMessage = await BookService.updateBook(bookDetails);
          message.value = responseMessage;
        } catch (error) {
          message.value = (error as Error).message;
        }
      };
  
      return {
        title,
        newAuthorName,
        newTitle,
        newGenre,
        newYear,
        message,
        updateBook
      };
    }
  });
  </script>
  
  <style scoped>
  .update-book-view {
    text-align: center;
    padding: 20px;
  }
  
  label {
    display: block;
    margin: 10px 0 5px;
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
  </style>
  