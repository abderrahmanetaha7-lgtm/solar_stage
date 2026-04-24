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
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: isDark ? "#0A0F1C" : "#FFFFFF",
        color: isDark ? "#94A3B8" : "#64748B",
        pt: 10,
        pb: 4
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-start",
            rowGap: 4
          }}
        >
          {/* 🔹 Logo */}
          <Grid item xs={12} md="auto">
            <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
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

            <Typography sx={{ maxWidth: 280, lineHeight: 1.7 }}>
              Powering a sustainable future with cutting-edge solar technology
              and premium renewable energy solutions.
            </Typography>
          </Grid>

          {/* 🔹 Products */}
          <Grid item xs={6} md="auto">
            <Typography
              sx={{
                mb: 2,
                fontWeight: 600,
                color: isDark ? "#E2E8F0" : "#0F172A"
              }}
            >
              Products
            </Typography>

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

          {/* 🔹 Company */}
          <Grid item xs={6} md="auto">
            <Typography
              sx={{
                mb: 2,
                fontWeight: 600,
                color: isDark ? "#E2E8F0" : "#0F172A"
              }}
            >
              Company
            </Typography>

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

          {/* 🔹 Contact */}
          <Grid item xs={12} md="auto" sx={{ textAlign: { md: "right" } }}>
            <Typography
              sx={{
                mb: 2,
                fontWeight: 600,
                color: isDark ? "#E2E8F0" : "#0F172A"
              }}
            >
              Contact
            </Typography>

            <Stack spacing={2} alignItems={{ md: "flex-end" }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <MailOutlineIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2">
                  hello@solarnova.com
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1.5} alignItems="center">
                <PhoneIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2">
                  +1 (555) 123-4567
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1.5} alignItems="center">
                <LocationOnIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2">
                  San Francisco, CA
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        {/* 🔻 Bottom */}
        <Box
          sx={{
            borderTop: `1px solid ${
              isDark
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.08)"
            }`,
            mt: 6,
            pt: 3,
            textAlign: "center"
          }}
        >
          <Typography variant="body2">
            © 2026 SolarNova. All rights reserved. Built for a brighter future.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;