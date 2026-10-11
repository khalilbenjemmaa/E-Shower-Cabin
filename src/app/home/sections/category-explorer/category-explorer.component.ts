import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { ResponsiveImage, responsiveImage } from '../../../shared/product-media';
import { RevealDirective } from '../../../shared/reveal.directive';

interface CategoryCard {
  slug: string;
  label: string;
  blurb: string;
  count: number;
  image: ResponsiveImage;
}

// "Shop by type": a list of the cabin types. On desktop, hovering/focusing a type swaps the large photo.
@Component({
  selector: 'app-category-explorer',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealDirective],
  templateUrl: './category-explorer.component.html',
  styleUrls: ['./category-explorer.component.scss']
})
export class CategoryExplorerComponent implements OnInit {
  // Per-type cover photo and one-line pitch, keyed by type slug (see ProductService.slugify).
  private readonly covers: { [slug: string]: { image: string; blurb: string } } = {
    'coulissante': { image: 'assets/img/product/34.webp', blurb: 'Des portes qui glissent et libèrent l\'espace.' },
    'battante': { image: 'assets/img/product/2.webp', blurb: 'Une ouverture large, un accès tout en confort.' },
    'coulissante-latérale': { image: 'assets/img/product/23.webp', blurb: 'L\'accès par le côté, idéal pour les angles.' },
    'paroi-fixe': { image: 'assets/img/product/29.webp', blurb: 'Le walk-in ouvert, aux lignes épurées.' }
  };

  categories: CategoryCard[] = [];
  active = 0;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getTypeGroups().subscribe(groups => {
      this.categories = groups.map(group => {
        const cover = this.covers[group.slug];
        return {
          slug: group.slug,
          label: group.type,
          blurb: cover?.blurb ?? '',
          count: group.count,
          image: responsiveImage(cover?.image ?? group.image)
        };
      });
    });
  }
}
