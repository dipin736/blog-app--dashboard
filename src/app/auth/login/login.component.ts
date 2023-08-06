import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auths:AuthService){}

  onSubmit(formValue:any){
    console.log(formValue.value)
    this.auths.login(formValue.email,formValue.password)
  }
}
