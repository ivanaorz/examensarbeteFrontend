<template>
    <div class="create-book-view">
      <LogoutButton />
      <h1>Create book entry</h1>
      <form @submit.prevent="createBook">
        <div class="form-group">
          <label for="title">Book title</label>
          <input v-model="bookDetails.title" type="text" id="title" required />
        </div>
        <div class="form-group">
          <label for="author">Author name</label>
          <input v-model="bookDetails.author_name" type="text" id="author_name" required />
        </div>
        <div class="form-group">
          <label for="genre">Genre</label>
          <input v-model="bookDetails.genre" type="text" id="genre" required />
        </div>
        <div class="form-group">
          <label for="year">Year of publication</label>
          <input v-model="bookDetails.year" type="number" id="year" required />
        </div>
        <button type="submit" class="create-button">Create</button>
      </form>
      <p v-if="message" :class="{'success-message': isSuccess, 'error-message': !isSuccess}">
        {{ message }}
      </p>
    </div>
  </template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import BookService from '../service/bookService';
import LogoutButton from '../components/LogoutButton.vue';

export default defineComponent({
  name: 'CreateBookView',
  components: {
    LogoutButton
  },
  setup() {
    const router = useRouter();
    const bookDetails = ref({
      title: '',
      author_name: '',
      genre: '',
      year: null as number | null
    });
    const message = ref('');
    const isSuccess = ref(false);

    const createBook = async () => {
      if (bookDetails.value.year === null) {
        message.value = 'Year of publication is required';
        isSuccess.value = false;
        return;
      }

      try {
        const responseMessage = await BookService.createBook({
          ...bookDetails.value,
          year: bookDetails.value.year
        });
        message.value = responseMessage;
        isSuccess.value = true;
        bookDetails.value = { title: '', author_name: '', genre: '', year: null }; 
      } catch (error) {
        message.value = (error as Error).message;
        isSuccess.value = false;
      }
    };

    const goBack = () => {
      router.push({ name: 'PersonalPage' });
    };

    return {
      bookDetails,
      message,
      isSuccess,
      createBook,
      goBack
    };
  }
});
</script>

<style scoped>
.create-book-view {
  background-color: #86b2b6;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  margin: 50px auto;
  text-align: center;
  position: relative;
}

.logout-button {
  position: absolute;
  top: 10px;
  left: 10px;
}


h1 {
  font-family: 'Courier New', Courier, monospace;
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 16px;
  margin-bottom: 5px;
}

input {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.create-button {
  background-color: #2b2b2b;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.create-button:hover {
  background-color: #1f1f1f;
}

.success-message {
  color: green;
}

.error-message {
  color: red;
}
</style> 