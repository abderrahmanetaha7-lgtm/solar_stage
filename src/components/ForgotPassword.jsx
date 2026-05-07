import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  OutlinedInput,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import { forgotPasswordApi } from "../api/authApi";

export default function ForgotPassword({ open, handleClose }) {
  const { t } = useTranslation();

  /* ================= STATE ================= */
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  /* ================= HANDLER ================= */
  const handleSubmit = async () => {
    if (!email) {
      alert("Email required");
      return;
    }

    try {
      setLoading(true);

      // 🔥 Laravel API call
      await forgotPasswordApi({ email });

      setSuccess(true);

      // reset form
      setEmail("");

      // auto close after success
      setTimeout(() => {
        handleClose();
        setSuccess(false);
      }, 1500);
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <Dialog open={open} onClose={handleClose}>
      
      <DialogTitle>
        {t("forgot_password.title")}
      </DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        
        <DialogContentText>
          {t("forgot_password.description")}
        </DialogContentText>

        {/* EMAIL INPUT */}
        <OutlinedInput
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("forgot_password.email_placeholder")}
          type="email"
          fullWidth
        />

        {/* SUCCESS MESSAGE */}
        {success && (
          <DialogContentText sx={{ color: "green" }}>
            Reset link sent successfully ✔
          </DialogContentText>
        )}
      </DialogContent>

      <DialogActions sx={{ pb: 3, px: 3 }}>
        
        {/* CANCEL */}
        <Button onClick={handleClose}>
          {t("forgot_password.cancel")}
        </Button>

        {/* SUBMIT */}
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Sending..." : t("forgot_password.continue")}
        </Button>

      </DialogActions>
    </Dialog>
  );
}