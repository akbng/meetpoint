export const registerUser = ({ fullName, email, password, phone }) =>
  fetch("http://localhost:9000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ fullName, email, password, phone }),
  }).then((res) => res.json());

export const loginUser = ({ email, password }) =>
  fetch("http://localhost:9000/api/auth/login", {
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
