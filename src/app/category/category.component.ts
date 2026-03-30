// bain-et-cuisine/src/app/category/category.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
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
  allProducts: Product[] = [];
  currentCategory: string = '';
  categoryTitle: string = 'Cabines de Douche';

  // Category mapping
  private categoryMap: { [key: string]: string } = {
    'coulissante-angle': 'Coulissante en angle',
    'coulissante-niche': 'Coulissante en niche',
    'battante-angle': 'Battante en angle',
    'battante-niche': 'Battante en niche',
    'accordeon-angle': 'Accordéon en angle',
    'accordeon-niche': 'Accordéon en niche',
    'paroi-fixe': 'Paroi fixe',
    'accessoires': 'Accessoires'
  };

  constructor(
    private productService: ProductService,
    private cart: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(products => {
      this.allProducts = products;
      this.filterProductsByCategory();
    });

    // Listen to route parameter changes
    this.route.params.subscribe(params => {
      this.currentCategory = params['categoryName'] || '';
      this.updateCategoryTitle();
      this.filterProductsByCategory();
    });
  }

  updateCategoryTitle() {
    if (this.currentCategory && this.categoryMap[this.currentCategory]) {
      this.categoryTitle = this.categoryMap[this.currentCategory];
    } else {
      this.categoryTitle = 'Cabines de Douche';
    }
  }

  filterProductsByCategory() {
    if (!this.currentCategory) {
      this.products = this.allProducts;
      return;
    }

    const categoryName = this.categoryMap[this.currentCategory];
    if (categoryName) {
      this.products = this.allProducts.filter(p => p.category === categoryName);
    } else {
      this.products = this.allProducts;
    }
  }

  addToCart(product: Product, event: Event) {
    event.stopPropagation();
    this.cart.add(product, 1);
    // Optional: show toast notification
    console.log('Added to cart:', product.name);
  }
}
