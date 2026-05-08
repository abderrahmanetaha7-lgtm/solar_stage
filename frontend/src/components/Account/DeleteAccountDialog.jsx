import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

import { useTranslation } from "react-i18next";

export default function DeleteAccountDialog({
  open,
  onClose,
}) {
  const { t } = useTranslation();

  const handleDelete = () => {
    console.log("Account deleted");

    // TODO:
    // delete account API

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle sx={{ color: "red" }}>
        {t("deleteAccount.title")}
      </DialogTitle>

      <DialogContent>
        <Typography>
          {t("deleteAccount.message")}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          {t("common.cancel")}
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={handleDelete}
        >
          {t("deleteAccount.delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}