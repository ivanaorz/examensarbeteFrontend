<template>
    <div class="sea-writers-view">
      <h1>list with writers</h1>
      <ul>
        <li v-for="author_name in authors" :key="author_name" @click="goToAuthorBooks(author_name)">
          {{ author_name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import BookService from '../service/bookService';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    name: 'SeaWritersView',
    setup() {
      const authors = ref<string[]>([]);
      const router = useRouter();
      const message = ref<string>('');
  
      const fetchAuthors = async () => {
        try {
          authors.value = await BookService.getAuthors();
        } catch (error) {
          message.value = (error as Error).message;
        }
      };
  
      const goToAuthorBooks = (author_name: string) => {
        router.push({ name: 'SeeWritersBooksView', params: { author_name } });
      };
  
      onMounted(() => {
        fetchAuthors();
      });
  
      return {
        authors,
        goToAuthorBooks,
        message
      };
    }
  });
  </script>
  
  <style scoped>
  .sea-writers-view {
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
    cursor: pointer;
    color: black;
    margin: 10px 0;
  }
  
  li:hover {
    text-decoration: underline;
  }
  </style>
  