import { deleteApi, getApi, postApi } from './apiPromise';

let baseUserUrl = `http://localhost:8000/api`;
let token = `Generate token`;

export async function api_createUser({ name, email, password }) {
  let url = `${baseUserUrl}/user/create`;
  let headers = {
    'Content-Type': 'application/json',
  };
  let body = {
    name: name,
    email: email,
    password: password,
    role: 'user',
  };
  return postApi(url, body, headers);
}

export async function api_verifyUser({ userId, OTP }) {
  let url = `${baseUserUrl}/user/verify-email`;
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
  let url = `${baseUserUrl}/user/resend-email-verification-token`;
  let headers = {
    'Content-Type': 'application/json',
  };
  let body = {
    userId: userId,
  };
  return postApi(url, body, headers);
}

export async function api_signIn({ email, password }) {
  let url = `${baseUserUrl}/user/sign-in`;
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
  let url = `${baseUserUrl}/user/forget-password`;
  let headers = {
    'Content-Type': 'application/json',
  };
  let body = {
    email: email,
  };
  return postApi(url, body, headers);
}

export async function api_resetPassword({ token, userId, newPassword }) {
  let url = `${baseUserUrl}/user/reset-password`;
  let headers = {
    'Content-Type': 'application/json',
  };
  let body = {
    token: token,
    userId: userId,
    newPassword: newPassword,
  };
}

export async function api_createActor({ formData }) {
  let url = `${baseUserUrl}/actor/create`;
  let headers = {
    authorization: 'Bearer ' + token,
    'content-type': 'multipart/form-data',
  };
  let form = formData;
  return postApi(url, form, headers);
}

export async function api_updateActor({ formData, id }) {
  let url = `${baseUserUrl}/actor/update/${id}`;
  let headers = {
    authorization: 'Bearer ' + token,
    'content-type': 'multipart/form-data',
  };
  let form = formData;
  return postApi(url, form, headers);
}

export async function api_searchActorAdmin({ name }) {
  let url = `${baseUserUrl}/actor/search?name=${name}`;
  let headers = {
    authorization: 'Bearer ' + token,
  };
  return getApi(url, headers);
}

export async function api_searchActor({ name }) {
  let url = `${baseUserUrl}/actor/search?name=${name}`;
  let headers = {};
  return getApi(url, headers);
}

export async function api_deleteActor({ id }) {
  let url = `${baseUserUrl}/actor/${id}`;
  let headers = {
    authorization: 'Bearer ' + token,
  };
  return deleteApi(url, '', headers);
}

export async function api_latestActor() {
  let url = `${baseUserUrl}/actor/latest-uploads`;
  let headers = {};
  return getApi(url, headers);
}

export async function api_getActors() {
  let url = `${baseUserUrl}/actor/actorsUser`;
  let headers = {};
  return getApi(url, headers);
}
