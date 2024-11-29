import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Fonction pour récupérer les utilisateurs
export const fetchUsers = async (token: string) => {
  try {
    const response = await api.get("/users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Retourne les données de l'API
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Une erreur s'est produite"
    );
  }
};
