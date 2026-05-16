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

export default function ChangeEmailDialog({
  open,
  onClose,
}) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { loading, success, errors } = useSelector(
    (state) => state.profile,
  );

  const { t } = useTranslation();

  const [email, setEmail] = useState("");

  /* ================= RESET ================= */

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEmail("");

      dispatch(clearProfileState());
    }
  }, [open, dispatch]);

  /* ================= CLOSE AFTER SUCCESS ================= */

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(clearProfileState());

        onClose();
      }, 1000);
    }
  }, [success, dispatch, onClose]);

  /* ================= HANDLE SAVE ================= */

  const handleSave = () => {
    const formData = new FormData();

    formData.append("_method", "PUT");

    formData.append("name", user?.name || "");

    formData.append("email", email);

    formData.append("city", user?.city || "");

    dispatch(updateProfileAction(formData));
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

      <DialogTitle fontWeight={700}>
        {t("changeEmail.title")}
      </DialogTitle>

      {/* CONTENT */}

      <DialogContent>
        <Stack spacing={2} mt={1}>
          {/* CURRENT EMAIL */}

          <TextField
            label={t("changeEmail.currentEmail")}
            value={user?.email || ""}
            fullWidth
            disabled
            variant="filled"
          />

          {/* NEW EMAIL */}

          <TextField
            variant="filled"
            label={t("changeEmail.newEmail")}
            type="email"
            fullWidth
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            error={!!errors.email}
            helperText={errors.email?.[0]}
          />

          {/* SUCCESS */}

          {success && (
            <Typography color="success.main">
              {success}
            </Typography>
          )}
        </Stack>
      </DialogContent>

      {/* ACTIONS */}

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          disabled={loading}
        >
          {t("common.cancel")}
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
          disabled={loading || !email}
        >
          {loading ? (
            <CircularProgress
              size={20}
              color="inherit"
            />
          ) : (
            t("changeEmail.save")
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}