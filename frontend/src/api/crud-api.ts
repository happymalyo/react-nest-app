import { fetchAPI, postAPI, deleteAPI } from "../utils/api-helper";

// This file contains the fonctions to handle CRUD in rest api request
// If the token does not exist, the request will be unauthorized
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
    }>(path, {}, options);
    if (response.statusCode === 401) {
      return "Unauthorized: Invalid or expired token."; // Return the unauthorized error message
    }
    return response as T;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Une erreur s'est produite"
    );
  }
};

export const postData = async <T>(
  pathname: string,
  body: any,
  method: "POST" | "PATCH"
) => {
  try {
    const token = localStorage.getItem("authToken");
    const path = `${pathname}`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await postAPI<{
      data?: T;
      message?: string;
      statusCode?: number;
    }>(path, body, method, options);

    return response;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Une erreur s'est produite"
    );
  }
};

export const deleteData = async <T>(pathname: string) => {
  try {
    const token = localStorage.getItem("authToken");
    const path = `${pathname}`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await deleteAPI<{
      data?: T;
      message?: string;
      statusCode?: number;
    }>(path, options);

    return response;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Une erreur s'est produite"
    );
  }
};
