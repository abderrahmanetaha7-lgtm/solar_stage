import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import PageHeader from "../components/PageHeader";
import { useEffect, useState } from "react";
import { useAdmin } from "../hooks/useAdmin";

export default function SettingsPage() {
  const { settings, updateSettings } = useAdmin();

  const [form, setForm] = useState({
    store: "",
    email: "",
    phone: "",
    logo: null,
  });

  /* ================= LOAD FROM BACKEND ================= */
  useEffect(() => {
    if (settings) {
      setForm({
        store: settings.store || "",
        email: settings.email || "",
        phone: settings.phone || "",
        logo: null,
      });
    }
  }, [settings]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    const data = new FormData();
    data.append("store", form.store);
    data.append("email", form.email);
    data.append("phone", form.phone);

    if (form.logo) {
      data.append("logo", form.logo);
    }

    await updateSettings(data);
  };

  return (
    <>
      <PageHeader
        title="Settings"
        description="Configure your store and preferences."
      />

      <Grid container spacing={3}>
        {/* STORE INFO */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ p: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Store Information
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                name="store"
                label="Store name"
                value={form.store}
                onChange={handleChange}
                fullWidth
                size="small"
              />

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    name="email"
                    label="Support email"
                    value={form.email}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    name="phone"
                    label="Phone"
                    value={form.phone}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                  />
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>

        {/* LOGO */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ p: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
                border: "2px dashed",
                borderColor: "divider",
                p: 2,
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "1.5rem",
                  mb: 2,
                }}
              >
                ☀
              </Box>

              <Typography variant="body2" fontWeight={500}>
                Upload your logo
              </Typography>

              <Typography variant="caption" color="text.secondary" mb={2}>
                PNG or SVG, max 2MB
              </Typography>

              <Button
                variant="outlined"
                size="small"
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                Choose file
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setForm({ ...form, logo: e.target.files[0] })
                  }
                />
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* ACTIONS */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
        <Button variant="outlined">Cancel</Button>

        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "&:hover": {
              opacity: 0.9,
            },
          }}
        >
          Save changes
        </Button>
      </Box>
    </>
  );
}