import { Component } from '@angular/core';
import { LandingNavbarComponent } from '../landing-navbar/landing-navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admission',
  standalone: true,
  imports: [CommonModule, LandingNavbarComponent],
  template: `
  <landing-navbar></landing-navbar>
  <div>
  Enroll your child here!
  </div>
  `,
  styleUrl: './admission.component.css'
})
export class AdmissionComponent {
  title = 'app-admission'
}
