import { inject } from '@angular/core';
import { Router } from '@angular/router';

export function checkIfValidTokenAdmin() {
  const router = inject(Router);
  let tokenExpired: boolean;
  let token = localStorage.getItem('token');
  let user = localStorage.getItem('user_role');
  if ((!token && !user) || user !== 'admin') {
    router.navigate(['/']);
    return false;
  } else {
    const expiry = JSON.parse(atob(String(token).split('.')[1])).exp;
    tokenExpired = Math.floor(new Date().getTime() / 1000) >= expiry;
    if (tokenExpired) {
      router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}

export function checkIfValidTokenUser() {
  const router = inject(Router);
  let tokenExpired: boolean;
  let token = localStorage.getItem('token');
  let user = localStorage.getItem('user_role');
  if ((!token && !user) || user !== 'user') {
    router.navigate(['/']);
    return false;
  } else {
    const expiry = JSON.parse(atob(String(token).split('.')[1])).exp;
    tokenExpired = Math.floor(new Date().getTime() / 1000) >= expiry;
    if (tokenExpired) {
      router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}

export function checkIfValidTokenSignUpOrRegister() {
  const router = inject(Router);
  let tokenExpired: boolean;
  let token = localStorage.getItem('token');
  if (!token) {
    return true;
  } else {
    const expiry = JSON.parse(atob(String(token).split('.')[1])).exp;
    tokenExpired = Math.floor(new Date().getTime() / 1000) >= expiry;
    if (tokenExpired) {
      return true;
    } else {
      router.navigate(['/']);
      return false;
    }
  }
}

export function checkTokenExpiry() {
  let tokenExpired: boolean;
  let token = localStorage.getItem('token');
  if (!token) {
    return true;
  } else {
    const expiry = JSON.parse(atob(String(token).split('.')[1])).exp;
    tokenExpired = Math.floor(new Date().getTime() / 1000) >= expiry;
    if (tokenExpired) {
      return true;
    } else {
      return false;
    }
  }
}
