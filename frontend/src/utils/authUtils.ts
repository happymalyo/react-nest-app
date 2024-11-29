// Validation function for email
export const validateEmail = (email: string): string | null => {
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return "Please enter a valid email address.";
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  // Check minimum length (e.g., 8 characters)
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }

  // Check for at least one special character
  if (!/[!@_#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one special character.";
  }

  return null; // Valid password
};
