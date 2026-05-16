import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  CircularProgress,
} from "@mui/material";

import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

import { deleteProfileAction } from "../../features/profile/profileSlice";

import { logout } from "../../features/auth/authSlice";

export default function DeleteAccountDialog({ open, onClose }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { loading, deleteSuccess } = useSelector((state) => state.profile);

  /* ================= DELETE ACCOUNT ================= */

  const handleDelete = () => {
    dispatch(deleteProfileAction());
  };

  /* ================= AFTER DELETE ================= */

  useEffect(() => {
    if (deleteSuccess) {
      dispatch(logout());

      onClose();

      window.location.href = "/login";
    }
  }, [deleteSuccess, dispatch, onClose]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      {/* TITLE */}

      <DialogTitle sx={{ color: "error.main", fontWeight: 700 }}>
        {t("deleteAccount.title")}
      </DialogTitle>

      {/* CONTENT */}

      <DialogContent>
        <Typography>{t("deleteAccount.message")}</Typography>
      </DialogContent>

      {/* ACTIONS */}

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={loading}>
          {t("common.cancel")}
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            t("deleteAccount.delete")
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
