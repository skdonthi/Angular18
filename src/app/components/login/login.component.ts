import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SharedModule } from '../../modules/shared.module';
@Component({
  selector: 'xif-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  router = inject(Router);
  authService = inject(AuthService);

  errorMessage: string = '';

  form: FormGroup = new FormGroup(
    {
      username: new FormControl('', {
        validators: [Validators.required],
      }),
      password: new FormControl('', {
        validators: [Validators.required],
      }),
    },
    { updateOn: 'change' }
  );

  login() {
    this.authService.loginUser(this.form.value).subscribe({
      next: (res: any) => {
        console.log(res);

        if (res?.success) {
          this.router.navigate(['dashboard']);
        }
      },
      error: () => {
        this.errorMessage = 'Unknown error occured, unable to login!';
      },
    });
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }
}
