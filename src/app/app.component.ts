import {
  Component,
  AfterViewInit,
  Renderer2,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FolioComponent } from './folio/folio.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,

    FolioComponent,
    ContactComponent,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'PortFolio';
  image1Path = 'assets/images/image1.jpeg';
  image2Path = 'assets/images/image2.jpeg';

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID to check if it's browser
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.createStars(150); // Only create stars in the browser
    }
  }

  createStars(numberOfStars: number) {
    const container = this.renderer.createElement('div');
    this.renderer.addClass(container, 'stars');
    this.renderer.appendChild(document.body, container);

    for (let i = 0; i < numberOfStars; i++) {
      const star = this.renderer.createElement('div');
      this.renderer.addClass(star, 'star');

      const size = Math.random() * 3 + 1 + 'px'; // Randomize size
      this.renderer.setStyle(star, 'width', size);
      this.renderer.setStyle(star, 'height', size);

      const top = Math.random() * 100 + 'vh'; // Randomize vertical position
      const left = Math.random() * 100 + 'vw'; // Randomize horizontal position
      this.renderer.setStyle(star, 'top', top);
      this.renderer.setStyle(star, 'left', left);

      this.renderer.appendChild(container, star);
    }
  }
}
