import { Component, inject } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import { FacultyService } from '../faculty.service';
import { AuthService } from '../auth.service';
import { TeacherLogin } from '../login';

@Component({
  selector: 'app-teacher-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
  <section class="teacher__login__section d-grid">
    <div class="form__box px-4">
      <div class="mb-4">
        <h1>Log into teachers <br> portal</h1>
      </div>
      <form class="form-group py-2" [formGroup]="loginGroup" (ngSubmit)="validateLogin()" style="width:64%;">
        <label for="email">Email<span style="color:red;">*</span></label>
        <input required type="email" id="email" class="form-control" [formControl]="loginGroup.controls.email"/>
        <div class="" style="font-size:0.8em; color: red;">{{ this.emailMessage }}</div>
        <label for="password">Password<span style="color:red;">*</span></label>
        <input required type="password" id="password" class="form-control" [formControl]="loginGroup.controls.password"/>
        <div class="" style="font-size:0.8em; color: red;">{{ this.passwordMessage }}</div>
        <button type="button" class="btn btn-primary my-2" (click)="validateLogin()" style="float: right;">SIGN IN</button>
      </form>
    </div>
    <div class="image__container">
      <img src="/assets/school_outdoors.webp" class="teacher__login__banner" />
    </div>
  </section>
  `,
  styleUrl: './teacher-login.component.css'
})
export class TeacherLoginComponent {
  
  loginGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })
  
  facultyService : FacultyService = inject(FacultyService);
  authService: AuthService = inject(AuthService);
  router : Router = inject(Router);    

  emailMessage : string = '';
  passwordMessage : string = '';


  validateLogin() : boolean {
    let emailValid : boolean = true;
    let passwordValid : boolean = true;
    
    if(this.loginGroup.controls.email.invalid) {
      this.emailMessage = `Email was left empty! ${this.loginGroup.controls.email.value}`;
      emailValid = false;
    }

    if(this.loginGroup.controls.password.invalid) {
      this.passwordMessage = `Password was left empty! ${this.loginGroup.controls.password.value}`;
      passwordValid = false;
    }

    const email = String(this.loginGroup.controls.email.value);
    const password = String(this.loginGroup.controls.password.value);

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
    
    if(emailValid && passwordValid) {
      const teacher = this.facultyService.getTeacherByEmail(email);
      if (!teacher) {
        this.emailMessage = `The email ${email} doesn't exist`;
        return false;
      }

      const passwordCorrect = this.facultyService.verifyPassword(teacher, password);
      if (!passwordCorrect) {
        this.passwordMessage = `The password given is incorrect`;
        return false;
      }

      this.passwordMessage = '';
      this.emailMessage = '';

      const login : TeacherLogin | undefined = this.authService.loginTeacher(teacher);
      
      if (!login) {
        return false;
      }
      
      this.router.navigate(['/teachers', login.id])
    }      

    return true;

  }
}
