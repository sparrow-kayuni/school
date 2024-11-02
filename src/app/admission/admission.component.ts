import { AfterViewInit, Component, Directive, ElementRef, inject, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { LandingNavbarComponent } from '../landing-navbar/landing-navbar.component';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ParentService } from '../parent.service';
import { map, of, retry, retryWhen, switchMap } from 'rxjs';
import { mapToCanActivate } from '@angular/router';
import { File } from 'node:buffer';
import { Pupil } from '../pupil';
import { v7 } from 'uuid';
import { AdmissionsService } from '../admissions.service';


@Component({
  selector: 'app-admission',
  standalone: true,
  imports: [ReactiveFormsModule, LandingNavbarComponent, CommonModule],
  template: `
  <landing-navbar></landing-navbar>
  <section class="admission__body p-2">
  <div class="p-2" style="font-size: 1.4em;"><strong>Application form</strong> <button (click)="resetApplicationForm()" class="btn btn-secondary" style="float: right;" type="reset">Reset</button></div>
    <div class="p-2" *ngIf="this.errorMessages !== []">
      <div class="p-1 m-1 d-inline-flex" *ngFor="let error of this.errorMessages" style="color: white; background-color: var(--bs-danger); border-radius: 10px;">
        {{ error }}
      </div>
    </div>
    <div class="form__body">
      <div class="tab__headers">
        <ul class="tab__menu d-flex pt-2 px-2">
          <li class="tab__item py-2 pb-1 px-2" (click)="changeTabFocus('contacts')" #contactsTabHead>Contacts</li>
          <li class="tab__item py-2 pb-1 px-2" (click)="changeTabFocus('child')" #childsTabHead>Child Details</li>
          <li class="tab__item py-2 pb-1 px-2" (click)="changeTabFocus('parent')" #parentsTabHead>Parent Details</li>
          <li class="tab__item py-2 pb-1 px-2" (click)="changeTabFocus('document')" #documentsTabHead>Documents</li>
        </ul>
      </div>
      
      <div class="tab__body">
        <form class="d-none mt-4 parent__contacts form-group" [formGroup]="contactsForm" #contactsTab>
          <div class="p-2">
            <label for="email" class="form-label">Parent/Guardian email</label>
            <input type="email" class="form-control" [formControl]="toControl(contactsForm.controls['parentEmail'])" />
          </div>
          <div class="p-2">
            <label for="phone" class="form-label">Parent/Guardian phone number</label>
            <input type="text" id="phone" class="form-control" [formControl]="toControl(contactsForm.controls['parentPhone'])" />
          </div>
          <div class="p-2">
            <input type="checkbox" id="existingChildren" class="form-checkbox" [formControl]="toControl(contactsForm.controls['existingChildren'])"/>
            <label for="existingChildren" class="form-label px-2">Do you already have a child/ren at this school already?</label>          
          </div>
          <div class="p-2 d-flex" style="justify-content: flex-end;">
            <button (click)="verifyContacts()" type="button" class="btn btn-primary" >Next</button>
          </div>
        </form>
        <form class="d-none mt-4 child__details form-group" [formGroup]="childDetailsForm" #childsTab> 
          <div class="p-2">
            <label for="firstName" class="form-label">Child first name</label>
            <input type="text" id="firstName" class="form-control" [formControl]="toControl(childDetailsForm.controls['firstName'])" />
          </div>
          <div class="p-2">
            <label for="lastName" class="form-label">Child last name</label>
            <input type="text" id="lastName" class="form-control" [formControl]="toControl(childDetailsForm.controls['lastName'])" />
          </div>
          <div class="p-2">
            <label for="gender" class="form-label">Gender</label>
            <select type="text" id="gender" class="form-select" [formControl]="toControl(childDetailsForm.controls['gender'])" >
              <option value="0" disabled selected>Select gender</option>
              <option value="m">Male</option>
              <option value="f">Female</option>
            </select>
          </div>
          <div class="p-2">
            <label for="dob" class="form-label">Date of birth</label>
            <input type="date" id="dob" class="form-control" [formControl]="toControl(childDetailsForm.controls['dateOfBirth'])" />
          </div>
          <div class="p-2">
            <label for="homeAddress" class="form-label">Home address</label>
            <input type="text" id="homeAddress" class="form-control" [formControl]="toControl(childDetailsForm.controls['homeAddress'])" />
          </div>
          <div class="p-2">
            <label for="profilePic" class="form-label">Passport sized photo</label>
            <input type="file" id="profilePic" class="form-control" (change)="addUploadFile($event)" [formControl]="toControl(childDetailsForm.controls['profilePic'])" />
          </div>
          <div class="p-2">
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
          <div class="p-2">
            <input type="checkbox" id="hasSpecialNeeds" class="form-checkbox" [formControl]="toControl(childDetailsForm.controls['hasSpecialNeeds'])" />
            <label for="hasSpecialNeeds" class="form-label px-2">Does child have any special needs?</label>          
          </div>
          <div class="p-2">
            <label for="specialNeeds" class="form-label">Special Need</label>
            <input type="text" id="specialNeeds" class="form-control" [formControl]="toControl(childDetailsForm.controls['specialNeed'])" />
          </div>
          <div class="p-2 d-flex" style="justify-content: flex-end;">
            <button (click)="commitChildDetails()" type="button" class="btn btn-primary" >Next</button>
          </div>
        </form>
        <form class="d-none mt-4 parent__details form-group" #parentsTab>
          <div class="p-2">
            <label for="firstName" class="form-label">Parent/Guardian First Name</label>
            <input type="text" id="firstName" class="form-control" />
          </div>
          <div class="p-2">
            <label for="lastName" class="form-label">Parent/Guardian Last Name</label>
            <input type="text" id="lastName" class="form-control" />
          </div>
          <div class="p-2">
            <label for="nrcNo" class="form-label"> Parent/Guardian NRC No.</label>
            <input type="text" id="nrcNo" class="form-control" [formControl]="toControl(contactsForm.controls['parentNrc'])" />
          </div>
          <div class="p-2">
            <label for="gender" class="form-label">Gender</label>
            <select type="text" id="gender" class="form-select">
              <option disabled selected value="0">Select gender</option>
              <option value="m">Male</option>
              <option value="f">Female</option>
            </select>
          </div>
          <div class="p-2">
            <label for="relationship" class="form-label">Relationship with child</label>
            <select id="relationship" class="form-select">
              <option value="0" selected disabled></option>
              <option value="parent">Parent</option>
              <option value="uncle">Uncle/Aunt</option>
              <option value="grandparent">Grandparent</option>
              <option value="sibling">Sibling</option>
              <option value="cousin">Cousin</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="p-2">
            <label for="homeAddress" class="form-label">Home address</label>
            <input type="text" id="homeAddress" class="form-control" />
          </div>
          <div class="p-2">
            <label for="maritalStatus" class="form-label">Marital Status</label>
            <select id="maritalStatus" class="form-select">
              <option value="0" disabled selected></option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </div>
          <div class="p-2">
            <label for="nrcFront" class="form-label">NRC (front side)</label>
            <input type="file" id="nrcFront" class="form-control" />
          </div>
          <div class="p-2">
            <label for="nrcBack" class="form-label">NRC (back side)</label>
            <input type="file" id="nrcBack" class="form-control" />
          </div>
          <div class="p-2 d-flex" style="justify-content: flex-end;">
            <button type="button" class="btn btn-primary">Next</button>
          </div>
        </form>
        <form class="d-none mt-4 documents form-group" #documentsTab>
        </form>
      </div>

    </div>
  </section>
  `,
  styleUrl: './admission.component.css'
})
export class AdmissionComponent implements OnInit, AfterViewInit {
  title = 'app-admission'

