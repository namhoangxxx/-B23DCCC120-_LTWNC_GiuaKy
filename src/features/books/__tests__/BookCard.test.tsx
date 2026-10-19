import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookCard } from '../../../components/BookCard';
import { ThemeProvider } from '../../../context/ThemeContext';
import { Book } from '../types';

const mockBook: Book = {
  id: '101',
  title: 'Clean Code',
  author: 'Robert C. Martin',
  category: 'CNTT',
  publishedYear: 2008,
  availableCopies: 1,
};

describe('BookCard Component Tests', () => {
  test('1. Hiển thị đúng thông tin của sách (tên, tác giả, thể loại, số bản còn lại)', () => {
    render(
      <ThemeProvider>
        <BookCard book={mockBook} isBorrowed={false} onBorrow={jest.fn()} onReturn={jest.fn()} />
      </ThemeProvider>
    );

    expect(screen.getByText('Clean Code')).toBeInTheDocument();
    expect(screen.getByText(/Robert C. Martin/)).toBeInTheDocument();
    expect(screen.getByText(/CNTT/)).toBeInTheDocument();
    expect(screen.getByText(/Còn 1 bản/i)).toBeInTheDocument();
  });

  test('2. Click nút "Mượn" gọi đúng hàm callback với đúng id của sách', async () => {
    const handleBorrow = jest.fn();
    render(
      <ThemeProvider>
        <BookCard book={mockBook} isBorrowed={false} onBorrow={handleBorrow} onReturn={jest.fn()} />
      </ThemeProvider>
    );

    const borrowButton = screen.getByRole('button', { name: /Mượn sách/i });
    await userEvent.click(borrowButton);

    expect(handleBorrow).toHaveBeenCalledTimes(1);
    expect(handleBorrow).toHaveBeenCalledWith('101');
  });

  test('3. Nút mượn bị vô hiệu hóa (disabled) khi sách đã hết bản (availableCopies = 0)', () => {
    const emptyBook: Book = { ...mockBook, availableCopies: 0 };
    render(
      <ThemeProvider>
        <BookCard book={emptyBook} isBorrowed={false} onBorrow={jest.fn()} onReturn={jest.fn()} />
      </ThemeProvider>
    );

    const disabledButton = screen.getByRole('button', { name: /Hết bản/i });
    expect(disabledButton).toBeDisabled();
  });
});