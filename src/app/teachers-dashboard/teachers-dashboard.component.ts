import { Component, Input } from '@angular/core';
import { Teacher } from '../teacher';

@Component({
  selector: 'teachers-dashboard',
  standalone: true,
  imports: [],
  template: `
  <div class="d-grid">
    <div></div>
  </div>
  
  `,
  styleUrl: './teachers-dashboard.component.css'
})
export class TeachersDashboardComponent {
  @Input() teacher! : Teacher;
}