  @ViewChild('contactsTabHead', {static: true}) contactsTabHead? : ElementRef;
  @ViewChild('childsTabHead', {static: true}) childsTabHead? : ElementRef;
  @ViewChild('parentsTabHead', {static: true}) parentsTabHead? : ElementRef;
  @ViewChild('documentsTabHead', {static: true}) documentsTabHead? : ElementRef;
  
  @ViewChild('contactsTab', {static: true}) contactsTab? : ElementRef;
  @ViewChild('childsTab', {static: true}) childsTab? : ElementRef;
  @ViewChild('parentsTab', {static: true}) parentsTab? : ElementRef;
  @ViewChild('documentsTab', {static: true}) documentsTab? : ElementRef;


  tabHeads:ElementRef[] = [];
  tabBodies:ElementRef[] = [];
  childrenForms: any[] = [];
  child : Pupil | undefined = undefined;

  errorMessages : string[] = [];
  parentExists : boolean = false;

  contactsForm : FormGroup = new FormGroup({
    parentEmail: new FormControl<string>(''),
    parentPhone: new FormControl<string>(''),
    parentNrc: new FormControl<string>(''),
    existingChildren: new FormControl<boolean>(false)
  });

  childDetailsForm : FormGroup = new FormGroup({
    firstName: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    dateOfBirth: new FormControl<Date>(new Date()),
    gender: new FormControl<string>(''),
    homeAddress: new FormControl<string>(''),
    lastGrade: new FormControl<number>(0),
    profilePic: new FormControl<File|null>(null),
    hasSpecialNeeds: new FormControl<boolean>(false),
    specialNeed: new FormControl<string>('')
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
    this.contactsForm.controls['parentEmail'].setValue('');
    this.contactsForm.controls['parentPhone'].setValue('');
    this.contactsForm.controls['existingChildren'].setValue(false);

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

  addUploadFile(event:any):void {
    this.profilePic = event.target.files[0];
  }

  commitChildDetails():void {
    let firstName = this.childDetailsForm.controls['firstName'].value;
    let lastName = this.childDetailsForm.controls['lastName'].value;
    let dateOfBirth = new Date(Date.parse(this.childDetailsForm.controls['dateOfBirth'].value));
    let homeAddress = this.childDetailsForm.controls['homeAddress'].value;
    let lastGrade = this.childDetailsForm.controls['lastGrade'].value;
    let hasSpecialNeeds = this.childDetailsForm.controls['hasSpecialNeeds'].value;
    let specialNeed = this.childDetailsForm.controls['specialNeed'].value;
    let gender = this.childDetailsForm.controls['gender'].value;
    
    let validFirstName = firstName !== '';
    let validLastName = lastName !== '';
    let validGender = gender !== '';
    let validDoB = new Date().getFullYear() - dateOfBirth.getFullYear() >= 2;
    let validGrade = lastGrade !== 0;
    let validSpecialNeed = hasSpecialNeeds?specialNeed !== '': true;
    let validProfilePic = this.profilePic !== undefined;
    let validHomeAddress = homeAddress !== '';
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

    if(!validProfilePic) {
      this.errorMessages.push('You haven\'t selected a image to upload');
      validEntries = false;
    }    

    if (!validEntries) {
      return;
    }


    this.child =  {
      pupilId: v7(),
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      dateOfBirth: dateOfBirth,
      profilePic: this.profilePic,
      parentNo: 0,
      homeAddress: homeAddress,
      parentContact: this.contactsForm.controls['parentPhone'].value,
      isAccepted: false,
      hasSpecialNeeds: hasSpecialNeeds,
      specialNeed: specialNeed,
      currentGrade: lastGrade
    }

    console.debug(this.child);

    const addChildHttp = this.admissionService.addChildDetails(this.child);

    addChildHttp.pipe(
      map(res => {
        console.debug(res);
      })
    ).subscribe({
      next: res => {
        this.changeTabFocus('parent');
      }
    })
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
    const email = String(this.contactsForm.controls['parentEmail'].value);
    const phone = String(this.contactsForm.controls['parentPhone'].value);
    const existingChildren = this.contactsForm.controls['existingChildren'].value;

    console.debug(`Validating details... ${email} ${phone} ${existingChildren}`)
    
    let validEntries = true;
    this.errorMessages = [];

    if (email === '') {
      this.errorMessages.push("Email field is empty!");
      validEntries = false;
    }
    
    if (phone === '') {
      this.errorMessages.push("Phone field is empty");
      validEntries = false;
    }

    if (!email.includes('@') && email !== '') {
      this.errorMessages.push('Please enter a valid email address');
      validEntries = false;
    }

    if(!(phone.startsWith('+2609') || phone.startsWith('2609') || phone.startsWith('09')) && phone !== '') {
      this.errorMessages.push('Phone number is invalid, enter a valid Zambian phone number');
      validEntries = false;
    }

    if(!validEntries) {
      return;
    }

    // localStorage.setItem('email', email);
    // localStorage.setItem('phone', phone);
    // localStorage.setItem('existingChildren', existingChildren);

    this.errorMessages = [];

    this.admissionService.verifyContacts(email, phone).pipe(
      map((res) => {
        console.log(res);
      })
    ).subscribe({
      next: (res) => {
        this.renderer.removeClass(this.childsTabHead?.nativeElement, 'd-none');
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
      this.documentsTabHead?.nativeElement
    ]

    this.tabBodies = [
      this.contactsTab?.nativeElement,
      this.childsTab?.nativeElement,
      this.parentsTab?.nativeElement,
      this.documentsTab?.nativeElement,
    ];
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

    } else if(active === 'document') {
      this.tabHeads.forEach((el) => {
        if(this.containsClass(el, 'selected__tab') && el !== this.documentsTabHead?.nativeElement) {
          this.renderer.removeClass(el, 'selected__tab');
          this.renderer.addClass(el, 'tab__item');
        }
      });

      this.renderer.removeClass(this.documentsTabHead?.nativeElement, 'tab__item');
      this.renderer.addClass(this.documentsTabHead?.nativeElement, 'selected__tab');
      
      this.tabBodies.forEach((el) => {
        if(el !== this.documentsTab?.nativeElement) {
          this.renderer.addClass(el, 'd-none');
        }
      })

      this.renderer.removeClass(this.documentsTabHead?.nativeElement, 'd-none');
      this.renderer.removeClass(this.documentsTab?.nativeElement, 'd-none');

    }

  }

  containsClass(elementRef:any, className:string):boolean {
    return elementRef.classList.contains(className);
  }
  
}
