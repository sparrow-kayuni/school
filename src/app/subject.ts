import { Grade } from "./grade";

export interface Subject {
  subjectId: number,
  name: string,
  grade: Grade,
}
