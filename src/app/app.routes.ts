// bain-et-cuisine/src/app/app.routes.ts
import { ResolveFn, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RendezvousComponent } from './rendezvous/rendezvous.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CheckoutComponent } from './checkout/checkout.component';

const SITE_NAME = 'Sweet Lodge';

// "coulissante-latérale" -> "Cabine de douche coulissante latérale | Sweet Lodge"
const categoryTitle: ResolveFn<string> = route => {
  const slug = route.paramMap.get('categoryName');
  if (!slug) {
    return `Cabines de douche sur mesure | ${SITE_NAME}`;
  }
  return `Cabine de douche ${slug.replace(/-/g, ' ')} | ${SITE_NAME}`;
};

const categoryData = {
  description: 'Toutes nos cabines de douche Sweet Lodge : coulissantes, battantes, coulissantes latérales et parois fixes walk-in, fabriquées sur mesure et installées par nos équipes.'
};

// The product page sets its own title and description once the product is loaded.
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Sweet Lodge – Cabines de douche sur mesure à Sfax',
    data: { description: 'Sweet Lodge fabrique et installe vos cabines de douche sur mesure à Sfax : coulissantes, battantes, walk-in. Garantie, livraison gratuite, devis WhatsApp.' }
  },
  { path: 'category', component: CategoryComponent, title: categoryTitle, data: categoryData },
  { path: 'category/:categoryName', component: CategoryComponent, title: categoryTitle, data: categoryData },
  { path: 'category/:categoryName/:subType', component: CategoryComponent, title: categoryTitle, data: categoryData },
  { path: 'product/:id', component: ProductDetailsComponent },
  {
    path: 'about',
    component: AboutComponent,
    title: `À propos | ${SITE_NAME}`,
    data: { description: 'Sweet Lodge, fabricant de cabines de douche à Sfax : fabrication sur mesure, installation par nos équipes et garantie pièces et main d\'œuvre.' }
  },
  {
    path: 'rendezvous',
    component: RendezvousComponent,
    title: `Prendre rendez-vous | ${SITE_NAME}`,
    data: { description: 'Prenez rendez-vous avec Sweet Lodge pour concevoir votre cabine de douche sur mesure : conseil, prise de mesures et devis.' }
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: `Contact | ${SITE_NAME}`,
    data: { description: 'Contactez Sweet Lodge à Sfax par téléphone, WhatsApp ou e-mail pour votre projet de cabine de douche sur mesure.' }
  },
  { path: 'checkout', component: CheckoutComponent, title: `Commande | ${SITE_NAME}` },

  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirect any unknown URL to home
];
