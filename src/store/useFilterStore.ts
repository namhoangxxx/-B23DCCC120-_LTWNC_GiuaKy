import { create } from 'zustand';
import { BookCategory } from '../features/books/types';

export type CategoryFilterOption = BookCategory | 'Tất cả';

interface FilterState {
  searchTerm: string;
  selectedCategory: CategoryFilterOption;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: CategoryFilterOption) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchTerm: '',
  selectedCategory: 'Tất cả',
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
}));