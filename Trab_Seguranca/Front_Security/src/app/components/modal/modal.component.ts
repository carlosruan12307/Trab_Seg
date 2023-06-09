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
  try: number = 0;
  valid?:boolean;

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
        this.valid = true;

        document.getElementById('closeModal')?.click()

      }else{
        this.tokenService.response = false;

        this.valid = false;
        console.log("ue",this.valid)
        if(this.try >= 2){
          document.getElementById('closeModal')?.click()
          this.service.LoggedIn = false;

          setTimeout(() => {
this.service.logout().subscribe((res) => console.log(res))
            this.router.navigate(['/'])
          }, 1);
        }else{
          this.try = this.try + 1;
        }
        }

    },
    error: (error) => {
      console.log(error)
    }
   })

  }

}
