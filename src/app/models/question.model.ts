// src/app/models/question.model.ts

export interface Link {
    url: string;
  }
  
  export interface Answer {
    description: string;
    correct: string;
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
    multiple_correct_answers: string;
    explanation: string;
    tags: string[];
    category: string;
    difficulty: string;
    userAnswer?: string; // Pour stocker la réponse de l'utilisateur
  }
  
  export interface QuizResults {
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    score: number;
  }
  