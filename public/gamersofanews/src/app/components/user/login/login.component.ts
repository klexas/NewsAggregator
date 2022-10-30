import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/models/user/loginModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  _authService: AuthService;

  constructor(authService: AuthService) {
    this._authService = authService;
   }

  ngOnInit(): void {
    this.email = "";
    this.password = "";
  }

  async userLogin(): Promise<void> {
    const loginModel: LoginModel = {
      email : this.email,
      password: this.password
    };

    var result = await this._authService.LoginUser(loginModel);
    // Hoping to get the token from the response;
    if(result) {
      window.location.href="/";
    }
  }
}
