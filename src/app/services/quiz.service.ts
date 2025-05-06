// src/app/services/quiz.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Question, QuizResults } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private questions: Question[] = [];
  private quizCompleted = new BehaviorSubject<boolean>(false);
  private quizResults = new BehaviorSubject<QuizResults | null>(null);

  constructor(private http: HttpClient) {}

  // Charger les questions depuis le fichier JSON
  loadQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>('assets/quiz-data.json');
  }

  // Définir les questions après chargement
  setQuestions(questions: Question[]): void {
    this.questions = questions;
  }

  // Obtenir toutes les questions
  getQuestions(): Question[] {
    return this.questions;
  }

  // Enregistrer la réponse de l'utilisateur pour une question
  saveUserAnswer(questionId: number, answer: string): void {
    const question = this.questions.find(q => q.id === questionId);
    if (question) {
      question.userAnswer = answer;
    }
  }

  // Vérifier si toutes les questions ont été répondues
  areAllQuestionsAnswered(): boolean {
    return this.questions.every(question => question.userAnswer !== undefined);
  }

  // Calculer les résultats du quiz
  calculateResults(): QuizResults {
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    this.questions.forEach(question => {
      const userAnswer = question.userAnswer;
      if (userAnswer) {
        // Vérifier si la réponse est correcte
        const isCorrect = question.answers[userAnswer].correct === 'true';
        if (isCorrect) {
          correctAnswers++;
        } else {
          incorrectAnswers++;
        }
      }
    });

    const results: QuizResults = {
      totalQuestions: this.questions.length,
      correctAnswers,
      incorrectAnswers,
      score: (correctAnswers / this.questions.length) * 100
    };

    this.quizResults.next(results);
    return results;
  }

  // Terminer le quiz et montrer les résultats
  completeQuiz(): void {
    this.calculateResults();
    this.quizCompleted.next(true);
  }

  // Observer si le quiz est terminé
  isQuizCompleted(): Observable<boolean> {
    return this.quizCompleted.asObservable();
  }

  // Observer les résultats du quiz
  getQuizResults(): Observable<QuizResults | null> {
    return this.quizResults.asObservable();
  }

  // Réinitialiser le quiz
  resetQuiz(): void {
    this.questions.forEach(question => {
      question.userAnswer = undefined;
    });
    this.quizCompleted.next(false);
    this.quizResults.next(null);
  }

  // Trouver la réponse correcte pour une question
  getCorrectAnswer(question: Question): string {
    for (const key in question.answers) {
      if (question.answers[key].correct === 'true') {
        return key;
      }
    }
    return '';
  }
}
