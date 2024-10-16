import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Teacher } from '../teacher';

@Component({
  selector: 'dashboard-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  template: `
  <header class="header__search__bar d-grid py-2 pb-1 px-2">
    <div class="header__menu p-4 py-2">
      <a routerLink="/teachers/{{this.sessionKey}}" style="font-weight: bold; font-size:1em">Default Primary School</a>
    </div>
    <form class="d-flex header__submenu px-2" >
      <input type="search" class="form-control" style="border-radius: 3px 0px 0px 3px;" placeholder="Find anything here" />
      <button type="button" class="btn" style="border-radius: 0px 3px 3px 0px; background-color: var(--bs-blue); color: white;">GO</button>
    </form>
    <ul class="d-flex header__submenu px-2 py-2" >
      <li class="px-2" >
        <a href="#" style="color: white; text-decoration: none;">Calendar</a>
      </li>
      <li class="px-2" >
        <a href="#" style="color: white; text-decoration: none;">Profile</a>
      </li>
      <li class="px-2" >
        <button class="logout__button" (click)="logoutTeacher()">Logout</button>
      </li>
    </ul>
  </header>
  <nav class="d-grid teacher__navigation pt-2 pb-1 px-2">
    <ul class="d-flex nav__submenu__1 px-2 py-2" >
      <li class="px-2" *ngFor="let link of ['New Test/Exam', 'Students', 'Attendance', 'Lessons']">
        <a href="#" style="color: white; text-decoration: none;">{{ link }}</a>
      </li>
    </ul>
    <ul class="nav__submenu__2 d-flex px-2"> 
      <li style="color: white; font-weight: lighter;" class="px-2">Announcements</li>

      @if(this.teacher.role == 'admin'){
      <li style="color: white; font-weight: lighter;" class="px-2">Admissions</li>
        <li style="color: white; font-weight: lighter;" class="px-2">Teachers</li>
        <li style="color: white; font-weight: lighter;" class="px-2">Payments Fees</li>
      }
    </ul>
  </nav>`,
  styleUrl: './dashboard-navbar.component.css'
})
export class DashboardNavbarComponent {

  @Input() teacher!: Teacher;
  @Input() sessionKey!: string;
  
  logoutTeacher() {
    console.debug(`Logging out...`)
  }
}
