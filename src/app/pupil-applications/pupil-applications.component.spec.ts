import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupilApplicationsComponent } from './pupil-applications.component';

describe('PupilApplicationsComponent', () => {
  let component: PupilApplicationsComponent;
  let fixture: ComponentFixture<PupilApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PupilApplicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PupilApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
