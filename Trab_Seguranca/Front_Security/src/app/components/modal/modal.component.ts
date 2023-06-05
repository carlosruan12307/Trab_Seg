import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Output() value = new EventEmitter<boolean>();
  otp!: number;

  constructor(private service: AuthServiceService,private tokenService: TokenService, private router: Router) {

  }

  validar(event: Event){
    event.preventDefault()
   this.tokenService.validar(this.otp).subscribe({
    next: (response) => {

      console.log(response.validated)
      if(response.validated){
        this.tokenService.response = true;
        this.value.emit()

        document.getElementById('yep1')?.click()

      }else{
        this.tokenService.response = false;
        this.value.emit()

        document.getElementById('yep1')?.click()
        this.service.LoggedIn = false;
        setTimeout(() => {

          this.router.navigate(['/'])
        }, 5000);
      }
    },
    error: (error) => {
      console.log(error)
    }
   })

  }

}
