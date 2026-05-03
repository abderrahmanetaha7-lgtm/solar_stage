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

export default function AccountSettings() {
  const { user } = useAuth();
  return (
    <>
      {/* ACCOUNT SECURITY */}
      <Paper
        sx={{ p: 2, borderRadius: 3, background: "#1e1e1e", color: "white" }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Account security
        </Typography>

        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Change password" />
              <ArrowForwardIosIcon fontSize="small" />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ bgcolor: "#333" }} />

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Change email" secondary={user?.email} />
              <ArrowForwardIosIcon fontSize="small" />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ bgcolor: "#333" }} />

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Change phone number" />
              <ArrowForwardIosIcon fontSize="small" />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ bgcolor: "#333" }} />

          <ListItem disablePadding>
            <ListItemButton sx={{ color: "#ff4d4f" }}>
              <ListItemText primary="Delete account" />
              <ArrowForwardIosIcon fontSize="small" />
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>
    </>
  );
}
