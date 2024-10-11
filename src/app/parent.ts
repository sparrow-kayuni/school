import { Pupil } from "./pupil";

export interface Parent {
  parentNo: number,
  fullName: string,
  lastName: string,
  title: string,
  phone: string,
  email: string,
  password: string,
  isParent: boolean,
  homeAddress: string,
  maritalStatus: string,
  children: Pupil[],
}
