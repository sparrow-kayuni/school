import { Grade } from "./grade";

export interface Pupil {
  pupilNo: number,
  firstName: string,
  lastName: string,
  gender: string,
  dateOfBirth: Date | undefined,
  parentNo: number,
  homeAddress: string,
  parentContact: string,
  hasParent: boolean,
  dateJoined?: Date,
  gradeJoined?: Grade,
  currentGrade?: Grade,
}
