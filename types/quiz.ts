export interface Answer {
  text: string;
  correct: boolean;
}

export interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

export interface QuizData {
  informatica: Question[];
  musica: Question[];
}

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  topic: 'informatica' | 'musica';
}

export interface UserAnswer {
  questionId: number;
  selectedAnswers: number[]; // indices of selected answers
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  details: {
    questionId: number;
    question: string;
    userAnswers: string[];
    correctAnswers: string[];
    isCorrect: boolean;
  }[];
}
