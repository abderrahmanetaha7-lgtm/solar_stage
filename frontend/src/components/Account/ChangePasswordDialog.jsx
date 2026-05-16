import { useEffect, useState } from "react";

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";

import {
  updateProfileAction,
  clearProfileState,
} from "../../features/profile/profileSlice";

export default function ChangePasswordDialog({ open, onClose }) {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const user = useSelector((state) => state.auth.user);

  const { loading, success, errors } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  /* ================= RESET FORM ================= */

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });

      dispatch(clearProfileState());
    }
  }, [open, dispatch]);

  /* ================= CLOSE AFTER SUCCESS ================= */

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        onClose();

        dispatch(clearProfileState());
      }, 1000);
    }
  }, [success, onClose, dispatch]);

  /* ================= HANDLE INPUT ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= HANDLE SAVE ================= */

  const handleSave = () => {
    if (formData.new_password !== formData.confirm_password) {
      return;
    }

    const data = new FormData();

    data.append("_method", "PUT");

    data.append("name", user?.name);

    data.append("email", user?.email);

    data.append("city", user?.city || "");

    data.append("current_password", formData.current_password);

    data.append("new_password", formData.new_password);

    dispatch(updateProfileAction(data));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
        },
      }}
    >
      {/* TITLE */}

      <DialogTitle fontWeight={700}>{t("changePassword.title")}</DialogTitle>

      {/* CONTENT */}

      <DialogContent>
        <Stack spacing={2} mt={1}>
          {/* CURRENT PASSWORD */}

          <TextField
            label={t("changePassword.currentPassword")}
            name="current_password"
            type="password"
            fullWidth
            value={formData.current_password}
            onChange={handleChange}
            error={!!errors.current_password}
            helperText={errors.current_password?.[0]}
            variant="filled"
          />

          {/* NEW PASSWORD */}

          <TextField
            label={t("changePassword.newPassword")}
            name="new_password"
            type="password"
            fullWidth
            value={formData.new_password}
            onChange={handleChange}
            error={!!errors.new_password}
            helperText={errors.new_password?.[0]}
            variant="filled"
          />

          {/* CONFIRM PASSWORD */}

          <TextField
            label={t("changePassword.confirmPassword")}
            name="confirm_password"
            type="password"
            fullWidth
            value={formData.confirm_password}
            onChange={handleChange}
            error={
              formData.confirm_password &&
              formData.new_password !== formData.confirm_password
            }
            helperText={
              formData.confirm_password &&
              formData.new_password !== formData.confirm_password
                ? "Passwords do not match"
                : ""
            }
            variant="filled"
          />

          {/* SUCCESS */}

          {success && <Typography color="success.main">{success}</Typography>}
        </Stack>
      </DialogContent>

      {/* ACTIONS */}

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={loading}>
          {t("common.cancel")}
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
          disabled={
            loading || formData.new_password !== formData.confirm_password
          }
        >
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            t("changePassword.save")
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
