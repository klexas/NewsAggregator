export class RegisterModel {
  email: string;
  password: string;
  username: string;

  constructor(user: any) {
    this.email = user.email;
    this.username = user.username;
    this.password = user.password;
  }
}
