import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, RouterLink, LandingComponent],
  template: `
  <main>
    <nav class="nav__bar d-flex px-2 py-2">
      <ul class="nav__menu">
        <li class="nav__item">
          <a routerLink="" style="font-weight: bold; font-size:1em">Default Primary School</a>
        </li>
      </ul>
      <ul class="nav__menu">
        <li class="nav__item">
          <a routerLink="auth/teachers">Teacher</a>
        </li>
        <li class="nav__item">
          <a routerLink="auth/parents">Parents</a>
        </li>
        <li class="nav__item">
          <a routerLink="/admissions">Apply here</a>
        </li>
      </ul>
    </nav>
    <router-outlet />
  `,  
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'school';
}
