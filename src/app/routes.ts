import {Routes} from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import { AdmissionComponent } from './admission/admission.component';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { ParentLoginComponent } from './parent-login/parent-login.component';
import { TeachersComponent } from './teachers/teachers.component';
import { TeachersDashboardComponent } from './teachers-dashboard/teachers-dashboard.component';
import { TeacherStudentsComponent } from './teacher-students/teacher-students.component';
import { TeacherTestsComponent } from './teacher-tests/teacher-tests.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { AllTeachersComponent } from './all-teachers/all-teachers.component';
import { PupilApplicationsComponent } from './pupil-applications/pupil-applications.component';

export const routeConfig : Routes = [
  {path:'', component:LandingComponent},
  {path:'parents', redirectTo:'auth/parent', pathMatch: 'full'},
  {path:'parents/:link', component: ParentLoginComponent},
  {path:'dashboard', component: TeachersComponent, 
    children: [
      {path: '', component: TeachersDashboardComponent},
      {path: 'students', component: TeacherStudentsComponent},
      {path: 'tests', component: TeacherTestsComponent},
      {path: 'profile', component: TeacherProfileComponent},
      {path: 'teachers', component: AllTeachersComponent},
      {path: 'pupil-applications', component: PupilApplicationsComponent}
    ]
  },
  {path:'auth/teachers', component:TeacherLoginComponent},
  {path:'auth/parent', component: ParentLoginComponent},
  {path:'admissions', component:AdmissionComponent}
]