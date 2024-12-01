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
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import AddIcon from "@mui/icons-material/Add";
import { fetchData } from "../../../api/crud-api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  username: string;
}

function User() {
  const [users, setUsers] = useState<User[]>([]); // Liste des utilisateurs
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken"); // Récupère le token du localStorage
      if (!token) {
        toast.error("");
        navigate("/login");
      }
      const result = await fetchData<User[]>("users");
      if (typeof result == "string") {
        setError(result);
      } else {
        setUsers(result || []);
      }

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
          <Button startIcon={<ImportExportIcon />} disabled>
            Import
          </Button>
          <Button startIcon={<ImportExportIcon />} disabled>
            Export
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ textTransform: "none" }}
            disabled
          >
            Ajouter utilisateur
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
      ></Box>
    </Box>
  );
}

export default User;
