import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard:boolean=false

  constructor(private afAuth: AngularFireAuth, private toastr: ToastrService, private router: Router) {
    // Check if user data exists in localStorage when the application starts
    // const userData = localStorage.getItem('user');
    // if (userData) {
    //   this.loggedin.next(true);
    // } else {
    //   this.loggedin.next(false);
    // }
  }

  async login(email: string, password: string) {
    try {
      console.log('Attempting to log in with email:', email);
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log('Logged in user:', user);
      this.loadUser();
      this.loggedin.next(true);
      this.isLoggedInGuard=true
      this.toastr.success('Logged in successfully');
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Login error:', error);
      this.toastr.error('Login failed. Please check your credentials.');
    }
  }

  loadUser() {
    this.afAuth.authState.subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user));
    });
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      this.toastr.success('User Logged Out Successfully.');
      localStorage.removeItem('user');
      this.loggedin.next(false); // Set loggedin status to false
      this.isLoggedInGuard=false
      this.router.navigate(['/login']); // Navigate to the login page after logout.
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  }

  isLoggedin() {
    return this.loggedin.asObservable();
  }

  getUserEmail() {
    return this.afAuth.authState.pipe(
      map(user => user?.email || '') // Return an empty string if user is not logged in
    );
  }
}
