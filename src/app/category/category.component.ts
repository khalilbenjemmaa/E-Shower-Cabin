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
    // Sidebar expand/collapse state
    showCabineSubcategories = false;
    showCoulissanteSub = false;
    showBattanteSub = false;
    showAccordeonSub = false;
    // Toggle main 'Cabine de Douche' subcategories
    toggleCabineSubcategories(event: Event) {
      event.preventDefault();
      event.stopPropagation();
      this.showCabineSubcategories = !this.showCabineSubcategories;
      if (!this.showCabineSubcategories) {
        this.showCoulissanteSub = false;
        this.showBattanteSub = false;
        this.showAccordeonSub = false;
      }
    }

    // Toggle 'Coulissante' sub-subcategories
    toggleCoulissanteSub(event: Event) {
      event.preventDefault();
      event.stopPropagation();
      this.showCoulissanteSub = !this.showCoulissanteSub;
    }

    // Toggle 'Battante' sub-subcategories
    toggleBattanteSub(event: Event) {
      event.preventDefault();
      event.stopPropagation();
      this.showBattanteSub = !this.showBattanteSub;
    }

    // Toggle 'Accordéon' sub-subcategories
    toggleAccordeonSub(event: Event) {
      event.preventDefault();
      event.stopPropagation();
      this.showAccordeonSub = !this.showAccordeonSub;
    }
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
