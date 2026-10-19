import { act, renderHook } from '@testing-library/react';
import useDebounce from '../useDebounce';

describe('useDebounce Custom Hook Test', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('Chỉ cập nhật giá trị debounced sau đúng khoảng thời gian delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'React', delay: 300 } }
    );

    expect(result.current).toBe('React');

    rerender({ value: 'TypeScript', delay: 300 });
    expect(result.current).toBe('React');

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe('React');

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe('TypeScript');
  });
});