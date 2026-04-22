import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  IconButton,
  Rating,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const testimonials = [
  {
    text: "SolarNova transformed our energy bills. We now produce more energy than we consume!",
    name: "Jennifer W.",
    role: "Homeowner",
    rating: 5,
  },
  {
    text: "Amazing service and installation. Highly recommended!",
    name: "David K.",
    role: "Entrepreneur",
    rating: 4,
  },
  {
    text: "خفضت الفاتورة بشكل كبير! تجربة رائعة.",
    name: "Ahmed B.",
    role: "Client",
    rating: 5,
  },
];

export default function CustomersOpinionHome() {
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
        textAlign: "center",
        py: 8,
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
 <Typography
          variant="h3"
          component="h2"
          fontWeight="bold"
          sx={{
            fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
            mb: 1,
            marginBottom : "30px"
          }}
        >What Our Customers Say</Typography>
      <Card
        sx={{
          maxWidth: 600,
          mx: "auto",
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Rating value={current.rating} readOnly />

        <Typography mt={2} fontStyle="italic">
          "{current.text}"
        </Typography>

        <Typography mt={3} fontWeight="bold">
          {current.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {current.role}
        </Typography>
      </Card>

      <Box mt={3}>
        <IconButton onClick={handlePrev} sx={{ color: "text.primary" }}>
          <ArrowBack />
        </IconButton>

        <IconButton onClick={handleNext} sx={{ color: "text.primary" }}>
          <ArrowForward />
        </IconButton>
      </Box>
    </Box>
  );
}