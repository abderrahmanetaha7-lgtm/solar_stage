import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

import BoltIcon from "@mui/icons-material/Bolt";
import BuildIcon from "@mui/icons-material/Build";
import VerifiedIcon from "@mui/icons-material/Verified";
import SavingsIcon from "@mui/icons-material/Savings";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const features = [
  {
    icon: <BoltIcon sx={{ fontSize: 40, color: "#f5c542" }} />,
    title: "Solutions solaires abordables",
    desc: "Des systèmes solaires adaptés à tous les budgets, pour les particuliers et les entreprises.",
  },
  {
    icon: <BuildIcon sx={{ fontSize: 40, color: "#4caf50" }} />,
    title: "Installation professionnelle",
    desc: "Des techniciens certifiés assurent une installation sûre et propre.",
  },
  {
    icon: <VerifiedIcon sx={{ fontSize: 40, color: "#2196f3" }} />,
    title: "Produits de haute qualité",
    desc: "Panneaux solaires et batteries fiables avec garantie à long terme.",
  },
  {
    icon: <SavingsIcon sx={{ fontSize: 40, color: "#ff9800" }} />,
    title: "Économisez sur vos factures d’électricité",
    desc: "Réduisez vos coûts énergétiques grâce à une énergie solaire propre.",
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 40, color: "#9c27b0" }} />,
    title: "Service après-vente",
    desc: "Nous vous accompagnons même après l’installation, à tout moment.",
  },
  {
    icon: <LocalShippingIcon sx={{ fontSize: 40, color: "#00bcd4" }} />,
    title: "Livraison rapide",
    desc: "Livraison et service rapides dans plusieurs régions.",
  },
];

export default function WhyChooseUs() {
  return (
    <Box sx={{ py: 6 }}>
      <Container>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          Pourquoi nous choisir
        </Typography>

        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Des solutions solaires intelligentes conçues pour économiser l’énergie
          et l’argent
        </Typography>

        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          {features.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card
                sx={{
                  border: "2px solid black",
                  borderRadius: "15px",
                  height: "100%",
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 2 }}>{item.icon}</Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
