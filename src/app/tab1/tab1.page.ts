import { Component } from '@angular/core';
import { FirestoreService } from '../services/firestore/firestore.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  products: Product[] = [];

  constructor(private firestore: FirestoreService) {
    this.firestore.getProducts().subscribe(data => {
      this.products = data.map(p => {
        return {
          id: p.payload.doc.id,
          name: p.payload.doc.get('name'),
          price: p.payload.doc.get('price')
        } as Product;
      });
    });
  }

  Salir() {
    this.firestore.signOut();
  }
}
