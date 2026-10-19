import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { CategoryFilterOption, useFilterStore } from '../store/useFilterStore';

const CATEGORIES: CategoryFilterOption[] = ['Tất cả', 'CNTT', 'Kinh tế', 'Ngoại ngữ'];

export const FilterBar: React.FC = () => {
  const { searchTerm, selectedCategory, setSearchTerm, setSelectedCategory } = useFilterStore();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '24px',
        flexWrap: 'wrap',
        alignItems: 'center',
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        padding: '12px',
        borderRadius: '12px',
        border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
        boxShadow: isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      {/* Search Input */}
      <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
        <input
          type="text"
          placeholder="🔍 Tìm kiếm theo tên sách hoặc tác giả..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '8px',
            border: `1px solid ${isDark ? '#4b5563' : '#d1d5db'}`,
            backgroundColor: isDark ? '#111827' : '#f9fafb',
            color: isDark ? '#f3f4f6' : '#111827',
            fontSize: '14px',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Dropdown Filter */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value as CategoryFilterOption)}
        style={{
          padding: '10px 16px',
          borderRadius: '8px',
          border: `1px solid ${isDark ? '#4b5563' : '#d1d5db'}`,
          backgroundColor: isDark ? '#111827' : '#f9fafb',
          color: isDark ? '#f3f4f6' : '#111827',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            📁 {cat}
          </option>
        ))}
      </select>
    </div>
  );
};