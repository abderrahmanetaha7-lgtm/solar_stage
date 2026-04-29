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
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
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

  const { mode, toggleTheme } = useData();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const isActive = (path) => location.pathname === path;

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

          <Tooltip title="Account">
            <IconButton
              onClick={(e) => setAnchorElUser(e.currentTarget)}
              sx={{ color: "text.primary" }}
            >
              <PersonOutlineOutlinedIcon />
            </IconButton>
          </Tooltip>

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

          <IconButton sx={{ color: "text.primary" }}>
            <Badge badgeContent={1} color="primary">
              <FavoriteBorderIcon />
            </Badge>
          </IconButton>

          <IconButton sx={{ color: "text.primary" }}>
            <Badge badgeContent={1} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 240, mt: 8 }}>
          {links.map((item) => (
            <List key={item.label}>
              <ListItemButton
                component={RouterLink}
                to={item.path}
                onClick={toggleDrawer(false)}
                sx={{
                  bgcolor: isActive(item.path) ? "primary.main" : "transparent",
                }}
              >
                <ListItemText primary={t(item.label)} />
              </ListItemButton>
            </List>
          ))}

          <List sx={{ mt: 2 }}>
            <ListItemButton sx={{ borderRadius: 2, mx: 1 }}> 
              <ListItemText
                primary={t("nav.lang")}
                sx={{ color: "text.primary" }}
              />
              <LanguageSwitcher i18n={i18n} />
            </ListItemButton>
          </List> 
        </Box>
      </Drawer>
    </AppBar>
  );
}
