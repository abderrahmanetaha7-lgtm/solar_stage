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

import { useAuth } from "../../context/AuthContextToken";
import { useTranslation } from "react-i18next";

export default function ChangeEmailDialog({ open, onClose }) {
  const { user } = useAuth();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");

  const handleSave = () => {
    console.log(email);

    // TODO:
    // update email API

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{t("changeEmail.title")}</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label={t("changeEmail.currentEmail")}
            value={user?.email || ""}
            fullWidth
            variant="filled"
          />

          <TextField
            variant="filled"
            label={t("changeEmail.newEmail")}
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>{t("common.cancel")}</Button>

        <Button variant="contained" onClick={handleSave}>
          {t("changeEmail.save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
