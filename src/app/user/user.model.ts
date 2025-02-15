export class User {
  firstname: string;
  lastname: string;
  email: string;
  gender: string;
  user_role: string;

  constructor(
    firstname: string,
    lastname: string,
    email: string,
    gender: string,
    user_role: string
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.gender = gender;
    this.user_role = user_role;
  }
}
