import {
  IconButton,
  Badge,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAuth } from "../../../context/AuthContextToken";
import { useCart } from "../../../context/CartContext";
import { useData } from "../../../context/AuthContext";

export default function UserMenu() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const { favorites, mode, toggleTheme } = useData();

  // 🔹 separate states
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [anchorElAuth, setAnchorElAuth] = useState(null);

  const openProfileMenu = Boolean(anchorElProfile);
  const openAuthMenu = Boolean(anchorElAuth);

  // ---------------- HANDLERS ----------------

  const handleProfileOpen = (e) => {
    setAnchorElProfile(e.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorElProfile(null);
  };

  const handleAuthOpen = (e) => {
    setAnchorElAuth(e.currentTarget);
  };

  const handleAuthClose = () => {
    setAnchorElAuth(null);
  };

  const handleLogOut = () => {
    setAnchorElProfile(null);
    logout();
  };

  return (
    <>
      {/* ================= AUTH MENU (LOGIN / REGISTER) ================= */}
      {!user && (
        <>
          <Tooltip title="Account">
            <IconButton
              onClick={handleAuthOpen}
              sx={{
                color: "text.primary",
                "&:hover": { color: "primary.main" },
              }}
            >
              <PersonOutlineOutlinedIcon />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorElAuth}
            open={openAuthMenu}
            onClose={handleAuthClose}
          >
            <MenuItem
              component={RouterLink}
              to="/login"
              onClick={handleAuthClose}
              sx={{ "&:hover": { color: "primary.main" } }}
            >
              {t("nav.login")}
            </MenuItem>

            <MenuItem
              component={RouterLink}
              to="/register"
              onClick={handleAuthClose}
              sx={{ "&:hover": { color: "primary.main" } }}
            >
              {t("nav.register")}
            </MenuItem>
          </Menu>
        </>
      )}

      {/* ================= THEME TOGGLE ================= */}
      <IconButton onClick={toggleTheme} sx={{ color: "text.primary" }}>
        {mode === "dark" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
      </IconButton>

      {/* ================= PROFILE MENU ================= */}
      {user && !isMobile && (
        <>
          <Avatar
            onClick={handleProfileOpen}
            sx={{
              bgcolor: "orange",
              width: 35,
              height: 35,
              ml: 2,
              cursor: "pointer",
            }}
          >
            {user.email.charAt(0).toUpperCase()}
          </Avatar>

          <Menu
            anchorEl={anchorElProfile}
            open={openProfileMenu}
            onClose={handleProfileClose}
          >
            <MenuItem
              component={RouterLink}
              to="/account"
              onClick={handleProfileClose}
              sx={{ "&:hover": { color: "primary.main" } }}
            >
              {t("profile.Account")}
            </MenuItem>

            <MenuItem
              onClick={handleProfileClose}
              sx={{ "&:hover": { color: "primary.main" } }}
            >
              {t("profile.Orders")}
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleLogOut} sx={{ color: "red" }}>
              {t("profile.Logout")}
            </MenuItem>
          </Menu>
        </>
      )}

      {/* ================= FAVORITES ================= */}
      <IconButton
        sx={{ color: "text.primary", "&:hover": { color: "primary.main" } }}
        component={RouterLink}
        to="/favorites"
      >
        <Badge badgeContent={favorites.length} color="primary">
          <FavoriteBorderIcon />
        </Badge>
      </IconButton>

      {/* ================= CART ================= */}
      <IconButton
        sx={{ color: "text.primary", "&:hover": { color: "primary.main" } }}
        component={RouterLink}
        to="/shopping-cart"
      >
        <Badge badgeContent={totalItems} color="primary">
          <ShoppingCartOutlinedIcon />
        </Badge>
      </IconButton>
    </>
  );
}
