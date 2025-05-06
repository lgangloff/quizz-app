// src/app/app.component.ts

import { Component } from '@angular/core';
import { QuizComponent } from "./components/quiz/quiz.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [QuizComponent]
})
export class AppComponent {
  title = 'Quiz Spring Framework';
}
