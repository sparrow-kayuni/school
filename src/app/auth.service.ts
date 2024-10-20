import { inject, Injectable } from '@angular/core';
import {TeacherLogin,ParentLogin} from './login'
import { Teacher } from './teacher';
import { Parent } from './parent';
import crypto from 'crypto-js';
import {v4 as uuid} from 'uuid';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { LoginAuthMessage, SessionAuthMessage } from './auth-message';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http : HttpClient = inject(HttpClient);
  authUrl : string = "http://localhost:5000/auth"

  verifyPassword(teacher: Promise<Teacher | undefined>, password: string) {
    throw new Error('Method not implemented.');
  }

  fetchAuthorization(seesionId:string) {

  }

  teacherLogins : TeacherLogin[] = [];
  parentLogins : ParentLogin[] = [];

  defaultTeacher : Teacher = {
    teacherNo: 0,
    fullName: '',
    lastName: '',
    title: 'Mr',
    classId: 0,
    gender: 'm',
    email: '',
    phone: '',
    nextOfKinPhone: '',
    stringPath: '',
    profileImg: '',
    password: 'defaultPassword1234',
    maritalStatus: '',
    position: '',
    role: '',
    nrcNo: ''
  }

  sessionKey:string = '';

  verifyLogin(email:string, password:string) : Observable<LoginAuthMessage> {
    const data : FormData = new FormData()
    data.append('email', email);
    data.append('password', password);

    var authMessage : any = {};

    return this.http.post<LoginAuthMessage>(`${this.authUrl}/verify-login`, data)
    
  }
  
  loginTeacher(email : string, password:string) : Observable<TeacherLogin>{
    const data : FormData = new FormData()
    data.append('email', email);
    data.append('password', password);
    
    var session : any = {}

    return this.http.post<TeacherLogin>(`${this.authUrl}/generate-login`, data)
    
  }

  logoutTeacher(sessionKey:string) : Observable<any>{
    return this.http.get( `${this.authUrl}/logout-teacher`, {
      params: {
        sessionKey: sessionKey
      }
    });
  }

  verifySessionKey(sessionKey:string) : Observable<SessionAuthMessage> {
    return this.http.get<SessionAuthMessage>(`${this.authUrl}/verify-session-key`, {
      params: {
        sessionKey: sessionKey
      }
    });
  }

}
