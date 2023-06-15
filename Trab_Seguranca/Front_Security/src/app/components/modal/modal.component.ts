import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Output() value = new EventEmitter<boolean>();
  otp!: number;
  try: number = 0;
  valid?: boolean;
  errors: { 403: boolean } = {
    403: false,
  };

  constructor(
    private service: AuthServiceService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  validar(event: Event) {
    event.preventDefault();
    this.tokenService.validar(this.otp).subscribe({
      next: (response) => {
        console.log(response.validated);
        if (response.validated) {
          this.tokenService.response = true;
          this.value.emit();
          this.valid = true;

          document.getElementById('closeModal')?.click();
        } else {
          this.tokenService.response = false;

          this.valid = false;

          if (this.try >= 2) {
            document.getElementById('closeModal')?.click();
            this.service.LoggedIn = false;
            localStorage.setItem('logged', JSON.stringify(false));
            setTimeout(() => {
              this.service.logout().subscribe((res) => console.log(res));
              this.router.navigate(['/']);
            }, 1);
          } else {
            this.try = this.try + 1;
          }
        }
      },
      error: (error) => {
        if (error.status === 403) {
          this.errors[403] = true;
          setTimeout(() => {
            this.service.logout().subscribe((res) => console.log(res));
            this.router.navigate(['/']);
            document.getElementById('closeModal')?.click();
          }, 1000);
        }
      },
    });
  }
}
