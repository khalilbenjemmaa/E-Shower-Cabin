import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product, ProductService } from '../../../services/product.service';
import { ResponsiveImage, responsiveImage, whatsappProductLink } from '../../../shared/product-media';
import { RevealDirective } from '../../../shared/reveal.directive';

interface Slide {
  product: Product;
  image: ResponsiveImage;
  whatsapp: string;
}

// Swipeable row of featured products (native scroll-snap) with previous/next buttons.
@Component({
  selector: 'app-product-carousel',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealDirective],
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss']
})
export class ProductCarouselComponent implements OnInit {
  // Curated by photo quality; ids refer to ProductService products.
  private readonly featuredIds = [19, 25, 21, 34, 22, 10, 11, 35, 33, 12];

  @ViewChild('track') track?: ElementRef<HTMLElement>;

  slides: Slide[] = [];
  atStart = true;
  atEnd = false;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(products => {
      const byId = new Map(products.map(p => [p.id, p]));
      this.slides = this.featuredIds
        .map(id => byId.get(id))
        .filter((p): p is Product => !!p)
        .map(product => ({
          product,
          image: responsiveImage(product.image),
          whatsapp: whatsappProductLink(product.name, product.image)
        }));
    });
  }

  scroll(direction: 1 | -1) {
    const track = this.track?.nativeElement;
    if (!track) {
      return;
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  onTrackScroll() {
    const track = this.track?.nativeElement;
    if (!track) {
      return;
    }
    this.atStart = track.scrollLeft <= 4;
    this.atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  }
}
