import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Pagination,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import AddIcon from "@mui/icons-material/Add";
import { fetchUsers } from "../../../api/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function User() {
  const customers = [
    {
      name: "Alcides Antonio",
      email: "alcides.antonio@devias.io",
      location: "Madrid, Comunidad de Madrid, Spain",
      phone: "908-691-3242",
      signedUp: "Mar 8, 2024",
    },
    {
      name: "Marcus Finn",
      email: "marcus.finn@devias.io",
      location: "Carson City, Nevada, USA",
      phone: "415-907-2647",
      signedUp: "Mar 8, 2024",
    },
    {
      name: "Jie Yan",
      email: "jie.yan@devias.io",
      location: "North Canton, Ohio, USA",
      phone: "770-635-2682",
      signedUp: "Mar 8, 2024",
    },
    {
      name: "Nasimiyu Danai",
      email: "nasimiyu.danai@devias.io",
      location: "Salt Lake City, Utah, USA",
      phone: "801-301-7894",
      signedUp: "Mar 8, 2024",
    },
    {
      name: "Iulia Albu",
      email: "iulia.albu@devias.io",
      location: "Murray, Utah, USA",
      phone: "313-812-8947",
      signedUp: "Mar 8, 2024",
    },
  ];

  const [users, setUsers] = useState([]); // Liste des utilisateurs
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [error, setError] = useState("");
  const navigate  = useNavigate();

  const getUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken"); // Récupère le token du localStorage
      if (!token) {
        toast.error("Please fix the errors before submitting.");
        navigate("/login");
        throw new Error("Token manquant. Veuillez vous connecter.");
      }
      console.log("token", token);
      const data = await fetchUsers(token); // Appelle la fonction API
      setUsers(data); // Met à jour l'état des utilisateurs
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers(); // Appelle la fonction getUsers lors du premier rendu
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 8,
        }}
      >
        <Typography variant="h4">Utilisateurs</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button startIcon={<ImportExportIcon />}>Import</Button>
          <Button startIcon={<ImportExportIcon />}>Export</Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ textTransform: "none" }}
          >
            Add
          </Button>
        </Box>
      </Box>

      {/* Search Bar */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 5 }}>
        <TextField
          variant="outlined"
          placeholder="Search customer"
          size="small"
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1 }} />,
          }}
        />
      </Box>

      {/* Table Section */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ textAlign: "center" }}>
          {error}
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>ID</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>
                    <input type="checkbox" />
                  </TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Typography variant="body2">Rows per page: 5</Typography>
        <Pagination count={5} color="primary" />
      </Box>
    </Box>
  );
}

export default User;
