import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  InputAdornment,
  Link,
  Dialog,
  DialogContent,
} from "@mui/material";

import {
  LockReset as LockResetIcon,
  Email as EmailIcon,
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";

import { Link as RouterLink } from "react-router-dom";

import { forgotPassword } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const { t, i18n } = useTranslation();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const validate = (value) => {
    if (!value) return t("forgotPassword.emailRequired");
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    return ok ? "" : t("forgotPassword.invalidEmail");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validate(email);
    setError(err);
    if (err) return;

    try {
      const result = await dispatch(forgotPassword({ email }));

      if (forgotPassword.fulfilled.match(result)) {
        setOpenSuccess(true);

        // optional auto close + redirect
        setTimeout(() => {
          setOpenSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error)
      setOpenSuccess(false);
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
        <Paper sx={{ p: 4, borderRadius: 3, width: "100%" }} elevation={0}>
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Avatar sx={{ mx: "auto", mb: 2, bgcolor: "primary.main" }}>
              <LockResetIcon />
            </Avatar>

            <Typography variant="h5" fontWeight={700}>
              {t("forgotPassword.title")}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {t("forgotPassword.subtitle")}
            </Typography>
          </Box>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label={t("forgotPassword.emailLabel")}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              error={!!error}
              helperText={error || " "}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ py: 1.3, textTransform: "none", borderRadius: 2 }}
            >
              {t("forgotPassword.button")}
            </Button>

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Link
                component={RouterLink}
                to="/login"
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
                {t("forgotPassword.backToLogin")}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* ================= SUCCESS DIALOG ================= */}
      <Dialog
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 3,
            textAlign: "center",
            width: "100%",
            maxWidth: 420,
          },
        }}
      >
        <DialogContent>
          <CheckCircleIcon
            sx={{
              fontSize: 70,
              color: "success.main",
              mb: 1,
            }}
          />

          <Typography variant="h6" fontWeight={700} mb={1}>
            {t("forgotPassword.successTitle") || "Email Sent"}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {t("forgotPassword.successMessage")}
          </Typography>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ForgotPassword;
