import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import MailOutlineIcon from "@mui/icons-material/MailOutlineOutlined";
import PhoneIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined";
import BoltIcon from "@mui/icons-material/BoltOutlined";

const Footer = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark"; // Check if dark mode is active

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: isDark ? "#0A0F1C" : "#FFFFFF", // Dynamic background based on theme
        color: isDark ? "#94A3B8" : "#64748B", // Dynamic text color based on theme
        pt: 10, // Top padding
        pb: 4  // Bottom padding
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          sx={{
            justifyContent: "space-between", // Distribute items evenly
            alignItems: "flex-start", // Align items to the top
            rowGap: 4 // Gap between rows
          }}
        >
          {/* Logo Section */}
          <Grid item xs={12} md="auto">
            <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
              {/* Icon container with gradient background */}
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 3,
                  background:
                    "linear-gradient(135deg, #4F8CFF 0%, #FFD54F 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <BoltIcon sx={{ color: "#fff", fontSize: 22 }} />
              </Box>

              {/* Brand name */}
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ color: isDark ? "#E2E8F0" : "#0F172A" }}
              >
                Solar
                <Box component="span" sx={{ color: "#FFD54F" }}>
                  Nova
                </Box>
              </Typography>
            </Stack>

            {/* Company description */}
            <Typography sx={{ maxWidth: 280, lineHeight: 1.7 }}>
              Powering a sustainable future with cutting-edge solar technology
              and premium renewable energy solutions.
            </Typography>
          </Grid>

          {/* Products Section */}
          <Grid item xs={6} md="auto">
            <Typography
              sx={{
                mb: 2, // Bottom margin
                fontWeight: 600,
                color: isDark ? "#E2E8F0" : "#0F172A"
              }}
            >
              Products
            </Typography>

            {/* Product links */}
            <Stack spacing={1.5}>
              <Link href="#" underline="none" sx={{ color: "#3B82F6" }}>
                Solar Panels
              </Link>
              <Link href="#" underline="none" color="inherit">
                Batteries
              </Link>
              <Link href="#" underline="none" color="inherit">
                Inverters
              </Link>
              <Link href="#" underline="none" color="inherit">
                Accessories
              </Link>
            </Stack>
          </Grid>

          {/* Company Section */}
          <Grid item xs={6} md="auto">
            <Typography
              sx={{
                mb: 2, // Bottom margin
                fontWeight: 600,
                color: isDark ? "#E2E8F0" : "#0F172A"
              }}
            >
              Company
            </Typography>

            {/* Company links */}
            <Stack spacing={1.5}>
              <Link href="#" underline="none" color="inherit">
                About Us
              </Link>
              <Link href="#" underline="none" color="inherit">
                Services
              </Link>
              <Link href="#" underline="none" color="inherit">
                Contact
              </Link>
            </Stack>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} md="auto" sx={{ textAlign: { md: "left" } }}>
            <Typography
              sx={{
                mb: 2, // Bottom margin
                fontWeight: 600,
                color: isDark ? "#E2E8F0" : "#0F172A"
              }}
            >
              Contact
            </Typography>

            {/* Contact information items */}
            <Stack spacing={2} alignItems={{ md: "flex-end" }}>
              {/* Email contact */}
              <Stack direction="row" spacing={1.5} alignItems="center">
                <MailOutlineIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2">
                  hello@solarnova.com
                </Typography>
              </Stack>

              {/* Phone contact */}
              <Stack direction="row" spacing={1.5} alignItems="center">
                <PhoneIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2">
                  +1 (555) 123-4567
                </Typography>
              </Stack>

              {/* Address contact */}
              <Stack direction="row" spacing={1.5} alignItems="center">
                <LocationOnIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2">
                  San Francisco, CA
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom Footer Section */}
        <Box
          sx={{
            borderTop: `1px solid ${
              isDark
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.08)"
            }`, // Dynamic border color
            mt: 6, // Top margin
            pt: 3, // Top padding
            textAlign: "center" // Center align text
          }}
        >
          {/* Copyright notice */}
          <Typography variant="body2">
            © 2026 SolarNova. All rights reserved. Built for a brighter future.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;