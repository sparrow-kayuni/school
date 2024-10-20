import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherTestsComponent } from './teacher-tests.component';

describe('TeacherTestsComponent', () => {
  let component: TeacherTestsComponent;
  let fixture: ComponentFixture<TeacherTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherTestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
