import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Paper,
  Snackbar,
  CircularProgress,
  Alert,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

import { useState } from "react";

import { useTranslation } from "react-i18next";

import { useSettings } from "../hooks/useSettings";

import { sendContactMessage } from "../api/dataApi";

export default function Contact() {
  const { t, i18n } = useTranslation();

  const { settings, loading: settingsLoading } = useSettings();

  /* ================= FORM ================= */

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  /* ================= STATES ================= */

  const [loading, setLoading] = useState(false);

  const [successOpen, setSuccessOpen] = useState(false);

  const [errors, setErrors] = useState({});

  const contactEmail = settings?.email || "moyasol.sol@gmail.com";

  const contactPhone = settings?.phone || "0726553374";

  const contactCity =
    i18n.language === "ar"
      ? settings?.city_ar || t("footer.contact.location")
      : settings?.city_fr || t("footer.contact.location");

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= HANDLE SUBMIT ================= */

  const handleSubmitted = async () => {
    try {
      setLoading(true);

      setErrors({});

      await sendContactMessage(formData);

      setSuccessOpen(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setSuccessOpen(false);
      }, 2500);
    } catch (error) {
      setErrors(error.response?.data?.errors || {});
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          {/* ================= HEADER ================= */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: 5,
              mb: 3,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: {
                  xs: "30px",
                  sm: "40px",
                  md: "50px",
                },
              }}
            >
              {t("contactPage.title")}
            </Typography>

            <Typography
              sx={{
                textAlign: "center",
                color: "text.secondary",
                mt: 2,
              }}
            >
              {t("contactPage.subtitle")}
            </Typography>
          </Box>

          {/* ================= CONTENT ================= */}

          <Grid container spacing={4}>
            {/* ================= FORM ================= */}

            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ borderRadius: 4 }}>
                <CardContent sx={{ p: 4 }}>
                  <Stack spacing={3}>
                    {/* NAME + EMAIL */}

                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={t("contactPage.form.name")}
                          error={!!errors.name}
                          helperText={errors.name?.[0]}
                        />
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t("contactPage.form.email")}
                          error={!!errors.email}
                          helperText={errors.email?.[0]}
                        />
                      </Grid>
                    </Grid>

                    {/* PHONE */}

                    <TextField
                      fullWidth
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t("contactPage.form.phone")}
                      error={!!errors.phone}
                      helperText={errors.phone?.[0]}
                    />

                    {/* SUBJECT */}

                    <TextField
                      fullWidth
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t("contactPage.form.subject")}
                      error={!!errors.subject}
                      helperText={errors.subject?.[0]}
                    />

                    {/* MESSAGE */}

                    <TextField
                      fullWidth
                      multiline
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t("contactPage.form.message")}
                      error={!!errors.message}
                      helperText={errors.message?.[0]}
                    />

                    {/* BUTTON */}

                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={loading}
                      onClick={handleSubmitted}
                      endIcon={
                        !loading && (
                          <SendOutlinedIcon
                            sx={{
                              transform:
                                i18n.language === "ar"
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                            }}
                          />
                        )
                      }
                      sx={{
                        justifyContent: "space-between",
                        borderRadius: 3,
                        height: 52,
                      }}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        t("contactPage.form.button")
                      )}
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* ================= CONTACT INFO ================= */}

            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  borderRadius: 4,
                  background: "transparent",
                  boxShadow: "none",
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  {[
                    {
                      icon: <EmailOutlinedIcon />,
                      label: t("contactPage.info.email"),
                      value: contactEmail,
                    },
                    {
                      icon: <LocalPhoneOutlinedIcon />,
                      label: t("contactPage.info.phone"),
                      value: contactPhone,
                    },
                    {
                      icon: <LocationOnOutlinedIcon />,
                      label: t("contactPage.info.address"),
                      value: contactCity,
                    },
                  ].map((item, index) => (
                    <Paper
                      key={index}
                      sx={{
                        p: 3,
                        mb: 3,
                        display: "flex",
                        gap: 2,
                        borderRadius: 4,
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: 52,
                          height: 52,
                          borderRadius: 3,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "primary.main",
                          color: "#fff",
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </Box>

                      <Box>
                        <Typography fontWeight={700}>{item.label}</Typography>

                        <Typography variant="body2" color="text.secondary">
                          {item.value}
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* ================= MAP ================= */}

          <Paper
            sx={{
              height: {
                xs: 250,
                md: 350,
              },
              borderRadius: 4,
              overflow: "hidden",
              mt: 8,
            }}
          >
            {settingsLoading ? (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <iframe
                title="Google Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={settings?.google_maps || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d86056.64437702732!2d-8.090255461150452!3d31.634594988683734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8d96179e51%3A0x5950b6534f87adb8!2sMarrakesh!5e1!3m2!1sen!2sma!4v1779028641802!5m2!1sen!2sma"}
              />
            )}
          </Paper>
        </Container>
      </Box>

      {/* ================= SUCCESS MESSAGE ================= */}

      <Snackbar
        open={successOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{
            borderRadius: 3,
          }}
        >
          {t("contactPage.successMessage")}
        </Alert>
      </Snackbar>
    </>
  );
}
