import { fetchAPI } from "../utils/api-helper";

// Fonction pour récupérer les utilisateurs
export const fetchData = async <T>(
  pathname: string
): Promise<T | string | undefined> => {
  try {
    const token = localStorage.getItem("authToken");
    const path = `${pathname}`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetchAPI<{
      data?: T;
      message?: string;
      statusCode?: number;
    }>(path, options);
    if (response.statusCode === 401) {
      return "Unauthorized: Invalid or expired token."; // Return the unauthorized error message
    }
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Une erreur s'est produite"
    );
  }
};
