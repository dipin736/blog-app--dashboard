// header.component.ts

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userEmail$: Observable<string | undefined> = new Observable<string | undefined>();
  isLoggedin$: Observable<boolean> = new Observable<boolean>();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userEmail$ = this.authService.getUserEmail();
    this.isLoggedin$ = this.authService.isLoggedin();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
