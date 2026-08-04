// bain-et-cuisine/src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlanIconComponent } from '../shared/plan-icon/plan-icon.component';
import { ProductService, Product } from '../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, PlanIconComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private readonly whatsappPhone = '21699809804';
  private readonly deployedBase = 'https://sweetlodge.com.tn/#/';

  // Products shown in the hero showcase and the "Best Sellers" grid.
  featuredProduct: Product | null = null;
  bestSellers: Product[] = [];
  badges = ['Exclusivité', 'Nouveau', 'Promotion'];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(products => {
      // Hero showcase: first real product.
      this.featuredProduct = products[0] ?? null;
      // Best sellers: first three real products.
      this.bestSellers = products.slice(0, 3);
    });
  }

  // Smooth-scroll to the Best Sellers section. Using an href="#products" breaks
  // here because the app uses hash-based routing, so the hash is consumed by the router.
  scrollToProducts(event: Event) {
    event.preventDefault();
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  }

  getWhatsAppLink(productName: string, imagePath: string): string {
    const imageUrl = imagePath.startsWith('assets/') ? `${this.deployedBase}${imagePath}` : imagePath;
    const text = encodeURIComponent(
      `${imageUrl}\nBonjour, je suis intéressé par ce produit : ${productName}\nPouvez-vous m'indiquer le prix ?`
    );

    return `https://wa.me/${this.whatsappPhone}?text=${text}`;
  }
}
