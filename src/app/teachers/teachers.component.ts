import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Teacher } from '../teacher';
import { FacultyService } from '../faculty.service';
import { AuthService } from '../auth.service';
import { catchError, map, Observable } from 'rxjs';
import { SessionAuthMessage } from '../auth-message';
import { DashboardNavbarComponent } from '../dashboard-navbar/dashboard-navbar.component';


@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule, RouterModule, DashboardNavbarComponent],
  template: `
  <dashboard-navbar [teacher]="this.teacher" [sessionKey]="this.sessionKey"></dashboard-navbar>
  <section class="d-grid">
    <div class="p-4">
      <h1>{{ teacher.fullName }}</h1>
      <h2>{{ teacher.position }}</h2>
    </div>
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

  constructor() {
    this.teacher = this.authService.defaultTeacher;
    this.sessionKey = this.route.snapshot.params['link'];
  }
  
  ngOnInit(): void {
    const verifySessionHttp : Observable<SessionAuthMessage> = this.authService.verifySessionKey(this.sessionKey);
    verifySessionHttp.pipe(
      map(res => {
        if (!res.sessionExists || res.sessionExpired) {
          this.router.navigate(['/auth/teachers'], { 
            queryParams: { message: `${res.message.replaceAll(' ', '+')}`} 
          });
        }
        return res
      })
    ).subscribe({
      next: res => {
        if (!res.sessionExpired && res.sessionExists){
          const getTeacherHttp = this.facultyService.getTeacherBySessionKey(this.sessionKey);
          getTeacherHttp.pipe(
            map(teacher => {
              this.teacher = teacher;
              return teacher;
            }),
            map(res => {
              console.debug(`Teacher is ${this.teacher.fullName}`);
              console.debug(`Logins have been ${this.authService.teacherLogins}`)
            })
          ).subscribe()
        }
        
      }
    });
  }

  logoutTeacher() {
    const logoutHttp = this.authService.logoutTeacher(this.sessionKey);

    logoutHttp.pipe(
      map((res) => {
        if (res.message) {
          this.router.navigate(['/']);
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.teacher = this.authService.defaultTeacher;
  }

}
