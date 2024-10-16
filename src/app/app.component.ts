import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LandingNavbarComponent } from './landing-navbar/landing-navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, RouterLink],
  template: `
  <main>
    <router-outlet />
  </main>
  `,  
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  
  title = 'school';

  ngOnInit(): void {
    console.debug(`Main App has been created`)
  }
  
  ngOnDestroy(): void {
    console.debug(`Main App has been destroyed`)
  }

}
