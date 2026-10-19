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
        boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.03)',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '18px',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
            }}
          >
            📚
          </div>
          <span style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.5px' }}>
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
              backgroundColor: location.pathname === '/' ? (isDark ? '#374151' : '#f3f4f6') : 'transparent',
              color: isDark ? '#f3f4f6' : '#1f2937',
              transition: 'all 0.2s',
            }}
          >
            Trang chủ
          </Link>
          <Link
            to="/stats"
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '14px',
              backgroundColor: location.pathname === '/stats' ? (isDark ? '#374151' : '#f3f4f6') : 'transparent',
              color: isDark ? '#f3f4f6' : '#1f2937',
              transition: 'all 0.2s',
            }}
          >
            Thống kê
          </Link>

          <div
            style={{
              marginLeft: '8px',
              marginRight: '8px',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '700',
              backgroundColor: borrowedCount >= 3 ? '#fef2f2' : isDark ? '#1e293b' : '#eff6ff',
              color: borrowedCount >= 3 ? '#ef4444' : '#3b82f6',
              border: `1px solid ${borrowedCount >= 3 ? '#fca5a5' : isDark ? '#334155' : '#bfdbfe'}`,
            }}
          >
            Đang mượn: {borrowedCount}/3
          </div>

          <button
            onClick={toggleTheme}
            style={{
              padding: '8px 14px',
              cursor: 'pointer',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: isDark ? '#374151' : '#f3f4f6',
              color: isDark ? '#fbbf24' : '#1f2937',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s',
            }}
          >
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </nav>
      </div>
    </header>
  );
};