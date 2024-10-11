import { Component } from '@angular/core';

@Component({
  selector: 'app-admission',
  standalone: true,
  imports: [],
  template: `
  <div>
  Enroll your child here!
  </div>
  `,
  styleUrl: './admission.component.css'
})
export class AdmissionComponent {
  title = 'app-admission'
}
