import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    notes: ''
  };

  constructor(public cart: CartService) {}

  placeOrder() {
    // Here you would typically send the order to a backend
    console.log('Order placed', this.formData, this.cart.getItems());
    alert('Commande passée avec succès ! (Simulation)');
    this.cart.clear();
  }
}
