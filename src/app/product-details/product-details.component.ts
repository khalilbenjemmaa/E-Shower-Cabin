// bain-et-cuisine/src/app/product-details/product-details.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService, Product } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
    getWhatsAppLink(): string {
      if (!this.product) return 'https://wa.me/21699809804';
      const phone = '21699809804';
      const deployedBase = 'https://khalilbenjemmaa.github.io/E-Shower-Cabin/';
      // Convert local asset path to deployed image URL
      let imageUrl = '';
      if (this.product.image && this.product.image.startsWith('assets/')) {
        imageUrl = deployedBase + this.product.image;
      } else {
        imageUrl = this.product.image || '';
      }
      const text = encodeURIComponent(
        `${imageUrl}\nBonjour, je suis intéressé par ce produit : ${this.product.name}\nPouvez-vous m'indiquer le prix ?`
      );
      return `https://wa.me/${phone}?text=${text}`;
    }
  productId: string | null = null;
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
    , private cart: CartService
  ) {}

  ngOnInit() {
    // Subscribe to route parameter changes to reload product when navigating between products
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId) {
        this.productService.getProductById(parseInt(this.productId)).subscribe(product => {
          this.product = product;
          // Scroll to top when product changes
          window.scrollTo(0, 0);
        });
      }
    });
  }

  addToCart() {
    if (this.product) {
      this.cart.add(this.product, 1);
    }
  }
}

