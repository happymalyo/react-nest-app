import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchData, postData } from "../../../api/crud-api";

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
  const [form, setForm] = useState<{ nom_article: string; quantity: string }>({
    nom_article: "",
    quantity: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams(); // For editing an article
  const navigate = useNavigate();
  const token = "your-auth-token"; // Replace with actual token logic

  useEffect(() => {
    if (id) {
      fetchData<{ nom_article: string; quantity: string }>(
        `articles/${id}`
      ).then((res) => {
        if (typeof res == "string") {
          setError(res);
        } else {
          setForm(res || { nom_article: "", quantity: "" });
        }
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
      ? postData(`articles/${id}`, form, "PATCH")
      : postData("articles", form, "POST");

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
        <Typography sx={{ textAlign: "center" }} variant="h4">
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
