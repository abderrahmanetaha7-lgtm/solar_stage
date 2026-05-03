import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { useAuth } from "../../context/AuthContextToken";
import { useTranslation } from "react-i18next";

export default function EditProfileDialog({ open, onClose }) {
  const { user } = useAuth();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "", 
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log("Updated Profile:", formData);

    // TODO:
    // Send data to API here

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
          borderRadius: 8,  
        },
      }}
    >
      <DialogTitle sx={{textAlign:"center", fontSize:"25px"}}>{t("editProfileDialog.title")}</DialogTitle>

      <DialogContent sx={{pt:2}}>
        <Stack spacing={2} >
          <TextField
            label={t("editProfileDialog.fullName")}
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            variant="filled"
          />

          <TextField
            label={t("editProfileDialog.email")}
            name="email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            variant="filled"
          /> 
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} color="inherit">
          {t("editProfileDialog.cancel")}
        </Button>

        <Button variant="contained" onClick={handleSave}>
          {t("editProfileDialog.saveChanges")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}