import { Injectable } from '@angular/core';
import { Parent } from './parent';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  parents : Parent[] = []

  verifyPassword(parent: Parent, password: string) : boolean {
    return parent.password === password;
  }

  getParentByEmail(email: string) : Parent | undefined {
    return this.parents.find((parent) => parent.email === email);
  }

  constructor() { }
}
