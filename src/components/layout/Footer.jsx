import React from "react";
import { Box, Container, Grid, Typography, Link, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import MailOutlineIcon from "@mui/icons-material/MailOutlineOutlined";
import PhoneIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined";
import logo from "../../assets/images/logo.png";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark"; // Detect dark mode

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: isDark ? "#0A0F1C" : "#FFFFFF",
        color: isDark ? "#94A3B8" : "#64748B",
        pt: 10,
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-start",
            rowGap: 4,
          }}
        >
          {/* Logo & description */}
          <Grid xs={12} md="auto">
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }} mb={2}>
              <Box>
                <img src={logo} alt="Logo" style={{ height: 60 }} />
              </Box>
            </Stack>

            <Typography sx={{ maxWidth: 280, lineHeight: 1.7 }}>
              {t("footer.description")}
            </Typography>
          </Grid>

          {/* Products links */}
          <Grid xs={6} md="auto">
            <Typography
              sx={{
                mb: 2,
                fontWeight: 600,
                color: isDark ? "#E2E8F0" : "#0F172A",
              }}
            >
              {t("footer.products.title")}
            </Typography>

            <Stack spacing={1.5}>
              <Link href="#" underline="none" sx={{ color: "#3B82F6" }}>
                {t("footer.products.panels")}
              </Link>
              <Link href="#" underline="none" sx={{ color: "#3B82F6" }}>
                {t("footer.products.batteries")}
              </Link>
              <Link href="#" underline="none" sx={{ color: "#3B82F6" }}>
                {t("footer.products.inverters")}
              </Link>
            </Stack>
          </Grid>

          {/* Company links */}
          <Grid xs={6} md="auto">
            <Typography
              sx={{
                mb: 2,
                fontWeight: 600,
                color: isDark ? "#E2E8F0" : "#0F172A",
              }}
            >
              {t("footer.company.title")}
            </Typography>

            <Stack spacing={1.5}>
              <Link href="#" underline="none" sx={{ color: "#3B82F6" }}>
                {t("footer.company.about")}
              </Link>
              <Link href="#" underline="none" sx={{ color: "#3B82F6" }}>
                {t("footer.company.services")}
              </Link>
              <Link href="#" underline="none" sx={{ color: "#3B82F6" }}>
                {t("footer.company.contact")}
              </Link>
            </Stack>
          </Grid>

          {/* Contact info */}
          <Grid xs={12} md="auto" sx={{ textAlign: { md: "left" } }}>
            <Typography
              sx={{
                mb: 2,
                fontWeight: 600,
                color: isDark ? "#E2E8F0" : "#0F172A",
              }}
            >
              {t("footer.contact.title")}
            </Typography>

            <Stack spacing={2} sx={{ alignItems: { md: "flex-end" } }}>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                <MailOutlineIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2">
                  {t("footer.contact.email")}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                <PhoneIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2">
                  {t("footer.contact.phone")}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                <LocationOnIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2">
                  {t("footer.contact.location")}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom section */}
        <Box
          sx={{
            borderTop: `1px solid ${
              isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
            }`,
            mt: 6,
            pt: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="body2">
            {t("footer.copyright")}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;