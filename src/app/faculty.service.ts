import { Injectable } from '@angular/core';
import { Teacher } from './teacher';
import { TeacherLogin } from './login';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  teachers : Teacher[] = [
    {
      teacherNo: 1,
      fullName: 'Default Head Teacher',
      lastName: 'Teacher',
      title: 'Mr.',
      classId: 0,
      gender: 'm',
      email: 'headteacher@school.com',
      phone: '+260770000000',
      nextOfKinPhone: '+260770000001',
      stringPath: 'head-teacher',
      profileImg: '/assets/vecteezy_default-male-avatar-profile-icon-social-media-chatting_25337669.jpg',
      password: 'headteacher1234',
      maritalStatus: 'married',
      position: 'head',
      role: 'admin',
      nrcNo: '100000/01/1'
    },
    {
      teacherNo: 2,
      fullName: 'Default Vice Head Teacher',
      lastName: 'Teacher',
      title: 'Mrs.',
      classId: 0,
      gender: 'f',
      email: 'viceheadteacher@school.com',
      phone: '+260770000000',
      nextOfKinPhone: '+260770000001',
      stringPath: 'vice-head-teacher',
      profileImg: 'public/assets/vecteezy_default-female-avatar-profile-icon-social-media-chatting_24766959.jpg',
      password: 'viceheadteacher1234',
      maritalStatus: 'married',
      position: 'vice-head',
      role: 'admin',
      nrcNo: '100002/01/1'
    }
  ]

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

  getTeacherByEmail(email: string) : Teacher | undefined {
    return this.teachers.find((teacher) => teacher.email === email);
  }

  verifyPassword(teacher:Teacher, password:string) : boolean {
    return teacher.password === password;
  }

}
