import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RevealDirective } from '../../../shared/reveal.directive';

export interface Review {
  name: string;
  city?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  source: string; // e.g. "Google", "Facebook"
}

// Social proof: customer reviews (only real ones; the row is hidden while the list is empty)
// and a wall of real installation photos linking to Instagram. The wall swaps one photo every
// few seconds while visible; it pauses on hover, off-screen, in a hidden tab, with the pause
// button, and never runs under prefers-reduced-motion.
@Component({
  selector: 'app-social-proof',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './social-proof.component.html',
  styleUrls: ['./social-proof.component.scss']
})
export class SocialProofComponent implements OnInit, OnDestroy {
  // Paste genuine customer reviews here (copied from Google or Facebook, with permission).
  readonly reviews: Review[] = [];

  readonly instagramUrl = 'https://www.instagram.com/sweet_lodge.tn/';
  readonly facebookUrl = 'https://www.facebook.com/p/sweet_lodgetn-100090259461661/';

  // Installation photos the wall cycles through (assets/img/product/480/N.webp).
  private readonly pool = [3, 5, 8, 13, 16, 17, 1, 6, 7, 9, 15, 18, 24, 30]
    .map(n => `assets/img/product/480/${n}.webp`);
  private readonly tileCount = 6;
  private readonly intervalMs = 3200;

  wall: string[] = this.pool.slice(0, this.tileCount);
  canAnimate = false;
  paused = false;

  private hovered = false;
  private visible = false;
  private nextPoolIndex = this.tileCount;
  private lastTile = -1;
  private timer?: ReturnType<typeof setInterval>;
  private observer?: IntersectionObserver;

  constructor(
    private el: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    this.canAnimate = true;
    this.observer = new IntersectionObserver(entries => this.visible = entries[0].isIntersecting);
    this.observer.observe(this.el.nativeElement);
    this.timer = setInterval(() => this.swapOne(), this.intervalMs);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    this.observer?.disconnect();
  }

  togglePause() {
    this.paused = !this.paused;
  }

  setHovered(hovered: boolean) {
    this.hovered = hovered;
  }

  stars(rating: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i < rating ? 1 : 0);
  }

  // Replace one random tile (never the same tile twice in a row) with the next photo not on screen.
  private swapOne() {
    if (this.paused || this.hovered || !this.visible || document.hidden) {
      return;
    }
    let tile = Math.floor(Math.random() * this.tileCount);
    if (tile === this.lastTile) {
      tile = (tile + 1) % this.tileCount;
    }
    let next = this.pool[this.nextPoolIndex % this.pool.length];
    while (this.wall.includes(next)) {
      this.nextPoolIndex++;
      next = this.pool[this.nextPoolIndex % this.pool.length];
    }
    this.nextPoolIndex++;
    this.wall = this.wall.map((src, i) => i === tile ? next : src);
    this.lastTile = tile;
  }
}
