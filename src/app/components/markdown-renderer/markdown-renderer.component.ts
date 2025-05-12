import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SecurityContext, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-markdown-renderer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './markdown-renderer.component.html',
  styleUrl: './markdown-renderer.component.scss'
})
export class MarkdownRendererComponent implements OnChanges {
  @Input() markdownContent: string = '';
  
  renderedHtml: SafeHtml = '';
  
  constructor(private sanitizer: DomSanitizer) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['markdownContent']) {
      this.renderMarkdown();
    }
  }
  
  private renderMarkdown(): void {
    if (!this.markdownContent) {
      this.renderedHtml = '';
      return;
    }
    
    // Convertir le Markdown en HTML
    const rawHtml = marked.parse(this.markdownContent);
    
    // Sanitiser le HTML pour éviter les failles XSS
    const sanitizedHtml = this.sanitizer.sanitize(SecurityContext.HTML, rawHtml);
    
    // Convertir en SafeHtml pour utilisation avec [innerHTML]
    this.renderedHtml = this.sanitizer.bypassSecurityTrustHtml(sanitizedHtml || '');
  }
}