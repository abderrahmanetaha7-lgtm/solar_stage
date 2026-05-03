import { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

import { useTranslation } from "react-i18next";

export default function ChangePasswordDialog({
  open,
  onClose,
}) {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log(formData);

    // TODO:
    // update password API

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {t("changePassword.title")}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label={t("changePassword.currentPassword")}
            name="currentPassword"
            type="password"
            fullWidth
            value={formData.currentPassword}
            onChange={handleChange}
            variant="filled"
          />

          <TextField
            label={t("changePassword.newPassword")}
            name="newPassword"
            type="password"
            fullWidth
            value={formData.newPassword}
            onChange={handleChange}
            variant="filled"
          />

          <TextField
            label={t("changePassword.confirmPassword")}
            name="confirmPassword"
            type="password"
            fullWidth
            value={formData.confirmPassword}
            onChange={handleChange}
            variant="filled"
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          {t("common.cancel")}
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          {t("changePassword.save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}