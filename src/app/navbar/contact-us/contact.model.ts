export class Contact {
  fullName: string;
  email: string;
  phone: number;
  message: string;

  constructor(fullName: string, email: string, phone: number, message: string) {
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.message = message;
  }
}
