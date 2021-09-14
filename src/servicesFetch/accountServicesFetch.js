import { useHistory } from "react-router-dom";
import { BehaviorSubject } from "rxjs";
import { post } from "../servicesHelp/fetch-wrapper";
// import jwt from "jwt-simple";
import base64 from "base-64";
const userSubject = new BehaviorSubject(null);

export const userSubjectValue = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
};

export async function Login(email, password) {
  return post(`http://localhost:4000/accounts/authenticate`, {
    email,
    password,
  }).then((user) => {
    // publish user to subscribers and start timer to refresh token
    userSubject.next(user);
    startRefreshTokenTimer();
    return user;
  });
}
export async function Logout() {
  const history = useHistory();
  // revoke token, stop refresh timer, publish null to user subscribers and redirect to login page
  post(`http://localhost:4000/accounts/revoke-token`, {});
  stopRefreshTokenTimer();
  userSubject.next(null);
  history.push("/account/login");
}

export function forgotPassword(email) {
  return post(`http://localhost:4000/accounts/forgot-password`, { email });
}

export function validateResetToken(token) {
  return post(`http://localhost:4000/accounts/validate-reset-token`, { token });
}

export function resetPassword({ token, password, confirmPassword }) {
  return post(`http://localhost:4000/accounts/reset-password`, {
    token,
    password,
    confirmPassword,
  });
}

export function register(params) {
  return post(`http://localhost:4000/accounts/register`, params);
}

export function verifyEmail(token) {
  return post(`http://localhost:4000/accounts/verify-email`, { token });
}
//helpers handling
async function refreshToken() {
  return post(`http://localhost:4000/accounts/refresh-token`, {}).then(
    (user) => {
      // publish user to subscribers and start timer to refresh token
      userSubject.next(user);
      startRefreshTokenTimer();
      return user;
    }
  );
}
let refreshTokenTimeout;

function startRefreshTokenTimer() {
  // parse json object from base64 encoded jwt token

  const jwtToken = JSON.parse(
    base64.decode(userSubject.value.jwtToken.split(".")[1])
  );

  // set a timeout to refresh the token a minute before it expires
  const expires = new Date(jwtToken.exp * 100);
  const timeout = expires.getTime() - Date.now() - 60 * 1000;
  refreshTokenTimeout = setTimeout(refreshToken, timeout);
}

function stopRefreshTokenTimer() {
  clearTimeout(refreshTokenTimeout);
}
/* const encoded = new Buffer.from(userSubject.value.jwtToken.split(".")[1]);
const jwtTokenString = JSON.stringify(encoded);
const jwtToken = JSON.parse(jwtTokenString);
console.log("2", jwtToken); */
