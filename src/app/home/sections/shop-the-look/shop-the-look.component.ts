import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product, ProductService } from '../../../services/product.service';
import { PlanIconComponent } from '../../../shared/plan-icon/plan-icon.component';
import { ResponsiveImage, responsiveImage, whatsappProductLink } from '../../../shared/product-media';
import { RevealDirective } from '../../../shared/reveal.directive';

interface Look {
  title: string;
  mood: string;
  product: Product;
  image: ResponsiveImage;
  whatsapp: string;
}

// "Shop the look": real installations as tabs; each shows the model in the photo with its top-view plan.
@Component({
  selector: 'app-shop-the-look',
  standalone: true,
  imports: [CommonModule, RouterLink, PlanIconComponent, RevealDirective],
  templateUrl: './shop-the-look.component.html',
  styleUrls: ['./shop-the-look.component.scss']
})
export class ShopTheLookComponent implements OnInit {
  // Each look is the photo of one catalog product (id), described by what is visible in it.
  private readonly lookDefs = [
    { id: 26, title: 'Marbre & laiton', mood: 'Robinetterie dorée, marbre veiné et niches éclairées : une douche aux allures de spa.' },
    { id: 28, title: 'Chevrons émeraude', mood: 'Zellige vert posé en chevrons et paroi fixe sans cadre pour laisser la matière respirer.' },
    { id: 36, title: 'Noir & lumière', mood: 'Profilés noirs, niche en LED et verre clair : un walk-in graphique et lumineux.' }
  ];

  looks: Look[] = [];
  active = 0;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(products => {
      const byId = new Map(products.map(p => [p.id, p]));
      this.looks = this.lookDefs
        .filter(def => byId.has(def.id))
        .map(def => {
          const product = byId.get(def.id)!;
          return {
            title: def.title,
            mood: def.mood,
            product,
            image: responsiveImage(product.image),
            whatsapp: whatsappProductLink(product.name, product.image)
          };
        });
    });
  }

  // Arrow keys move between tabs (WAI-ARIA tabs pattern).
  onTabKey(event: KeyboardEvent, index: number) {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) {
      return;
    }
    event.preventDefault();
    this.active = (index + step + this.looks.length) % this.looks.length;
    const tabs = (event.currentTarget as HTMLElement).parentElement?.querySelectorAll<HTMLElement>('[role="tab"]');
    tabs?.[this.active]?.focus();
  }
}
