export class LoginModel {
  email: string;
  password: string;
  token?: string;

  constructor(user: any) {
    this.email = user.email;
    this.password = user.password;
  }
}
