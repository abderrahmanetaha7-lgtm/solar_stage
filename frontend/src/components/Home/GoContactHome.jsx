import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTranslation } from "react-i18next";

import ArrowBackIcon from "@mui/icons-material/ArrowBack"; 
import { Link as RouterLink } from "react-router-dom";

export default function GoContactHome() {
  const { t, i18n } = useTranslation();
  return (
    <Box
      sx={{
        px: 3,
        py: 8,
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* Main call-to-action card */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1100px",
          textAlign: "center",
          borderRadius: "20px",
          px: { xs: 3, md: 6 },
          py: { xs: 6, md: 8 },
          backgroundColor: "background.paper",
          color: "text.primary",
          boxShadow: (theme) =>
            theme.palette.mode === "dark"
              ? "0 4px 20px rgba(0,0,0,0.6)"
              : "0 4px 20px rgba(0,0,0,0.08)",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        {/* Main heading */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: "1.8rem", md: "2.2rem" },
          }}
        >
          {t("home.cta.title")}
        </Typography>

        {/* Description text */}
        <Typography
          sx={{
            maxWidth: 550,
            mx: "auto",
            mb: 5,
            color: "text.secondary",
            lineHeight: 1.6,
          }}
        >
          {t("home.cta.description")}
        </Typography>

        {/* Call-to-action button */}
        <Button
        component={RouterLink}
        to="/contact"
          variant="contained"
          endIcon={
            i18n.language === "ar" ? <ArrowBackIcon /> : <ArrowForwardIcon />
          }
          sx={{
            px: 4,
            py: 1.3,
            borderRadius: "999px",
            textTransform: "none",
            fontWeight: 600,
            backgroundColor: "primary.main",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "primary.dark",
              transform: "translateY(-2px)",
            },
          }}
        >
          {t("home.cta.button")}
        </Button>
      </Box>
    </Box>
  );
}
