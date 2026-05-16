import React from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";

// 🔥 Replace images with your own paths
import Installation from "../assets/images/Installation.jpg";
import Maintenance from "../assets/images/Maintenance.png";
import experts from "../assets/images/experts.jpg";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

export default function Services() {
  const { t,i18n } = useTranslation();
  const services = [
    {
      title: t("services.list.installation.title"),
      desc: t("services.list.installation.desc"),
      image: Installation,
      items: t("services.list.installation.items", { returnObjects: true }),
    },
    {
      title: t("services.list.maintenance.title"),
      desc: t("services.list.maintenance.desc"),
      image: Maintenance,
      items: t("services.list.maintenance.items", { returnObjects: true }),
    },
    {
      title: t("services.list.consulting.title"),
      desc: t("services.list.consulting.desc"),
      image: experts,
      items: t("services.list.consulting.items", { returnObjects: true }),
    },
  ];

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <>
      <Helmet> 
        <title>
          {i18n.language === "ar"
            ? "خدمات الطاقة الشمسية | تركيب وصيانة الأنظمة الشمسية"
            : "Services solaires | Installation et maintenance de systèmes solaires"}
        </title>
 
        <meta
          name="description"
          content={
            i18n.language === "ar"
              ? "نقدم حلولاً متكاملة في الطاقة الشمسية تشمل الاستشارة، دراسة الموقع، تصميم الأنظمة، تركيب الألواح الشمسية وربطها بالشبكة الكهربائية، بالإضافة إلى الصيانة الدورية، المراقبة المستمرة للأداء، واستبدال القطع لضمان أفضل كفاءة."
              : "Nous proposons des solutions complètes en énergie solaire incluant le conseil, l'étude du site, la conception du système, l'installation des panneaux solaires et leur raccordement au réseau électrique, ainsi que la maintenance régulière, le suivi des performances et le remplacement des composants pour une efficacité optimale."
          }
        />
 
        <meta
          name="keywords"
          content={
            i18n.language === "ar"
              ? "خدمات الطاقة الشمسية, تركيب الألواح الشمسية, صيانة الأنظمة الشمسية, استشارات الطاقة"
              : "services solaires, installation panneaux solaires, maintenance solaire, énergie renouvelable"
          }
        />
 
        <meta
          property="og:title"
          content={
            i18n.language === "ar"
              ? "خدمات الطاقة الشمسية المتكاملة"
              : "Services complets en énergie solaire"
          }
        />

        <meta
          property="og:description"
          content={
            i18n.language === "ar"
              ? "استشارة، تركيب، صيانة، ومراقبة أنظمة الطاقة الشمسية باحترافية عالية."
              : "Conseil, installation, maintenance et suivi des systèmes solaires professionnels."
          }
        />

        <meta property="og:type" content="website" />
 
        <meta property="og:image" content="/solar-services.jpg" />
 
        <meta name="robots" content="index, follow" />
 
        <meta
          httpEquiv="content-language"
          content={i18n.language === "ar" ? "ar" : "fr"}
        />
      </Helmet>
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
              {t("services.title")}
            </Typography>

            <Typography
              sx={{
                color: isDark ? "#94a3b8" : "#555",
                maxWidth: "500px",
                mx: "auto",
              }}
            >
              {t("services.subtitle")}
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
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
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
    </>
  );
}
