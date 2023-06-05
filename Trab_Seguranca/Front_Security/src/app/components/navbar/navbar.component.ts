import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
constructor(private service: AuthServiceService, private router:Router){

}

logout(){

  this.service.LoggedIn = false;
this.router.navigate(['/'])
}
}
