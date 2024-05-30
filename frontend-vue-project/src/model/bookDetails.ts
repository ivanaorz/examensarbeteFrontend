export interface BookDetails {
    id?: string;
    userId?: string;
    title: string;
    author_name: string;
    genre: string;
    year: number; 
  }

  export interface UpdateBookDetails {
    title: string;
    new_title: string;
    new_author_name: string;
    new_genre: string;
    new_year: number;
  }