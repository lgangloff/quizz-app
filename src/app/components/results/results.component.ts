// src/app/components/results/results.component.ts

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Question, QuizResults } from '../../models/question.model';
import { QuizService } from '../../services/quiz.service';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from "../question/question.component";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  standalone: true,
  imports: [CommonModule, QuestionComponent]
})
export class ResultsComponent implements OnInit {
  @Output() resetQuiz = new EventEmitter<void>();
  
  questions: Question[] = [];
  results: QuizResults | null = null;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.questions = this.quizService.getQuestions();
    this.quizService.getQuizResults().subscribe(results => {
      this.results = results;
    });
  }

  isAllAnswersCorrect(question: Question): boolean {
    return this.quizService.isAllAnswersCorrect(question);
  }

  onResetQuiz(): void {
    this.resetQuiz.emit();
  }

  getScoreClass(): string {
    if (!this.results) return '';
    
    if (this.results.score >= 80) {
      return 'excellent';
    } else if (this.results.score >= 60) {
      return 'good';
    } else if (this.results.score >= 40) {
      return 'average';
    } else {
      return 'poor';
    }
  }
}