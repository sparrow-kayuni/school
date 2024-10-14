import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import { FacultyService } from '../faculty.service';
import { AuthService } from '../auth.service';
import { AuthMessage } from '../auth-message';
import { TeacherLogin } from '../login';
import { map, Observable, switchMap } from 'rxjs';

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
export class TeacherLoginComponent implements OnInit, OnDestroy {
  
  loginGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })
  
  facultyService : FacultyService = inject(FacultyService);
  authService: AuthService = inject(AuthService);
  router : Router = inject(Router); 

  emailMessage : string = '';
  passwordMessage : string = '';

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.debug("Teacher login component destroyed");
  }

  validateLogin(){

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

    let verificationHttp : Observable<AuthMessage> = this.authService.verifyLogin(email, password);
    
    verificationHttp.pipe(
      map(message => {
        
        if(!message.emailExists) {
          this.emailMessage = message.message;
          emailValid = false;
        }
    
        if(!message.passwordValid) {
          this.passwordMessage = message.message;
          passwordValid = false
        }

        return message
        
      }),
      map(message => {
        console.debug(`Message: ${message.message}\nEmail: ${message.emailExists}\nPassword: ${message.passwordValid}`)
        
        if(passwordValid) {
          this.passwordMessage = '';
        }
    
        if(emailValid) {
          this.emailMessage = '';
        }

        return (emailValid && passwordValid);
      })
    ).subscribe({
      next: (validEntries:boolean) => {
        if (validEntries){
          this.passwordMessage = '';
          this.emailMessage = '';

          this.authService.loginTeacher(email, password).pipe(
            map(res => {
              console.debug(`Session: ${res.sessionKey}\nTeacher ID: ${res.teacherId}`); 
              if (res) {
                this.router.navigate(['/teachers', res.sessionKey]);
              }
            })
          ).subscribe();
        }
      }
    });
  }
  

}

