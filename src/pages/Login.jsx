import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { Link, Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ForgotPassword from "../components/ForgotPassword";

export default function Login() {
  const { t, i18n } = useTranslation();
  const Navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showResetPwd, setShowResetPwd] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleShowResetPwd = () => {
    setShowResetPwd(true);
  };
  
  const handleCloseResetPwd = () => {
    setShowResetPwd(false);
  };

  return (
    <Container maxWidth="sm">
      {/* FULL PAGE WRAPPER */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, sm: 3 },
          backgroundColor: "#f5f7fb",
        }}
      >
        {/* CARD */}
        <Paper
          elevation={8}
          sx={{
            width: "100%",
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
          }}
        >
          {/* HEADER */}
          <Button
            sx={{ textTransform: "none" }}
            startIcon={
              i18n.language === "ar" ? <ArrowForwardIcon /> : <ArrowBackIcon />
            }
            onClick={() => Navigate(-1)}
          >
            {t("signup.common-back")}
          </Button>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: { xs: "1.8rem", sm: "2.2rem" },
              mb: 3 
            }}
          >
            {t("login.login_title")}
          </Typography>

          {/* FORM */}
          <Stack spacing={2.5}>
            {/* EMAIL */}
            <Box>
              <Typography fontWeight={500} mb={1}>
                {t("login.email_label")}
              </Typography>

              <TextField
                fullWidth
                name="email"
                placeholder={t("login.email_placeholder")}
                value={form.email}
                onChange={handleChange}
              />
            </Box>

            {/* PASSWORD */}
            <Box>
              {/* LABEL ROW */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography fontWeight={500}>
                  {t("login.password_label")}
                </Typography>

                <Typography
                  onClick={handleShowResetPwd}
                  variant="body2"
                  sx={{
                    color: "#1976d2",
                    cursor: "pointer",
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {t("login.forgot_password")}
                </Typography>
              </Box>

              <TextField
                fullWidth
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder={t("login.password_placeholder")}
                value={form.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((s) => !s)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* REMEMBER ME */}
            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                />
              }
              label={t("login.remember_me")}
            />

            {/* BUTTON */}
            <Button
              fullWidth
              variant="contained"
              sx={{
                py: 1.4,
                borderRadius: 2,
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              {t("login.login_button")}
            </Button>

            {/* SIGN UP */}
            <Box sx={{ mt: 1, textAlign: "center" }}>
              <Typography variant="body2">
                {t("login.no_account")}
                {"  "}
                <Link component={RouterLink} to="/register">
                  {t("login.signup")}
                </Link>
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Box>
      <ForgotPassword open={showResetPwd} handleClose={handleCloseResetPwd} />
    </Container>
  );
}
