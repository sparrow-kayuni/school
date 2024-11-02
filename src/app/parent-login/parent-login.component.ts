import { Component, inject, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import { ParentService } from '../parent.service';
import { LandingNavbarComponent } from '../landing-navbar/landing-navbar.component';

@Component({
  selector: 'app-parent-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LandingNavbarComponent],
  template: `
  <landing-navbar></landing-navbar>
  <section class="parent__login__section d-grid">
    <div class="form__box px-4">
      <div class="mb-4">
        <h1>Log into Parent's <br> portal</h1>
      </div>
      <form class="form-group py-2" style="width:64%;">
        <label for="email">Email<span style="color:red;">*</span></label>
        <input required type="email" id="email" class="form-control" [formControl]="email"/>
        <div class="" style="font-size:0.8em; color: red;">{{ this.emailMessage }}</div>
        <label for="password">Password<span style="color:red;">*</span></label>
        <input required type="password" id="password" class="form-control" [formControl]="password"/>
        <div class="" style="font-size:0.8em; color: red;">{{ this.passwordMessage }}</div>
        <button type="button" class="btn btn-primary my-2" (click)="validateLogin()" style="float: right;">SIGN IN</button>
      </form>
    </div>
    <div class="image__container">
      <img src="/assets/school_outdoors.webp" class="parent__login__banner" />
    </div>
  </section>
  `,
  styleUrl: './parent-login.component.css'
})
export class ParentLoginComponent implements OnInit {

  email = new FormControl('');
  password = new FormControl('');

  emailMessage : string = '';
  passwordMessage : string = '';

  parentService : ParentService = inject(ParentService);

  constructor() {
    //
  }
  ngOnInit(): void {
    console.debug(`Parent componatent has been created`);

  }

  validateLogin() : boolean {
    let emailValid : boolean = true;
    let passwordValid : boolean = true;
    
    if(this.email.invalid) {
      this.emailMessage = `Email was left empty! ${this.email.value}`;
      emailValid = false;
    }

    if(this.password.invalid) {
      this.passwordMessage = `Password was left empty! ${this.password.value}`;
      passwordValid = false;
    }

    console.debug(`Email value '${this.email.value}'`);
    const email = String(this.email.value);
    const password = String(this.password.value);

    if (emailValid){
      if (!email.includes('@')) {
        this.emailMessage = `Email entered is not valid ${email}`;
        emailValid = false;
      }
    }
    if (passwordValid) {
      if (!(password.length >= 8)) {
        this.passwordMessage = `Password contains less than 8 characters. Length: ${password.length}`
        passwordValid = false;
      }
    }
    
    if(passwordValid) {
      this.passwordMessage = '';
    }

    if(emailValid) {
      this.emailMessage = '';
    }

    return true;

  }
}
