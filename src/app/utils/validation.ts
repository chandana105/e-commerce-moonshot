export const checkEmailAndPassword = (
  email: string,
  password: string,
): string => {
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isValidPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isValidEmail) return "Please enter a valid email address";
  if (!isValidPassword)
    return "Your password must contain between 8 and above characters.";

  return ""; // Returning an empty string to indicate no errors
};

export const checkFullName = (fullName: string): string => {
  const isValidFullName = /^[a-zA-Z]{3,}(?: [a-zA-Z]{3,}){1,}$/.test(fullName);

  if (!isValidFullName) return "Please enter a valid full Name";

  return ""; // Returning an empty string to indicate no errors
};

export const checkSignUpValidations = (
  fullName: string,
  email: string,
  password: string,
): string => {
  const validation1 = checkEmailAndPassword(email, password);
  const validation2 = checkFullName(fullName);

  if (validation1 && validation2) {
    return `${validation1} ${validation2}`;
  }

  return validation1 || validation2 || ""; //  empty string as default
};
