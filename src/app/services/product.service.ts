import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Top-view layout of the enclosure, derived from each product photo:
// which sides are glass vs. walls.
export type PlanType =
  | 'niche'          // 3 walls + 1 glass front
  | 'angle-right'    // back + left walls, glass on front + right return
  | 'angle-left'     // back + right walls, glass on front + left return
  | 'walkin-left'    // 1 wall + 1 fixed glass panel on the left, open
  | 'walkin-right';  // 1 wall + 1 fixed glass panel on the right, open

export interface Product {
  id: number;
  name: string;
  category: string;
  mainCategory: string;
  type: string;
  subType: string;
  price: number;
  image: string;
  description?: string;
  plan?: PlanType;
}

export interface SubTypeOption {
  subType: string;   // e.g. "en niche"
  slug: string;      // e.g. "en-niche"
  image: string;     // representative product image
  count: number;
}

export interface TypeGroup {
  type: string;      // e.g. "coulissante"
  slug: string;      // e.g. "coulissante"
  image: string;     // representative product image
  count: number;
  subTypes: SubTypeOption[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: "installation en niche",
      category: "coulissante",
      mainCategory: "Cabine de douche",
      type: "coulissante",
      subType: "en niche",
      price: 1250,
      image: "assets/img/product/1.webp",
      description: "Cabine de douche d'angle élégante et moderne, parfaite pour optimiser l'espace dans votre salle de bain. Verre de sécurité de 8mm et profilés en aluminium chromé."
    },
    {
      id: 2,
      name: "installation en ongle",
      category: "battente",
      mainCategory: "Cabine de douche",
      type: "battente",
      subType: "en angle",
      price: 1450,
      image: "assets/img/product/2.webp",
      description: "Design zen et minimaliste pour une salle de bain apaisante. Structure robuste et verre trempé de qualité supérieure."
    },
    {
      id: 4,
      name: "parois sur baignoire (walk in)",
      category: "paroi fixe",
      mainCategory: "Cabine de douche",
      type: "paroi fixe",
      subType: "walk in",
      price: 999,
      image: "assets/img/product/4.webp",
      description: "Cabine élégante avec portes coulissantes et verre transparent. Parfaite alliance entre fonctionnalité et esthétique."
    },
    {
      id: 6,
      name: "installation en ongle",
      category: "coulissante",
      mainCategory: "Cabine de douche",
      type: "coulissante",
      subType: "en angle",
      price: 1350,
      image: "assets/img/product/6.webp",
      description: "Cabine moderne avec profilés noirs mat. Tendance et élégante pour une salle de bain design."
    },
    {
      id: 7,
      name: "installation en niche",
      category: "coulissante",
      mainCategory: "Cabine de douche",
      type: "coulissante",
      subType: "en niche",
      price: 2100,
      image: "assets/img/product/7.webp",
      description: "Cabine de luxe avec système de massage hydro. Transformez votre douche en expérience spa."
    },
    {
      id: 9,
      name: "walk in ongle",
      category: "paroi fixe",
      mainCategory: "Cabine de douche",
      type: "paroi fixe",
      subType: "walk in",
      price: 1200,
      image: "assets/img/product/9.webp",
      description: "Cabine au style contemporain avec verre extra-clair. Luminosité et élégance garanties."
    },
    {
      id: 10,
      name: "installation en ongle",
      category: "coulissante latérale",
      mainCategory: "Cabine de douche",
      type: "coulissante latérale",
      subType: "en angle",
      price: 1650,
      image: "assets/img/product/10.webp",
      description: "Cabine premium avec traitement anti-calcaire. Facilité d'entretien et durabilité exceptionnelle."
    },
    {
      id: 11,
      name: "installation en niche",
      category: "coulissante",
      mainCategory: "Cabine de douche",
      type: "coulissante",
      subType: "en niche",
      price: 1550,
      image: "assets/img/product/11.webp",
      description: "Verre cristallin ultra-transparent pour une clarté maximale. Design épuré et moderne."
    },
    {
      id: 12,
      name: "walk in",
      category: "paroi fixe",
      mainCategory: "Cabine de douche",
      type: "paroi fixe",
      subType: "walk in",
      price: 1400,
      image: "assets/img/product/12.webp",
      description: "Cabine spacieuse avec ouverture panoramique. Sensation d'espace et confort optimal."
    },
    {
      id: 14,
      name: "installation en angle",
      category: "coulissante",
      mainCategory: "Cabine de douche",
      type: "coulissante",
      subType: "en angle",
      price: 1750,
      image: "assets/img/product/14.webp",
      description: "Créez votre oasis personnelle avec cette paroi aux finitions soignées. Détente garantie."
    },
    {
      id: 15,
      name: "installation en niche (walk in)",
      category: "coulissante",
      mainCategory: "Cabine de douche",
      type: "coulissante",
      subType: "en niche",
      price: 1300,
      image: "assets/img/product/15.webp",
      description: "Design apaisant pour une douche relaxante. Verre dépoli pour plus d'intimité."
    },
    {
      id: 18,
      name: "walk in",
      category: "paroi fixe",
      mainCategory: "Cabine de douche",
      type: "paroi fixe",
      subType: "walk in",
      price: 1050,
      image: "assets/img/product/18.webp",
      description: "Pureté des lignes et simplicité d'entretien. Verre traité anti-taches."
    },
    {
      id: 19,
      name: "installation en niche",
      category: "coulissante",
      mainCategory: "Cabine de douche",
      type: "coulissante",
      subType: "en niche",
      price: 1950,
      image: "assets/img/product/19.webp",
      description: "Cabine d'élite avec options personnalisables. Le summum du confort et du luxe."
    },
    {
      id: 20,
      name: "installation en niche",
      category: "coulissante",
      mainCategory: "Cabine de douche",
      type: "coulissante",
      subType: "en niche",
      price: 1250,
      image: "assets/img/product/20.webp",
      description: "Nouveau design innovant avec système de ventilation intégré. Fraîcheur assurée."
    },
    {
      id: 21,
      name: "walk in",
      category: "paroi fixe",
      mainCategory: "Cabine de douche",
      type: "paroi fixe",
      subType: "walk in",
      price: 2200,
      image: "assets/img/product/21.webp",
      description: "Design infini sans limites. Verre sur mesure et options haut de gamme disponibles."
    },
    {
      id: 22,
      name: "walk in",
      category: "paroi fixe",
      mainCategory: "Cabine de douche",
      type: "paroi fixe",
      subType: "walk in",
      price: 1400,
      image: "assets/img/product/22.webp",
      description: "Illuminez votre salle de bain avec cette cabine au design lumineux. Verre transparent et finitions chromées."
    },
    {
      id: 23,
      name: "installation en ongle",
      category: "coulissante latérale",
      mainCategory: "Cabine de douche",
      type: "coulissante latérale",
      subType: "en angle",
      price: 75,
      image: "assets/img/product/23.webp",
      description: "Barre de maintien en acier chromé pour plus de sécurité. Installation facile."
    },
    {
      id: 24,
      name: "installation en ongle",
      category: "battente",
      mainCategory: "Cabine de douche",
      type: "battente",
      subType: "en angle",
      price: 350,
      image: "assets/img/product/24.webp",
      description: "Receveur extra-plat en résine de qualité supérieure. Design moderne et antidérapant."
    },
    {
      id: 25,
      name: "installation en niche",
      category: "coulissante",
      mainCategory: "Cabine de douche",
      type: "coulissante",
      subType: "en niche",
      price: 450,
      image: "assets/img/product/25.webp",
      description: "Colonne de douche avec mitigeur thermostatique. Douchette à main et pommeau de tête inclus."
    },
  ];

  // Per-product top-view layout, determined by inspecting each product photo.
  private planMap: { [id: number]: PlanType } = {
    1: 'niche',
    2: 'angle-right',
    4: 'walkin-left',
    6: 'angle-right',
    7: 'angle-left',
    9: 'walkin-left',
    10: 'angle-right',
    11: 'niche',
    12: 'walkin-right',
    14: 'angle-right',
    15: 'niche',
    18: 'niche',
    19: 'niche',
    20: 'niche',
    21: 'walkin-right',
    22: 'walkin-right',
    23: 'angle-left',
    24: 'angle-right',
    25: 'niche'
  };

  constructor() {
    this.products.forEach(p => {
      p.plan = this.planMap[p.id];
    });
  }

  getAllProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product);
  }

  searchProducts(query: string): Observable<Product[]> {
    if (!query || query.trim().length === 0) {
      return of([]);
    }

    const searchTerm = query.toLowerCase().trim();
    const filtered = this.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      (product.description && product.description.toLowerCase().includes(searchTerm))
    );

    return of(filtered);
  }

  // Display order of the top-level types under "Cabine de douche"
  private typeOrder: string[] = ['coulissante', 'battente', 'coulissante latérale', 'paroi fixe'];

  static slugify(value: string): string {
    return value.toLowerCase().trim().replace(/\s+/g, '-');
  }

  // Build the grouped structure: types -> subtypes, with representative images and counts.
  getTypeGroups(): Observable<TypeGroup[]> {
    const types = this.typeOrder.filter(t => this.products.some(p => p.type === t));

    const groups: TypeGroup[] = types.map(type => {
      const typeProducts = this.products.filter(p => p.type === type);

      // Distinct subtypes, preserving first-seen order
      const subTypeNames: string[] = [];
      for (const p of typeProducts) {
        if (!subTypeNames.includes(p.subType)) {
          subTypeNames.push(p.subType);
        }
      }

      const subTypes: SubTypeOption[] = subTypeNames.map(subType => {
        const subProducts = typeProducts.filter(p => p.subType === subType);
        return {
          subType,
          slug: ProductService.slugify(subType),
          image: subProducts[0]?.image ?? '',
          count: subProducts.length
        };
      });

      return {
        type,
        slug: ProductService.slugify(type),
        image: typeProducts[0]?.image ?? '',
        count: typeProducts.length,
        subTypes
      };
    });

    return of(groups);
  }

  // Filter by type slug and optional subtype slug.
  getProductsByTypeSlug(typeSlug: string, subTypeSlug?: string): Observable<Product[]> {
    const filtered = this.products.filter(p => {
      if (ProductService.slugify(p.type) !== typeSlug) {
        return false;
      }
      if (subTypeSlug && ProductService.slugify(p.subType) !== subTypeSlug) {
        return false;
      }
      return true;
    });
    return of(filtered);
  }
}
