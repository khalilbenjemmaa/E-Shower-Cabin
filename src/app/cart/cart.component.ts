import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  items: CartItem[] = [];

  constructor(public cart: CartService, private router: Router) {
    this.cart.items$.subscribe(items => this.items = items);
  }

  increase(item: CartItem) {
    this.cart.updateQuantity(item.product.id, item.quantity + 1);
  }

  decrease(item: CartItem) {
    this.cart.updateQuantity(item.product.id, item.quantity - 1);
  }

  remove(item: CartItem) {
    this.cart.remove(item.product.id);
  }

  checkout() {
    // For now, navigate to a placeholder checkout route
    this.router.navigate(['/checkout']);
  }
}
