import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  DialogActions,
  Card,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const ArticleForm = () => {
  const [form, setForm] = useState({ nom_article: "", quantity: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams(); // For editing an article
  const navigate = useNavigate();
  const token = "your-auth-token"; // Replace with actual token logic

  useEffect(() => {
    if (id) {
      // If id is present, we're editing an article, so fetch the existing data
      axios
        .get(`http://localhost:3000/articles/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setForm(response.data);
        })
        .catch((err) => {
          setError(
            err.response?.data?.message || "Error fetching article data"
          );
        });
    }
  }, [id, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const apiCall = id
      ? axios.patch(`http://localhost:3000/articles/${id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        })
      : axios.post("http://localhost:3000/articles", form, {
          headers: { Authorization: `Bearer ${token}` },
        });

    apiCall
      .then(() => {
        navigate("/app/articles"); // Redirect after success
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Error saving article");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Card variant="outlined">
      <Box sx={{ padding: 10, marginTop: 20, maxWidth: 600, margin: "0 auto" }}>
        <Typography sx={{textAlign: "center"}} variant="h4">
          {id ? "Edit Article" : "Add Article"}
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <Box sx={{ mt: 3 }}>
            <TextField
              label="Article Name"
              name="nom_article"
              value={form.nom_article}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={form.quantity}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
          </Box>

          <DialogActions sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              type="submit"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<CancelIcon />}
              onClick={() => navigate("/app/articles")}
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Box>
    </Card>
  );
};

export default ArticleForm;
