import Cookies from "js-cookie";

export const SIGN_IN_BUTTON_TEXT = "Login";
export const SIGN_IN_BUTTON_TEXT_LOADING = "Login...";

export const SIGN_UP_BUTTON_TEXT = "Create your account";
export const CREATE_ACCOUNT_BUTTON_TEXT = "Create account";
export const CREATE_ACCOUNT_BUTTON_TEXT_LOADING = "Creating account...";

export const NEW_ACCOUNT = "Don’t have an Account? ";
export const ALREADY_REGISTERED = "Have an Account?  ";
export const SIGN_UP = "Sign up ";
export const LOGIN = "Login";
export const SHOW_PASSWORD = "Show";
export const WELCOME_BACK_TO_ECOMMERCE = "Welcome back to ECOMMERCE";
export const LOGIN_WELCOME_MESSAGE = "The next gen business marketplace";
export const VERIFY_YOUR_EMAIL = "Verify your email";
export const VERIFY_HEADING = "Enter the 8 digit code you have received on ";
export const VERIFY_BUTTON_TEXT = "Verify";
export const VERIFY_BUTTON_TEXT_LOADING = "Verifying...";
export const INTERESTS_HEADING = "Please mark your interests!";
export const INTERESTS_SUB_HEADING = "We will keep you notified.";
export const INTERESTS_SAVED_HEADING = "My saved interests!";

export const getToken = () => {
  return Cookies.get("authToken");
};

export const getVerifyToken = () => {
  return Cookies.get("isOtpSet");
};
