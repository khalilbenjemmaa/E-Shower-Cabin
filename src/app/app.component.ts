// bain-et-cuisine/src/app/app.component.ts
import { Component, AfterViewInit, PLATFORM_ID, Inject, HostListener, ElementRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
// Import RouterLink and RouterLinkActive for navigation directives
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from './services/product.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

// This declares the global function from your template's main.js file
// so that TypeScript knows it exists and can call it safely.
declare var initMainScript: any;

@Component({
  selector: 'app-root',
  standalone: true,
  // Add RouterLink and RouterLinkActive to the imports array
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'cabine-de-douche';
  searchQuery: string = '';
  searchResults: Product[] = [];
  showDropdown: boolean = false;
  private searchSubject = new Subject<string>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private productService: ProductService,
    private router: Router,
    private elementRef: ElementRef
  ) {
    // Debounce search input
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.performSearch(searchTerm);
    });
  }

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

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const query = input.value;
    this.searchQuery = query;
    
    if (query.trim().length > 0) {
      this.searchSubject.next(query);
      this.showDropdown = true;
    } else {
      this.searchResults = [];
      this.showDropdown = false;
    }
  }

  performSearch(query: string): void {
    this.productService.searchProducts(query).subscribe(results => {
      this.searchResults = results;
      this.showDropdown = results.length > 0;
    });
  }

  selectProduct(product: Product): void {
    this.router.navigate(['/product', product.id]);
    this.searchQuery = '';
    this.searchResults = [];
    this.showDropdown = false;
  }

  onSearchSubmit(event: Event): void {
    event.preventDefault();
    if (this.searchResults.length > 0) {
      this.selectProduct(this.searchResults[0]);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    
    if (!clickedInside) {
      this.showDropdown = false;
    }
  }
}

