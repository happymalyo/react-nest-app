// Validation function for email
export const validateEmail = (email: string): string | null => {
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return "Please enter a valid email address.";
  }
  return null;
};

// Validation function for password
export const validatePassword = (password: string): string | null => {
  if (!password || password.length < 6) {
    return "Password must be at least 6 characters long.";
  }
  return null;
};
