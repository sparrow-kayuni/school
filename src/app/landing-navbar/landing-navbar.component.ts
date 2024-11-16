import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'landing-navbar',
  standalone: true,
  imports: [RouterModule, RouterLink],
  template: `
    <nav class="nav__bar d-flex px-2 py-1">
      <ul class="nav__menu">
        <li class="nav__item">
          <a routerLink="/" style="font-weight: bold; font-size:1em">Default Primary School</a>
        </li>
      </ul>
      <ul class="nav__menu">
        <li class="nav__item">
          <a routerLink="/auth/teachers">Teacher</a>
        </li>
        <li class="nav__item">
          <a routerLink="/auth/parent">Parents</a>
        </li>
        <li class="nav__item">
          <a routerLink="/admissions">Apply here</a>
        </li>
      </ul>
    </nav>`,
  styleUrl: './landing-navbar.component.css'
})
export class LandingNavbarComponent {

}
