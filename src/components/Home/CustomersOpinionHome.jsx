import React, { useState } from "react";
import { Box, Card, Typography, IconButton, Rating } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

// Array of customer testimonials data
const testimonials = [
  {
    text: "SolarNova a transformé nos factures d’électricité. Nous produisons maintenant plus d’énergie que nous en consommons !",
    name: "Jennifer W.",
    role: "Propriétaire",
    rating: 5,
  },
  {
    text: "Service et installation incroyables. Je recommande fortement !",
    name: "David K.",
    role: "Entrepreneur",
    rating: 4,
  },
  {
    text: "J’ai beaucoup réduit ma facture ! Une très bonne expérience.",
    name: "Ahmed B.",
    role: "Client",
    rating: 5,
  },
];

export default function CustomersOpinionHome() {
  // State to track current testimonial index
  const [index, setIndex] = useState(0);

  // Handle previous button click - loop to last testimonial if at first
  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Handle next button click - loop to first testimonial if at last
  const handleNext = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Get current testimonial based on index
  const current = testimonials[index];

  return (
    // Main container with background and padding
    <Box
      sx={{
        textAlign: "center", // Center align all content
        py: 8, // Vertical padding
        backgroundColor: "background.default", // Theme-aware background
        color: "text.primary", // Theme-aware text color
      }}
    >
      {/* Section title */}
      <Typography
        variant="h3"
        component="h2"
        fontWeight="bold"
        sx={{
          fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" }, // Responsive font sizes
          mb: 1,
          marginBottom: "30px", // Additional bottom margin
        }}
      >
        Ce que disent nos clients
      </Typography>

      {/* Testimonial card */}
      <Card
        sx={{
          maxWidth: 600, // Maximum card width
          mx: "auto", // Center horizontally
          p: 4, // Inner padding
          borderRadius: 3, // Rounded corners
          boxShadow: 3, // Shadow elevation
          backgroundColor: "background.paper", // Theme-aware card background
        }}
      >
        {/* Star rating display (read-only) */}
        <Rating value={current.rating} readOnly />

        {/* Testimonial text with italic styling */}
        <Typography mt={2} fontStyle="italic">
          "{current.text}"
        </Typography>

        {/* Customer name */}
        <Typography mt={3} fontWeight="bold">
          {current.name}
        </Typography>

        {/* Customer role */}
        <Typography variant="body2" color="text.secondary">
          {current.role}
        </Typography>
      </Card>

      {/* Navigation buttons container */}
      <Box mt={3}>
        {/* Previous button */}
        <IconButton onClick={handlePrev} sx={{ color: "text.primary" }}>
          <ArrowBack />
        </IconButton>

        {/* Next button */}
        <IconButton onClick={handleNext} sx={{ color: "text.primary" }}>
          <ArrowForward />
        </IconButton>
      </Box>
    </Box>
  );
}
