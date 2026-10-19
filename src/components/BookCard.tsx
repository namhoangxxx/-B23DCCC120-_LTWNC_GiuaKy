import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Book } from '../features/books/types';

interface BookCardProps {
  book: Book;
  isBorrowed: boolean;
  onBorrow: (id: string) => void;
  onReturn: (id: string) => void;
  isBorrowedPage?: boolean;
}

export const BookCard: React.FC<BookCardProps> = React.memo(({ book, isBorrowed, onBorrow, onReturn, isBorrowedPage = false }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getCategoryBadgeStyle = (category: string) => {
    switch (category) {
      case 'CNTT':
        return { bg: isDark ? 'rgba(37, 99, 235, 0.2)' : '#eff6ff', text: '#3b82f6', border: isDark ? '#1d4ed8' : '#bfdbfe' };
      case 'Kinh tế':
        return { bg: isDark ? 'rgba(22, 163, 74, 0.2)' : '#f0fdf4', text: '#10b981', border: isDark ? '#15803d' : '#bbf7d0' };
      default:
        return { bg: isDark ? 'rgba(217, 119, 6, 0.2)' : '#fef3c7', text: '#f59e0b', border: isDark ? '#b45309' : '#fde68a' };
    }
  };

  const catStyle = getCategoryBadgeStyle(book.category);

  return (
    <div
      style={{
        border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
        borderRadius: '16px',
        padding: '20px 24px',
        marginBottom: '16px',
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        color: isDark ? '#f3f4f6' : '#111827',
        boxShadow: isDark ? '0 4px 20px rgba(0, 0, 0, 0.25)' : '0 4px 16px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
        transition: 'all 0.25s ease',
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: isDark ? '#60a5fa' : '#1d4ed8' }}>
            {book.title}
          </h3>
          <span
            style={{
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '700',
              backgroundColor: catStyle.bg,
              color: catStyle.text,
              border: `1px solid ${catStyle.border}`,
            }}
          >
            {book.category}
          </span>
        </div>

        <p style={{ margin: '6px 0', fontSize: '14px', color: isDark ? '#9ca3af' : '#4b5563' }}>
          ✍️ Tác giả: <strong style={{ color: isDark ? '#e5e7eb' : '#111827' }}>{book.author}</strong> &nbsp;|&nbsp; 🗓️ Năm XB: {book.publishedYear}
        </p>

        {/* Chỉ hiển thị số lượng bản còn lại nếu KHÔNG PHẢI trang Sách Đang Mượn */}
        {!isBorrowedPage && (
          <p style={{ margin: '8px 0 0 0', fontSize: '13px', fontWeight: '600' }}>
            Trạng thái:{' '}
            <span style={{ color: book.availableCopies > 0 ? '#10b981' : '#ef4444' }}>
              {book.availableCopies > 0 ? `Còn ${book.availableCopies} bản` : 'Đã hết sách'}
            </span>
          </p>
        )}
      </div>

      <div>
        {isBorrowedPage ? (
          /* TRANG SÁCH ĐANG MƯỢN */
          <button
            onClick={() => onReturn(book.id)}
            style={{
              padding: '10px 22px',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '14px',
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
              transition: 'all 0.2s ease',
            }}
          >
            🔄 Trả sách
          </button>
        ) : (
          /* TRANG CHỦ */
          <button
            disabled={book.availableCopies === 0 || isBorrowed}
            onClick={() => onBorrow(book.id)}
            style={{
              padding: '10px 22px',
              backgroundColor: isBorrowed ? '#6b7280' : book.availableCopies === 0 ? (isDark ? '#374151' : '#e5e7eb') : '#10b981',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              cursor: book.availableCopies === 0 || isBorrowed ? 'not-allowed' : 'pointer',
              fontWeight: '700',
              fontSize: '14px',
              boxShadow: isBorrowed || book.availableCopies === 0 ? 'none' : '0 4px 12px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.2s ease',
            }}
          >
            {isBorrowed ? '✅ Đã mượn' : book.availableCopies === 0 ? '🚫 Hết bản' : '📖 Mượn sách'}
          </button>
        )}
      </div>
    </div>
  );
});

BookCard.displayName = 'BookCard';
export default BookCard;