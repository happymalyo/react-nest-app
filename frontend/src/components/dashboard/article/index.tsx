import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchData, deleteData } from "../../../api/crud-api";

interface IArticle {
  iid_articled: number;
  nom_article: string;
  quantity: number;
}

function Article() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [error, setError] = useState("");
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const refreshArticle = async () => {
    try {
      const result = await fetchData<IArticle[]>("articles");
      if (typeof result == "string") {
        setError(result);
      } else {
        setArticles(result || []);
      }
    } catch (err: any) {
      setError("Session expiré. Please log out and Sign in..");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      refreshArticle();
    };

    if (token) {
      loadArticles();
    } else {
      toast.error("Veuillez  vous connecter s'il vous plaît.");
      navigate("/login");
    }
  }, [token]);

  // Handle delete click and open the dialog
  const handleDelete = (id: number) => {
    setArticleToDelete(id);
    setOpenDeleteDialog(true);
  };

  // Close the delete confirmation dialog
  const handleCloseDialog = () => {
    setOpenDeleteDialog(false);
    setArticleToDelete(null);
  };

  // Confirm delete and update articles list
  const handleConfirmDelete = async () => {
    if (articleToDelete) {
      try {
        // Perform the delete request
        // Await the delete request
        await deleteData(`articles/${articleToDelete}`);
        // Refresh the articles list after deletion
        await refreshArticle();
        toast.success("Suppression d'article effectuée");
      } catch (error) {
        setError("Erreur de trouver l'article");
      }
      setOpenDeleteDialog(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filter articles based on search term
  const filteredArticles = articles.filter((article) =>
    article.nom_article.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentArticles = filteredArticles.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  // Calculate the number of pages
  const totalPages = Math.ceil(filteredArticles.length / rowsPerPage);

  // Handle page change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

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
        <Typography variant="h4">Articles</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ textTransform: "none" }}
          component={Link} // This will turn the button into a link
          to="/app/articles/add" // Path for adding a new article
        >
          Ajouter un Article
        </Button>
      </Box>

      {/* Search Bar */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 5 }}>
        <TextField
          variant="outlined"
          placeholder="Chercher le nom de l'article"
          size="small"
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1 }} />,
          }}
          onChange={handleSearchChange}
        />
      </Box>

      {/* Table Section */}
      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error" sx={{ textAlign: "center" }}>
          {error}
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nom de l'article</TableCell>
                <TableCell>Quantité</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredArticles.map((article: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{article.id_article}</TableCell>
                  <TableCell>{article.nom_article}</TableCell>
                  <TableCell>{article.quantity}</TableCell>
                  <TableCell>
                    {/* Edit Icon */}
                    <IconButton
                      color="primary"
                      component={Link}
                      to={`/app/articles/edit/${article.id_article}`} // Navigate to the edit page with the article ID
                      sx={{ marginRight: 1 }}
                    >
                      <EditIcon />
                    </IconButton>

                    {/* Delete Icon */}
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(article.id_article)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Confirmation Dialog for Deleting Article */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDialog}>
        <DialogTitle>Supprimer Article</DialogTitle>
        <DialogContent>
          <p>Voulez vous supprimer cet article ?</p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color="primary"
            disabled={loading}
          >
            Annuler
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="secondary"
            disabled={loading}
          >
            {loading ? "Suppression en cours..." : "Supprimer"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 5,
        }}
      >
        {articles?.length > 0 && (
          <>
            <Typography variant="body2">Nombre par page: 5</Typography>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </>
        )}
      </Box>
    </Box>
  );
}

export default Article;
