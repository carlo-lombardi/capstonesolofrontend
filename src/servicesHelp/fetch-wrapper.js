import { userSubjectValue } from "../servicesFetch/accountServicesFetch";
import { Logout } from "../servicesFetch/accountServicesFetch";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export async function post(url, body) {
  const orderId = localStorage.getItem("orderId");
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      orderid: orderId,
      ...authHeader(url),
    },
    credentials: "include",
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

/*export async function get(url) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(url)
    };
    return fetch(url, requestOptions).then(handleResponse);
}
 export async function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);    
}

// prefixed with underscored because delete is a reserved word in javascript
export async function deleting(url) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(url)
    };
    return fetch(url, requestOptions).then(handleResponse);
}
*/
// helper export async functions

async function authHeader(url) {
  // return auth header with jwt if user is logged in and request is to the api url
  const user = userSubjectValue.userValue;
  const isLoggedIn = user && user.jwtToken;
  const isApiUrl = url.startsWith("http://localhost:4000");
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.jwtToken}` };
  } else {
    return {};
  }
}
async function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if ([401, 403].includes(response.status) && userSubjectValue.userValue) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        Logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
