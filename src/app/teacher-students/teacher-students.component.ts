import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-students',
  standalone: true,
  imports: [],
  template: `
  <div>
    Teacher Students works
  </div>
  `,
  styleUrl: './teacher-students.component.css'
})
export class TeacherStudentsComponent implements OnInit {
  ngOnInit(): void {
    console.debug(`Teacher students created`);
  }
}
