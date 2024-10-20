import { 
  Component, 
  ViewEncapsulation, 
  AfterViewInit, 
  ElementRef, 
  ViewChild, 
  Renderer2, 
  Inject, 
  PLATFORM_ID 
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-folio',
  standalone: true,
  templateUrl: './folio.component.html',
  styleUrls: ['./folio.component.css'],
  encapsulation: ViewEncapsulation.None  
})
export class FolioComponent implements AfterViewInit {
[x: string]: any;
  @ViewChild('textElement') textElement!: ElementRef;

  constructor(private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    console.log(this.textElement);
    if (this.textElement) {
      const text: string = this.textElement.nativeElement.textContent;
      this.renderer.setProperty(this.textElement.nativeElement, 'innerHTML', '');

      const lines = text.split('\n');
      for (let line of lines) {
        const lineSpan = this.renderer.createElement('span');
        lineSpan.style.display = 'block';

        for (let letter of line) {
          const letterSpan = this.renderer.createElement('span');
          this.renderer.setProperty(letterSpan, 'textContent', letter === ' ' ? '\u00A0' : letter);
          this.renderer.appendChild(lineSpan, letterSpan);
        }

        this.renderer.appendChild(this.textElement.nativeElement, lineSpan);
      }
    } else {
      console.error('textElement is undefined');
    }

    // Handling star creation
    if (isPlatformBrowser(this.platformId)) {
      this.createStars(150);
    }
  }

  createStars(numberOfStars: number) {
    const container = this.renderer.createElement('div');
    this.renderer.addClass(container, 'stars');
    this.renderer.appendChild(document.body, container);

    for (let i = 0; i < numberOfStars; i++) {
      const star = this.renderer.createElement('div');
      this.renderer.addClass(star, 'star');

      // Randomize star size (small to medium-sized stars)
      const size = Math.random() * 3 + 1 + 'px'; 
      this.renderer.setStyle(star, 'width', size);
      this.renderer.setStyle(star, 'height', size);

      // Randomize position within the viewport
      const top = Math.random() * 100 + 'vh';
      const left = Math.random() * 100 + 'vw';
      this.renderer.setStyle(star, 'top', top);
      this.renderer.setStyle(star, 'left', left);

      this.renderer.appendChild(container, star);
    }
  }
}