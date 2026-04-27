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
  LinearProgress,
  Stack
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // 🌍 Current language state (persisted in localStorage)
  const [lang, setLang] = useState(localStorage.getItem("lang") || "fr");

  // 🔁 Toggle between French and Arabic languages
  const changeLang = () => {
    const newLang = lang === "fr" ? "ar" : "fr";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  // 🌐 Translation dictionary
  const t = {
    fr: {
      title: "Créer un compte",
      subtitle: "Rejoignez-nous 🚀",
      name: "Nom complet",
      email: "Email",
      password: "Mot de passe",
      confirm: "Confirmer le mot de passe",
      register: "S'inscrire",
      creating: "Création...",
      haveAccount: "Vous avez déjà un compte ?",
      login: "Se connecter"
    },
    ar: {
      title: "إنشاء حساب",
      subtitle: "انضم إلينا 🚀",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirm: "تأكيد كلمة المرور",
      register: "تسجيل",
      creating: "جارٍ الإنشاء...",
      haveAccount: "لديك حساب بالفعل؟",
      login: "تسجيل الدخول"
    }
  };

  // ✅ Form validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")])
  });

  // 🧠 Formik configuration for form state and submission handling
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", confirmPassword: "" },
    validationSchema,
    onSubmit: async (_, { setSubmitting, resetForm }) => {
      // ⏳ Simulate API request delay
      await new Promise((res) => setTimeout(res, 1000));
      resetForm();
      alert("Account created");
      setSubmitting(false);
    }
  });

  // 🔐 Simple password strength calculation based on length
  const strength = formik.values.password.length * 10;

  return (
    <Container maxWidth="sm">
      {/* 🌍 Language switch button */}
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
          direction: lang === "ar" ? "rtl" : "ltr" // ↔️ Adjust layout direction based on language
        }}
      >
        <Paper sx={{ p: 4, width: "100%", borderRadius: 3 }}>
          {/* 🏷️ Page title */}
          <Typography variant="h4" align="center" fontWeight="bold">
            {t[lang].title}
          </Typography>

          {/* 📝 Subtitle */}
          <Typography align="center" mb={2}>
            {t[lang].subtitle}
          </Typography>

          {/* 📋 Registration form */}
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label={t[lang].name}
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />

            <TextField
              fullWidth
              margin="normal"
              label={t[lang].email}
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />

            <TextField
              fullWidth
              margin="normal"
              label={t[lang].password}
              type={showPassword ? "text" : "password"}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {/* 👁️ Toggle password visibility */}
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {/* 🔐 Password strength indicator */}
            {formik.values.password && (
              <Box mt={1}>
                <LinearProgress variant="determinate" value={strength} />
              </Box>
            )}

            <TextField
              fullWidth
              margin="normal"
              label={t[lang].confirm}
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
            />

            {/* 🚀 Submit button with spacing below */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                mb: 3, // 👈 Space between button and text below
                py: 1.5,
                fontWeight: "bold"
              }}
            >
              {formik.isSubmitting ? t[lang].creating : t[lang].register}
            </Button>
          </form>

          {/* 🔗 Redirect to login with proper spacing */}
          <Stack spacing={2} alignItems="center">
            <Typography>
              {t[lang].haveAccount}{" "}
              <span
                style={{
                  color: "#1976d2",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
                onClick={() => navigate("/login")}
              >
                {t[lang].login}
              </span>
            </Typography>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}