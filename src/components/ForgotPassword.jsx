import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTranslation } from "react-i18next";

export default function ForgotPassword({ open, handleClose }) {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t("forgot_password.title")}</DialogTitle>

      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>
          {t("forgot_password.description")}
        </DialogContentText>

        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          placeholder={t("forgot_password.email_placeholder")}
          type="email"
          fullWidth
        />
      </DialogContent>

      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>{t("forgot_password.cancel")}</Button>
        <Button variant="contained" type="submit">
          {t("forgot_password.continue")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
