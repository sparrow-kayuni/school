import { Injectable } from '@angular/core';
import {TeacherLogin,ParentLogin} from './login'
import { Teacher } from './teacher';
import { Parent } from './parent';
import crypto from 'crypto-js';
import {v4 as uuid} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  teacherLogins : TeacherLogin[] = [];
  parentLogins : ParentLogin[] = [];
  
  loginTeacher(teacher : Teacher) : TeacherLogin | undefined{

    var existingLogin = this.teacherLogins.find((login) => login.teacher == teacher && 
    !login.loggedOut && (new Date().getHours() - login.time.getHours()) < 20)

    if (existingLogin) {
      return existingLogin;
    }

    const login : TeacherLogin = {
      id: uuid(),
      teacher: teacher,
      time: new Date(),
      loggedOut: false,
    }

    this.teacherLogins.push(login);

    return login;
  }

  loginParent(parent : Parent) : ParentLogin | undefined{

    var existingLogin = this.parentLogins.find((login) => login.parent == parent && 
    !login.loggedOut && (new Date().getHours() - login.time.getHours()) < 20)

    if (existingLogin) {
      return existingLogin;
    }

    const login : ParentLogin = {
      id: uuid(),
      parent: parent,
      time: new Date(),
      loggedOut: false,
    }

    this.parentLogins.push(login);

    return login;
  }

  verifyTeacherLogin(id:string) : boolean {
    const login = this.teacherLogins.find((login) => login.id === id);
    
    if(!login) {
      return false;
    }

    if (login.loggedOut) {
      return false;
    }
  
    if(new Date().getHours() - login.time.getHours() > 20) {
      // login again
      return false;
    }

    return true;
  }

  verifyParentLogin(id:string) : boolean {
    const login = this.parentLogins.find((login) => login.id === id);
    
    if(!login) {
      return false;
    }
  
    if(new Date().getHours() - login.time.getHours() > 3) {
      // login again
      return false;
    }

    return true;
  }

}
