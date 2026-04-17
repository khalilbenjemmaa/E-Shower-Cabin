// bain-et-cuisine/src/app/home/home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlanIconComponent } from '../shared/plan-icon/plan-icon.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, PlanIconComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private readonly whatsappPhone = '21699809804';
  private readonly deployedBase = 'https://sweetlodge.com.tn/#/';

  getWhatsAppLink(productName: string, imagePath: string): string {
    const imageUrl = imagePath.startsWith('assets/') ? `${this.deployedBase}${imagePath}` : imagePath;
    const text = encodeURIComponent(
      `${imageUrl}\nBonjour, je suis intéressé par ce produit : ${productName}\nPouvez-vous m'indiquer le prix ?`
    );

    return `https://wa.me/${this.whatsappPhone}?text=${text}`;
  }

}
