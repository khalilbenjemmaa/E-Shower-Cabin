// bain-et-cuisine/src/app/app.component.ts
import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
// Import RouterLink and RouterLinkActive for navigation directives
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

// This declares the global function from your template's main.js file
// so that TypeScript knows it exists and can call it safely.
declare var initMainScript: any;

@Component({
  selector: 'app-root',
  standalone: true,
  // Add RouterLink and RouterLinkActive to the imports array
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'cabine-de-douche';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    // This ensures that the JavaScript from your template only runs in the browser,
    if (isPlatformBrowser(this.platformId)) {
      // Call the initialization function after Angular has rendered the view
      if (typeof initMainScript === 'function') {
        initMainScript();
      } else {
        console.error('initMainScript function not found. Check assets/js/main.js');
      }
    }
  }
}

