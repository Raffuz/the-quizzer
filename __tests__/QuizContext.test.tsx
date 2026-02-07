import { renderHook, act } from '@testing-library/react';
import { QuizProvider, useQuiz } from '@/context/QuizContext';
import { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => (
  <QuizProvider>{children}</QuizProvider>
);

describe('QuizContext', () => {
  it('provides initial state', () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });

    expect(result.current.userData).toBeNull();
    expect(result.current.questions).toEqual([]);
    expect(result.current.userAnswers).toEqual([]);
    expect(result.current.currentQuestion).toBe(0);
    expect(result.current.quizResult).toBeNull();
  });

  it('updates user data', () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });

    const userData = {
      firstName: 'Mario',
      lastName: 'Rossi',
      email: 'mario@example.com',
      age: 25,
      topic: 'informatica' as const,
    };

    act(() => {
      result.current.setUserData(userData);
    });

    expect(result.current.userData).toEqual(userData);
  });

  it('updates current question', () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });

    act(() => {
      result.current.setCurrentQuestion(5);
    });

    expect(result.current.currentQuestion).toBe(5);
  });

  it('resets quiz state', () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });

    // Set some state
    act(() => {
      result.current.setUserData({
        firstName: 'Mario',
        lastName: 'Rossi',
        email: 'mario@example.com',
        age: 25,
        topic: 'informatica',
      });
      result.current.setCurrentQuestion(3);
    });

    // Reset
    act(() => {
      result.current.resetQuiz();
    });

    expect(result.current.userData).toBeNull();
    expect(result.current.questions).toEqual([]);
    expect(result.current.userAnswers).toEqual([]);
    expect(result.current.currentQuestion).toBe(0);
    expect(result.current.quizResult).toBeNull();
  });
});
