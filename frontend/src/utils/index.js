export const authenticate = (token) => {
  if (typeof window !== "undefined")
    return localStorage.setItem("token", JSON.stringify(token));
  else return false;
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") return false;
  return JSON.parse(localStorage.getItem("token"));
};
