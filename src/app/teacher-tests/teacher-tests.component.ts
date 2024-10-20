import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-tests',
  standalone: true,
  imports: [],
  templateUrl: './teacher-tests.component.html',
  styleUrl: './teacher-tests.component.css'
})
export class TeacherTestsComponent implements OnInit {

  ngOnInit(): void {
    console.debug(`Teacher tests created`);
  }

}
