import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Teacher } from '../teacher';
import { FacultyService } from '../faculty.service';
import { AuthService } from '../auth.service';
import { map, Observable } from 'rxjs';


@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <section class="d-grid">
   <aside class="pt-2 d-grid teacher__navigation pb-3 px-2">
      <ul class="d-flex nav__submenu__1 px-2" >
        <li class="px-2" *ngFor="let link of ['Calendar', 'Lessons', 'Tests', 'Students']">
          <a href="#" style="color: white; text-decoration: none;">{{ link }}</a>
        </li>
      </ul>
      <ul class="d-flex nav__submenu__2 px-2" >
        <li class="px-2" >
          <a href="#" style="color: white; text-decoration: none;">Profile</a>
        </li>
        <li class="px-2" >
          <button class="logout__button" (click)="logoutTeacher()">Logout</button>
        </li>
      </ul>
    </aside>
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
  teacherService : FacultyService = inject(FacultyService);
  authService: AuthService = inject(AuthService);
  route : ActivatedRoute = inject(ActivatedRoute);
  router : Router = inject(Router);
  sessionKey : string;

  constructor() {
    this.teacher = this.authService.defaultTeacher;
    this.sessionKey = this.route.snapshot.params['link'];
  }
  
  ngOnInit(): void {
    const getTeacherHttp : Observable<Teacher> = this.authService.getTeacherFromSessionKey(this.sessionKey);

    getTeacherHttp.pipe(
      map(res => {
        this.teacher = res;
        return res
      }),
      map(res => {
        console.debug(`Teacher is ${this.teacher.fullName}`);
        console.debug(`Logins have been ${this.authService.teacherLogins}`)
      })
    ).subscribe();
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
