import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
  IconButton,
  Avatar,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAuth } from "../../../context/AuthContextToken";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState } from "react";

export default function MobileDrawer({ open, toggleDrawer }) {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const location = useLocation();

  const links = [
    { label: "nav.home", path: "/" },
    { label: "nav.products", path: "/products" },
    { label: "nav.services", path: "/services" },
    { label: "nav.about", path: "/about" },
    { label: "nav.contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => logout();

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
      <Box
        sx={{
          width: 270,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {user && (
          <>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 2 }}>
              <Avatar sx={{ bgcolor: "orange" }}>
                {user.email.charAt(0).toUpperCase()}
              </Avatar>

              <Box sx={{ flex: 1 }}>
                <Typography fontWeight="bold">{user.name || "User"}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>

              <IconButton onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
            </Box>

            <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
              <MenuItem
                component={RouterLink}
                to="/account"
                onClick={handleMenuClose}
                sx={{ "&:hover": { color: "primary.main" } }}
              >
                {t("profile.Account")}
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to="/orders"
                onClick={handleMenuClose}
                sx={{ "&:hover": { color: "primary.main" } }}
              >
                {t("profile.Orders")}
              </MenuItem>
            </Menu>
          </>
        )}

        <Divider />

        <Box sx={{ flex: 1 }}>
          <List>
            {links.map((item) => (
              <ListItemButton
                key={item.label}
                component={RouterLink}
                to={item.path}
                onClick={toggleDrawer(false)}
                sx={{
                  bgcolor: isActive(item.path) ? "primary.main" : "transparent",
                }}
              >
                <ListItemText primary={t(item.label)} />
              </ListItemButton>
            ))}
          </List>
          <ListItemButton sx={{ borderRadius: 2, mx: 1 }}>
            <ListItemText
              primary={t("nav.lang")}
              sx={{ color: "text.primary" }}
            />
            <LanguageSwitcher />
          </ListItemButton>
        </Box>

        {user && (
          <Box sx={{ p: 2 }}>
            <Divider sx={{ mb: 1 }} />

            <Button
              fullWidth
              onClick={handleLogout}
              sx={{
                color: "red",
                fontWeight: "bold",
                justifyContent: "flex-start",
              }}
            >
              {t("profile.Logout")}
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
