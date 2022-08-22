export const authenticate = (token) => {
  if (typeof window !== "undefined")
    return localStorage.setItem("token", JSON.stringify(token));
  else return false;
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") return false;
  const data = JSON.parse(localStorage.getItem("token"));
  if (data && data.expiry * 1000 > Date.now()) return data;
  else return false;
};
