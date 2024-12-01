import axios from "axios";

import { API_URL } from "../constants/config";

// Function to handle login
export const login = async (
  username: string,
  password: string
): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}auth/login`, {
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

// Function to handle registration
export const register = async (
  username: string,
  password: string
): Promise<{ username: string; id: number }> => {
  try {
    const response = await axios.post(`${API_URL}auth/register`, {
      username,
      password,
    });

    // Destructure the response to get username and id
    const { username: user, id } = response.data;

    return { username: user, id };
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Registration failed. Please try again.";
    throw new Error(message);
  }
};
