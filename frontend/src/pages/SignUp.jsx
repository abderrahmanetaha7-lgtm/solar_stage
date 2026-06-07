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
  LinearProgress,
  FormHelperText,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
} from "@mui/icons-material";

import { useTranslation } from "react-i18next";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useDispatch, useSelector } from "react-redux";
import { register, setUser } from "../features/auth/authSlice";
import API, { CSRF } from "../api/axios";

import { GoogleLogin } from "@react-oauth/google";

export default function SignUp() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    password: false,
    confirm: false,
  });

  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  // ---------------- INPUT ----------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  // ---------------- VALIDATION ----------------
  const validate = () => {
    const err = {};

    if (!form.name) err.name = t("signup.name_required");
    if (!form.email) err.email = t("signup.email_required");
    if (!form.password) err.password = t("signup.password_required");
    if (form.password !== form.confirmPassword)
      err.confirmPassword = t("signup.password_mismatch");

    return err;
  };

  // ---------------- REGISTER ----------------
  const handleRegister = async () => {
    const validation = validate();

    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    try {
      setErrorMsg("");

      await dispatch(
        register({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      ).unwrap();

      navigate("/");
    } catch (err) {
      setErrorMsg(err?.message || t("signup.registration_error"));
    }
  };
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setGoogleLoading(true);

      await CSRF.get("/sanctum/csrf-cookie");

      await API.post("/auth/google", {
        token: credentialResponse.credential,
      });

      const userRes = await API.get("/user");

      dispatch(setUser(userRes.data.user));

      navigate("/");
    } catch (error) {
      console.error(error.response?.data || error);
    } finally {
      setGoogleLoading(false);
    }
  };

  // ---------------- PASSWORD STRENGTH ----------------
  const strength = Math.min((form.password.length / 10) * 100, 100);

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
        <Paper sx={{ p: 4, borderRadius: 4, width: "100%" }} elevation={0}>
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
            sx={{ textAlign: "center" }}
            variant="h5"
            fontWeight={700}
          >
            {t("signup.title")}
          </Typography>

          {/* LOGIN LINK */}
          <Typography sx={{ textAlign: "center", mt: 1 }} variant="body2">
            {t("signup.already_account")}{" "}
            <RouterLink
              to="/login"
              style={{ fontWeight: 600, color: "rgb(57, 97, 241)" }}
            >
              {t("signup.login")}
            </RouterLink>
          </Typography>

          {/* FORM */}
          <Stack spacing={2.5} sx={{ mt: 3 }}>
            {/* NAME */}
            <TextField
              name="name"
              label={t("signup.full_name")}
              value={form.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
            />

            {/* EMAIL */}
            <TextField
              name="email"
              label={t("signup.email")}
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
            />

            {/* PASSWORD */}
            <Box sx={{ display: "flex" }}>
              <TextField
                fullWidth
                name="password"
                label={t("signup.password")}
                type={show.password ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShow({ ...show, password: !show.password })
                        }
                      >
                        {show.password ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {form.password && (
                <LinearProgress
                  variant="determinate"
                  value={strength}
                  sx={{
                    mt: 1,
                    height: 4,
                    borderRadius: 2,
                  }}
                />
              )}
            </Box>

            {/* CONFIRM PASSWORD */}
            <TextField
              fullWidth
              name="confirmPassword"
              label={t("signup.confirm_password")}
              type={show.confirm ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShow({ ...show, confirm: !show.confirm })
                      }
                    >
                      {show.confirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* ERROR */}
            {errorMsg && (
              <Typography color="error" textAlign="center">
                {errorMsg}
              </Typography>
            )}

            {/* BUTTON */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleRegister}
              disabled={loading}
              sx={{ py: 1.3, borderRadius: 3, textTransform: "none" }}
            >
              {loading ? <CircularProgress size={22} /> : t("signup.button")}
            </Button>
          </Stack>

          {/* DIVIDER */}
          <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
            <Divider sx={{ flex: 1 }} />
            <Typography sx={{ mx: 2, fontSize: 12 }}>
              {t("signup.or")}
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Box>

          {/* GOOGLE */}
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
