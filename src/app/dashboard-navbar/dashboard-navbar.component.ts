import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Teacher } from '../teacher';
import { AuthService } from '../auth.service';
import { map } from 'rxjs';

@Component({
  selector: 'dashboard-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  template: `
  <header class="header__search__bar d-grid py-2 pb-1 px-2">
    <div class="header__menu p-4 py-2">
      <a routerLink="/dashboard" style="font-weight: bold; font-size:1em">Default Primary School</a>
    </div>
    <form class="d-flex header__submenu px-2" >
      <input type="search" class="form-control" style="border-radius: 3px 0px 0px 3px;" placeholder="Find anything here" />
      <button type="button" class="btn" style="border-radius: 0px 3px 3px 0px; background-color: var(--bs-blue); color: white;">GO</button>
    </form>
    <ul class="d-flex header__submenu px-2 py-2" >
      <li class="px-2" >
        <a routerLink="/dashboard/profile" style="color: white; text-decoration: none;">Profile</a>
      </li>
      <li class="px-2" >
        <button class="logout__button" (click)="logoutTeacher()">Logout</button>
      </li>
    </ul>
  </header>
  <nav class="d-grid teacher__navigation pt-2 pb-1 px-2">
    <ul class="d-flex nav__submenu__1 px-2 py-2" >
      <li class="px-2" *ngFor="let link of this.mainLinks">
        <a routerLink="{{ link.urlPath }}" style="color: white; text-decoration: none;">{{ link.text }}</a>
      </li>
    </ul>
    <ul class="nav__submenu__2 d-flex px-2"> 
      <li *ngFor="let sidelink of this.sideLinks" style="font-weight: lighter;" class="px-2">
        <a routerLink="{{ sidelink.urlPath }}" style="color: white; text-decoration: none;">{{ sidelink.text }}</a>
      </li>
    </ul>
  </nav>`,
  styleUrl: './dashboard-navbar.component.css'
})
export class DashboardNavbarComponent {

  @Input() teacher!: Teacher;
  @Input() sessionKey!: string;
  mainLinks : any[] = [];
  sideLinks : any[] = [];

  authService:AuthService = inject(AuthService);
  router:Router = inject(Router);

  ngOnInit() : void {
    if(this.teacher.role === 'user') {
      this.mainLinks = [
        {text: 'New Test/Exam', urlPath: '/dashboard/teacher/new-test'},
        {text: 'Students', urlPath: '/dashboard/teacher/students'},
        {text: 'Tests', urlPath: '/dashboard/teacher/tests'},
        {text: 'Attendance', urlPath: '/dashboard/teacher/attendance'},
      ];
      this.sideLinks = [
        {text: 'Announcements', urlPath: '/dashboard/announcements'},
      ];
    } else if(this.teacher.role === 'admin') {
      this.mainLinks = [
        {text: 'New Pupils', urlPath: '/dashboard/pupil-applications'},
        {text: 'Our Students', urlPath: '/dashboard/students'},
        {text: 'Our Teachers', urlPath: '/dashboard/teachers'}
      ];
      this.sideLinks = [
        {text: 'Announcements', urlPath: '/dashboard/announcements'},
      ]
    }

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
}
