import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";

import { SitemarkIcon } from "../ui/CustomIcons";

const items = [
  {
    icon: <AutoFixHighRoundedIcon sx={{ color: "text.secondary" }} />,
    title: "Innovation au cœur de notre textile",
    description:
      "Nous repoussons sans cesse les limites de l'innovation pour vous proposer des tissus aux fonctionnalités uniques, répondant aux exigences des tendances et du marché.",
  },
  {
    icon: <ConstructionRoundedIcon sx={{ color: "text.secondary" }} />,
    title: "Conçu pour durer",
    description:
      "Profitez d'une durabilité inégalée, un investissement durable qui va bien au-delà de vos attentes.",
  },
  {
    icon: <ThumbUpAltRoundedIcon sx={{ color: "text.secondary" }} />,
    title: "Confort et style",
    description:
      "Nous allions confort et design moderne dans chaque tissu, pour que vous puissiez offrir à vos clients des produits à la fois pratiques et élégants.",
  },
];

export default function Content() {
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
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
        }}
      >
        <Typography variant="h4" gutterBottom>
          Accord Knits SA
        </Typography>
      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: "medium" }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}
