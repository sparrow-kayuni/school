import { Parent } from "./parent"
import { Teacher } from "./teacher"

export interface TeacherLogin {
  id : string,
  teacher: Teacher,
  time: Date,
  loggedOut: boolean,
}

export interface ParentLogin {
  id : string,
  parent: Parent,
  time: Date,
  loggedOut: boolean,
}