import axios from "axios";

const API_URL = "http://localhost:3000"; // Replace with your NestJS backend URL

// Function to handle login
export const login = async (
  username: string,
  password: string
): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    const { access_token } = response.data;

    // Store token in local storage
    localStorage.setItem("authToken", access_token);
    return access_token;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Login failed. Please try again.";
    throw new Error(message);
  }
};

// Function to retrieve token
export const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};

// Function to remove token
export const logout = (): void => {
  localStorage.removeItem("authToken");
};
