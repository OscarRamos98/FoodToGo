import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FirestoreService } from '../../../services/firestore/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private Sesion: FormGroup;

  constructor(private fb: FormBuilder, private firestore: FirestoreService) {
    this.firestore.currentUser();
  }

  ngOnInit() {
    this.Sesion = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  IniciarSesion() {
    const email = this.Sesion.get('email').value;
    const password = this.Sesion.get('password').value;

    this.firestore.signIn(email, password);
  }

}
