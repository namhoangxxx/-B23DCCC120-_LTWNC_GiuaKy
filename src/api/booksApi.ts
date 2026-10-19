import { Book } from '../features/books/types';
import { ApiResponse } from '../types/api';

const MOCK_BOOKS: Book[] = [
  // Thể loại CNTT
  { id: '1', title: 'Lập trình TypeScript Nâng cao', author: 'Nguyễn Văn A', category: 'CNTT', publishedYear: 2023, availableCopies: 2 },
  { id: '2', title: 'React & Redux Toolkit Thực chiến', author: 'Lê Văn C', category: 'CNTT', publishedYear: 2024, availableCopies: 1 },
  { id: '3', title: 'Clean Code - Mã Sạch', author: 'Robert C. Martin', category: 'CNTT', publishedYear: 2020, availableCopies: 0 },
  { id: '4', title: 'Thiết kế Kiến trúc Microservices', author: 'Trần Minh D', category: 'CNTT', publishedYear: 2022, availableCopies: 3 },
  { id: '5', title: 'Cấu trúc Dữ liệu & Giải thuật', author: 'Phạm Hoàng E', category: 'CNTT', publishedYear: 2021, availableCopies: 4 },

  // Thể loại Kinh tế
  { id: '6', title: 'Kinh tế Vĩ mô Hiện đại', author: 'Trần Thị B', category: 'Kinh tế', publishedYear: 2021, availableCopies: 0 },
  { id: '7', title: 'Quản trị Tài chính Doanh nghiệp', author: 'Nguyễn Thị F', category: 'Kinh tế', publishedYear: 2023, availableCopies: 2 },
  { id: '8', title: 'Marketing Số trong Kỷ nguyên AI', author: 'Hoàng Văn G', category: 'Kinh tế', publishedYear: 2024, availableCopies: 5 },
  { id: '9', title: 'Đầu tư Tự do Tài chính', author: 'Đặng Văn H', category: 'Kinh tế', publishedYear: 2022, availableCopies: 1 },

  // Thể loại Ngoại ngữ
  { id: '10', title: 'Tiếng Anh Chuyên ngành IT & Tech', author: 'John Doe', category: 'Ngoại ngữ', publishedYear: 2022, availableCopies: 5 },
  { id: '11', title: 'Giao tiếp Kinh doanh Tiếng Anh', author: 'Sarah Jenkins', category: 'Ngoại ngữ', publishedYear: 2023, availableCopies: 3 },
  { id: '12', title: 'Luyện dịch Văn bản Kinh tế Anh - Việt', author: 'Vũ Thị K', category: 'Ngoại ngữ', publishedYear: 2021, availableCopies: 2 },
];

export const fetchBooksApi = (shouldFail = false): Promise<ApiResponse<Book[]>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (shouldFail) {
        resolve({ ok: false, error: 'Không thể kết nối đến máy chủ thư viện!' });
      } else {
        resolve({ ok: true, data: MOCK_BOOKS });
      }
    }, 500);
  });
};