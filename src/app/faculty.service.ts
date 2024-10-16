import { inject, Injectable } from '@angular/core';
import { Teacher } from './teacher';
import { TeacherLogin } from './login';
import { SessionAuthMessage } from './auth-message';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  teachers : Teacher[] = []
  teachersUrl : string = "http://localhost:5000/teachers";
  http = inject(HttpClient);

  constructor() { }

  getTeacherBySessionKey(sessionKey:string) : Observable<Teacher>{
    return this.http.get<Teacher>(`${this.teachersUrl}/teacher`, 
      {
        params: {
          sessionKey: sessionKey
        }
      }
    );
  }

}
