// bain-et-cuisine/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RendezvousComponent } from './rendezvous/rendezvous.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'rendezvous', component: RendezvousComponent },
  { path: 'contact', component: ContactComponent },

  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirect any unknown URL to home
];
