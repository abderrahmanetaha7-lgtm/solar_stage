import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  InputAdornment,
  IconButton,
  CircularProgress,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
} from "@mui/icons-material";
import API, { CSRF } from "../api/axios";

import { useTranslation } from "react-i18next";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useDispatch, useSelector } from "react-redux";
import { login, setUser } from "../features/auth/authSlice";

import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const [googleLoading, setGoogleLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // ---------------- HANDLE INPUT ----------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ---------------- LOGIN ----------------
  const handleLogin = async () => {
    setError("");

    try {
      const res = await dispatch(
        login({
          email: form.email,
          password: form.password,
          remember: form.remember,
        }),
      ).unwrap();

      navigate(res.isAdmin ? "/admin" : "/");
    } catch (err) {
      setError(err?.message || "Invalid email or password");
    }
  };

  // ---------------- GOOGLE LOGIN (UI ONLY) ----------------

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setGoogleLoading(true);

      await CSRF.get("/sanctum/csrf-cookie");

      await API.post("/auth/google", {
        token: credentialResponse.credential,
      });

      const userRes = await API.get("/user");

      dispatch(setUser(userRes.data.user));

      const isAdmin = userRes.data.user?.role === "admin";
      navigate(isAdmin ? "/admin" : "/");
    } catch (error) {
      console.error(error.response?.data || error);
    } finally {
      setGoogleLoading(false);
    }
  };

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
    },
  };

  return (
    <Container maxWidth="sm">
      {googleLoading && (
        <Box
          sx={{
            position: "fixed",
            inset: 0, 
            backdropFilter: "blur(2px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2, 
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            p: 4,
            borderRadius: 4,
          }}
        >
          {/* BACK */}
          <Button
            onClick={() => navigate("/")}
            startIcon={
              i18n.language === "ar" ? <ArrowForwardIcon /> : <ArrowBackIcon />
            }
            sx={{ textTransform: "none" }}
          >
            {t("signup.common-back")}
          </Button>

          {/* TITLE */}
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ textAlign: "center" }}
          >
            {t("login.login_title")}
          </Typography>

          {/* REGISTER */}
          <Typography variant="body2" sx={{ mb: 1, textAlign: "center" }}>
            {t("login.no_account")}{" "}
            <RouterLink
              to="/register"
              style={{
                textDecoration: "none",
                fontWeight: 600,
                color: "rgb(57, 97, 241)",
              }}
            >
              {t("login.signup")}
            </RouterLink>
          </Typography>

          {/* FORM */}
          <Stack spacing={2.5} sx={{ mt: 2 }}>
            {/* EMAIL */}
            <TextField
              name="email"
              label={t("login.email_label")}
              value={form.email}
              onChange={handleChange}
              fullWidth
              sx={inputStyle}
            />

            {/* PASSWORD */}
            <TextField
              name="password"
              label={t("login.password_label")}
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              fullWidth
              sx={inputStyle}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((p) => !p)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* REMEMBER + FORGOT */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                  />
                }
                label={t("login.remember_me") || "Remember me"}
              />

              <RouterLink
                to="/forget-password"
                style={{ fontSize: 14, color: "rgb(57, 97, 241)" }}
              >
                {t("login.forgot_password")}
              </RouterLink>
            </Box>

            {/* ERROR */}
            {error && (
              <Typography color="error" textAlign="center">
                {error}
              </Typography>
            )}

            {/* LOGIN BUTTON */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleLogin}
              disabled={loading}
              sx={{
                py: 1.3,
                borderRadius: 3,
                textTransform: "none",
              }}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                t("login.login_button")
              )}
            </Button>
          </Stack>

          {/* DIVIDER */}
          <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
            <Divider sx={{ flex: 1 }} />
            <Typography sx={{ mx: 2, fontSize: 12 }}>
              {t("login.or")}
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Box>

          {/* GOOGLE LOGIN */}

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              mt: 1,
            }}
          >
            <Box
              sx={{
                transform: "scale(0.92)",
                transformOrigin: "center",
                borderRadius: 3,
                overflow: "hidden",
                "& > div": {
                  width: "100% !important",
                },
              }}
            >
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.log("Google Login Failed")}
                theme="filled_black"
                size="large"
                shape="pill"
                text="continue_with"
                width="320"
              />
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
