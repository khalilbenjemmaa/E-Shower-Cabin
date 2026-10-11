import { Component, ElementRef, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WHATSAPP_QUOTE_LINK } from '../../../shared/product-media';

// Full-bleed home hero with a gentle parallax on the photo (skipped under prefers-reduced-motion).
@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, OnDestroy {
  readonly quoteLink = WHATSAPP_QUOTE_LINK;

  private frame = 0;
  private onScroll = () => {
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      const media = this.el.nativeElement.querySelector('.hero__media') as HTMLElement | null;
      const offset = Math.min(window.scrollY, window.innerHeight);
      media?.style.setProperty('--parallax', `${offset * 0.25}px`);
    });
  };

  constructor(
    private el: ElementRef<HTMLElement>,
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    // Outside Angular so scrolling doesn't trigger change detection.
    this.zone.runOutsideAngular(() => window.addEventListener('scroll', this.onScroll, { passive: true }));
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.onScroll);
      cancelAnimationFrame(this.frame);
    }
  }
}
