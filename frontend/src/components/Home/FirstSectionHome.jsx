import React from "react";
import imgHome from "../../assets/images/imgHome.png";

import { Box, Container, Typography, Button } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function FirstSectionHome() {
  const { t, i18n } = useTranslation();

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden", // IMPORTANT
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* BACKGROUND IMAGE */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage: `url(${imgHome})`,
          backgroundSize: "cover",
          backgroundPosition: {
            xs: "center",
            sm: "center",
            md: "right center",
          },
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* OVERLAY */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: {
            xs: "rgba(16,39,64,0.65)",
            md: "linear-gradient(to right, rgba(16,39,64,0.75) 40%, rgba(13,27,42,0.1))",
          },
        }}
      />

      {/* CONTENT */}
      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          position: "relative",
          zIndex: 2,
          px: {
            xs: 2,
            sm: 3,
            md: 5,
          },
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: {
              xs: "100%",
              md: "600px",
            },

            textAlign: {
              xs: "center",
              md: "left",
            },

            display: "flex",
            flexDirection: "column",

            alignItems: {
              xs: "center",
              md: "flex-start",
            },

            justifyContent: "center",
          }}
        >
          {/* TITLE */}
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              color: "#fff",

              fontSize: {
                xs: "2rem",
                sm: "2.6rem",
                md: "3.2rem",
                lg: "4rem",
              },

              lineHeight: 1.2,
              mb: 3,
            }}
          >
            {t("home.hero.title")}
          </Typography>

          {/* DESCRIPTION */}
          <Typography
            sx={{
              color: "#fff",

              fontSize: {
                xs: "0.95rem",
                sm: "1rem",
                md: "1.1rem",
              },

              lineHeight: 1.8,

              mb: 4,

              maxWidth: {
                xs: "95%",
                sm: "80%",
                md: "100%",
              },
            }}
          >
            {t("home.hero.description")}
          </Typography>

          {/* BUTTONS */}
          <Box
            sx={{
              display: "flex",

              flexDirection: {
                xs: "column",
                sm: "row",
              },

              gap: 2,

              width: {
                xs: "100%",
                sm: "auto",
              },

              alignItems: "center",

              justifyContent: {
                xs: "center",
                md: "flex-start",
              },
            }}
          >
            <Button
              variant="contained"
              component={RouterLink}
              to="/products"
              endIcon={
                i18n.language === "ar" ? (
                  <ArrowBackIcon />
                ) : (
                  <ArrowForwardIcon />
                )
              }
              sx={{
                width: {
                  xs: "100%",
                  sm: "auto",
                },

                py: 1.5,
                px: 4,

                fontWeight: 700,

                color: "#000",

                borderRadius: 2,

                whiteSpace: "nowrap",

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
                width: {
                  xs: "100%",
                  sm: "auto",
                },

                py: 1.5,
                px: 4,

                borderRadius: 2,

                borderColor: "primary.main",

                color: "#fff",

                "&:hover": {
                  borderColor: "primary.main",
                  backgroundColor: "rgba(255,255,255,0.08)",
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
