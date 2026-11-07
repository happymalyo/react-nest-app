import React from "react";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
export default function AppSection({ title, description }: { title: string; description: string }) {
  return <Box><Typography variant="h4" fontWeight={800} gutterBottom>{title}</Typography><Typography color="text.secondary" sx={{ mb: 3 }}>{description}</Typography><Card variant="outlined" sx={{ borderRadius: 3 }}><CardContent sx={{ p: 3 }}><Chip label="Sckoob" color="primary" size="small" sx={{ mb: 2 }} /><Typography variant="h6" fontWeight={700}>Your {title.toLowerCase()} in one place</Typography><Typography color="text.secondary" sx={{ mt: 1 }}>Content stays private and is only requested while you are online.</Typography></CardContent></Card></Box>;
}
