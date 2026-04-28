import React from "react";
import { Box, Container, Grid, Typography, Link, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import MailOutlineIcon from "@mui/icons-material/MailOutlineOutlined";
import PhoneIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined";
import BoltIcon from "@mui/icons-material/BoltOutlined";
import logo from "../../assets/images/logo.png";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark"; // Check if dark mode is active

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: isDark ? "#0A0F1C" : "#FFFFFF", // Dynamic background based on theme
        color: isDark ? "#94A3B8" : "#64748B", // Dynamic text color based on theme
        pt: 10, // Top padding
        pb: 4, // Bottom padding
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          sx={{
            justifyContent: "space-between", // Distribute items evenly
            alignItems: "flex-start", // Align items to the top
            rowGap: 4, // Gap between rows
          }}
        >
          {/* Logo Section */}
          <Grid item xs={12} md="auto">
            <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
              {/* Icon container with gradient background */}
              <Box>
                {/* Brand name */}
                <img src={logo} alt="Logo" style={{ height: 60 }} />
              </Box>
            </Stack>

            {/* Company description */}
            <Typography sx={{ maxWidth: 280, lineHeight: 1.7 }}>
              {t("footer.description")}
            </Typography>
          </Grid>

          {/* Products Section */}
          <Grid item xs={6} md="auto">
            <Typography
              sx={{
                mb: 2, // Bottom margin
                fontWeight: 600,
                color: isDark ? "#E2E8F0" : "#0F172A",
              }}
            >
              {t("footer.products.title")}
            </Typography>

            {/* Product links */}
            <Stack spacing={1.5}>
              <Link href="#" underline="none" sx={{ color: "#3B82F6" }}>
                {t("footer.products.panels")}
              </Link>
              <Link href="#" underline="none"  sx={{ color: "#3B82F6" }}>
                {t("footer.products.batteries")}
              </Link>
              <Link href="#" underline="none"  sx={{ color: "#3B82F6" }}>
                {t("footer.products.inverters")}
              </Link>
            </Stack>
          </Grid>

          {/* Company Section */}
          <Grid item xs={6} md="auto">
            <Typography
              sx={{
                mb: 2, // Bottom margin
                fontWeight: 600,
                color: isDark ? "#E2E8F0" : "#0F172A",
              }}
            >
              {t("footer.company.title")}
            </Typography>

            {/* Company links */}
            <Stack spacing={1.5}>
              <Link href="#" underline="none"  sx={{ color: "#3B82F6" }}>
                {t("footer.company.about")}
              </Link>
              <Link href="#" underline="none"  sx={{ color: "#3B82F6" }}>
                {t("footer.company.services")}
              </Link>
              <Link href="#" underline="none"  sx={{ color: "#3B82F6" }}>
                {t("footer.company.contact")}
              </Link>
            </Stack>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} md="auto" sx={{ textAlign: { md: "left" } }}>
            <Typography
              sx={{
                mb: 2, // Bottom margin
                fontWeight: 600,
                color: isDark ? "#E2E8F0" : "#0F172A",
              }}
            >
              {t("footer.contact.title")}
            </Typography>

            {/* Contact information items */}
            <Stack spacing={2} alignItems={{ md: "flex-end" }}>
              {/* Email contact */}
              <Stack direction="row" spacing={1.5} alignItems="center">
                <MailOutlineIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2">
                  {t("footer.contact.email")}
                </Typography>
              </Stack>

              {/* Phone contact */}
              <Stack direction="row" spacing={1.5} alignItems="center">
                <PhoneIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2">
                  {t("footer.contact.phone")}
                </Typography>
              </Stack>

              {/* Address contact */}
              <Stack direction="row" spacing={1.5} alignItems="center">
                <LocationOnIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2">
                  {t("footer.contact.location")}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom Footer Section */}
        <Box
          sx={{
            borderTop: `1px solid ${
              isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
            }`, // Dynamic border color
            mt: 6, // Top margin
            pt: 3, // Top padding
            textAlign: "center", // Center align text
          }}
        >
          {/* Copyright notice */}
          <Typography variant="body2">{t("footer.copyright")}</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
