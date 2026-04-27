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
  Checkbox,
  FormControlLabel,
  Stack
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // Controls password visibility toggle (UX improvement for user input)
  const [showPassword, setShowPassword] = useState(false);

  // 🌍 Language state (persisted in localStorage for session continuity)
  const [lang, setLang] = useState(localStorage.getItem("lang") || "fr");

  // Toggle between supported languages and persist user preference
  const changeLang = () => {
    const newLang = lang === "fr" ? "ar" : "fr";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  // 🌍 Static translation dictionary (should ideally be replaced with i18n library in production)
  const t = {
    fr: {
      title: "Bienvenue 👋",
      subtitle: "Connectez-vous à votre compte",
      email: "Email",
      password: "Mot de passe",
      remember: "Se souvenir de moi",
      login: "Se connecter",
      logging: "Connexion...",
      noAccount: "Vous n'avez pas de compte ?",
      register: "Créer un compte",
      forgot: "Mot de passe oublié ?"
    },
    ar: {
      title: "مرحبا 👋",
      subtitle: "قم بتسجيل الدخول",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      remember: "تذكرني",
      login: "تسجيل الدخول",
      logging: "جارٍ تسجيل الدخول...",
      noAccount: "ليس لديك حساب؟",
      register: "إنشاء حساب",
      forgot: "نسيت كلمة المرور؟"
    }
  };

  // Form validation schema (basic required fields validation)
  const validationSchema = Yup.object({
    email: Yup.string().required(),
    password: Yup.string().required()
  });

  // Formik hook for form state management and submission handling
  const formik = useFormik({
    initialValues: { email: "", password: "", remember: false },
    validationSchema,

    // Simulated async login request (replace with real API call)
    onSubmit: async (_, { setSubmitting }) => {
      await new Promise((res) => setTimeout(res, 1000));
      alert("Login success");
      setSubmitting(false);
    }
  });

  return (
    <Container maxWidth="sm">
      {/* 🌍 Language switcher button (top-right for accessibility & visibility) */}
      <Box textAlign="right" mt={2}>
        <Button size="small" onClick={changeLang}>
          {lang === "fr" ? "AR" : "FR"}
        </Button>
      </Box>

      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          // Dynamically adjust layout direction for RTL/LTR languages
          direction: lang === "ar" ? "rtl" : "ltr"
        }}
      >
        <Paper elevation={6} sx={{ p: 4, width: "100%", borderRadius: 3 }}>
          {/* Page title */}
          <Typography variant="h4" align="center" fontWeight="bold">
            {t[lang].title}
          </Typography>

          {/* Subtitle / description */}
          <Typography align="center" color="text.secondary" mb={2}>
            {t[lang].subtitle}
          </Typography>

          {/* Authentication form */}
          <form onSubmit={formik.handleSubmit}>
            {/* Email input field */}
            <TextField
              fullWidth
              margin="normal"
              label={t[lang].email}
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />

            {/* Password input with visibility toggle */}
            <TextField
              fullWidth
              margin="normal"
              label={t[lang].password}
              name="password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {/* Remember me checkbox (useful for persistent authentication) */}
            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  checked={formik.values.remember}
                  onChange={formik.handleChange}
                />
              }
              label={t[lang].remember}
            />

            {/* Primary action button with proper spacing and visual hierarchy */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                mb: 3, // spacing between button and secondary actions
                py: 1.5,
                fontWeight: "bold"
              }}
            >
              {formik.isSubmitting
                ? t[lang].logging
                : t[lang].login}
            </Button>
          </form>

          {/* Secondary actions (registration + password recovery) */}
          <Stack spacing={2} alignItems="center">
            <Typography>
              {t[lang].noAccount}{" "}
              <span
                style={{
                  color: "#1976d2",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
                // Navigate to registration page (client-side routing)
                onClick={() => navigate("/register")}
              >
                {t[lang].register}
              </span>
            </Typography>

            {/* Password recovery action */}
            <Typography
              sx={{
                color: "#1976d2",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" }
              }}
            >
              {t[lang].forgot}
            </Typography>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}