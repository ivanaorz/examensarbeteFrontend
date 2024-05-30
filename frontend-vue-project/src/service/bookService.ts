import axios from 'axios';
import jwtService from './jwtService';
import type { BookDetails } from '../model/bookDetails';
import type { UpdateBookDetails } from '../model/bookDetails';

const BASE_BOOK_URL = 'http://127.0.0.1:5000/books/';

class BookService {
  async createBook(bookDetails: BookDetails): Promise<string> {
    try {
      const token = jwtService.getAuthToken();
      const response = await axios.post(BASE_BOOK_URL + 'create', bookDetails, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.message;
    } catch (err) {
      const error = err as any;
      console.error('Error during book creation:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Book creation failed');
    }
  }

  async getBooks(): Promise<BookDetails[]> {
    try {
      const token = jwtService.getAuthToken();
      const response = await axios.get(BASE_BOOK_URL + 'all', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.books;
    } catch (err) {
      const error = err as any;
      console.error('Error during fetching books:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Fetching books failed');
    }
  }

  async updateBook(bookDetails: UpdateBookDetails): Promise<string> {
    try {
      const token = jwtService.getAuthToken();
      const response = await axios.put(BASE_BOOK_URL + 'update', bookDetails, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.message;
    } catch (err) {
      const error = err as any;
      console.error('Error during book update:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Book update failed');
    }
  }

  

  async deleteBook(title: string): Promise<string> {
    try {
      const token = jwtService.getAuthToken();
      const response = await axios.delete(BASE_BOOK_URL + 'delete', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: { title }
      });
      return response.data.message;
    } catch (err) {
      const error = err as any;
      console.error('Error during book deletion:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Book deletion failed');
    }
  }

  async getAuthors(): Promise<string[]> {
    try {
      const response = await axios.get(BASE_BOOK_URL + 'authors');
      return response.data.authors;
    } catch (err) {
      const error = err as any;
      console.error('Error during fetching authors:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Fetching authors failed');
    }
  }

  async getBooksByAuthor(authorName: string): Promise<BookDetails[]> {
    try {
      const response = await axios.get(BASE_BOOK_URL + `author/${authorName}`);
      return response.data.books;
    } catch (err) {
      const error = err as any;
      console.error('Error during fetching books by author:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Fetching books by author failed');
    }
  }
}

export default new BookService();
