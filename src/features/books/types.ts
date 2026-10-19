export type BookCategory = 'CNTT' | 'Kinh tế' | 'Ngoại ngữ';

export interface Book {
  id: string;
  title: string;
  author: string;
  category: BookCategory;
  publishedYear: number;
  availableCopies: number;
}

export type NewBookInput = Omit<Book, 'id'>;
export type BookUpdate = Partial<Book> & Pick<Book, 'id'>;