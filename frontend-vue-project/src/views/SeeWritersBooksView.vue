<template>
    <div class="see-writers-books-view">
      <h1>{{ author_name }}'s works</h1>
      <ul v-if="books.length">
        <li v-for="book in books" :key="book.id">
          {{ book.title }} ({{ book.year }})
        </li>
      </ul>
      <p v-else>No books found for this author.</p>
      <button class="back-button" @click="goToHomePage">Back to home page</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import BookService from '../service/bookService';
  import type { BookDetails } from '../model/bookDetails';
  
  export default defineComponent({
    name: 'SeeWritersBooksView',
    setup() {
      const books = ref<BookDetails[]>([]);
      const route = useRoute();
      const router = useRouter();
      const author_name = route.params.author_name as string;
      const message = ref<string>('');
  
      const fetchBooks = async () => {
        try {
          books.value = await BookService.getBooksByAuthor(author_name);
        } catch (error) {
          message.value = (error as Error).message;
        }
      };
  
      const goToHomePage = () => {
        router.push({ name: 'home' });
      };
  
      onMounted(() => {
        fetchBooks();
      });
  
      return {
        books,
        author_name,
        goToHomePage,
        message
      };
    }
  });
  </script>
  
  <style scoped>
  .see-writers-books-view {
    text-align: center;
    padding: 20px;
    background-color: #add8e6;
  }
  
  h1 {
    color: white;
    margin-bottom: 20px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    color: black;
    margin: 10px 0;
  }
  
  .back-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: white;
    color: black;
    border: none;
    cursor: pointer;
  }
  
  .back-button:hover {
    background-color: #ccc;
  }
  </style>
  