import { Injectable } from '@angular/core';
import { Teacher } from './teacher';
import { TeacherLogin } from './login';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  teachers : Teacher[] = []

  constructor() { }

  getAllTeachers() : Teacher[] {
    return this.teachers;
  }

  getAdminFaculty() : Teacher[] | [] {
    return this.teachers.filter((teacher) => teacher.role == "admin");
  }

  getTeacherById(id:number) : Teacher | undefined {
    return this.teachers.find((teacher) => teacher.teacherNo === id);
  }

}
