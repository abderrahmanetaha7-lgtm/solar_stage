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
import { useTranslation } from "react-i18next";

const features = [
  {
    icon: <BoltIcon sx={{ fontSize: 40, color: "#f5c542" }} />,
    title: "home.features.items.affordable.title",
    desc: "home.features.items.affordable.description"
  },
  {
    icon: <BuildIcon sx={{ fontSize: 40, color: "#4caf50" }} />,
    title: "home.features.items.installation.title",
    desc: "home.features.items.installation.description"
  },
  {
    icon: <VerifiedIcon sx={{ fontSize: 40, color: "#2196f3" }} />,
    title: "home.features.items.quality.title",
    desc: "home.features.items.quality.description"
    
  },
  {
    icon: <SavingsIcon sx={{ fontSize: 40, color: "#ff9800" }} />,
    title: "home.features.items.saving.title",
    desc: "home.features.items.saving.description"
    
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 40, color: "#9c27b0" }} />,
    title: "home.features.items.support.title",
    desc: "home.features.items.support.description"
    
  },
  {
    icon: <LocalShippingIcon sx={{ fontSize: 40, color: "#00bcd4" }} />,
    title: "home.features.items.delivery.title",
    desc: "home.features.items.delivery.description"
  },
];

export default function WhyChooseUs() {
  const { t } = useTranslation();
  return (
    <Box sx={{ py: 6 }}>
      <Container>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          {t("home.features.title")}
        </Typography>

        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          {t("home.features.subtitle")}
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
                    {t(item.title)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t(item.desc)}
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
