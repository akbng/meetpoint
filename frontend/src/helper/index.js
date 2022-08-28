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

export const logoutUser = () =>
  fetch(`${backendURL}/auth/logout`).then((res) => res.json());

export const getRtcToken = ({ channelName }) =>
  fetch(`${backendURL}/auth/generate/token/rtc?channel=${channelName}`, {
    method: "GET",
    headers: {
      Authorization: isAuthenticated().token,
    },
  }).then((res) => res.json());

export const getRtmToken = (uid) =>
  fetch(`${backendURL}/auth/generate/token/rtm?uid=${uid}`, {
    method: "GET",
    headers: {
      Authorization: isAuthenticated().token,
    },
  }).then((res) => res.json());

export const getUpcomingEvents = () =>
  fetch(`${backendURL}/event/user/upcoming`, {
    method: "GET",
    headers: {
      Authorization: isAuthenticated().token,
    },
  }).then((res) => res.json());

export const createEvent = (values) =>
  fetch(`${backendURL}/event`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: isAuthenticated().token,
    },
    body: JSON.stringify(values),
  }).then((res) => res.json());

export const getAllUsers = () =>
  fetch(`${backendURL}/user/all`, {
    method: "GET",
    headers: {
      Authorization: isAuthenticated().token,
    },
  }).then((res) => res.json());

export const getEventById = (eventId) =>
  fetch(`${backendURL}/event/${eventId}`).then((res) => res.json());

export const removeEvent = (eventId) =>
  fetch(`${backendURL}/event/${eventId}`, {
    method: "DELETE",
    headers: {
      Authorization: isAuthenticated().token,
    },
  }).then((res) => res.json());
