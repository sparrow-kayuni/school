export interface LoginAuthMessage {
  message: string,
  emailExists: boolean,
  passwordValid: boolean
}


export interface SessionAuthMessage {
  message: string,
  sessionExists: boolean,
  sessionExpired: boolean
}

export interface ParentContactMessage {
  message: string,
  parentExists: boolean
}