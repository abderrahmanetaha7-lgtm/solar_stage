import { useState } from "react";

import {
  Avatar,
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

export default function EditProfileDialog({ open, onClose }) {
  const { user } = useAuth();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    city: user?.city || "Marrakech",
    avatar: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData({
        ...formData,
        avatar: file,
      });

      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    console.log("Updated Profile:", formData);

    // TODO:
    // Send updated data to API

    onClose();
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
              display:"flex",
              alignItems:"center"
            }}
          >
            <Avatar
              src={preview}
              sx={{
                width: { xs: 90, sm: 110 },
                height: { xs: 90, sm: 110 },
                fontSize: { xs: 34, sm: 42 },
              }}
            >
              {!preview && user?.name?.charAt(0).toUpperCase()}
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

          {/* FULL NAME */}

          <TextField
            label={t("editProfileDialog.fullName")}
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            variant="filled"
            sx={{
              "& .MuiFilledInput-root": {
                borderRadius: 3,
              },
            }}
          />

          {/* CITY */}

          <TextField
            label={t("editProfileDialog.city")}
            name="city"
            fullWidth
            value={formData.city}
            onChange={handleChange}
            variant="filled"
            sx={{
              "& .MuiFilledInput-root": {
                borderRadius: 3,
              },
            }}
          />
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
          sx={{
            borderRadius: 3,
            textTransform: "none",
            height: 45,
          }}
        >
          {t("editProfileDialog.saveChanges")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
