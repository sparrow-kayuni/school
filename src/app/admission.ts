import { Parent } from "./parent";
import { Pupil } from "./pupil";

export interface Admission {
  parent?: Parent,
  child?: Pupil,
  admissionDate?: Date
}
