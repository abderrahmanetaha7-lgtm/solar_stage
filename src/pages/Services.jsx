import React from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";

// 🔥 Replace images with your own paths
import Installation from "../assets/images/Installation.jpg";
import Maintenance from "../assets/images/Maintenance.png";
import experts from "../assets/images/experts.jpg";

const services = [
  {
    title: "Installation solaire",
    desc: "Installation professionnelle par des techniciens certifiés. Travail précis et bon placement des panneaux.",
    image: Installation,
    items: [
      "Étude du site",
      "Conception du système",
      "Installation des panneaux",
      "Connexion au réseau",
      "Test du système",
    ],
  },
  {
    title: "Plan de maintenance",
    desc: "Gardez votre système en bon état avec un entretien régulier.",
    image: Maintenance,
    items: [
      "Contrôles trimestriels",
      "Nettoyage des panneaux",
      "Rapports de performance",
      "Support rapide",
      "Remplacement des pièces",
    ],
  },
  {
    title: "Conseil en énergie",
    desc: "Conseils pour mieux utiliser votre énergie et augmenter le retour sur investissement solaire.",
    image: experts,
    items: [
      "Analyse de la consommation",
      "Dimension du système",
      "Estimation du retour sur investissement",
      "Options de financement",
      "Aide et conseils",
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
            Nos services
          </Typography>

          <Typography
            sx={{
              color: isDark ? "#94a3b8" : "#555",
              maxWidth: "500px",
              mx: "auto",
            }}
          >
            Des solutions complètes d’énergie solaire, de la consultation à
            l’installation et au-delà.
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
                        marginLeft: "20px",
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
