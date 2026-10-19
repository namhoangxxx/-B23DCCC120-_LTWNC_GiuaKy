import booksReducer, { borrowBook, fetchBooks, returnBook } from '../booksSlice';
import { Book } from '../types';

const initialState = {
  items: [
    {
      id: '1',
      title: 'Lập trình TypeScript Nâng cao',
      author: 'Nguyễn Văn A',
      category: 'CNTT' as const,
      publishedYear: 2023,
      availableCopies: 2,
    },
  ] as Book[],
  borrowedBookIds: [],
  status: 'idle' as const,
  error: null,
};

describe('booksSlice Reducer Tests', () => {
  test('1. Nên giảm availableCopies đi 1 và thêm id vào borrowedBookIds khi dispatch borrowBook', () => {
    const state = booksReducer(initialState, borrowBook('1'));
    expect(state.items[0].availableCopies).toBe(1);
    expect(state.borrowedBookIds).toContain('1');
  });

  test('2. Nên tăng availableCopies lên 1 và gỡ id khỏi borrowedBookIds khi dispatch returnBook', () => {
    const borrowedState = {
      ...initialState,
      items: [{ ...initialState.items[0], availableCopies: 1 }],
      borrowedBookIds: ['1'],
    };
    const state = booksReducer(borrowedState, returnBook('1'));
    expect(state.items[0].availableCopies).toBe(2);
    expect(state.borrowedBookIds).not.toContain('1');
  });

  test('3. Nên chuyển status thành "loading" khi dispatch fetchBooks.pending', () => {
    const action = { type: fetchBooks.pending.type };
    const state = booksReducer(initialState, action);
    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  test('4. Nên lưu danh sách sách và chuyển status thành "succeeded" khi dispatch fetchBooks.fulfilled', () => {
    const booksPayload: Book[] = [
      {
        id: '2',
        title: 'Kinh tế Vĩ mô',
        author: 'Trần Thị B',
        category: 'Kinh tế',
        publishedYear: 2021,
        availableCopies: 3,
      },
    ];
    const action = { type: fetchBooks.fulfilled.type, payload: booksPayload };
    const state = booksReducer(initialState, action);
    expect(state.status).toBe('succeeded');
    expect(state.items).toEqual(booksPayload);
  });
});