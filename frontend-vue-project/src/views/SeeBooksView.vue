<template>
    <div class="see-books-view">
      <LogoutButton />
      <h1>Your book entries</h1>
      <div v-if="message" class="message">{{ message }}</div>
      <div v-else-if="books.length === 0" class="no-books-message">You have no book entries yet.</div>
      <ul v-else class="book-list">
        <li v-for="book in books" :key="book.id" class="book-item">
          <h2>{{ book.title }}</h2>
          <p>Author: {{ book.author_name }}</p>
          <p>Genre: {{ book.genre }}</p>
          <p>Year: {{ book.year }}</p>
        </li>
      </ul>
    </div>
  </template>

  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import BookService from '../service/bookService';
  import LogoutButton from '../components/LogoutButton.vue';
  import type { BookDetails } from '../model/bookDetails';
  
  export default defineComponent({
    name: 'SeeBooksView',
    components: {
      LogoutButton
    },
    setup() {
      const router = useRouter();
      const books = ref<BookDetails[]>([]);
      const message = ref('');
  
      const fetchBooks = async () => {
        try {
          const bookEntries = await BookService.getBooks();
          if (!bookEntries || bookEntries.length === 0) {
            message.value = 'There are no book entries yet.';
          } else {
            books.value = bookEntries;
          }
        } catch (error) {
          message.value = (error as Error).message;
        }
      };
    
      const goBack = () => {
        router.push({ name: 'PersonalPage' });
      };
  
      onMounted(() => {
        fetchBooks();
      });
  
      return {
        books,
        message,
        goBack
      };
    }
  });
  </script>
  
  <style scoped>
  .see-books-view {
    text-align: center;
    padding: 20px;
  }
  
 
  .message, .no-books-message {
    color: red;
  }
  
  .book-list {
    list-style-type: none;
    padding: 0;
  }
  
  .book-item {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .book-item h2 {
    margin: 0;
    font-size: 1.5em;
  }
  
  .book-item p {
    margin: 5px 0;
  }
  </style>
  