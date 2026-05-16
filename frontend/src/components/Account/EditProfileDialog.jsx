import { useEffect, useState } from "react";

import {
  Avatar,
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

export default function EditProfileDialog({ open, onClose }) {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const user = useSelector((state) => state.auth.user);

  const { loading, success, errors } = useSelector((state) => state.profile);

  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "", 
    avatar: null,
  });

  /* ================= RESET FORM ================= */

  useEffect(() => {
    if (user && open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: user?.name || "", 
        avatar: null,
      });

      setPreview(user?.avatar || null);
    }
  }, [user, open]);

  /* ================= CLOSE AFTER SUCCESS ================= */

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(clearProfileState());

        onClose();
      }, 1000);
    }
  }, [success, dispatch, onClose]);

  /* ================= HANDLE INPUT ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= HANDLE IMAGE ================= */

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      avatar: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  /* ================= HANDLE SUBMIT ================= */

  const handleSave = () => {
    const data = new FormData();

    data.append("_method", "PUT");

    data.append("name", formData.name);

    data.append("email", user?.email); 

    if (formData.avatar) {
      data.append("avatar", formData.avatar);
    }

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
          borderRadius: { xs: 0, sm: 6 },
          p: { xs: 1, sm: 2 },
          mx: { xs: 1, sm: "auto" },
        },
      }}
    >
      {/* TITLE */}

      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: { xs: "22px", sm: "28px" },
        }}
      >
        {t("editProfileDialog.title")}
      </DialogTitle>

      {/* CONTENT */}

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          {/* PROFILE IMAGE */}

          <Stack
            spacing={2}
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              src={preview || ""}
              sx={{
                width: { xs: 90, sm: 110 },
                height: { xs: 90, sm: 110 },
                fontSize: { xs: 34, sm: 42 },
              }}
            >
              {!preview && user?.name?.charAt(0)?.toUpperCase()}
            </Avatar>

            <Button
              variant="outlined"
              component="label"
              sx={{
                borderRadius: 3,
                textTransform: "none",
                px: 3,
              }}
            >
              {t("editProfileDialog.changePhoto")}

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
          </Stack>

          {/* NAME */}

          <TextField
            label={t("editProfileDialog.fullName")}
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name?.[0]}
            variant="filled"
            sx={{
              "& .MuiFilledInput-root": {
                borderRadius: 3,
              },
            }}
          /> 

          {/* SUCCESS */}

          {success && (
            <Typography color="success.main" textAlign="center">
              {success}
            </Typography>
          )}
        </Stack>
      </DialogContent>

      {/* ACTIONS */}

      <DialogActions
        sx={{
          p: 3,
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: 2,
        }}
      >
        <Button
          fullWidth
          variant="outlined"
          color="inherit"
          onClick={onClose}
          disabled={loading}
          sx={{
            borderRadius: 3,
            textTransform: "none",
            height: 45,
          }}
        >
          {t("editProfileDialog.cancel")}
        </Button>

        <Button
          fullWidth
          variant="contained"
          onClick={handleSave}
          disabled={loading}
          sx={{
            borderRadius: 3,
            textTransform: "none",
            height: 45,
          }}
        >
          {loading ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            t("editProfileDialog.saveChanges")
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
