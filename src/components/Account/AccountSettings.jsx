import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Button,
  Paper,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useAuth } from "../../context/AuthContextToken";
import { useTranslation } from "react-i18next";
import ChangePasswordDialog from "./ChangePasswordDialog";
import ChangeEmailDialog from "./ChangeEmailDialog";
import DeleteAccountDialog from "./DeleteAccountDialog";

export default function AccountSettings() {
  const { user } = useAuth();
  const { t, i18n } = useTranslation();

  const [openPassword, setOpenPassword] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  //  Password
  function handleopenPwd() {
    setOpenPassword(true);
  }
  function handleClosePwd() {
    setOpenPassword(false);
  }
  
  //  Email
  function handleopenEmail() {
    setOpenEmail(true);
  }
  function handleCloseEmail() {
    setOpenEmail(false);
  }
  
  // delete
  function handleOpenDelete() {
    setOpenDelete(true);
  }
  function handleCloseDelete() {
    setOpenDelete(false);
  }
  

  return (
    <>
      {/* ACCOUNT SECURITY */}
      <Paper sx={{ p: 2, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {t("accountSettings.title")}
        </Typography>

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleopenPwd}>
              <ListItemText primary={t("accountSettings.changePassword")} />
              <ArrowForwardIosIcon
                sx={{
                  transform:
                    i18n.language === "ar" ? "rotate(180deg)" : "rotate(0deg)",
                }}
                fontSize="small"
              />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ bgcolor: "#333" }} />

          <ListItem disablePadding>
            <ListItemButton onClick={handleopenEmail}>
              <ListItemText
                primary={t("accountSettings.changeEmail")}
                secondary={user?.email}
              />
              <ArrowForwardIosIcon
                sx={{
                  transform:
                    i18n.language === "ar" ? "rotate(180deg)" : "rotate(0deg)",
                }}
                fontSize="small"
              />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ bgcolor: "#333" }} />

          <ListItem disablePadding>
            <ListItemButton sx={{ color: "#ff4d4f" }} onClick={handleOpenDelete}>
              <ListItemText primary={t("accountSettings.deleteAccount")} />
              <ArrowForwardIosIcon
                sx={{
                  transform:
                    i18n.language === "ar" ? "rotate(180deg)" : "rotate(0deg)",
                }}
                fontSize="small"
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>
      <ChangePasswordDialog open={openPassword} onClose={handleClosePwd} />
      <ChangeEmailDialog open={openEmail} onClose={handleCloseEmail} />
      <DeleteAccountDialog open={openDelete} onClose={handleCloseDelete} />
    </>
  );
}
