import { CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core'
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {

  const router=inject(Router)
  const toastr=inject(ToastrService)
  const services=inject(AuthService)
  if(services.isLoggedInGuard){
    return true
  }else{
    toastr.warning('You dont have permission to access the page....')
    router.navigate(['/login'])
    return false;
  }
};
