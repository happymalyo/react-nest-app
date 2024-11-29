import React from "react";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { SitemarkIcon } from "../ui/CustomIcons";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function SignUpContent() {
  return (
    <Stack
      sx={{
        flexDirection: "column",
        alignSelf: "center",
        gap: 4,
        maxWidth: 450,
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          position: "fixed",
          top: "1rem",
          left: "5rem",
        }}
      >
        <SitemarkIcon />
      </Box>
      <Card
        style={{
          transform: "rotate(15deg)",
        }}
      >
        <img
          src="./auth/madagaskar-1638_b.jpg"
          alt="Sitemark Icon"
          style={{
            height: "auto",
            width: "auto",
            marginRight: 8,
          }}
        />
      </Card>
    </Stack>
  );
}
