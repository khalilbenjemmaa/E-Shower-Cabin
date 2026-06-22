import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type PlanType =
  | 'niche'
  | 'angle-right'
  | 'angle-left'
  | 'walkin-left'
  | 'walkin-right';

@Component({
  selector: 'app-plan-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="planType as p">
      <div class="plan-icon-wrapper">
        <div class="plan-icon-card">
          <svg width="80" height="90" viewBox="0 0 100 115"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="115" rx="8" fill="#F0F9FF"/>

            <!-- shower floor tint -->
            <rect x="18" y="18" width="64" height="64" fill="#DBEAFE" opacity="0.5"/>

            <!-- ─── NICHE : 3 walls (L/T/R) + glass front (bottom) ─── -->
            <ng-container *ngIf="p === 'niche'">
              <rect x="14" y="14" width="72" height="10" fill="#374151"/>  <!-- back -->
              <rect x="14" y="14" width="10" height="74" fill="#374151"/>  <!-- left -->
              <rect x="76" y="14" width="10" height="74" fill="#374151"/>  <!-- right -->
              <rect x="24" y="83" width="52" height="5" fill="#3B82F6" rx="1"/>  <!-- glass front -->
            </ng-container>

            <!-- ─── ANGLE RIGHT : back + left walls, glass front + right ─── -->
            <ng-container *ngIf="p === 'angle-right'">
              <rect x="14" y="14" width="72" height="10" fill="#374151"/>  <!-- back -->
              <rect x="14" y="14" width="10" height="74" fill="#374151"/>  <!-- left -->
              <rect x="81" y="24" width="5" height="64" fill="#3B82F6" rx="1"/>   <!-- right glass -->
              <rect x="14" y="83" width="72" height="5" fill="#3B82F6" rx="1"/>   <!-- front glass -->
            </ng-container>

            <!-- ─── ANGLE LEFT : back + right walls, glass front + left ─── -->
            <ng-container *ngIf="p === 'angle-left'">
              <rect x="14" y="14" width="72" height="10" fill="#374151"/>  <!-- back -->
              <rect x="76" y="14" width="10" height="74" fill="#374151"/>  <!-- right -->
              <rect x="14" y="24" width="5" height="64" fill="#3B82F6" rx="1"/>   <!-- left glass -->
              <rect x="14" y="83" width="72" height="5" fill="#3B82F6" rx="1"/>   <!-- front glass -->
            </ng-container>

            <!-- ─── WALK-IN LEFT : back wall + 1 fixed glass panel on left ─── -->
            <ng-container *ngIf="p === 'walkin-left'">
              <rect x="14" y="14" width="72" height="10" fill="#374151"/>  <!-- back -->
              <rect x="14" y="14" width="10" height="40" fill="#374151"/>  <!-- short left wall -->
              <rect x="24" y="24" width="5" height="58" fill="#3B82F6" rx="1"/>   <!-- fixed glass panel -->
            </ng-container>

            <!-- ─── WALK-IN RIGHT : back wall + 1 fixed glass panel on right ─── -->
            <ng-container *ngIf="p === 'walkin-right'">
              <rect x="14" y="14" width="72" height="10" fill="#374151"/>  <!-- back -->
              <rect x="76" y="14" width="10" height="40" fill="#374151"/>  <!-- short right wall -->
              <rect x="71" y="24" width="5" height="58" fill="#3B82F6" rx="1"/>   <!-- fixed glass panel -->
            </ng-container>

            <!-- legend -->
            <text x="50" y="103" font-family="Arial" font-size="9" font-weight="bold"
              text-anchor="middle" fill="#374151">{{ wallLegend }}</text>
            <text x="50" y="113" font-family="Arial" font-size="9"
              text-anchor="middle" fill="#3B82F6">{{ glassLegend }}</text>
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
  // Preferred: pass the explicit plan from the product.
  @Input() plan: PlanType | null | undefined;
  // Fallback: derive a plan from a free-text category/subtype string.
  @Input() category: string = '';

  get planType(): PlanType | null {
    if (this.plan) {
      return this.plan;
    }
    const cat = this.category.toLowerCase();
    if (cat.includes('niche')) return 'niche';
    if (cat.includes('angle')) return 'angle-right';
    if (cat === 'paroi fixe' || cat.includes('walk in')) return 'walkin-right';
    return null;
  }

  get wallLegend(): string {
    switch (this.planType) {
      case 'niche': return '3 Murs';
      case 'angle-right':
      case 'angle-left': return '2 Murs';
      case 'walkin-left':
      case 'walkin-right': return '1 Mur';
      default: return '';
    }
  }

  get glassLegend(): string {
    switch (this.planType) {
      case 'niche': return '1 Vitre';
      case 'angle-right':
      case 'angle-left': return '2 Vitres';
      case 'walkin-left':
      case 'walkin-right': return '1 Vitre';
      default: return '';
    }
  }
}
