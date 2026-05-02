import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Badge,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Menu,
  Tooltip,
  Drawer,
  Typography,
  FormControl,
  Select,
  Avatar,
  Divider,
  ListItem,
  Button,
} from "@mui/material";
import { useCart } from "../../context/CartContext";
import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import { Link as RouterLink, useLocation } from "react-router-dom";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import logo from "../../assets/images/logo.png";
import { useData } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContextToken";

// Language Switcher (clean)
const LanguageSwitcher = ({ i18n }) => {
  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <FormControl size="small">
      <Select
        value={i18n.language}
        onChange={handleChange}
        sx={{ minWidth: 80 }}
      >
        <MenuItem value="fr">Français</MenuItem>
        <MenuItem value="ar">العربية</MenuItem>
      </Select>
    </FormControl>
  );
};

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const { mode, toggleTheme, favorites } = useData();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const isActive = (path) => location.pathname === path;

  const { totalItems } = useCart();
  const links = [
    { label: "nav.home", path: "/" },
    { label: "nav.products", path: "/products" },
    { label: "nav.services", path: "/services" },
    { label: "nav.about", path: "/about" },
    { label: "nav.contact", path: "/contact" },
  ];

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (state) => () => setOpenDrawer(state);

  const { user, logout } = useAuth();
  console.log("Navbar user:", user);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [open, setOpen] = useState(false);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    setAnchorEl(null);
    logout();
    setOpen(false);
  };

  return (
    <AppBar sx={{ bgcolor: "background.default", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo + Menu */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {isMobile && (
            <IconButton
              onClick={toggleDrawer(true)}
              sx={{ color: "text.primary" }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <img src={logo} alt="Logo" style={{ height: 60 }} />
        </Box>

        {/* Desktop Links */}
        {!isMobile && (
          <Box sx={{ display: "flex", gap: 2 }}>
            {links.map((item) => (
              <List key={item.label}>
                <ListItemButton component={RouterLink} to={item.path}>
                  <ListItemText
                    primary={t(item.label)}
                    sx={{
                      textAlign: "center",
                      color: isActive(item.path)
                        ? "primary.main"
                        : "text.primary",
                      borderBottom: isActive(item.path)
                        ? "2px solid"
                        : "2px solid transparent",
                      fontWeight: "bold",
                      "&:hover": { color: "primary.main" },
                    }}
                  />
                </ListItemButton>
              </List>
            ))}
          </Box>
        )}

        {/* Right side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {!isMobile && <LanguageSwitcher i18n={i18n} />}
          <IconButton onClick={toggleTheme} sx={{ color: "text.primary" }}>
            {mode === "dark" ? (
              <LightModeOutlinedIcon />
            ) : (
              <DarkModeOutlinedIcon />
            )}
          </IconButton>

          {!user && (
            <>
              <Tooltip title="Account">
                <IconButton
                  onClick={(e) => setAnchorElUser(e.currentTarget)}
                  sx={{ color: "text.primary" }}
                >
                  <PersonOutlineOutlinedIcon />
                </IconButton>
              </Tooltip>
            </>
          )}

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

              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={handleMenuClose}
                  sx={{ "&:hover": { color: "primary.main" } }}
                >
                  {t("profile.Profile")}
                </MenuItem>
                <MenuItem
                  onClick={handleMenuClose}
                  sx={{ "&:hover": { color: "primary.main" } }}
                >
                  {t("profile.Settings")}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogOut} sx={{ color: "red" }}>
                  {t("profile.Logout")}
                </MenuItem>
              </Menu>
            </>
          )}

          <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={() => setAnchorElUser(null)}
          >
            <MenuItem component={RouterLink} to="/login">
              {t("nav.login")}
            </MenuItem>
            <MenuItem component={RouterLink} to="/register">
              {t("nav.register")}
            </MenuItem>
          </Menu>
          <IconButton
            sx={{ color: "text.primary" }}
            component={RouterLink}
            to="/favorites"
          >
            <Badge badgeContent={favorites.length} color="primary">
              <FavoriteBorderIcon />
            </Badge>
          </IconButton>
          <IconButton
            sx={{ color: "text.primary" }}
            component={RouterLink}
            to="/shopping-cart"
          >
            <Badge badgeContent={totalItems} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 270,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* ================= USER HEADER ================= */}
          {user && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 2,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "orange",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {user.email.charAt(0).toUpperCase()}
              </Avatar>

              <Box sx={{ flex: 1 }}>
                <Typography fontWeight="bold">{user.name || "User"}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>

              {/* ⋮ MENU */}
              <IconButton onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
            </Box>
          )}

          {/* MENU ITEMS */}
          <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
            <MenuItem
              onClick={handleMenuClose}
              sx={{ "&:hover": { color: "primary.main" } }}
            >
              {t("profile.Profile")}
            </MenuItem>
            <MenuItem
              onClick={handleMenuClose}
              sx={{ "&:hover": { color: "primary.main" } }}
            >
              {t("profile.Settings")}
            </MenuItem>
          </Menu>

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
              <LanguageSwitcher i18n={i18n} />
            </ListItemButton>
          </Box>

          {user && (
            <Box sx={{ p: 2 }}>
              <Divider sx={{ mb: 1 }} />

              <Button
                fullWidth
                onClick={handleLogOut}
                sx={{
                  color: "red",
                  fontWeight: "bold",
                  justifyContent: "flex-start",
                  mb: 2,
                }}
              >
                {t("profile.Logout")}
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
}
