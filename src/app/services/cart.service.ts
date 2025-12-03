import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageKey = 'sweetlodge_cart_v1';
  private itemsSubject = new BehaviorSubject<CartItem[]>(this.loadFromStorage());
  items$ = this.itemsSubject.asObservable();

  // Tax rate (e.g., 19%)
  taxRate = 0.19;

  private loadFromStorage(): CartItem[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  private saveToStorage(items: CartItem[]) {
    this.itemsSubject.next(items);
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    } catch (e) {
      // ignore storage errors
    }
  }

  getItems(): CartItem[] {
    return this.itemsSubject.getValue();
  }

  add(product: Product, quantity = 1) {
    const items = this.getItems();
    const idx = items.findIndex(i => i.product.id === product.id);
    if (idx > -1) {
      items[idx].quantity += quantity;
    } else {
      items.push({ product, quantity });
    }
    this.saveToStorage(items);
  }

  updateQuantity(productId: string | number, quantity: number) {
    const items = this.getItems().map(i => ({ ...i }));
    const idx = items.findIndex(i => i.product.id === productId);
    if (idx > -1) {
      if (quantity <= 0) {
        items.splice(idx, 1);
      } else {
        items[idx].quantity = quantity;
      }
      this.saveToStorage(items);
    }
  }

  remove(productId: string | number) {
    const items = this.getItems().filter(i => i.product.id !== productId);
    this.saveToStorage(items);
  }

  clear() {
    this.saveToStorage([]);
  }

  getSubtotal(): number {
    return this.getItems().reduce((sum, i) => sum + (i.product.price || 0) * i.quantity, 0);
  }

  getTax(): number {
    return this.getSubtotal() * this.taxRate;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTax();
  }
}
