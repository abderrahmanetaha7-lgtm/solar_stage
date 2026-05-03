import React from "react";
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

export default function AccountSettings() {
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  return (
    <>
      {/* ACCOUNT SECURITY */}
      <Paper sx={{ p: 2, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {t("accountSettings.title")}
        </Typography>

        <List>
          <ListItem disablePadding>
            <ListItemButton>
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
            <ListItemButton>
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
            <ListItemButton sx={{ color: "#ff4d4f" }}>
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
    </>
  );
}
