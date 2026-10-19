import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { useTheme } from '../context/ThemeContext';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const borrowedCount = useAppSelector((state) => state.books.borrowedBookIds.length);
  const location = useLocation();
  const isDark = theme === 'dark';

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(12px)',
        backgroundColor: isDark ? 'rgba(17, 24, 39, 0.85)' : 'rgba(255, 255, 255, 0.85)',
        borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
        padding: '14px 28px',
        marginBottom: '28px',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
            📚
          </div>
          <span style={{ fontSize: '20px', fontWeight: '800' }}>
            Mini<span style={{ color: '#6366f1' }}>Library</span>
          </span>
        </div>

        <nav style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Link
            to="/"
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '14px',
              backgroundColor: location.pathname === '/' ? (isDark ? '#374151' : '#e5e7eb') : 'transparent',
              color: isDark ? '#f3f4f6' : '#1f2937',
            }}
          >
            Trang chủ
          </Link>

          <Link
            to="/borrowed"
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '14px',
              backgroundColor: location.pathname === '/borrowed' ? (isDark ? '#374151' : '#e5e7eb') : 'transparent',
              color: isDark ? '#f3f4f6' : '#1f2937',
            }}
          >
            Tủ sách của tôi ({borrowedCount})
          </Link>

          <Link
            to="/stats"
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '14px',
              backgroundColor: location.pathname === '/stats' ? (isDark ? '#374151' : '#e5e7eb') : 'transparent',
              color: isDark ? '#f3f4f6' : '#1f2937',
            }}
          >
            Thống kê
          </Link>

          <button
            onClick={toggleTheme}
            style={{
              padding: '8px 14px',
              cursor: 'pointer',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: isDark ? '#374151' : '#f3f4f6',
              color: isDark ? '#fbbf24' : '#1f2937',
              fontWeight: '600',
            }}
          >
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </nav>
      </div>
    </header>
  );
};