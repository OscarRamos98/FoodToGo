import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../services/firestore/firestore.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  productGroup: FormGroup;
  ingredients: string[] = [];

  constructor(private fb: FormBuilder, private firestore: FirestoreService) {
    this.initilizeForm();
  }

  initilizeForm() {
    this.productGroup = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]+')])],
      check: [false],
      ingredient: ['']
    });
  }

  MasIngredientes() {
    const ingredient = this.productGroup.get('ingredient').value;

    if (ingredient !== '') {
      this.ingredients.push(ingredient);
      this.productGroup.get('ingredient').setValue('');
    } 
  }

  BorrarIngredientes(index: number) {
    this.ingredients.splice(index, 1);
  }

  LimpiarIngredientes() {
    if (!this.productGroup.get('ingredient').value) {
      this.ingredients = [];
    }
  }

  saveProduct() {
    let product: Product;


    if (this.ingredients.length !== 0) {
      product = {
        name: this.productGroup.get('name').value,
        price: parseFloat(this.productGroup.get('price').value),
        ingredients: this.ingredients
      };
    } else {
      product = {
        name: this.productGroup.get('name').value,
        price: parseFloat(this.productGroup.get('price').value)
      };
    }

    this.firestore.saveProduct(product)
      .then(() => {
        this.productGroup.get('name').setValue('');
        this.productGroup.get('price').setValue('');
        this.ingredients = [];

      });

  }
}

