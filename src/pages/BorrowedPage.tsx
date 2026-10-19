import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { BookCard } from '../components/BookCard';
import { useTheme } from '../context/ThemeContext';
import { returnBook } from '../features/books/booksSlice';

export const BorrowedPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, borrowedBookIds } = useAppSelector((state) => state.books);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const borrowedBooks = items.filter((book) => borrowedBookIds.includes(book.id));

  const handleReturn = useCallback(
    (id: string) => {
      dispatch(returnBook(id));
    },
    [dispatch]
  );

  return (
    <div>
      <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '800' }}>
        🎒 Sách Bạn Đang Mượn ({borrowedBooks.length}/3)
      </h2>

      {borrowedBooks.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: isDark ? '#1f2937' : '#ffffff',
            borderRadius: '16px',
            border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
            color: isDark ? '#9ca3af' : '#6b7280',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>📭</div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: isDark ? '#f3f4f6' : '#111827' }}>
            Bạn chưa mượn cuốn sách nào
          </h3>
          <p style={{ margin: 0, fontSize: '14px' }}>
            Hãy quay lại Trang chủ để chọn và mượn những cuốn sách chuyên ngành yêu thích.
          </p>
        </div>
      ) : (
        borrowedBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            isBorrowed={true}
            onBorrow={() => {}}
            onReturn={handleReturn}
            isBorrowedPage={true} 
          />
        ))
      )}
    </div>
  );
};

export default BorrowedPage;