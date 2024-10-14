import { Parent } from "./parent"
import { Teacher } from "./teacher"

export interface TeacherLogin {
  sessionKey : string,
  teacherId: number,
  time: Date,
  loggedOut: boolean,
}

export interface ParentLogin {
  id : string,
  parentId: number,
  time: Date,
  loggedOut: boolean,
}