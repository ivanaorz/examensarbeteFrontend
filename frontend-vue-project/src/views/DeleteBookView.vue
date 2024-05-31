
<template>
  <div class="delete-book-view">
    <LogoutButton class="logout-button" />
    <h1>Delete book entry</h1>
    <div v-if="message" class="message">{{ message }}</div>
    <div v-else-if="noBooksMessage" class="no-books-message">{{ noBooksMessage }}</div>
    <form v-else @submit.prevent="deleteBook">
      <label for="title">Title of the book you want to delete</label>
      <select v-model="title" id="title" required>
        <option v-for="book in books" :key="book.id" :value="book.title">{{ book.title }}</option>
      </select>
      <button type="submit">Delete</button>
    </form>
  </div>
</template>

  
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import BookService from '../service/bookService';
import LogoutButton from '../components/LogoutButton.vue';
import type { BookDetails } from '../model/bookDetails';

export default defineComponent({
  name: 'DeleteBookView',
  components: {
    LogoutButton
  },
  setup() {
    const books = ref<BookDetails[]>([]);
    const title = ref('');
    const message = ref('');
    const noBooksMessage = ref('');

    const fetchBooks = async () => {
      try {
        const bookEntries = await BookService.getBooks();
        if (!bookEntries || bookEntries.length === 0) {
          message.value = 'You have no book entries yet.';
          books.value = [];
        } else {
          books.value = bookEntries;
          noBooksMessage.value = ''; 
        }
      } catch (error) {
        message.value = (error as Error).message;
      }
    };

    const deleteBook = async () => {
      try {
        const responseMessage = await BookService.deleteBook(title.value);
        message.value = responseMessage;
        title.value = '';  
      } catch (error) {
        message.value = (error as Error).message;
      }
    };


    onMounted(() => {
      fetchBooks();
    });

    return {
      books,
      title,
      message,
      noBooksMessage,
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
  