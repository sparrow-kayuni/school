import {Routes} from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import { AdmissionComponent } from './admission/admission.component';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { ParentLoginComponent } from './parent-login/parent-login.component';
import { TeachersComponent } from './teachers/teachers.component';

export const routeConfig : Routes = [
  {path:'', component:LandingComponent},
  {path:'parents', redirectTo:'auth/parent', pathMatch: 'full'},
  {path:'teachers', redirectTo:'auth/teachers', pathMatch: 'full'},
  {path:'parents/:link', component: ParentLoginComponent},
  {path:'teachers/:link', component: TeachersComponent},
  {path:'teachers/:link?message=:message', component: TeachersComponent},
  {path:'auth/teachers', component:TeacherLoginComponent},
  {path:'auth/teachers?message=:message', component:TeacherLoginComponent},
  {path:'auth/parent', component: ParentLoginComponent},
  {path:'admissions', component:AdmissionComponent}
]