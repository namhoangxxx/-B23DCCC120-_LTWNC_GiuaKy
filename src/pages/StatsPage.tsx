import React from 'react';
import { useAppSelector } from '../app/hooks';
import { useTheme } from '../context/ThemeContext';
import { BookCategory } from '../features/books/types';

export const StatsPage: React.FC = () => {
  const { items, borrowedBookIds } = useAppSelector((state) => state.books);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const statsByCategory = items.reduce<Record<BookCategory, number>>(
    (acc, book) => {
      acc[book.category] = (acc[book.category] || 0) + 1;
      return acc;
    },
    { CNTT: 0, 'Kinh tế': 0, 'Ngoại ngữ': 0 }
  );

  const totalBooks = items.length || 1;

  return (
    <div>
      <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: '800' }}>📊 Báo cáo Thống kê Thư viện</h2>

      {/* Top Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div
          style={{
            padding: '24px',
            backgroundColor: isDark ? '#1f2937' : '#ffffff',
            border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
            borderRadius: '16px',
            textAlign: 'center',
            boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ fontSize: '36px', fontWeight: '800', color: '#3b82f6' }}>{items.length}</div>
          <div style={{ fontSize: '14px', color: isDark ? '#9ca3af' : '#6b7280', marginTop: '6px', fontWeight: '600' }}>
            📚 Tổng đầu sách
          </div>
        </div>

        <div
          style={{
            padding: '24px',
            backgroundColor: isDark ? '#1f2937' : '#ffffff',
            border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
            borderRadius: '16px',
            textAlign: 'center',
            boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ fontSize: '36px', fontWeight: '800', color: '#10b981' }}>{borrowedBookIds.length}</div>
          <div style={{ fontSize: '14px', color: isDark ? '#9ca3af' : '#6b7280', marginTop: '6px', fontWeight: '600' }}>
            📖 Sách đang mượn
          </div>
        </div>
      </div>

      {/* Progress Bars Breakdown */}
      <div
        style={{
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
          padding: '28px',
          borderRadius: '16px',
          border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
          boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.03)',
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '18px', fontWeight: '700' }}>
          Tỷ lệ Đầu sách theo Thể loại:
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* CNTT */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '14px', fontWeight: '600' }}>
              <span>💻 CNTT</span>
              <span>{statsByCategory['CNTT']} cuốn ({Math.round((statsByCategory['CNTT'] / totalBooks) * 100)}%)</span>
            </div>
            <div style={{ width: '100%', height: '10px', backgroundColor: isDark ? '#374151' : '#e5e7eb', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ width: `${(statsByCategory['CNTT'] / totalBooks) * 100}%`, height: '100%', backgroundColor: '#3b82f6', borderRadius: '5px' }} />
            </div>
          </div>

          {/* Kinh tế */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '14px', fontWeight: '600' }}>
              <span>📈 Kinh tế</span>
              <span>{statsByCategory['Kinh tế']} cuốn ({Math.round((statsByCategory['Kinh tế'] / totalBooks) * 100)}%)</span>
            </div>
            <div style={{ width: '100%', height: '10px', backgroundColor: isDark ? '#374151' : '#e5e7eb', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ width: `${(statsByCategory['Kinh tế'] / totalBooks) * 100}%`, height: '100%', backgroundColor: '#10b981', borderRadius: '5px' }} />
            </div>
          </div>

          {/* Ngoại ngữ */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '14px', fontWeight: '600' }}>
              <span>🌐 Ngoại ngữ</span>
              <span>{statsByCategory['Ngoại ngữ']} cuốn ({Math.round((statsByCategory['Ngoại ngữ'] / totalBooks) * 100)}%)</span>
            </div>
            <div style={{ width: '100%', height: '10px', backgroundColor: isDark ? '#374151' : '#e5e7eb', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ width: `${(statsByCategory['Ngoại ngữ'] / totalBooks) * 100}%`, height: '100%', backgroundColor: '#f59e0b', borderRadius: '5px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;