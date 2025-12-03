// bain-et-cuisine/src/app/category/category.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService, Product } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cart: CartService
  ) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  addToCart(product: Product, event: Event) {
    event.stopPropagation();
    this.cart.add(product, 1);
    // Optional: show toast notification
    console.log('Added to cart:', product.name);
  }
}
