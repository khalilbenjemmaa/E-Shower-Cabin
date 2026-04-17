import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plan-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="plan-icon-wrapper">
      <div class="plan-icon-card">

        <!-- Coulissante en angle -->
        <svg *ngIf="category === 'Coulissante en angle'"
          width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="8" fill="#EFF6FF"/>
          <!-- Walls: L-shape -->
          <line x1="15" y1="15" x2="15" y2="85" stroke="#1e293b" stroke-width="6" stroke-linecap="square"/>
          <line x1="15" y1="15" x2="85" y2="15" stroke="#1e293b" stroke-width="6" stroke-linecap="square"/>
          <!-- Right glass (sliding: 2 offset panels) -->
          <line x1="85" y1="18" x2="85" y2="53" stroke="#2563eb" stroke-width="3.5" stroke-linecap="round"/>
          <line x1="81" y1="49" x2="81" y2="84" stroke="#60a5fa" stroke-width="3.5" stroke-linecap="round"/>
          <!-- Arrow right (sliding indicator) -->
          <polyline points="85,34 91,34 89,31" fill="none" stroke="#2563eb" stroke-width="1.5"/>
          <polyline points="81,66 75,66 77,69" fill="none" stroke="#60a5fa" stroke-width="1.5"/>
          <!-- Bottom glass (sliding: 2 offset panels) -->
          <line x1="18" y1="85" x2="53" y2="85" stroke="#2563eb" stroke-width="3.5" stroke-linecap="round"/>
          <line x1="49" y1="81" x2="84" y2="81" stroke="#60a5fa" stroke-width="3.5" stroke-linecap="round"/>
          <!-- Arrow bottom (sliding indicator) -->
          <polyline points="34,85 34,91 31,89" fill="none" stroke="#2563eb" stroke-width="1.5"/>
          <polyline points="66,81 66,75 69,77" fill="none" stroke="#60a5fa" stroke-width="1.5"/>
          <!-- Corner block -->
          <rect x="78" y="78" width="7" height="7" fill="#2563eb" rx="1"/>
        </svg>

        <!-- Coulissante en niche -->
        <svg *ngIf="category === 'Coulissante en niche'"
          width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="8" fill="#EFF6FF"/>
          <!-- Walls: U-shape -->
          <line x1="15" y1="20" x2="15" y2="82" stroke="#1e293b" stroke-width="6" stroke-linecap="square"/>
          <line x1="15" y1="20" x2="85" y2="20" stroke="#1e293b" stroke-width="6" stroke-linecap="square"/>
          <line x1="85" y1="20" x2="85" y2="82" stroke="#1e293b" stroke-width="6" stroke-linecap="square"/>
          <!-- Front glass (sliding: 2 offset panels) -->
          <line x1="18" y1="82" x2="53" y2="82" stroke="#2563eb" stroke-width="3.5" stroke-linecap="round"/>
          <line x1="47" y1="78" x2="82" y2="78" stroke="#60a5fa" stroke-width="3.5" stroke-linecap="round"/>
          <!-- Arrow sliding indicators -->
          <polyline points="34,82 34,89 31,86" fill="none" stroke="#2563eb" stroke-width="1.5"/>
          <polyline points="64,78 64,71 67,74" fill="none" stroke="#60a5fa" stroke-width="1.5"/>
          <!-- Overlap dot -->
          <circle cx="50" cy="80" r="2.5" fill="#2563eb"/>
        </svg>

        <!-- Battante en angle -->
        <svg *ngIf="category === 'Battante en angle'"
          width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="8" fill="#EFF6FF"/>
          <!-- Walls: L-shape -->
          <line x1="15" y1="15" x2="15" y2="85" stroke="#1e293b" stroke-width="6" stroke-linecap="square"/>
          <line x1="15" y1="15" x2="85" y2="15" stroke="#1e293b" stroke-width="6" stroke-linecap="square"/>
          <!-- Right side: hinged door panel -->
          <line x1="85" y1="18" x2="85" y2="63" stroke="#2563eb" stroke-width="3.5" stroke-linecap="round"/>
          <!-- Hinge point -->
          <circle cx="85" cy="18" r="3.5" fill="#2563eb"/>
          <!-- Door swing arc (inward, counterclockwise) -->
          <path d="M 85 63 A 45 45 0 0 0 40 18" stroke="#93c5fd" stroke-width="1.8" fill="none" stroke-dasharray="4 2"/>
          <!-- Bottom: fixed glass panel -->
          <line x1="18" y1="85" x2="82" y2="85" stroke="#2563eb" stroke-width="3.5" stroke-linecap="round"/>
          <!-- Fixed indicator (end caps) -->
          <line x1="82" y1="81" x2="82" y2="89" stroke="#2563eb" stroke-width="2"/>
        </svg>

        <!-- Battante en niche -->
        <svg *ngIf="category === 'Battante en niche'"
          width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="8" fill="#EFF6FF"/>
          <!-- Walls: U-shape -->
          <line x1="15" y1="15" x2="15" y2="75" stroke="#1e293b" stroke-width="6" stroke-linecap="square"/>
          <line x1="15" y1="15" x2="85" y2="15" stroke="#1e293b" stroke-width="6" stroke-linecap="square"/>
          <line x1="85" y1="15" x2="85" y2="75" stroke="#1e293b" stroke-width="6" stroke-linecap="square"/>
          <!-- Front door panel (hinged on left) -->
          <line x1="18" y1="75" x2="66" y2="75" stroke="#2563eb" stroke-width="3.5" stroke-linecap="round"/>
          <!-- Hinge point -->
          <circle cx="18" cy="75" r="3.5" fill="#2563eb"/>
          <!-- Door swing arc (inward, upward) -->
          <path d="M 66 75 A 48 48 0 0 0 18 27" stroke="#93c5fd" stroke-width="1.8" fill="none" stroke-dasharray="4 2"/>
        </svg>

        <!-- Accordéon en angle -->
        <svg *ngIf="category === 'Accordéon en angle'"
          width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="8" fill="#EFF6FF"/>
          <!-- Walls: L-shape -->
          <line x1="15" y1="15" x2="15" y2="85" stroke="#1e293b" stroke-width="6" stroke-linecap="square"/>
          <line x1="15" y1="15" x2="85" y2="15" stroke="#1e293b" stroke-width="6" stroke-linecap="square"/>
          <!-- Right side accordion (zigzag) -->
          <polyline points="85,18 72,34 85,51 72,68 85,83"
            fill="none" stroke="#2563eb" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
          <!-- Bottom accordion (zigzag) -->
          <polyline points="18,85 34,72 51,85 68,72 83,85"
            fill="none" stroke="#2563eb" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
          <!-- Fold joints -->
          <circle cx="72" cy="34" r="2.5" fill="#2563eb"/>
          <circle cx="72" cy="68" r="2.5" fill="#2563eb"/>
          <circle cx="34" cy="72" r="2.5" fill="#2563eb"/>
          <circle cx="68" cy="72" r="2.5" fill="#2563eb"/>
          <circle cx="83" cy="83" r="3" fill="#2563eb"/>
        </svg>

        <!-- Accordéon en niche -->
        <svg *ngIf="category === 'Accordéon en niche'"
          width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="8" fill="#EFF6FF"/>
          <!-- Walls: U-shape -->
          <line x1="15" y1="18" x2="15" y2="80" stroke="#1e293b" stroke-width="6" stroke-linecap="square"/>
          <line x1="15" y1="18" x2="85" y2="18" stroke="#1e293b" stroke-width="6" stroke-linecap="square"/>
          <line x1="85" y1="18" x2="85" y2="80" stroke="#1e293b" stroke-width="6" stroke-linecap="square"/>
          <!-- Front accordion (zigzag) -->
          <polyline points="18,80 32,67 50,80 68,67 82,80"
            fill="none" stroke="#2563eb" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
          <!-- Fold joints -->
          <circle cx="32" cy="67" r="2.5" fill="#2563eb"/>
          <circle cx="68" cy="67" r="2.5" fill="#2563eb"/>
        </svg>

        <!-- Paroi fixe -->
        <svg *ngIf="category === 'Paroi fixe'"
          width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="8" fill="#EFF6FF"/>
          <!-- Back wall (top) -->
          <line x1="18" y1="25" x2="82" y2="25" stroke="#1e293b" stroke-width="6" stroke-linecap="square"/>
          <!-- Left wall (short section) -->
          <line x1="18" y1="25" x2="18" y2="55" stroke="#1e293b" stroke-width="6" stroke-linecap="square"/>
          <!-- Fixed glass panel (long vertical glass from wall bottom) -->
          <line x1="20" y1="55" x2="20" y2="80" stroke="#2563eb" stroke-width="3.5" stroke-linecap="round"/>
          <!-- Horizontal return panel -->
          <line x1="20" y1="80" x2="75" y2="80" stroke="#2563eb" stroke-width="3.5" stroke-linecap="round"/>
          <!-- Fixed end cap (no movement indicator) -->
          <line x1="75" y1="76" x2="75" y2="84" stroke="#2563eb" stroke-width="2.5"/>
          <!-- Open entry indicator (dashed) -->
          <line x1="75" y1="80" x2="84" y2="80" stroke="#93c5fd" stroke-width="1.5" stroke-dasharray="3 2"/>
          <!-- Fixed anchor dots -->
          <circle cx="20" cy="55" r="3" fill="#1e293b"/>
          <circle cx="18" cy="80" r="2.5" fill="#2563eb"/>
        </svg>

        <!-- Accessoires -->
        <svg *ngIf="category === 'Accessoires'"
          width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="8" fill="#EFF6FF"/>
          <!-- Shower head outer ring -->
          <circle cx="50" cy="50" r="28" fill="none" stroke="#2563eb" stroke-width="3.5"/>
          <!-- Shower head inner ring -->
          <circle cx="50" cy="50" r="10" fill="none" stroke="#2563eb" stroke-width="2.5"/>
          <!-- Center fill -->
          <circle cx="50" cy="50" r="5" fill="#2563eb"/>
          <!-- Water nozzle dots (8 positions) -->
          <circle cx="50" cy="24" r="3" fill="#60a5fa"/>
          <circle cx="50" cy="76" r="3" fill="#60a5fa"/>
          <circle cx="24" cy="50" r="3" fill="#60a5fa"/>
          <circle cx="76" cy="50" r="3" fill="#60a5fa"/>
          <circle cx="30" cy="30" r="3" fill="#93c5fd"/>
          <circle cx="70" cy="30" r="3" fill="#93c5fd"/>
          <circle cx="30" cy="70" r="3" fill="#93c5fd"/>
          <circle cx="70" cy="70" r="3" fill="#93c5fd"/>
        </svg>

        <!-- Default fallback -->
        <svg *ngIf="!isKnownCategory()"
          width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="8" fill="#EFF6FF"/>
          <line x1="15" y1="15" x2="15" y2="85" stroke="#1e293b" stroke-width="6" stroke-linecap="square"/>
          <line x1="15" y1="15" x2="85" y2="15" stroke="#1e293b" stroke-width="6" stroke-linecap="square"/>
          <line x1="85" y1="18" x2="85" y2="83" stroke="#2563eb" stroke-width="3.5" stroke-linecap="round"/>
          <line x1="18" y1="85" x2="83" y2="85" stroke="#2563eb" stroke-width="3.5" stroke-linecap="round"/>
        </svg>

      </div>
      <span class="plan-icon-label">Vue de dessus</span>
    </div>
  `,
  styles: [`
    .plan-icon-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      margin: 0.75rem 0;
    }
    .plan-icon-card {
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 2px 8px rgba(37, 99, 235, 0.18));
      transition: filter 0.2s ease, transform 0.2s ease;
    }
    .plan-icon-card:hover {
      filter: drop-shadow(0 4px 14px rgba(37, 99, 235, 0.32));
      transform: translateY(-2px) scale(1.04);
    }
    .plan-icon-label {
      font-size: 0.65rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      color: #2563eb;
      text-transform: uppercase;
    }
  `]
})
export class PlanIconComponent {
  @Input() category: string = '';

  private readonly knownCategories = [
    'Coulissante en angle',
    'Coulissante en niche',
    'Battante en angle',
    'Battante en niche',
    'Accordéon en angle',
    'Accordéon en niche',
    'Paroi fixe',
    'Accessoires',
  ];

  isKnownCategory(): boolean {
    return this.knownCategories.includes(this.category);
  }
}
