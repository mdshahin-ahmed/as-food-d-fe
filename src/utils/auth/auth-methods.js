// import {useClient} from '@/hooks/pure/useClient'
import { authClient } from "./auth-client";

function login(data) {
  return authClient("login", data);
}

function signUp(signUpData) {
  return authClient("signup", signUpData);
}

function forgotPassword(data) {
  return authClient("forgotpassword", data);
}

function logout() {
  window.localStorage.removeItem("asfood");
}

function setNewPassword(data) {
  return authClient("setpassword", data);
}

export { forgotPassword, login, logout, setNewPassword, signUp };
