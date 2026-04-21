import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type IconType = 'niche' | 'angle' | 'contre-mur';

@Component({
  selector: 'app-plan-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="iconType">
      <div class="plan-icon-wrapper">
        <div class="plan-icon-card">

          <!-- ─── EN NICHE : 3 murs (U) + 1 vitre (front) ─── -->
          <svg *ngIf="iconType === 'niche'"
            width="80" height="90" viewBox="0 0 100 115"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="115" rx="8" fill="#F0F9FF"/>
            <!-- shower floor tint -->
            <rect x="24" y="24" width="52" height="56" fill="#DBEAFE" opacity="0.5"/>
            <!-- 3 MURS : left wall -->
            <rect x="12" y="12" width="12" height="80" fill="#374151"/>
            <!-- bottom wall -->
            <rect x="12" y="80" width="76" height="12" fill="#374151"/>
            <!-- right wall -->
            <rect x="76" y="12" width="12" height="80" fill="#374151"/>
            <!-- 1 VITRE : top opening (full width) -->
            <rect x="24" y="10" width="52" height="5" fill="#3B82F6" rx="1"/>
            <!-- legend -->
            <text x="50" y="103" font-family="Arial" font-size="9" font-weight="bold"
              text-anchor="middle" fill="#374151">3 Murs</text>
            <text x="50" y="113" font-family="Arial" font-size="9"
              text-anchor="middle" fill="#3B82F6">1 Vitre</text>
          </svg>

          <!-- ─── EN ANGLE : 3 murs (U) + 2 vitres côte à côte ─── -->
          <svg *ngIf="iconType === 'angle'"
            width="80" height="90" viewBox="0 0 100 115"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="115" rx="8" fill="#F0F9FF"/>
            <!-- shower floor tint -->
            <rect x="24" y="24" width="52" height="56" fill="#DBEAFE" opacity="0.5"/>
            <!-- 3 MURS : left wall -->
            <rect x="12" y="12" width="12" height="80" fill="#374151"/>
            <!-- bottom wall -->
            <rect x="12" y="80" width="76" height="12" fill="#374151"/>
            <!-- right wall -->
            <rect x="76" y="12" width="12" height="80" fill="#374151"/>
            <!-- 2 VITRES : two panels side-by-side at top opening -->
            <!-- vitre gauche -->
            <rect x="24" y="10" width="25" height="5" fill="#3B82F6" rx="1"/>
            <!-- vitre droite -->
            <rect x="51" y="10" width="25" height="5" fill="#3B82F6" rx="1"/>
            <!-- gap between the 2 panels -->
            <line x1="50" y1="8" x2="50" y2="17" stroke="#F0F9FF" stroke-width="2"/>
            <!-- legend -->
            <text x="50" y="103" font-family="Arial" font-size="9" font-weight="bold"
              text-anchor="middle" fill="#374151">3 Murs</text>
            <text x="50" y="113" font-family="Arial" font-size="9"
              text-anchor="middle" fill="#3B82F6">2 Vitres</text>
          </svg>

          <!-- ─── CONTRE UN MUR : 1 mur (top) + 3 vitres (U of glass) ─── -->
          <svg *ngIf="iconType === 'contre-mur'"
            width="80" height="90" viewBox="0 0 100 115"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="115" rx="8" fill="#F0F9FF"/>
            <!-- shower floor tint -->
            <rect x="22" y="24" width="56" height="60" fill="#DBEAFE" opacity="0.5"/>
            <!-- 1 MUR : top wall -->
            <rect x="10" y="12" width="80" height="12" fill="#374151"/>
            <!-- 3 VITRES : U-shape of glass -->
            <!-- left vitre -->
            <rect x="18" y="24" width="5" height="60" fill="#3B82F6" rx="1"/>
            <!-- bottom vitre -->
            <rect x="18" y="79" width="64" height="5" fill="#3B82F6" rx="1"/>
            <!-- right vitre -->
            <rect x="77" y="24" width="5" height="60" fill="#3B82F6" rx="1"/>
            <!-- legend -->
            <text x="50" y="103" font-family="Arial" font-size="9" font-weight="bold"
              text-anchor="middle" fill="#374151">1 Mur</text>
            <text x="50" y="113" font-family="Arial" font-size="9"
              text-anchor="middle" fill="#3B82F6">3 Vitres</text>
          </svg>

        </div>
        <span class="plan-icon-label">Vue de dessus</span>
      </div>
    </ng-container>
  `,
  styles: [`
    .plan-icon-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      margin: 0.75rem 0;
    }
    .plan-icon-card {
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 2px 8px rgba(55, 65, 81, 0.15));
      transition: filter 0.2s ease, transform 0.2s ease;
    }
    .plan-icon-card:hover {
      filter: drop-shadow(0 4px 14px rgba(37, 99, 235, 0.28));
      transform: translateY(-2px) scale(1.04);
    }
    .plan-icon-label {
      font-size: 0.6rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: #6B7280;
      text-transform: uppercase;
    }
  `]
})
export class PlanIconComponent {
  @Input() category: string = '';

  get iconType(): IconType | null {
    const cat = this.category.toLowerCase();
    if (cat.includes('niche')) return 'niche';
    if (cat.includes('angle')) return 'angle';
    if (cat === 'paroi fixe') return 'contre-mur';
    return null; // Accessoires and unknown → render nothing
  }
}
