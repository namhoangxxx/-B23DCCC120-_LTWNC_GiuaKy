import React from 'react';
import { BookList } from '../components/BookList';
import { FilterBar } from '../components/FilterBar';

export const HomePage: React.FC = () => {
  return (
    <div>
      <h2 style={{ marginBottom: '16px' }}>Danh mục sách chuyên ngành</h2>
      <FilterBar />
      <BookList />
    </div>
  );
};