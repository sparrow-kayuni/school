import { Component, Input, OnInit } from '@angular/core';
import { Teacher } from '../teacher';

@Component({
  selector: 'app-teacher-profile',
  standalone: true,
  imports: [],
  template: `
  <div class="p-4">
    <img class="" style="width: 200px; float: right;" src="{{ teacher.profileImg }}" />
    <div class="py-2"><strong style="font-size: 1.4em;">{{ teacher.title }} {{ teacher.fullName }}'s Details</strong></div>
    <table>
      <tbody>
        <tr>
          <td style="width: 200px;">Full Name</td>
          <td>{{ teacher.fullName }}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{{ teacher.email }}</td>
        </tr>
        <tr>
          <td>Gender</td>
          <td>{{ teacher.gender }}</td>
        </tr>
        <tr>
          <td>Phone</td>
          <td>{{ teacher.phone }}</td>
        </tr>
        <tr>
          <td>Next of Kin Phone</td>
          <td>{{ teacher.nextOfKinPhone }}</td>
        </tr>
        <tr>
          <td>Password</td>
          <td>***********</td>
        </tr>
        <tr>
          <td>Marital Status</td>
          <td>{{ teacher.maritalStatus }}</td>
        </tr>
        <tr>
          <td>NRC. Number</td>
          <td>{{ teacher.nrcNo }}</td>
        </tr>
      </tbody>
    </table>
    <div>
      <button class="btn" style="background-color: var(--bs-green); color: white;">Edit profile</button>
    </div>
  </div>
  `,
  styleUrl: './teacher-profile.component.css'
})
export class TeacherProfileComponent {
  teacher! : Teacher;

  constructor() {
    this.teacher = JSON.parse(sessionStorage.getItem('teacher')!);
  }
}
