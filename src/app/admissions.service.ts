import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParentContactMessage } from './auth-message';
import { HttpClient } from '@angular/common/http';
import { Teacher } from './teacher';
import { Parent } from './parent';
import { Pupil } from './pupil';

@Injectable({
  providedIn: 'root'
})
export class AdmissionsService {

  parents : Parent[] = []
  http : HttpClient = inject(HttpClient);

  parentsUrl:string = 'http://localhost:5000/admission/parent-contacts'
  pupilsUrl: string = 'http://localhost:5000/admission/child-details';

  addChildDetails(pupil:Pupil) : Observable<any> {
    let formData : FormData = new FormData();
    formData.append('pupilId', pupil.pupilId as string);
    formData.append('firstName', pupil.firstName as string);
    formData.append('lastName', pupil.lastName as string);
    formData.append('gender', pupil.gender as string);
    formData.append('dateOfBirth', pupil.dateOfBirth.toISOString().split('T')[0]);
    formData.append('homeAddress', pupil.homeAddress as string);
    formData.append('currentGrade', pupil.currentGrade as string);
    formData.append('profilePic', pupil.profilePic as Blob);
    formData.append('parentContact', pupil.parentContact as string);
    formData.append('isAccepted', String(pupil.isAccepted));
    formData.append('hasSpecialNeeds', String(pupil.hasSpecialNeeds));
    formData.append('specialNeed', pupil.specialNeed as string);

    return this.http.post<any>(this.pupilsUrl, formData)
  }

  verifyContacts(email:string, phone:string) : Observable<ParentContactMessage> {
    return this.http.get<ParentContactMessage>(`${this.parentsUrl}`, {
      params: {
        email: email,
        phone: phone
      }
    })
  }

  constructor() { }


}
