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
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState } from "react";
import { useLogout } from "../../../hooks/useLogout";
 
export default function MobileDrawer({ open, toggleDrawer }) {
  const { t } = useTranslation();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation(); 
  const logoutUser = useLogout();

  const links = [
    { label: "nav.home", path: "/" },
    { label: "nav.products", path: "/products" },
    { label: "nav.services", path: "/services" },
    { label: "nav.about", path: "/about" },
    { label: "nav.contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logoutUser();
      toggleDrawer(false)();
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  const openLogoutDialog = () => {
    setLogoutDialogOpen(true);
  };

  const closeLogoutDialog = () => {
    setLogoutDialogOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Drawer open={open} onClose={toggleDrawer(false)}>
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
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 2 }}
              >
                <Avatar sx={{ bgcolor: "orange" }}>
                  {user?.name?.charAt(0).toUpperCase()}
                </Avatar>

                <Box sx={{ flex: 1 }}>
                  <Typography fontWeight="bold">
                    {user.name || "User"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>

                <IconButton onClick={handleMenuOpen}>
                  <MoreVertIcon />
                </IconButton>
              </Box>

              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
              >
                <MenuItem
                  component={RouterLink}
                  to="/account"
                  onClick={() => {
                    handleMenuClose();
                    toggleDrawer(false)();
                  }}
                  sx={{ "&:hover": { color: "primary.main" } }}
                >
                  {t("profile.Account")}
                </MenuItem>
                <MenuItem
                  component={RouterLink}
                  to="/orders"
                  onClick={() => {
                    handleMenuClose();
                    toggleDrawer(false)();
                  }}
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
                    bgcolor: isActive(item.path)
                      ? "primary.main"
                      : "transparent",
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
                onClick={openLogoutDialog}
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
      <Dialog open={logoutDialogOpen} onClose={closeLogoutDialog}>
        <DialogTitle>
          {t("LogoutProfile.logoutConfirmTitle") || "Confirm Logout"}
        </DialogTitle>

        <DialogContent>
          <Typography>
            {t("LogoutProfile.logoutConfirmText") ||
              "Are you sure you want to logout?"}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeLogoutDialog}>{t("YesNo.no") || "No"}</Button>

          <Button
            color="error"
            onClick={async () => {
              await handleLogout();
              closeLogoutDialog();
            }}
          >
            {t("YesNo.yes") || "Yes"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
