import React from "react";
import imgHome from "../../assets/images/imgHome.png";
import { Box, Container, Typography, Button } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function FirstSectionHome() {
  const { t,i18n } = useTranslation();
  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        minHeight: "600px",
        display: "flex",
        alignItems: "center",
        bgcolor: "background.default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* IMAGE */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: { xs: "100%", md: "100%" },
          height: {xs:"85%",md:"100%"},
          backgroundImage: `url(${imgHome})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
          opacity: { xs: 0.8, md: 0.9 },
        }}
      />

      {/* OVERLAY */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(16, 39, 64, 0.53) 40%, rgba(13, 27, 42, 0))",
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Box
          sx={{
            maxWidth: "600px",

            textAlign: { xs: "center", md: "left" },
            mx: { xs: "auto", md: 0 },

            display: "flex",
            flexDirection: "column",
            justifyContent: { xs: "center", md: "flex-start" },
            alignItems: { xs: "center", md: "flex-start" },
          }}
        >
          {/* TITLE */}
          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: "2.2rem",
                sm: "2.4rem",
                md: "2.8rem",
                lg: "3.5rem",
              },
              fontWeight: 700,
              color: "text.secondary",
              mb: 3,
            }}
          >
            {t("home.hero.title")}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "1rem", md: "1.15rem" },
              color: "text.secondary",
              lineHeight: 1.6,
              mb: 4,
            }}
          >
            {t("home.hero.description")}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: { xs: "center", md: "flex-start" },
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              endIcon={
                i18n.language === "ar" ? (
                  <ArrowBackIcon />
                ) : (
                  <ArrowForwardIcon />
                )
              }
              component={RouterLink}
              to="/products"
              sx={{
                fontWeight: 600,
                px: 3,
                py: 1.2,
                color: "#000",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              {t("home.hero.buttons.buy")}
            </Button>

            <Button
              variant="outlined"
              component={RouterLink}
              to="/about"
              sx={{
                borderColor: "primary",
                color: "primary",
                px: 3,
                py: 1.2,
                "&:hover": {
                  borderColor: "primary.main",
                  color: "primary.main",
                },
              }}
            >
              {t("home.hero.buttons.learn")}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
