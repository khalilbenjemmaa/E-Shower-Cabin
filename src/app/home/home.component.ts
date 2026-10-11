// bain-et-cuisine/src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { WHATSAPP_QUOTE_LINK } from '../shared/product-media';
import { RevealDirective } from '../shared/reveal.directive';
import { HeroComponent } from './sections/hero/hero.component';
import { CategoryExplorerComponent } from './sections/category-explorer/category-explorer.component';
import { ProductCarouselComponent } from './sections/product-carousel/product-carousel.component';
import { ShopTheLookComponent } from './sections/shop-the-look/shop-the-look.component';
import { SocialProofComponent } from './sections/social-proof/social-proof.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink, RevealDirective,
    HeroComponent, CategoryExplorerComponent, ProductCarouselComponent, ShopTheLookComponent, SocialProofComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  readonly quoteLink = WHATSAPP_QUOTE_LINK;
  readonly phoneDisplay = '+216 99 809 804';
  readonly marqueeWords = ['Coulissante', 'Battante', 'Walk-in', 'Sur mesure', 'Finitions soignées', 'Coulissante latérale', 'Paroi fixe', 'Fabriqué à Sfax'];

  // Figures shown in "Pourquoi Sweet Lodge", computed from the catalog.
  modelCount = 0;
  typeCount = 0;

  newsletterEmail = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(products => this.modelCount = products.length);
    this.productService.getTypeGroups().subscribe(groups => this.typeCount = groups.length);
  }

  // No mailing backend yet: open a pre-filled e-mail to Sweet Lodge with the visitor's address.
  subscribe() {
    const subject = encodeURIComponent('Inscription aux nouveautés Sweet Lodge');
    const body = encodeURIComponent(`Bonjour,\n\nJe souhaite recevoir vos nouveautés et inspirations à cette adresse : ${this.newsletterEmail}\n\nMerci !`);
    window.location.href = `mailto:Sweetlodge.mba@gmail.com?subject=${subject}&body=${body}`;
  }
}
