import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParentContactMessage } from './auth-message';
import { HttpClient } from '@angular/common/http';
import { Teacher } from './teacher';
import { Parent } from './parent';
import { Pupil } from './pupil';
import { Admission } from './admission';

@Injectable({
  providedIn: 'root'
})
export class AdmissionsService {

  parents : Parent[] = []
  http : HttpClient = inject(HttpClient);
  admission: Admission | undefined = undefined;

  parentsNrcUrl:string = 'http://localhost:5000/admission/parent-nrc'
  parentsUrl:string = 'http://localhost:5000/admission/parent-details'
  pupilsUrl:string = 'http://localhost:5000/admission/child-details';
  
  initializeAdmission() {
    this.admission = {
      admissionDate: new Date()
    }
  }

  getAdmission():Admission {
    return this.admission as Admission;
  }

  addParentsDetails(parent:Parent, relationship:string):void {
    if(this.admission) {
      this.admission.parent = parent;
      (this.admission.child as Pupil).parentRelationship = relationship;
    }

  }

  postParentData(parent:Parent, childId:string) : Observable<any> {
    let formData = new FormData();
    formData.append('firstName', parent.firstName);
    formData.append('lastName', parent.lastName);
    formData.append('title', parent.title);
    formData.append('gender', parent.gender);
    formData.append('homeAddress', parent.homeAddress);
    formData.append('phone', parent.phone);
    formData.append('email', parent.email);
    formData.append('maritalStatus', parent.maritalStatus);
    formData.append('employmentStatus', parent.employmentStatus);
    formData.append('placeOfWork', parent.placeOfWork);
    formData.append('childId', childId as string);

    return this.http.post<any>(this.parentsUrl, formData)
  }

  addChildDetails(pupil:Pupil) : void {
    if(this.admission) this.admission.child = pupil;
  }
  
  postChildData(pupil:Pupil):Observable<any>{
    let formData : FormData = new FormData();
    formData.append('pupilId', pupil.pupilId as string);
    formData.append('firstName', pupil.firstName as string);
    formData.append('lastName', pupil.lastName as string);
    formData.append('gender', pupil.gender as string);
    formData.append('dateOfBirth', pupil.dateOfBirth.toISOString().split('T')[0]);
    formData.append('homeAddress', pupil.homeAddress as string);
    formData.append('currentGrade', pupil.currentGrade as string);
    formData.append('profilePic', pupil.profilePic as Blob);
    formData.append('parentNrc', pupil.parentNrc as string);
    formData.append('isAccepted', String(pupil.isAccepted));
    formData.append('hasSpecialNeeds', String(pupil.hasSpecialNeeds));
    formData.append('specialNeed', pupil.specialNeed as string);
    formData.append('parentRelationship', pupil.parentRelationship as string);

    return this.http.post<any>(this.pupilsUrl, formData)
  }

  postChildDetails():Observable<any> {
    return this.postChildData((<Admission>this.admission).child as Pupil);
  }
  
  postParentDetails():Observable<any> {
    return this.postParentData((<Admission>this.admission).parent as Parent, (<Admission>this.admission).child?.pupilId as string);
  }

  verifyContacts(nrc:string) : Observable<ParentContactMessage> {
    return this.http.get<ParentContactMessage>(`${this.parentsNrcUrl}`, {
      params: {
        nrcNo: nrc
      }
    })
  }

  constructor() { }


}
