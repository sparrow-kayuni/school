import { Injectable } from '@angular/core';
import { Pupil } from './pupil';
import { Teacher } from './teacher';
import { Parent } from './parent';
import { Application } from './application';

@Injectable({
  providedIn: 'root'
})
export class AdmissionsService {

  defaultPupil: Pupil = {
    pupilNo: 0,
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: undefined,
    parentNo: 0,
    homeAddress: '',
    parentContact: '',
    hasParent: false
  }

  defaultParent: Parent = {
    parentNo: 0,
    fullName: '',
    lastName: '',
    title: '',
    phone: '',
    email: '',
    password: '',
    isParent: false,
    homeAddress: '',
    maritalStatus: '',
    children: []
  }

  application : Application = {
    applicationNo: 0,
    date: undefined,
    parent: undefined,
    child: undefined,
    accepted: false
  }

  constructor() { }

  sendPupilApplication(pupil:Pupil, parent:Parent) : undefined {

    this.application = {
      applicationNo: 0,
      date: undefined,
      parent: undefined,
      child: undefined,
      accepted: false
    }
  }


}
