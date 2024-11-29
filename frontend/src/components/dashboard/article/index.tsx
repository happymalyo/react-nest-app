import React from "react";
import {
  Box,
  Button,
  IconButton,
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import AddIcon from "@mui/icons-material/Add";

function Article() {
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
        <Typography variant="h4">Customers</Typography>
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Signed Up</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer, index) => (
              <TableRow key={index}>
                <TableCell>
                  <input type="checkbox" />
                </TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.location}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.signedUp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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

export default Article;
