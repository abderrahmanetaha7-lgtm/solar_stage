import React from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";

// 🔥 Replace images with your own paths
import Installation from "../assets/images/Installation.jpg";
import Maintenance from "../assets/images/Maintenance.png";
import experts from "../assets/images/experts.jpg";

const services = [
  {
    title: "Solar Installation",
    desc: "Professional installation by certified technicians with precision engineering and optimal panel placement.",
    image: Installation,
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
    image: Maintenance,
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
    image: experts,
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
        py: 10,
        background: isDark ? "#020617" : "#f8fafc",
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            mb: 5,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "28px", md: "40px" },
              fontWeight: 600,
              letterSpacing: "-0.5px",
              color: isDark ? "#fff" : "#111",
            }}
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
            Comprehensive solar energy solutions from consultation to
            installation and beyond.
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
                  sx={{ mb: 1, color: "primary.main" }}
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
                        marginLeft:"20px",
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
