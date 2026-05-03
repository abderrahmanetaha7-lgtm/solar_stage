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

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogOut = () => {
    setAnchorEl(null);
    logout();
  };

  return (
    <>
      {!user && (
        <>
          <Tooltip title="Account">
            <IconButton
              onClick={(e) => setAnchorElUser(e.currentTarget)}
              sx={{
                color: "text.primary",
                "&:hover": { color: "primary.main" },
              }}
            >
              <PersonOutlineOutlinedIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
      <IconButton onClick={toggleTheme} sx={{ color: "text.primary" }}>
        {mode === "dark" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
      </IconButton>
      <Menu anchorEl={anchorElUser} open={openMenu} onClose={handleMenuClose}>
        <MenuItem
          component={RouterLink}
          to="/login"
          sx={{ "&:hover": { color: "primary.main" } }}
        >
          {t("nav.login")}
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="/register"
          sx={{ "&:hover": { color: "primary.main" } }}
        >
          {t("nav.register")}
        </MenuItem>
      </Menu>
      {user && !isMobile && (
        <>
          <Avatar
            onClick={handleMenuOpen}
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

          <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
            <MenuItem
              onClick={handleMenuClose}
              sx={{ "&:hover": { color: "primary.main" } }}
            >
              {t("profile.Account")}
            </MenuItem>
            <MenuItem
              onClick={handleMenuClose}
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

      

      <IconButton
        sx={{ color: "text.primary", "&:hover": { color: "primary.main" } }}
        component={RouterLink}
        to="/favorites"
      >
        <Badge badgeContent={favorites.length} color="primary">
          <FavoriteBorderIcon />
        </Badge>
      </IconButton>
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
