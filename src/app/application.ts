import { Parent } from "./parent";
import { Pupil } from "./pupil";

export interface Application {
  applicationNo: number,
  date: Date | undefined,
  parent?: Parent,
  child?: Pupil,
  accepted: boolean
}
