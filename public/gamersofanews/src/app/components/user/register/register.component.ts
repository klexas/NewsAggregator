import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterModel } from 'src/app/models/user/registerModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  _authService: AuthService;
  errorMessage: string = '';
  _router: Router;
  email: string = '';
  username: string = '';
  password: string = '';
  passwordConfirm: string = '';

  constructor(authService: AuthService, router: Router) {
    this._authService = authService;
    this._router = router;
   }

  ngOnInit(): void {
  }

  async register(): Promise<void> {
    console.log("Registering");
    // TODO: Validate input
    if(this.passwordConfirm !== this.password){
      // Add Logger // toast
      this.errorMessage = "Passwords do not match";
      return;
    }
    const registerDetails: RegisterModel = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    var result = await this._authService.RegisterUser(registerDetails);
    if(!result) {
      this.errorMessage = "Could not register. Please try again.";
      return;
    }
    this._authService.setToken(result);
    window.location.href="/";
   }
}
