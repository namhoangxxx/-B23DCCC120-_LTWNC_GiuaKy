import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBooksApi } from '../../api/booksApi';
import { isApiSuccess } from '../../types/api';
import { Book } from './types';

interface BooksState {
  items: Book[];
  borrowedBookIds: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BooksState = {
  items: [],
  borrowedBookIds: [],
  status: 'idle',
  error: null,
};

export const fetchBooks = createAsyncThunk<Book[], boolean | undefined, { rejectValue: string }>(
  'books/fetchBooks',
  async (shouldFail = false, { rejectWithValue }: { rejectWithValue: (value: string) => any }) => {
    const response = await fetchBooksApi(shouldFail);
    
    if (isApiSuccess(response)) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    borrowBook: (state: { items: any[]; borrowedBookIds: any[]; }, action: PayloadAction<string>) => {
      const book = state.items.find((b: { id: any; }) => b.id === action.payload);
      if (book && book.availableCopies > 0) {
        book.availableCopies -= 1;
        state.borrowedBookIds.push(action.payload);
      }
    },
    returnBook: (state: { items: any[]; borrowedBookIds: any[]; }, action: PayloadAction<string>) => {
      const book = state.items.find((b: { id: any; }) => b.id === action.payload);
      if (book) {
        book.availableCopies += 1;
        state.borrowedBookIds = state.borrowedBookIds.filter((id: any) => id !== action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    return builder
      .addCase(fetchBooks.pending, (state: BooksState) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state: BooksState, action: PayloadAction<Book[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state: BooksState, action: { payload?: string }) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Đã có lỗi xảy ra khi kết nối máy chủ';
      });
  },
});

export const { borrowBook, returnBook } = booksSlice.actions;
export default booksSlice.reducer;