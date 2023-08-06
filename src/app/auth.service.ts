import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  isAdmin() {
    throw new Error('Method not implemented.');
  }
  isLoggedIn() {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
