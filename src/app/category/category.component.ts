// bain-et-cuisine/src/app/category/category.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product, TypeGroup } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { PlanIconComponent } from '../shared/plan-icon/plan-icon.component';

type ViewMode = 'types' | 'subtypes' | 'products';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterLink, PlanIconComponent],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  // Sidebar expand/collapse
  showCabineSubcategories = true;

  // Grouped data for the selection screens
  typeGroups: TypeGroup[] = [];

  // Current selection (driven by route params)
  currentTypeSlug = '';
  currentSubTypeSlug = '';

  // The group matching the current type selection
  selectedGroup: TypeGroup | null = null;

  // Products shown when in 'products' view
  products: Product[] = [];

  // What to render
  viewMode: ViewMode = 'types';

  // Title shown in the header / breadcrumb
  categoryTitle: string = 'Cabine de douche';

  constructor(
    private productService: ProductService,
    private cart: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getTypeGroups().subscribe(groups => {
      this.typeGroups = groups;
      this.resolveView();
    });

    this.route.params.subscribe(params => {
      this.currentTypeSlug = params['categoryName'] || '';
      this.currentSubTypeSlug = params['subType'] || '';
      this.resolveView();
    });
  }

  // Decide which of the three screens to show based on the route params.
  private resolveView() {
    if (this.typeGroups.length === 0) {
      return;
    }

    // No type selected -> show the list of types
    if (!this.currentTypeSlug) {
      this.viewMode = 'types';
      this.selectedGroup = null;
      this.categoryTitle = 'Cabine de douche';
      this.products = [];
      return;
    }

    this.selectedGroup =
      this.typeGroups.find(g => g.slug === this.currentTypeSlug) || null;

    // Unknown type slug -> fall back to the types screen
    if (!this.selectedGroup) {
      this.viewMode = 'types';
      this.categoryTitle = 'Cabine de douche';
      this.products = [];
      return;
    }

    // "all" is the sentinel for "Show all" -> products for the whole type, no subtype filter.
    const isShowAll = this.currentSubTypeSlug === 'all';
    const hasExplicitSubType = !!this.currentSubTypeSlug && !isShowAll;
    const onlyOneSubType = this.selectedGroup.subTypes.length <= 1;

    if (isShowAll || hasExplicitSubType || onlyOneSubType) {
      this.viewMode = 'products';
      const subTypeSlug = hasExplicitSubType ? this.currentSubTypeSlug : undefined;

      this.productService
        .getProductsByTypeSlug(this.currentTypeSlug, subTypeSlug)
        .subscribe(products => (this.products = products));

      const subLabel = hasExplicitSubType
        ? this.selectedGroup.subTypes.find(s => s.slug === this.currentSubTypeSlug)?.subType
        : (onlyOneSubType && !isShowAll ? this.selectedGroup.subTypes[0]?.subType : undefined);

      this.categoryTitle = subLabel
        ? `${this.selectedGroup.type} — ${subLabel}`
        : this.selectedGroup.type;
      return;
    }

    // Type selected but no subtype, and multiple subtypes exist -> show subtype chooser.
    this.viewMode = 'subtypes';
    this.categoryTitle = this.selectedGroup.type;
    this.products = [];
  }

  // "Show all <type>" -> products for the whole type, no subtype filter.
  showAllForType(typeSlug: string) {
    this.router.navigate(['/category', typeSlug, 'all']);
  }

  addToCart(product: Product, event: Event) {
    event.stopPropagation();
    this.cart.add(product, 1);
    console.log('Added to cart:', product.name);
  }

  toggleCabineSubcategories(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.showCabineSubcategories = !this.showCabineSubcategories;
  }
}
