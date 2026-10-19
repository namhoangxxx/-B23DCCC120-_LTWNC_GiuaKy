import React, { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useTheme } from '../context/ThemeContext';
import { borrowBook, returnBook } from '../features/books/booksSlice';
import { useDebounce } from '../hooks/useDebounce';
import { useFilterStore } from '../store/useFilterStore';
import { BookCard } from './BookCard';

export const BookList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, borrowedBookIds, status, error } = useAppSelector((state) => state.books);
  const { searchTerm, selectedCategory } = useFilterStore();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleBorrow = useCallback(
    (id: string) => {
      dispatch(borrowBook(id));
    },
    [dispatch]
  );

  const handleReturn = useCallback(
    (id: string) => {
      dispatch(returnBook(id));
    },
    [dispatch]
  );

  const filteredBooks = useMemo(() => {
    return items.filter((book) => {
      const term = debouncedSearchTerm.toLowerCase();
      const matchesSearch =
        book.title.toLowerCase().includes(term) || book.author.toLowerCase().includes(term);

      const matchesCategory =
        selectedCategory === 'Tất cả' || book.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [items, debouncedSearchTerm, selectedCategory]);

  if (status === 'loading') {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0', color: isDark ? '#9ca3af' : '#6b7280' }}>
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>
        <div style={{ fontSize: '16px', fontWeight: '600' }}>Đang tải danh sách sách...</div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div style={{ textAlign: 'center', padding: '40px', backgroundColor: isDark ? '#2d1a1a' : '#fef2f2', border: '1px solid #fca5a5', borderRadius: '12px', color: '#ef4444' }}>
        <div style={{ fontSize: '32px', marginBottom: '8px' }}>⚠️</div>
        <div style={{ fontWeight: '700', fontSize: '16px' }}>Lỗi: {error}</div>
      </div>
    );
  }

  return (
    <div>
      {filteredBooks.length === 0 ? (
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
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: isDark ? '#f3f4f6' : '#111827' }}>
            Không tìm thấy kết quả phù hợp
          </h3>
          <p style={{ margin: 0, fontSize: '14px' }}>
            Thử tìm kiếm với từ khóa khác hoặc chuyển sang thể loại sách khác.
          </p>
        </div>
      ) : (
        filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            isBorrowed={borrowedBookIds.includes(book.id)}
            onBorrow={handleBorrow}
            onReturn={handleReturn}
          />
        ))
      )}
    </div>
  );
};