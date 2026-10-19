import { Middleware } from '@reduxjs/toolkit';

export const maxBorrowLimitMiddleware: Middleware = (store) => (next) => (action: any) => {
  if (action.type === 'books/borrowBook') {
    const state = store.getState();
    const borrowedCount = state.books.borrowedBookIds.length;

    if (borrowedCount >= 3) {
      alert('Cảnh báo: Bạn chỉ được mượn tối đa 3 cuốn sách cùng lúc!');
      return; 
    }
  }
  return next(action);
};