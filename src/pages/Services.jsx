import React from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";

// 🔥 Replace images with your own paths
import img1 from "../assets/images/sol1.webp";
import img2 from "../assets/images/sol2.webp";
import img3 from "../assets/images/sol3.webp";

const services = [
  {
    title: "Solar Installation",
    desc: "Professional installation by certified technicians with precision engineering and optimal panel placement.",
    image: img1,
    items: [
      "Site assessment",
      "Custom system design",
      "Professional mounting",
      "Grid connection",
      "System testing",
    ],
  },
  {
    title: "Maintenance Plans",
    desc: "Keep your system at peak performance with regular maintenance and monitoring.",
    image: img2,
    items: [
      "Quarterly inspections",
      "Panel cleaning",
      "Performance reports",
      "Priority support",
      "Component replacement",
    ],
  },
  {
    title: "Energy Consultation",
    desc: "Expert advice on optimizing your energy consumption and maximizing solar ROI.",
    image: img3,
    items: [
      "Usage analysis",
      "System sizing",
      "ROI projection",
      "Financing options",
      "Incentive guidance",
    ],
  },
];

export default function Services() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        py: 8,
        background: isDark ? "#020617" : "#f8fafc",
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ mb: 1, color: isDark ? "#fff" : "#111" , marginTop:"25px" }}
          >
            Our Services
          </Typography>

          <Typography
            sx={{
              color: isDark ? "#94a3b8" : "#555",
              maxWidth: "500px",
              mx: "auto",
            }}
          >
            Comprehensive solar energy solutions from consultation to installation
            and beyond.
          </Typography>
        </Box>

        {/* Services List */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {services.map((service, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column", // Stack vertically on mobile
                  md: index % 2 === 0 ? "row" : "row-reverse", // Alternate layout on desktop
                },
                alignItems: "center",
                gap: 4,
              }}
            >
              {/* Service Image */}
              <Box
                component="img"
                src={service.image}
                alt={service.title}
                loading="lazy"
                sx={{
                  width: { xs: "100%", md: "45%" },
                  borderRadius: 3,
                  objectFit: "cover",
                }}
              />

              {/* Service Content */}
              <Box
                sx={{
                  width: { xs: "100%", md: "55%" },
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ mb: 1, color: isDark ? "#fff" : "#111" }}
                >
                  {service.title}
                </Typography>

                <Typography
                  sx={{
                    mb: 2,
                    color: isDark ? "#94a3b8" : "#555",
                  }}
                >
                  {service.desc}
                </Typography>

                {/* Features List */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {service.items.map((item, i) => (
                    <Typography
                      key={i}
                      sx={{
                        fontSize: "0.95rem",
                        color: isDark ? "#cbd5f5" : "#333",
                      }}
                    >
                      ✔ {item}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}