import React, { useState } from "react";

import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Avatar,
  InputAdornment,
  Fade,
  Link,
  IconButton,
} from "@mui/material";

import {
  LockReset as LockResetIcon,
  Lock as LockIcon,
  ArrowBack as ArrowBackIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../features/auth/authSlice";
 
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const [searchParams] = useSearchParams();
 
  const { token } = useParams();
  const email = searchParams.get("email");

  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!formData.password) {
      newErrors.password = t("resetPassword.passwordRequired");
    } else if (formData.password.length < 8) {
      newErrors.password = t("resetPassword.passwordMin");
    }

    if (!formData.password_confirmation) {
      newErrors.password_confirmation = t("resetPassword.confirmRequired");
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = t("resetPassword.passwordsNotMatch");
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      await dispatch(
        resetPassword({
          token,
          email,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
        }),
      ).unwrap();

      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setErrors({
        api: error?.message || t("resetPassword.apiError"),
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Paper
          sx={{
            p: 4,
            borderRadius: 3,
            width: "100%",
          }}
          elevation={0}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Avatar
              sx={{
                mx: "auto",
                mb: 2,
                bgcolor: "primary.main",
              }}
            >
              <LockResetIcon />
            </Avatar>

            <Typography variant="h5" fontWeight={700}>
              {t("resetPassword.title")}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {t("resetPassword.subtitle")}
            </Typography>
          </Box>

          {/* Success */}
          <Fade in={success}>
            <Box>
              {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {t("resetPassword.successMessage")}
                </Alert>
              )}
            </Box>
          </Fade>

          {/* API Error */}
          {errors.api && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.api}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            {/* Password */}
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              label={t("resetPassword.newPassword")}
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password || " "}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            {/* Confirm Password */}
            <TextField
              fullWidth
              type={showConfirmPassword ? "text" : "password"}
              label={t("resetPassword.confirmPassword")}
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              error={!!errors.password_confirmation}
              helperText={errors.password_confirmation || " "}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            {/* Button */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.3,
                textTransform: "none",
                borderRadius: 2,
              }}
            >
              {t("resetPassword.button")}
            </Button>

            {/* Back */}
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Link
                onClick={() => navigate("/login")}
                underline="hover"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                }}
              >
                <ArrowBackIcon
                  sx={{
                    transform:
                      i18n.language === "ar"
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                  }}
                  fontSize="small"
                />
                {t("resetPassword.backToLogin")}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ResetPassword;
