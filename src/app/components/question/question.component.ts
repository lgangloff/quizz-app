// src/app/components/question/question.component.ts

import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Question } from '../../models/question.model';
import { QuizService } from '../../services/quiz.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class QuestionComponent implements OnChanges {
  @Input() question!: Question;
  @Input() showCorrection = false;
  @Output() answerSelected = new EventEmitter<{questionId: number, answer: string}>();
  
  answerKeys: string[] = [];
  correctAnswer = '';

  constructor(private quizService: QuizService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question'] && this.question) {
      this.answerKeys = Object.keys(this.question.answers);
      this.correctAnswer = this.quizService.getCorrectAnswer(this.question);
    }
  }

  selectAnswer(answer: string): void {
    this.answerSelected.emit({
      questionId: this.question.id,
      answer: answer
    });
  }

  isAnswerCorrect(answerKey: string): boolean {
    return this.question.answers[answerKey].correct === 'true';
  }

  isAnswerSelected(answerKey: string): boolean {
    return this.question.userAnswer === answerKey;
  }

  getAnswerClass(answerKey: string): string {
    if (!this.showCorrection) {
      return this.isAnswerSelected(answerKey) ? 'selected' : '';
    }
    
    if (this.isAnswerCorrect(answerKey)) {
      return 'correct';
    }
    
    if (this.isAnswerSelected(answerKey) && !this.isAnswerCorrect(answerKey)) {
      return 'incorrect';
    }
    
    return '';
  }
}
