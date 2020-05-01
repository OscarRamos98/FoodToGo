import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Product } from '../../models/product';
import { Router, NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore,
              private fireAuth: AngularFireAuth, private router: Router) { }

  currentUser() {
    this.fireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.router.navigateByUrl('/tabs');
      }
    });
  }

  signIn(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigateByUrl('/tabs');
      });
  }

  signOut() {
    this.fireAuth.signOut()
      .then(() => {
        this.router.navigateByUrl('/login');
      });
  }

  saveProduct(product: Product) {
    return this.firestore.collection('Products').add(product);
  }

  getProducts() {
    return this.firestore.collection('Products').snapshotChanges();
  }
}
