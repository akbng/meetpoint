import { isAuthenticated } from "../utils";

const backendURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_BACKEND_URL
    : process.env.REACT_APP_DEV_BACKEND_URL;

export const registerUser = ({ fullName, email, password, phone }) =>
  fetch(`${backendURL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ fullName, email, password, phone }),
  }).then((res) => res.json());

export const loginUser = ({ email, password }) =>
  fetch(`${backendURL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => res.json());

export const getRtcToken = ({ channelName }) =>
  fetch(`${backendURL}/auth/generate/token/rtc/user?channel=${channelName}`, {
    method: "GET",
    headers: {
      Authorization: isAuthenticated().token,
    },
  }).then((res) => res.json());
