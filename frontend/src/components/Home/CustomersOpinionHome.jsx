import React, { useState } from "react";
import { Box, Card, Typography, IconButton, Button } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const testimonials = [
  {
    text: "testimonials.1.text",
    name: "Jennifer W.",
    role: "Propriétaire",
    rating: 5,
  },
  {
    text: "testimonials.2.text",
    name: "David K.",
    role: "Entrepreneur",
    rating: 4,
  },
  {
    text: "testimonials.3.text",
    name: "Ahmed B.",
    role: "Client",
    rating: 5,
  },
  {
    text: "testimonials.4.text",
    name: "Ahmed B.",
    role: "Client",
    rating: 5,
  },
  {
    text: "testimonials.5.text",
    name: "Ahmed B.",
    role: "Client",
    rating: 5,
  },
];

export default function CustomersOpinionHome() {
  const { t, i18n } = useTranslation();

  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[index];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        py: 8,
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{
          mb: 5,
          fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
        }}
      >
        {t("home.testimonials.title")}
      </Typography>

      {/* Card Wrapper */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 1, md: 3 },
          width: "100%",
          maxWidth: 900,
        }}
      >
        {/* Left Arrow */}
        <IconButton onClick={handlePrev}>
          {i18n.language === "ar" ? <ArrowForwardIcon /> : <ArrowBackIcon />}
        </IconButton>

        {/* Card */}
        <Card
          sx={{
            flex: 1,
            maxWidth: 700,
            minHeight: 240,
            borderRadius: 4,
            p: { xs: 2, md: 4 },
            boxShadow: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <FormatQuoteIcon sx={{ fontSize: 50, opacity: 0.4, mx: "auto" }} />

          <Typography
            sx={{
              fontSize: "1.2rem",
              lineHeight: 1.6,
              mt: 2,
            }}
          >
            {t(current.text)}
          </Typography>

          <Box
            sx={{
              mt: 3,
              width: 50,
              height: 4,
              backgroundColor: "white",
              opacity: 0.6,
              borderRadius: 10,
              mx: "auto",
            }}
          />
        </Card>
 
        {/* Right Arrow */}
        <IconButton onClick={handleNext}>
          {i18n.language === "ar" ? <ArrowBackIcon /> : <ArrowForwardIcon />}
        </IconButton>
      </Box>
    </Box>
  );
}
