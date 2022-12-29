import { postApi } from './apiPromise';

let baseUserUrl = `http://localhost:8000/api/user`;

export async function api_createUser({ name, email, password }) {
  let url = `${baseUserUrl}/create`;
  let headers = {
    'Content-Type': 'application/json',
  };
  let body = {
    name: name,
    email: email,
    password: password,
  };
  return postApi(url, body, headers);
}

export async function api_verifyUser({ userId, OTP }) {
  let url = `${baseUserUrl}/verify-email`;
  let headers = {
    'Content-Type': 'application/json',
  };
  let body = {
    userId: userId,
    OTP: OTP,
  };
  return postApi(url, body, headers);
}

export async function api_resendEmailVerifification({ userId }) {
  let url = `${baseUserUrl}/resend-email-verification-token`;
  let headers = {
    'Content-Type': 'application/json',
  };
  let body = {
    userId: userId,
  };
  return postApi(url, body, headers);
}

export async function api_signIn({ email, password }) {
  let url = `${baseUserUrl}/sign-in`;
  let headers = {
    'Content-Type': 'application/json',
  };
  let body = {
    email: email,
    password: password,
  };
  return postApi(url, body, headers);
}

export async function api_forgotPassword({ email }) {
  let url = `${baseUserUrl}/forget-password`;
  let headers = {
    'Content-Type': 'application/json',
  };
  let body = {
    email: email,
  };
  return postApi(url, body, headers);
}

export async function api_resetPassword({ token, userId, newPassword }) {}
