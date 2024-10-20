import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule, Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { Teacher } from '../teacher';
import { FacultyService } from '../faculty.service';
import { AuthService } from '../auth.service';
import { catchError, map, Observable } from 'rxjs';
import { SessionAuthMessage } from '../auth-message';
import { DashboardNavbarComponent } from '../dashboard-navbar/dashboard-navbar.component';
import { TeachersDashboardComponent } from '../teachers-dashboard/teachers-dashboard.component';


@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, DashboardNavbarComponent, TeachersDashboardComponent],
  template: `
  @if(this.teacher.fullName != '') {
    <dashboard-navbar [teacher]="this.teacher" [sessionKey]="this.sessionKey"></dashboard-navbar>
  }
  <section class="d-grid">
    @if(this.teacher.fullName != ''){
      <router-outlet />
    } @else {
      <div class="p-4">Loading...</div>
    }
    @if(this.flashMessage != '' && !this.flashMessageClosed) {
      <div class="flash__message__success">
        <span class="p-3">{{ this.flashMessage }}</span>
        <span class="p-3" (click)="this.flashMessageClosed = true;" style="cursor: pointer; background-color: #3b9733;">x</span>
      </div>
    }
  </section> 
  `,
  styleUrl: './teachers.component.css'
})
export class TeachersComponent implements OnInit, OnDestroy {

  teacher : Teacher;
  facultyService : FacultyService = inject(FacultyService);
  authService: AuthService = inject(AuthService);
  route : ActivatedRoute = inject(ActivatedRoute);
  router : Router = inject(Router);
  sessionKey : string;
  flashMessage : string | null = '';
  flashMessageClosed:boolean = false;

  constructor() {
    this.teacher = this.authService.defaultTeacher;
    this.sessionKey = sessionStorage.getItem('sessionKey')!;
  }
  
  ngOnInit(): void {
    const verifySessionHttp : Observable<SessionAuthMessage> = this.authService.verifySessionKey(this.sessionKey);
    verifySessionHttp.pipe(
      map(res => {
        if (!res.sessionExists || res.sessionExpired) {
          sessionStorage.setItem('message', res.message);
          console.debug(`Session exists: ${res.sessionExists} \nSession expired: ${res.sessionExpired}`)
          this.router.navigate(['/auth/teachers']);
        }
        return res;
      })
    ).subscribe({
      next: res => {
        if (!res.sessionExpired && res.sessionExists){
          const getTeacherHttp = this.facultyService.getTeacherBySessionKey(this.sessionKey);
          getTeacherHttp.pipe(
            map(teacher => {
              this.teacher = teacher;
              sessionStorage.setItem('teacher', JSON.stringify(this.teacher));
              return teacher;
            })
          ).subscribe({
            next: res => {
              this.flashMessage = sessionStorage.getItem('message');
              console.debug(`Teacher is ${this.teacher.fullName}`);
              sessionStorage.setItem('message', '');
            }
          })
        }

      }
    });
  }

  ngOnDestroy(): void {
    this.teacher = this.authService.defaultTeacher;
    console.debug(`Teacher component has been destroyed`)
  }

}
