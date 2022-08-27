import { logoutUser } from "../helper";

export const authenticate = (token) => {
  if (typeof window !== "undefined")
    return localStorage.setItem("token", JSON.stringify(token));
  else return false;
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  const data = JSON.parse(localStorage.getItem("token"));
  if (data && data.expiry * 1000 > Date.now()) return data;
  else return false;
};

export const logout = async () => {
  if (typeof window === "undefined") return false;
  await logoutUser();
  localStorage.removeItem("token");
  return true;
};

export const setCaretToEnd = (element) => {
  if (!element || typeof window === "undefined") return;
  if (
    typeof window.getSelection !== "undefined" &&
    typeof document.createRange !== "undefined"
  ) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  } else if (typeof document.body.createTextRange != "undefined") {
    const textRange = document.body.createTextRange();
    textRange.moveToElementText(element);
    textRange.collapse(false);
    textRange.select();
  }
  element.focus();
};

export const getCaretCoordinates = () => {
  if (typeof window === "undefined") return;
  let x, y;
  const selection = window.getSelection();
  if (selection.rangeCount !== 0) {
    const range = selection.getRangeAt(0).cloneRange();
    range.collapse(false);
    const rect = range.getClientRects()[0];
    if (rect) {
      x = rect.left;
      y = rect.top;
    }
  }
  return { x, y };
};
