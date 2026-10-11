import { Directive, ElementRef, Inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// Fades/slides an element in the first time it scrolls into view.
// Styles live in styles.scss (.reveal / .is-visible) and are disabled under prefers-reduced-motion.
@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements OnInit, OnDestroy {
  // Stagger in ms, e.g. [appRevealDelay]="i * 80" inside an *ngFor.
  @Input() appRevealDelay = 0;

  private observer?: IntersectionObserver;

  constructor(
    private el: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId) || !('IntersectionObserver' in window)) {
      return;
    }
    const element = this.el.nativeElement;
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${this.appRevealDelay}ms`);

    this.observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        element.classList.add('is-visible');
        this.observer?.disconnect();
      }
    }, { rootMargin: '0px 0px -8% 0px' });
    this.observer.observe(element);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
