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
  loadQuestions(url: string): Observable<Question[]> {
    return this.http.get<Question[]>(url);
  }

  // Définir les questions après chargement
  setQuestions(questions: Question[]): void {
    this.questions = questions;
    this.resetQuiz();
  }

  // Obtenir toutes les questions
  getQuestions(): Question[] {
    return this.questions;
  }

  // Enregistrer la réponse de l'utilisateur pour une question
  saveUserAnswer(questionId: number, answer: string): void {
    const question = this.questions.find(q => q.id === questionId);
    if (question) {
      const index = question.userAnswers.indexOf(answer, 0);
      if (index > -1) {
        question.userAnswers.splice(index, 1);
      }
      else{
        question.userAnswers!.push(answer);
      }
    }
  }

  // Vérifier si toutes les questions ont été répondues
  areAllQuestionsAnswered(): boolean {
    return this.questions.every(question => question.userAnswers?.length !== -1);
  }

  // Calculer les résultats du quiz
  calculateResults(): QuizResults {
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    this.questions.forEach(question => {
      if (this.isAllAnswersCorrect(question)) {
        correctAnswers++;
      } else {
        incorrectAnswers++;
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
      question.userAnswers = [];
    });
    this.quizCompleted.next(false);
    this.quizResults.next(null);
  }

  isAllAnswersCorrect(question: Question): boolean {
    for (const key in question.answers) {
      if (question.answers[key].correct) {
         if(question.userAnswers?.indexOf(key) === -1){
          return false;
         }
      }
      else if(question.userAnswers?.indexOf(key) !== -1 ){
        return false;
      }
    }
    return true;
  }

}
