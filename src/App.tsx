import React, { lazy, Suspense, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './app/hooks';
import { store } from './app/store';
import { Header } from './components/Header';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { fetchBooks } from './features/books/booksSlice';
import { HomePage } from './pages/HomePage';

const StatsPage = lazy(() => import('./pages/StatsPage'));

const MainContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  useEffect(() => {
    dispatch(fetchBooks(false)); 
  }, [dispatch]);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme === 'dark' ? '#111827' : '#f9fafb',
        color: theme === 'dark' ? '#f3f4f6' : '#111827',
        transition: 'all 0.3s ease',
      }}
    >
      <Header />
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px 40px 20px' }}>
        <Suspense fallback={<div style={{ padding: '20px', textAlign: 'center' }}>Đang tải trang...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <MainContent />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;