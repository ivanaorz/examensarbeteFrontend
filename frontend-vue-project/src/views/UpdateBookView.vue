
  <template>
    <div class="update-book-view">
      <LogoutButton />
      <h1>Update book entry</h1>
      <div v-if="message" class="message">{{ message }}</div>
      <div v-else-if="books.length === 0" class="no-books-message">You have no book entries yet.</div>
      <form v-else @submit.prevent="updateBook">
        <label for="title">Title of the book you want to update</label>
        <select v-model="title" id="title" required>
          <option v-for="book in books" :key="book.id" :value="book.title">{{ book.title }}</option>
        </select>
  
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
    </div>
  </template>

  <script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import BookService from '../service/bookService';
import LogoutButton from '../components/LogoutButton.vue';
import type { BookDetails, UpdateBookDetails } from '../model/bookDetails';

export default defineComponent({
  name: 'UpdateBookView',
  components: {
    LogoutButton
  },
  setup() {
    const books = ref<BookDetails[]>([]);
    const title = ref('');
    const newAuthorName = ref('');
    const newTitle = ref('');
    const newGenre = ref('');
    const newYear = ref<number | null>(null);
    const message = ref('');

    const fetchBooks = async () => {
      try {
        const bookEntries = await BookService.getBooks();
        if (!bookEntries || bookEntries.length === 0) {
          message.value = 'You have no book entries yet.';
        } else {
          books.value = bookEntries;
        }
      } catch (error) {
        message.value = (error as Error).message;
      }
    };

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

    onMounted(() => {
      fetchBooks();
    });

    return {
      books,
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
  