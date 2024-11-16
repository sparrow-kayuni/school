import { Grade } from "./grade";

export interface Pupil {
  pupilId?: string,
  firstName: string,
  lastName: string,
  gender: string,
  dateOfBirth: Date,
  parentNo: number,
  homeAddress: string,
  profilePic?: any,
  parentNrc: string,
  dateJoined?: Date,
  gradeJoined?: Grade,
  currentGrade: any,
  hasSpecialNeeds: boolean,
  specialNeed: string,
  isAccepted: boolean,
  parentRelationship?: string
}
