import { Component, OnInit, SecurityContext } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css'],
})
export class FormLoginComponent implements OnInit {
  formGroup!: FormGroup;
  error!: string;

  constructor(
    private service: AuthServiceService,
    private router: Router,
    private rout: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[^`~!#$%\^&*()_+={}|[\]\\:';"<>?,/]*$/),
        (AC: AbstractControl) => {
          const value = AC.value;
          const sanitizedValue = this.sanitizer.sanitize(
            SecurityContext.HTML,
            value
          );
          const isSafe = sanitizedValue === value;

          if (isSafe) {
            return null;
          } else {
            return { unsafeValue: true };
          }
        },
        Validators.pattern(
          '^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]{2,}[.][A-Za-z]{2,}$'
        ),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        (AC: AbstractControl) => {
          const value = AC.value;
          const sanitizedValue = this.sanitizer.sanitize(
            SecurityContext.HTML,
            value
          );
          const isSafe = sanitizedValue === value;

          if (isSafe) {
            return null;
          } else {
            return { unsafeValue: true };
          }
        },
      ]),
    });
  }
  submit() {
    console.log(this.formGroup.get('email'));
    this.service.login(this.formGroup).subscribe({
      next: (response) => {
        this.service.LoggedIn = true;
        localStorage.setItem('logged', JSON.stringify(true));
        this.error = '';
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.error = 'login ou senha invalida';
        console.log('deu erro barao, tai o erro pra tu: ' + error.message);
        console.log(error);
      },
    });
  }
  change() {
    console.log(this.formGroup.get('email'));
  }
  get formV() {
    return this.formGroup.valid;
  }
  get email() {
    return this.formGroup.get('email');
  }

  get password() {
    return this.formGroup.get('password');
  }
}
