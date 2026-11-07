import React from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

function Home() {
  return <Box><Typography variant="h4" fontWeight={800}>Welcome back 👋</Typography><Typography color="text.secondary" sx={{ mt: 0.5, mb: 3 }}>Here’s what’s happening in your community.</Typography><Grid container spacing={2}>{["Latest discussions", "Open opportunities", "Salary insights"].map((title) => <Grid item xs={12} md={4} key={title}><Card variant="outlined" sx={{ height: "100%", borderRadius: 3 }}><CardContent><Typography variant="h6" fontWeight={700}>{title}</Typography><Typography color="text.secondary" sx={{ mt: 1 }}>Explore new updates from the Sckoob community.</Typography></CardContent></Card></Grid>)}</Grid></Box>;
}
export default Home;
