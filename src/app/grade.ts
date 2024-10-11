import { Subject } from "./subject";

export interface Grade {
  gradeId: number,
  gradeName: string,
  gradeTeacher: number,
  subjects: Subject[],
}
