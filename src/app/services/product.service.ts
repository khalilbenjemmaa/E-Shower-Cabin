import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: "Cabine d'Angle 'Clarté'",
      category: "Cabines de Douche",
      price: 1250,
      image: "assets/img/product/1.webp",
      description: "Cabine de douche d'angle élégante et moderne, parfaite pour optimiser l'espace dans votre salle de bain. Verre de sécurité de 8mm et profilés en aluminium chromé."
    },
    {
      id: 2,
      name: "Cabine d'Angle 'Zen'",
      category: "Cabines de Douche",
      price: 1450,
      image: "assets/img/product/2.webp",
      description: "Design zen et minimaliste pour une salle de bain apaisante. Structure robuste et verre trempé de qualité supérieure."
    },
    {
      id: 3,
      name: "Cabine 'Aqua'",
      category: "Cabines de Douche",
      price: 1100,
      image: "assets/img/product/3.webp",
      description: "Cabine de douche moderne avec finitions chromées. Idéale pour les petits espaces sans compromettre le style."
    },
    {
      id: 4,
      name: "Cabine 'Élégance'",
      category: "Cabines de Douche",
      price: 999,
      image: "assets/img/product/4.webp",
      description: "Cabine élégante avec portes coulissantes et verre transparent. Parfaite alliance entre fonctionnalité et esthétique."
    },
    {
      id: 5,
      name: "Cabine 'Prestige'",
      category: "Cabines de Douche",
      price: 1850,
      image: "assets/img/product/5.webp",
      description: "Cabine haut de gamme avec équipements premium. Design contemporain et finitions luxueuses."
    },
    {
      id: 6,
      name: "Cabine 'Moderne'",
      category: "Cabines de Douche",
      price: 1350,
      image: "assets/img/product/6.webp",
      description: "Cabine moderne avec profilés noirs mat. Tendance et élégante pour une salle de bain design."
    },
    {
      id: 7,
      name: "Cabine 'Luxe'",
      category: "Cabines de Douche",
      price: 2100,
      image: "assets/img/product/7.webp",
      description: "Cabine de luxe avec système de massage hydro. Transformez votre douche en expérience spa."
    },
    {
      id: 8,
      name: "Cabine 'Compact'",
      category: "Cabines de Douche",
      price: 950,
      image: "assets/img/product/8.webp",
      description: "Solution compacte idéale pour les petites salles de bain. Optimisation maximale de l'espace."
    },
    {
      id: 9,
      name: "Cabine 'Style'",
      category: "Cabines de Douche",
      price: 1200,
      image: "assets/img/product/9.webp",
      description: "Cabine au style contemporain avec verre extra-clair. Luminosité et élégance garanties."
    },
    {
      id: 10,
      name: "Cabine 'Premium'",
      category: "Cabines de Douche",
      price: 1650,
      image: "assets/img/product/10.webp",
      description: "Cabine premium avec traitement anti-calcaire. Facilité d'entretien et durabilité exceptionnelle."
    },
    {
      id: 11,
      name: "Cabine 'Crystal'",
      category: "Cabines de Douche",
      price: 1550,
      image: "assets/img/product/11.webp",
      description: "Verre cristallin ultra-transparent pour une clarté maximale. Design épuré et moderne."
    },
    {
      id: 12,
      name: "Cabine 'Horizon'",
      category: "Cabines de Douche",
      price: 1400,
      image: "assets/img/product/12.webp",
      description: "Cabine spacieuse avec ouverture panoramique. Sensation d'espace et confort optimal."
    },
    {
      id: 13,
      name: "Cabine 'Essence'",
      category: "Cabines de Douche",
      price: 1150,
      image: "assets/img/product/13.webp",
      description: "L'essentiel de la qualité à prix accessible. Robustesse et simplicité d'installation."
    },
    {
      id: 14,
      name: "Cabine 'Oasis'",
      category: "Cabines de Douche",
      price: 1750,
      image: "assets/img/product/14.webp",
      description: "Créez votre oasis personnelle avec cette cabine aux finitions soignées. Détente garantie."
    },
    {
      id: 15,
      name: "Cabine 'Serenity'",
      category: "Cabines de Douche",
      price: 1300,
      image: "assets/img/product/15.webp",
      description: "Design apaisant pour une douche relaxante. Verre dépoli pour plus d'intimité."
    },
    {
      id: 16,
      name: "Cabine 'Harmony'",
      category: "Cabines de Douche",
      price: 1500,
      image: "assets/img/product/16.webp",
      description: "Harmonie parfaite entre design et fonctionnalité. Système de fermeture douce intégré."
    },
    {
      id: 17,
      name: "Cabine 'Vision'",
      category: "Cabines de Douche",
      price: 1600,
      image: "assets/img/product/17.webp",
      description: "Vision claire et design futuriste. Profilés fins pour plus de luminosité."
    },
    {
      id: 18,
      name: "Cabine 'Pure'",
      category: "Cabines de Douche",
      price: 1050,
      image: "assets/img/product/18.webp",
      description: "Pureté des lignes et simplicité d'entretien. Verre traité anti-taches."
    },
    {
      id: 19,
      name: "Cabine 'Elite'",
      category: "Cabines de Douche",
      price: 1950,
      image: "assets/img/product/19.webp",
      description: "Cabine d'élite avec options personnalisables. Le summum du confort et du luxe."
    },
    {
      id: 20,
      name: "Cabine 'Nova'",
      category: "Cabines de Douche",
      price: 1250,
      image: "assets/img/product/20.webp",
      description: "Nouveau design innovant avec système de ventilation intégré. Fraîcheur assurée."
    },
    {
      id: 21,
      name: "Cabine 'Infinity'",
      category: "Cabines de Douche",
      price: 2200,
      image: "assets/img/product/21.webp",
      description: "Design infini sans limites. Verre sur mesure et options haut de gamme disponibles."
    },
    {
      id: 22,
      name: "Cabine 'Aurora'",
      category: "Cabines de Douche",
      price: 1400,
      image: "assets/img/product/22.webp",
      description: "Illuminez votre salle de bain avec cette cabine au design lumineux. Verre transparent et finitions chromées."
    },
    {
      id: 23,
      name: "Cabine 'Nexus'",
      category: "Cabines de Douche",
      price: 1700,
      image: "assets/img/product/23.webp",
      description: "Point de connexion entre tradition et modernité. Design contemporain avec touches classiques."
    },
    {
      id: 24,
      name: "Cabine 'Eclipse'",
      category: "Cabines de Douche",
      price: 1900,
      image: "assets/img/product/24.webp",
      description: "Design sombre et élégant avec profilés noirs. Pour une salle de bain sophistiquée."
    },
    {
      id: 25,
      name: "Cabine 'Zenith'",
      category: "Cabines de Douche",
      price: 2300,
      image: "assets/img/product/25.webp",
      description: "Au sommet de la qualité et du design. Cabine premium avec toutes les options de luxe."
    },
    {
      id: 26,
      name: "Cabine 'Radiance'",
      category: "Cabines de Douche",
      price: 1550,
      image: "assets/img/product/26.webp",
      description: "Rayonnez de style avec cette cabine éclatante. Verre extra-clair et éclairage LED intégré."
    }
  ];

  constructor() { }

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
}
