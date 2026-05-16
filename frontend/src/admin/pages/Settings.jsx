import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import PageHeader from "../components/PageHeader";

import { useEffect, useState } from "react";

import { useSettings } from "../../hooks/useSettings";

export default function SettingsPage() {
  const { settings, loading, saveSettings } = useSettings();

  const [form, setForm] = useState({
    store: "",
    email: "",
    phone: "",
    city_fr: "",
    city_ar: "",
    address: "",
    google_maps: "",
    logo: null,
  });

  /* ================= LOAD SETTINGS ================= */

  useEffect(() => {
    if (!settings) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm({
      store: settings.store || "",
      email: settings.email || "",
      phone: settings.phone || "",
      city_ar: settings.city_ar || "",
      city_fr: settings.city_fr || "",
      address: settings.address || "",
      google_maps: settings.google_maps || "",
      logo: null,
    });
  }, [settings]);

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= FILE ================= */

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    setForm((prev) => ({
      ...prev,
      logo: file || null,
    }));
  };

  /* ================= RESET ================= */

  const resetForm = () => {
    if (!settings) return;

    setForm({
      store: settings.store || "",
      email: settings.email || "",
      phone: settings.phone || "",
      city_ar: settings.city_ar || "",
      city_fr: settings.city_fr || "",
      address: settings.address || "",
      google_maps: settings.google_maps || "",
      logo: null,
    });
  };

  /* ================= SAVE ================= */

  const handleSave = async () => {
    const data = new FormData();

    data.append("store", form.store);

    data.append("email", form.email);

    data.append("phone", form.phone);

    data.append("city_ar", form.city_ar);

    data.append("city_fr", form.city_fr);

    data.append("address", form.address);

    data.append("google_maps", form.google_maps);

    if (form.logo) {
      data.append("logo", form.logo);
    }

    await saveSettings(data);
  };

  return (
    <>
      <PageHeader
        title="Paramètres"
        description="Configurez votre boutique et vos préférences."
      />

      <Grid container spacing={3}>
        {/* LEFT */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card
            sx={{
              p: 3,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 3,
              }}
            >
              Informations de la boutique
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <TextField
                name="store"
                label="Nom de la boutique"
                value={form.store}
                onChange={handleChange}
                fullWidth
                size="small"
              />

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    name="email"
                    label="Email de support"
                    value={form.email}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    name="phone"
                    label="Téléphone"
                    value={form.phone}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    name="city_fr"
                    label="Ville"
                    value={form.city_fr}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    sx={{ justifyContent: "flex-end" }}
                    name="city_ar"
                    label="المدينة"
                    value={form.city_ar}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    name="address"
                    label="Adresse"
                    value={form.address}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                  />
                </Grid>
              </Grid>

              <TextField
                name="google_maps"
                label="Lien Google Maps"
                value={form.google_maps}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </Box>
          </Card>
        </Grid>

        {/* RIGHT */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card
            sx={{
              p: 3,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
                border: "2px dashed",
                borderColor: "divider",
                p: 3,
                textAlign: "center",
              }}
            >
              {/* LOGO */}

              <Box
                sx={{
                  width: 90,
                  height: 90,
                  borderRadius: 3,
                  overflow: "hidden",
                  mb: 2,
                  background: "#f5f5f5",
                }}
              >
                <img
                  src={
                    form.logo
                      ? URL.createObjectURL(form.logo)
                      : settings?.logo
                        ? `${import.meta.env.VITE_API_URL}/storage/${settings.logo}`
                        : "/logo.png"
                  }
                  alt="logo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              <Typography variant="body2" fontWeight={600}>
                Télécharger votre logo
              </Typography>

              <Typography variant="caption" color="text.secondary" mb={2}>
                PNG, JPG ou SVG - max 2MB
              </Typography>

              <Button
                variant="outlined"
                size="small"
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                Choisir un fichier
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* ACTIONS */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          mt: 4,
        }}
      >
        <Button variant="outlined" onClick={resetForm} disabled={loading}>
          Annuler
        </Button>

        <Button
          onClick={handleSave}
          disabled={loading}
          variant="contained"
          sx={{
            minWidth: 220,
            bgcolor: "primary",
            "&:hover": {
              opacity: 0.9,
            },
          }}
        >
          {loading ? (
            <CircularProgress size={22} sx={{ color: "white" }} />
          ) : (
            "Enregistrer les modifications"
          )}
        </Button>
      </Box>
    </>
  );
}
