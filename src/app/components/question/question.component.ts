// src/app/components/question/question.component.ts

import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Question } from '../../models/question.model';
import { QuizService } from '../../services/quiz.service';
import { CommonModule } from '@angular/common';
import { MarkdownRendererComponent } from "../markdown-renderer/markdown-renderer.component";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  standalone: true,
  imports: [CommonModule, MarkdownRendererComponent]
})
export class QuestionComponent implements OnChanges {
  @Input() question!: Question;
  @Input() showCorrection = false;
  @Output() answerSelected = new EventEmitter<{questionId: number, answer: string}>();
  
  answerKeys: string[] = [];
  correctAnswers: string[] = [];

  constructor(private quizService: QuizService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question'] && this.question) {
      this.answerKeys = Object.keys(this.question.answers);
    }
  }

  selectAnswer(answer: string): void {
    this.answerSelected.emit({
      questionId: this.question.id,
      answer: answer
    });
  }

  isAnswerCorrect(answerKey: string): boolean {
    return this.question.answers[answerKey].correct;
  }

  isAnswerSelected(answerKey: string): boolean {
    return this.question.userAnswers?.indexOf(answerKey) !== -1;
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
