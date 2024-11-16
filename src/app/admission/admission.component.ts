import { AfterViewInit, Component, Directive, ElementRef, inject, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { LandingNavbarComponent } from '../landing-navbar/landing-navbar.component';
import { CommonModule } from '@angular/common';
import { AbstractControl, EmailValidator, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ParentService } from '../parent.service';
import { map } from 'rxjs';
import { File } from 'node:buffer';
import { Pupil } from '../pupil';
import { v7 } from 'uuid';
import { AdmissionsService } from '../admissions.service';
import { Parent } from '../parent';
import { Admission } from '../admission';


@Component({
  selector: 'app-admission',
  standalone: true,
  imports: [ReactiveFormsModule, LandingNavbarComponent, CommonModule],
  template: `
  <landing-navbar></landing-navbar>
  <section class="admission__body p-2">
    <div >
    @if(this.errorMessages !== []){
      <div >
        <div class="p-2 m-1 d-inline-flex" *ngFor="let error of this.errorMessages" style="color: white; background-color: var(--bs-danger); border-radius: 10px;">
          {{ error }}
        </div>
      </div>
    } @else {
    }
    @if(this.successMessages !== []){
      <div>
        <div class="p-2 m-1 d-inline-flex" *ngFor="let success of this.successMessages" style="color: white; background-color: #3eca32; border-radius: 10px;">
          {{ success }}
        </div>
      </div>
    } @else {
    }
    </div>
    <div class="p-2 mb-3" style="font-size: 1.4em;"><strong>Complete the application form below</strong> <button (click)="resetApplicationForm()" class="btn btn-secondary" style="float: right;" type="reset">Reset</button></div>
    <div class="form__body">
      <div class="tab__headers">
        <ul class="tab__menu d-flex pt-2 px-2">
          <li class="tab__item py-2 pb-1 px-2" (click)="changeTabFocus('contacts')" #contactsTabHead>Contacts</li>
          <li class="tab__item py-2 pb-1 px-2" (click)="changeTabFocus('child')" #childsTabHead>Child Details</li>
          <li class="tab__item py-2 pb-1 px-2" (click)="changeTabFocus('parent')" #parentsTabHead>Parent Details</li>
          <li class="tab__item py-2 pb-1 px-2" (click)="changeTabFocus('summary')" #summaryTabHead>Summary</li>
        </ul>
      </div>
      
      <div class="tab__body">
        <form class="d-none mt-4 parent__contacts form-group" [formGroup]="contactsForm" #contactsTab>
          <div class="p-2 form__input__group">
            <label for="nrcNo" class="form-label">Parent/Guardian NRC Number</label>
            <input type="text" class="form-control" [formControl]="toControl(contactsForm.controls['parentNrc'])" />
          </div>
          <div class="p-2 d-flex" style="justify-content: flex-end;">
            <button (click)="verifyContacts()" type="button" class="btn btn-primary" >Next</button>
          </div>
        </form>
        <form class="d-none mt-4 child__details form-group" [formGroup]="childDetailsForm" #childsTab> 
          <div class="p-2 form__input__group">
            <label for="firstName" class="form-label">Child first name</label>
            <input type="text" id="firstName" class="form-control" [formControl]="toControl(childDetailsForm.controls['firstName'])" />
          </div>
          <div class="p-2 form__input__group">
            <label for="lastName" class="form-label">Child last name</label>
            <input type="text" id="lastName" class="form-control" [formControl]="toControl(childDetailsForm.controls['lastName'])" />
          </div>
          <div class="p-2 form__input__group">
            <label for="gender" class="form-label">Gender</label>
            <select type="text" id="gender" class="form-select" [formControl]="toControl(childDetailsForm.controls['gender'])" >
              <option value="0" disabled selected>Select gender</option>
              <option value="m">Male</option>
              <option value="f">Female</option>
            </select>
          </div>
          <div class="p-2 form__input__group">
            <label for="dob" class="form-label">Date of birth</label>
            <input type="date" id="dob" class="form-control" [formControl]="toControl(childDetailsForm.controls['dateOfBirth'])" />
          </div>
          <div class="p-2 form__input__address">
            <label for="homeAddress" class="form-label">Home address</label>
            <input type="text" id="homeAddress" class="form-control" [formControl]="toControl(childDetailsForm.controls['homeAddress'])" />
            <label for="city" class="form-label">City</label>            
            <input type="text" id="city" class="form-control" [formControl]="toControl(childDetailsForm.controls['city'])" />
          </div>
          <div class="p-2 form__input__group">
            <label for="profilePic" class="form-label">Passport sized photo</label>
            <input type="file" id="profilePic" class="form-control" (change)="addUploadFile($event)" [formControl]="toControl(childDetailsForm.controls['profilePic'])" />
          </div>
          <div class="p-2 form__input__group">
            <label for="lastGrade" class="form-label">Grade</label>
            <select class="form-select" id="lastGrade" [formControl]="toControl(childDetailsForm.controls['lastGrade'])">
              <option value="0" disabled selected></option>
              <option value="baby">Baby class</option>
              <option value="pre">Preschool</option>
              <option value="reception">Reception</option>
              <option value="1">Grade 1</option>
              <option value="2">Grade 2</option>
              <option value="3">Grade 3</option>
              <option value="4">Grade 4</option>
              <option value="5">Grade 5</option>
              <option value="6">Grade 6</option>
              <option value="7">Grade 7</option>
            </select>
          </div>
          <div class="p-2 d-grid" style="grid-template-columns: 0.25fr 0.75fr;">
            <div class="" style="grid-column: 1;"></div>
            <div class="" style="grid-column: 2;">
              <input type="checkbox" id="hasSpecialNeeds" class="form-checkbox" [formControl]="toControl(childDetailsForm.controls['hasSpecialNeeds'])" />
              <label for="hasSpecialNeeds" class="form-label px-2">Does child have any special needs?</label>          
            </div>
          </div>
          <div class="p-2 form__input__group">
            <label for="specialNeeds" class="form-label">Special Need</label>
            <input type="text" id="specialNeeds" class="form-control" [formControl]="toControl(childDetailsForm.controls['specialNeed'])" />
          </div>
          <div class="p-2 d-flex" style="justify-content: flex-end;">
            <button (click)="sendChildDetails()" type="button" class="btn btn-primary" >Next</button>
          </div>
        </form>
        <form class="d-none mt-4 parent__details form-group" [formGroup]="parentDetailsForm" #parentsTab>
          <div class="p-2 form__input__group">
            <label for="firstName" class="form-label">Parent/Guardian First Name</label>
            <input type="text" id="firstName" class="form-control" [formControl]="toControl(parentDetailsForm.controls['firstName'])" />
          </div>
          <div class="p-2 form__input__group">
            <label for="lastName" class="form-label">Parent/Guardian Last Name</label>
            <input type="text" id="lastName" class="form-control" [formControl]="toControl(parentDetailsForm.controls['lastName'])" />
          </div>
          <div class="p-2 form__input__group">
            <label for="title" class="form-label">Title</label>
            <select id="title" class="form-select" [formControl]="toControl(parentDetailsForm.controls['title'])">
              <option value="0" disabled selected></option>
              <option value="mr">Mr.</option>
              <option value="mrs">Mrs.</option>
              <option value="ms">Ms.</option>
              <option value="dr">Dr.</option>
              <option value="prof">Prof.</option>
              <option value="fr">Fr.</option>
              <option value="sr">Sr.</option>
              <option value="sir">Sir.</option>
            </select>
          </div>
          <div class="p-2 form__input__group">
            <label for="email" class="form-label">Parent/Guardian email</label>
            <input type="email" class="form-control" [formControl]="toControl(parentDetailsForm.controls['email'])" />
          </div>
          <div class="p-2 form__input__group">
            <label for="phone" class="form-label">Parent/Guardian phone number</label>
            <input type="text" id="phone" class="form-control" [formControl]="toControl(parentDetailsForm.controls['phone'])"/>
          </div>
          <div class="p-2 form__input__group">
            <label for="gender" class="form-label">Gender</label>
            <select type="text" id="gender" class="form-select" [formControl]="toControl(parentDetailsForm.controls['gender'])">
              <option disabled selected value="0">Select gender</option>
              <option value="m">Male</option>
              <option value="f">Female</option>
            </select>
          </div>
          <div class="p-2 form__input__group">
            <label for="relationship" class="form-label">Relationship with child</label>
            <select id="relationship" class="form-select" [formControl]="toControl(parentDetailsForm.controls['relationshipWithChild'])">
              <option value="0" selected disabled></option>
              <option value="mother">Mother</option>
              <option value="father">Father</option>
              <option value="aunt">Aunt</option>
              <option value="uncle">Uncle</option>
              <option value="grandmother">Grandmother</option>
              <option value="grandfather">Grandfather</option>
              <option value="sibling">Sibling</option>
              <option value="cousin">Cousin</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="p-2 form__input__address">
            <label for="homeAddress" class="form-label">Home address</label>
            <input type="text" id="homeAddress" class="form-control mb-1" [formControl]="toControl(parentDetailsForm.controls['homeAddress'])"/>
            <label for="city" class="form-label">City</label>            
            <input type="text" id="city" class="form-control" [formControl]="toControl(parentDetailsForm.controls['city'])" />
          </div>
          <div class="p-2 d-grid" style="grid-template-columns: 0.25fr 0.75fr;">
            <div class="" style="grid-column: 1;"></div>
            <div class="" style="grid-column: 2;">
              <input type="checkbox" id="sameAddress" class="form-checkbox" [formControl]="toControl(parentDetailsForm.controls['sameAddressAsChild'])" />
              <label class="px-2"> Same address as child</label>
            </div>
          </div>
          <div class="p-2 form__input__group">
            <label for="maritalStatus" class="form-label">Marital Status</label>
            <select id="maritalStatus" class="form-select" [formControl]="toControl(parentDetailsForm.controls['maritalStatus'])">
              <option value="0" disabled selected></option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </div>
          <div class="p-2 form__input__group">
            <label for="employmentStatus" class="form-label">Employment Status</label>
            <select id="employmentStatus" class="form-select" [formControl]="toControl(parentDetailsForm.controls['employmentStatus'])">
              <option value="0" disabled selected></option>
              <option value="full-time">Full-time employed</option>
              <option value="part-time">Part-time employed</option>
              <option value="contractor">Contractor</option>
              <option value="self-employed">Self-employed</option>
              <option value="retired">Retired</option>
              <option value="unemployed">Unemployed</option>
            </select>
          </div>
          <div class="p-2 form__input__group">
            <label for="placeOfWork" class="form-label">Place of Work</label>
            <input type="text" id="placeOfWork" class="form-control" [formControl]="toControl(parentDetailsForm.controls['placeOfWork'])"/>
          </div>
          <div class="p-2 d-flex" style="justify-content: flex-end;">
            <button type="button" (click)="sendParentsDetails()" class="btn btn-primary">Next</button>
          </div>
        </form>
        <div class="d-none mt-4 summary form-group" #summaryTab>
          <div class="p-2">
            <h3>Application summary</h3>
          </div>
          <div class="mb-4 p-2" style="border: 1px solid var(--bs-gray-200)--bs-gray-200); border-radius: 5px;">
            <div class="p-2">
              <h4>Child's details</h4>
            </div>
            @if(getAdmission().child){
            <table class="">
              <tbody>
                <tr>
                  <td>First name</td>
                  <td>{{ getAdmission().child?.firstName }}</td>
                </tr>
                <tr>
                  <td>Last name</td>
                  <td>{{ getAdmission().child?.lastName }}</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>{{ getAdmission().child?.gender }}</td>
                </tr>
                <tr>
                  <td>Date of birth</td>
                  <td>{{ getAdmission().child?.dateOfBirth?.toDateString() }}</td>
                </tr>
                <tr>
                  <td>Home address</td>
                  <td>{{ getAdmission().child?.homeAddress }}</td>
                </tr>
                <tr>
                  <td>Grade</td>
                  <td>{{ getAdmission().child?.currentGrade }}</td>
                </tr>
                <tr>
                  <td>Special need</td>
                  <td>{{ getAdmission().child?.specialNeed }}</td>
                </tr>
              </tbody>
            </table>
            } @else {
              <div class="p-2">Child's details haven't been updated</div>
            }
          </div>
          <div class="mb-2 p-2" style="border: 1px solid var(--bs-gray-200); border-radius: 5px;">
            <div class="p-2">
              <h4>Parent's details</h4>
            </div>
            @if(getAdmission().parent){
            <table class="">
              <tbody>
                <tr>
                  <td>First name</td>
                  <td>{{ getAdmission().parent?.firstName }}</td>
                </tr>
                <tr>
                  <td>Last name</td>
                  <td>{{ getAdmission().parent?.lastName }}</td>
                </tr>
                <tr>
                  <td>Title</td>
                  <td>{{ getAdmission().parent?.title }}</td>
                </tr>
                <tr>
                  <td>NRC Number</td>
                  <td>{{ getAdmission().parent?.nrcNo }}</td>
                </tr>
                <tr>
                  <td>Phone Number</td>
                  <td>{{ getAdmission().parent?.phone }}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{{ getAdmission().parent?.email }}</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>{{ getAdmission().parent?.gender }}</td>
                </tr>
                <tr>
                  <td>Home address</td>
                  <td>{{ getAdmission().parent?.homeAddress }}</td>
                </tr>
                <tr>
                  <td>Marital status</td>
                  <td>{{ getAdmission().parent?.maritalStatus }}</td>
                </tr>
                <tr>
                  <td>Employment status</td>
                  <td>{{ getAdmission().parent?.employmentStatus }}</td>
                </tr>
                <tr>
                  <td>Place of work</td>
                  <td>{{ getAdmission().parent?.placeOfWork }}</td>
                </tr>
              </tbody>
            </table>
            } @else {
              <div class="p-2">Parent's details haven't been updated</div>             
            }
          </div>
          <div class="p-2 d-flex" style="justify-content: flex-end;">
            <button type="button" (click)="submitAdmissionForm()" class="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </div>
    @if(this.successMessages.length !== 0){
      <div class="p-3">
        <p style="font-size: 0.9em;">Your application form has been sent. You will receive an email informing you whether your child has been accepted to our school, please check your within a week for feedback.</p>   
      </div>
    }
  </section>
  `,
  styleUrl: './admission.component.css'
})
export class AdmissionComponent implements OnInit, AfterViewInit {
  title = 'app-admission'

  @ViewChild('contactsTabHead', {static: true}) contactsTabHead? : ElementRef;
  @ViewChild('childsTabHead', {static: true}) childsTabHead? : ElementRef;
  @ViewChild('parentsTabHead', {static: true}) parentsTabHead? : ElementRef;
  @ViewChild('summaryTabHead', {static: true}) summaryTabHead? : ElementRef;
  
  @ViewChild('contactsTab', {static: true}) contactsTab? : ElementRef;
  @ViewChild('childsTab', {static: true}) childsTab? : ElementRef;
  @ViewChild('parentsTab', {static: true}) parentsTab? : ElementRef;
  @ViewChild('summaryTab', {static: true}) summaryTab? : ElementRef;


  tabHeads:ElementRef[] = [];
  tabBodies:ElementRef[] = [];
  childrenForms: any[] = [];
  child : Pupil | undefined = undefined;

  errorMessages : string[] = [];
  successMessages : string[] = [];
  parentExists : boolean = false;

  contactsForm : FormGroup = new FormGroup({
    parentNrc: new FormControl<string>('')
  });

  childDetailsForm : FormGroup = new FormGroup({
    firstName: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    dateOfBirth: new FormControl<Date>(new Date()),
    gender: new FormControl<string>(''),
    homeAddress: new FormControl<string>(''),
    city: new FormControl<string>(''),
    lastGrade: new FormControl<number>(0),
    profilePic: new FormControl<File|null>(null),
    hasSpecialNeeds: new FormControl<boolean>(false),
    specialNeed: new FormControl<string>('')
  });

  parentDetailsForm : FormGroup = new FormGroup({
    firstName: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    title: new FormControl<string>(''),
    phone: new FormControl<string>(''),
    email: new FormControl<string>(''),
    gender: new FormControl<string>(''),
    relationshipWithChild: new FormControl<string>(''),
    maritalStatus: new FormControl<string>(''),
    employmentStatus: new FormControl<string>(''),
    placeOfWork: new FormControl<string>(''),
    homeAddress: new FormControl<string>(''),
    city: new FormControl<string>(''),
    sameAddressAsChild: new FormControl<boolean>(false)
  });

  profilePic : any = undefined;

  renderer = inject(Renderer2);
  admissionService : AdmissionsService = inject(AdmissionsService);

  toControl(abstractControl:AbstractControl<any, any>) : FormControl{
    let ctrl = abstractControl as FormControl;
    if(!ctrl) throw('Failed to convert abstract control to formcontrol');
    return ctrl;
  }

  resetApplicationForm() : void {
    this.contactsForm.controls['parentNrc'].setValue('');
    
    this.childDetailsForm.controls['firstName'].setValue('');
    this.childDetailsForm.controls['lastName'].setValue('');
    this.childDetailsForm.controls['dateOfBirth'].setValue(new Date());
    this.childDetailsForm.controls['gender'].setValue('');
    this.childDetailsForm.controls['homeAddress'].setValue('');
    this.childDetailsForm.controls['lastGrade'].setValue(0);
    this.childDetailsForm.controls['profilePic'].setValue(null);
    this.childDetailsForm.controls['hasSpecialNeeds'].setValue(false);
    this.childDetailsForm.controls['specialNeed'].setValue('');
      
  }

  getAdmission():Admission {
    return this.admissionService.getAdmission();
  }
  
  submitAdmissionForm():void {
    const childHttp$  = this.admissionService.postChildDetails();

    childHttp$.pipe(
      map(res => {
        console.log(res);
      })
    ).subscribe({
      next: res => {
        const parentHttp$  = this.admissionService.postParentDetails();
        parentHttp$.pipe(
          map(res => {
            console.log(res)
          })
        ).subscribe({
          next: res => {
            this.successMessages.push("Application sent");
          },
          error: res => {
            this.errorMessages.push("Something went wrong updating parents details");
          }
        })
      },
      error: res => {
        this.errorMessages.push("Something went wrong with the pupils information");
      }
    })
  }

  sendParentsDetails() : void {
    let firstName = this.parentDetailsForm.controls['firstName'].value;
    let lastName = this.parentDetailsForm.controls['lastName'].value;
    let phone = this.parentDetailsForm.controls['phone'].value;
    let email = this.parentDetailsForm.controls['email'].value;
    let gender = this.parentDetailsForm.controls['gender'].value;
    let relationshipWithChild = this.parentDetailsForm.controls['relationshipWithChild'].value;
    let maritalStatus = this.parentDetailsForm.controls['maritalStatus'].value;
    let homeAddress = this.parentDetailsForm.controls['homeAddress'].value;
    let title = this.parentDetailsForm.controls['title'].value;
    let sameAddressAsChild = this.parentDetailsForm.controls['sameAddressAsChild'].value;
    let employmentStatus = this.parentDetailsForm.controls['employmentStatus'].value;
    let placeOfWork = this.parentDetailsForm.controls['placeOfWork'].value;
    let city = this.parentDetailsForm.controls['city'].value;    
    
    if(sameAddressAsChild) {
      homeAddress = this.child?.homeAddress;
      city = homeAddress.substring(homeAddress.lastIndexOf(' ')).trim()
    }

    if(employmentStatus === 'unemployed') {
      placeOfWork = 'N/A';
    }

    let validFirstName = firstName !== '';
    let validLastName = lastName !== '';
    let validGender = gender !== '';
    let validEmail = email !== ''
    let validPhone = phone !== '';
    let validHomeAddress = homeAddress !== '';
    let validMaritalStatus = maritalStatus !== '';
    let validRelationship = relationshipWithChild !== '';
    let validTitle = title !== '';
    let validPlaceOfWork = placeOfWork !== '';
    let validCity = city !== '';
      
    let validEntries = true;

    this.errorMessages = [];

    if(!validFirstName) {
      this.errorMessages.push('First name field is empty');
      validEntries = false;
    }

    if(!validLastName) {
      this.errorMessages.push('Last name field is empty');
      validEntries = false;
    }

    if(!validTitle) {
      this.errorMessages.push('Title field is empty');
      validEntries = false;
    }

    if(!validGender) {
      this.errorMessages.push('Please select parent\'s gender');
      validEntries = false;
    }

    if(!validEmail) {
      this.errorMessages.push('Email was not provided');
      validEntries = false;
    }

    if(!validPhone) {
      this.errorMessages.push('Phone was not provided');
      validEntries = false;
    }

    if(!validHomeAddress) {
      this.errorMessages.push('Home address was not provided');
      validEntries = false;
    }

    if(!validCity) {
      this.errorMessages.push('Please enter a valid city');
      validEntries = false;
    }

    if(!validMaritalStatus) {
      this.errorMessages.push('You haven\'t selected a valid marital status');
      validEntries = false;
    }

    if(!validPlaceOfWork) {
      this.errorMessages.push('Please enter your place of work');
      validEntries = false;
    }

    if(!validRelationship) {
      this.errorMessages.push('Invalid relationship with child');
      validEntries = false;
    }

    if(phone.includes('0')) {
      if(!phone.split('0')[1].match('^[9|7][5|6|7][0-9]{7}$')){
        this.errorMessages.push('Please enter a valid Zambian phone number');
        validEntries = false;
      }
      if(!(phone.split('0')[0] !== '+26') || !(phone.split('0')[0] !== '26')) {
        this.errorMessages.push('Please enter a valid Zambian phone number');
        validEntries = false;
      }
    }

    if(!email.includes('@')) {
      this.errorMessages.push('Invalid email address');
      validEntries = false;
    }

    if(!validEntries) {
      return;
    }

    if(!sameAddressAsChild) {
      homeAddress = `${homeAddress}, ${city}`;
    }

    let parent : Parent = {
      firstName: firstName,
      lastName: lastName,
      title: title,
      gender: gender,
      phone: phone,
      nrcNo: this.child?.parentNrc as string,
      email: email,
      homeAddress: homeAddress,
      maritalStatus: maritalStatus,
      employmentStatus: employmentStatus,
      placeOfWork: placeOfWork
    }

    console.debug(parent);

    this.admissionService.addParentsDetails(parent, relationshipWithChild);
    
    this.changeTabFocus('summary');
  }

  addUploadFile(event:any):void {
    this.profilePic = event.target.files[0];
  }

  sendChildDetails():void {
    let firstName = this.childDetailsForm.controls['firstName'].value;
    let lastName = this.childDetailsForm.controls['lastName'].value;
    let dateOfBirth = new Date(Date.parse(this.childDetailsForm.controls['dateOfBirth'].value));
    let homeAddress = this.childDetailsForm.controls['homeAddress'].value;
    let lastGrade = this.childDetailsForm.controls['lastGrade'].value;
    let hasSpecialNeeds = this.childDetailsForm.controls['hasSpecialNeeds'].value;
    let specialNeed = this.childDetailsForm.controls['specialNeed'].value;
    let gender = this.childDetailsForm.controls['gender'].value;
    let city = this.childDetailsForm.controls['city'].value;  
  

    let validFirstName = firstName !== '';
    let validLastName = lastName !== '';
    let validGender = gender !== '';
    let validDoB = new Date().getFullYear() - dateOfBirth.getFullYear() >= 2;
    let validGrade = lastGrade !== 0;
    let validSpecialNeed = hasSpecialNeeds?specialNeed !== '': true;
    let validProfilePic = this.profilePic !== undefined;
    let validHomeAddress = homeAddress !== '';
    let validEntries = true;
    let validCity = city !== '';

    this.errorMessages = [];

    if(!validFirstName) {
      this.errorMessages.push('First name field is empty');
      validEntries = false;
    }

    if(!validLastName) {
      this.errorMessages.push('Last name field is empty');
      validEntries = false;
    }

    if(!validGender) {
      this.errorMessages.push('Please select child\'s gender');
      validEntries = false;
    }

    if(!validDoB) {
      this.errorMessages.push('Please choose a valid date');
      validEntries = false;
    }

    if(!validGrade) {
      this.errorMessages.push('Please select a valid grade');
      validEntries = false;
    }

    if(!validSpecialNeed) {
      this.errorMessages.push('You haven\'t specified child\'s special need');
      validEntries = false;
    }

    if(!validHomeAddress) {
      this.errorMessages.push('Please enter a valid home address');
      validEntries = false;
    }

    if(!validCity) {
      this.errorMessages.push('Please enter a valid city');
      validEntries = false;
    }

    if(!validProfilePic) {
      this.errorMessages.push('You haven\'t selected a image to upload');
      validEntries = false;
    }    

    if (!validEntries) {
      return;
    }

    homeAddress = `${homeAddress}, ${this.childDetailsForm.controls['city'].value}`;


    this.child =  {
      pupilId: v7(),
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      dateOfBirth: dateOfBirth,
      profilePic: this.profilePic,
      parentNo: 0,
      homeAddress: homeAddress,
      parentNrc: this.contactsForm.controls['parentNrc'].value,
      isAccepted: false,
      hasSpecialNeeds: hasSpecialNeeds,
      specialNeed: specialNeed,
      currentGrade: lastGrade
    }

    console.debug(this.child);

    this.admissionService.addChildDetails(this.child);

    this.changeTabFocus('parent');
  }

  setPupilCookies(pupil:Pupil):void {
    localStorage.setItem('firstName', pupil.firstName);
    localStorage.setItem('lastName', pupil.lastName);
    localStorage.setItem('dateOfBirth', pupil.dateOfBirth.toDateString());
    localStorage.setItem('profilePic', String(pupil.profilePic));
    localStorage.setItem('homeAddress', pupil.homeAddress);
    localStorage.setItem('lastGrade', pupil.currentGrade);
    localStorage.setItem('hasSpecialNeeds', String(pupil.hasSpecialNeeds));
    localStorage.setItem('specialNeed', pupil.specialNeed);
    localStorage.setItem('gender', pupil.gender);
  }

  verifyContacts():void {
    const nrcNo = String(this.contactsForm.controls['parentNrc'].value);

    console.debug(`Validating details... ${nrcNo} `)
    
    let validEntries = true;
    this.errorMessages = [];

    if (nrcNo === '') {
      this.errorMessages.push("NRC field is empty!");
      validEntries = false;
    }

    if(!validEntries) {
      return;
    }

    if (!nrcNo.includes('/')) {
      this.errorMessages.push('Please enter a valid NRC (XXXXXX/XX/X)');
      validEntries = false;
    }

    if(!nrcNo.match('^[0-9]{6}/[0-9]{2}/[0-9]{1}$')) {
      this.errorMessages.push('Invalid NRC format (XXXXXX/XX/X)');
      validEntries = false;
    }

    if(!validEntries) {
      return;
    }

    this.errorMessages = [];

    this.admissionService.verifyContacts(nrcNo).pipe(
      map((res) => {
        console.log(res);
      })
    ).subscribe({
      next: (res) => {
        this.changeTabFocus('child');
        this.errorMessages = [];
      },
      error: (err) => {
        console.error(`Backend is not connected`);
        this.errorMessages.push("There is a problem with the server!");
      }
    });
  
  }

  loadPreviousValues():void {
    console.log('Loadding previous values...');
    let valid: boolean = true;
    if(localStorage.getItem('parentEmail')) this.contactsForm.get('parentEmail')?.setValue(localStorage.getItem('parentEmail'));
    if(localStorage.getItem('parentPhone')) this.contactsForm.get('parentPhone')?.setValue(localStorage.getItem('parentPhone'));
    if(localStorage.getItem('existingChildren')) this.contactsForm.get('existingChildren')?.setValue(localStorage.getItem('existingChildren'));
    
    if(localStorage.getItem('firstName')) this.childDetailsForm.get('firstName')?.setValue(localStorage.getItem('firstName'));
    if(localStorage.getItem('lastName')) this.childDetailsForm.get('lastName')?.setValue(localStorage.getItem('lastName'));
    if(localStorage.getItem('dateOfBirth')) this.childDetailsForm.get('dateOfBirth')?.setValue(localStorage.getItem('dateOfBirth'));
    if(localStorage.getItem('gender')) this.childDetailsForm.get('gender')?.setValue(localStorage.getItem('gender'));
    if(localStorage.getItem('homeAddress')) this.childDetailsForm.get('homeAddress')?.setValue(localStorage.getItem('homeAddress'));
    if(localStorage.getItem('lastGrade')) this.childDetailsForm.get('lastGrade')?.setValue(localStorage.getItem('lastGrade'));
    if(localStorage.getItem('profilePic')) this.childDetailsForm.get('profilePic')?.setValue(localStorage.getItem('profilePic'));
    if(localStorage.getItem('hasSpecialNeeds')) this.childDetailsForm.get('hasSpecialNeeds')?.setValue(localStorage.getItem('hasSpecialNeeds'));
    if(localStorage.getItem('specialNeed')) this.childDetailsForm.get('specialNeed')?.setValue(localStorage.getItem('specialNeed'));
    
    if(valid) {
    
    }
    
  }

  ngOnInit() {
    this.tabHeads = [
      this.contactsTabHead?.nativeElement, 
      this.childsTabHead?.nativeElement, 
      this.parentsTabHead?.nativeElement, 
      this.summaryTabHead?.nativeElement
    ]

    this.tabBodies = [
      this.contactsTab?.nativeElement,
      this.childsTab?.nativeElement,
      this.parentsTab?.nativeElement,
      this.summaryTab?.nativeElement,
    ];

    this.admissionService.initializeAdmission();
  }
  
  ngAfterViewInit(): void {
    this.renderer.removeClass(this.contactsTabHead?.nativeElement, 'tab__item');
    this.renderer.addClass(this.contactsTabHead?.nativeElement, 'selected__tab');
    this.renderer.removeClass(this.contactsTab?.nativeElement, 'd-none');

    this.tabHeads.forEach((el) => {
      el === this.contactsTabHead?.nativeElement ? true : this.renderer.addClass(el, 'd-none')
    });

  }

  changeTabFocus(active:string) {

    if (active === 'contacts') {

      this.tabHeads.forEach((el) => {
        if(this.containsClass(el, 'selected__tab') && el !== this.contactsTabHead?.nativeElement) {
          this.renderer.removeClass(el, 'selected__tab');
          this.renderer.addClass(el, 'tab__item');
        }
      });

      this.renderer.removeClass(this.contactsTabHead?.nativeElement, 'tab__item');
      this.renderer.addClass(this.contactsTabHead?.nativeElement, 'selected__tab');

      this.tabBodies.forEach((el) => {
        if(el !== this.contactsTab?.nativeElement) {
          this.renderer.addClass(el, 'd-none');
        }
      });
      
      this.renderer.removeClass(this.contactsTab?.nativeElement, 'd-none');

    } else if(active === 'child') {

      this.tabHeads.forEach((el) => {
        if(this.containsClass(el, 'selected__tab') && el !== this.childsTabHead?.nativeElement) {
          this.renderer.removeClass(el, 'selected__tab');
          this.renderer.addClass(el, 'tab__item');
        }
      });
      
      this.renderer.removeClass(this.childsTabHead?.nativeElement, 'tab__item');
      this.renderer.addClass(this.childsTabHead?.nativeElement, 'selected__tab');
      
      this.tabBodies.forEach((el) => {
        if(el !== this.childsTab?.nativeElement) {
          this.renderer.addClass(el, 'd-none');
        }
      });

      this.renderer.removeClass(this.childsTabHead?.nativeElement, 'd-none');
      this.renderer.removeClass(this.childsTab?.nativeElement, 'd-none');

    } else if(active === 'parent') {
      this.tabHeads.forEach((el) => {
        if(this.containsClass(el, 'selected__tab') && el !== this.parentsTabHead?.nativeElement) {
          this.renderer.removeClass(el, 'selected__tab');
          this.renderer.addClass(el, 'tab__item');
        }
      });

      this.renderer.removeClass(this.parentsTabHead?.nativeElement, 'tab__item');
      this.renderer.addClass(this.parentsTabHead?.nativeElement, 'selected__tab');
      
      this.tabBodies.forEach((el) => {
        if(el !== this.parentsTab?.nativeElement) {
          this.renderer.addClass(el, 'd-none');
        }
      })
      
      this.renderer.removeClass(this.parentsTabHead?.nativeElement, 'd-none')
      this.renderer.removeClass(this.parentsTab?.nativeElement, 'd-none');

    } else if(active === 'summary') {
      this.tabHeads.forEach((el) => {
        if(this.containsClass(el, 'selected__tab') && el !== this.summaryTabHead?.nativeElement) {
          this.renderer.removeClass(el, 'selected__tab');
          this.renderer.addClass(el, 'tab__item');
        }
      });

      this.renderer.removeClass(this.summaryTabHead?.nativeElement, 'tab__item');
      this.renderer.addClass(this.summaryTabHead?.nativeElement, 'selected__tab');
      
      this.tabBodies.forEach((el) => {
        if(el !== this.summaryTab?.nativeElement) {
          this.renderer.addClass(el, 'd-none');
        }
      })

      this.renderer.removeClass(this.summaryTabHead?.nativeElement, 'd-none');
      this.renderer.removeClass(this.summaryTab?.nativeElement, 'd-none');

    }

  }

  containsClass(elementRef:any, className:string):boolean {
    return elementRef.classList.contains(className);
  }
  
}
