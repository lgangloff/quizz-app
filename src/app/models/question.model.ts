// src/app/models/question.model.ts

  
  export interface Answer {
    description: string;
    correct: boolean;
    explanation: string;
    links?: string[];
  }
  
  export interface Answers {
    [key: string]: Answer;
  }
  
  export interface Question {
    id: number;
    question: string;
    description: string;
    answers: Answers;
    multiple_correct_answers: boolean;
    explanation: string;
    tags: string[];
    category: string;
    difficulty: string;
    userAnswers: string[]; // Pour stocker la réponse de l'utilisateur
  }
  
  export interface QuizResults {
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    score: number;
  }
  