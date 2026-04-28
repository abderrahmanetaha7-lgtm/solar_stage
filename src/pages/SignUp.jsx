import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  Stack,
  LinearProgress,
  Grid,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export default function SignUp() {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const strength = form.password.length * 10;

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f7fb",
          px: { xs: 2, sm: 3 },
        }}
      >
        <Paper
          elevation={8}
          sx={{
            width: "100%",
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
          }}
        >
          {/* TITLE */}
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: "bold", mb: 3 }}
          >
            {t("signup.title")}
          </Typography>

          <Stack spacing={2.5}>
            {/* NAME */}
            <TextField
              fullWidth
              label={t("signup.full_name")}
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            {/* EMAIL */}
            <TextField
              fullWidth
              label={t("signup.email")}
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            {/* PASSWORD + CONFIRM PASSWORD (SAME LINE RESPONSIVE) */}
            <Grid container spacing={2}>
              {/* PASSWORD */}
              <Grid item xs={12} sm={6}>
                <Box>
                  <TextField
                    fullWidth
                    label={t("signup.password")}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((s) => !s)}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  {form.password && (
                    <Box mt={1}>
                      <LinearProgress variant="determinate" value={strength} />
                    </Box>
                  )}
                </Box>
              </Grid>

              {/* CONFIRM PASSWORD */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t("signup.confirm_password")}
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            {/* BUTTON */}
            <Button
              fullWidth
              variant="contained"
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              {t("signup.button")}
            </Button>

            {/* LOGIN LINK */}
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2">
                {t("signup.already_account")}{" "}
                <span
                  style={{
                    color: "#1976d2",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {t("signup.login")}
                </span>
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}
