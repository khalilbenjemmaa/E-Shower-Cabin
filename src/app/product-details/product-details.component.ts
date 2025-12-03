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

