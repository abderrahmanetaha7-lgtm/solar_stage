import React from "react";
import imgHome from "../../assets/images/imgHome.png";
import { Box, Container, Typography, Button } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link as RouterLink } from "react-router-dom";
export default function FirstSectionHome() {
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
          width: { xs: "100%", md: "60%" },
          height: "100%",
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
            "linear-gradient(to right, rgba(13,27,42,1) 40%, rgba(13,27,42,0.3))",
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
            Power Your Future with Clean Solar Energy
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "1rem", md: "1.15rem" },
              color: "text.secondary",
              lineHeight: 1.6,
              mb: 4,
            }}
          >
            Premium solar panels, batteries, and smart energy solutions designed
            for a sustainable tomorrow.
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
              Shop Now
              <KeyboardArrowRightIcon sx={{ ml: 1 }} />
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
              Learn More
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
