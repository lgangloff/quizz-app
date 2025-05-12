// src/app/components/quiz/quiz.component.ts

import { Component, OnInit } from '@angular/core';
import { Question } from '../../models/question.model';
import { QuizService } from '../../services/quiz.service';
import { QuestionComponent } from '../question/question.component';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from '../results/results.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, QuestionComponent, ResultsComponent]
})
export class QuizComponent implements OnInit {
  questions: Question[] = [];
  currentQuestionIndex = 0;
  loading = false;
  quizCompleted = false;
  quizUrl?: string = "./assets/data.json";

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.isQuizCompleted().subscribe(completed => {
      this.quizCompleted = completed;
    });
  }

  loadQuestions(): void {
    this.loading = true;
    this.quizService.loadQuestions(this.quizUrl!).subscribe({
      next: (questions) => {
        this.questions = questions;
        this.quizService.setQuestions(questions);
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des questions:', error);
        this.loading = false;
      }
    });
  }

  onAnswerSelected(questionId: number, answer: string): void {
    this.quizService.saveUserAnswer(questionId, answer);
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  canSubmitQuiz(): boolean {
    return this.quizService.areAllQuestionsAnswered();
  }

  submitQuiz(): void {
    this.quizService.completeQuiz();
  }

  resetQuiz(): void {
    this.quizService.resetQuiz();
    this.currentQuestionIndex = 0;
  }

  // Navigation par index
  goToQuestion(index: number): void {
    if (index >= 0 && index < this.questions.length) {
      this.currentQuestionIndex = index;
    }
  }
}
