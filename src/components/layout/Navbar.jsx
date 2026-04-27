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

// 🌐 Language Switcher
const LanguageSwitcher = ({ value, onChange }) => (
  <FormControl size="small">
    <Select value={value} onChange={onChange} sx={{ minWidth: 80 }}>
      <MenuItem value="FR">FR</MenuItem>
      <MenuItem value="AR">AR</MenuItem>
    </Select>
  </FormControl>
);

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const { mode, toggleTheme } = useData();

  const links = [
    { label: "Accueil", path: "/" },
    { label: "Produits", path: "/products" },
    { label: "Services", path: "/services" },
    { label: "À propos", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [switchLang, setSwitchLang] = useState("FR");
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (state) => () => setOpenDrawer(state);

  return (
    <AppBar sx={{ bgcolor: "background.default", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* LEFT */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {isMobile && (
            <IconButton onClick={toggleDrawer(true)} sx={{ color: "text.primary" }}>
              <MenuIcon />
            </IconButton>
          )}
          <img src={logo} alt="Logo" style={{ height: 45 }} />
        </Box>

        {/* CENTER LINKS */}
        {!isMobile && (
          <Box sx={{ display: "flex", gap: 1 }}>
            {links.map((item) => (
              <List key={item.label}>
                <ListItemButton component={RouterLink} to={item.path}>
                  <ListItemText
                    primary={item.label}
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

        {/* RIGHT */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {!isMobile && (
            <LanguageSwitcher
              value={switchLang}
              onChange={(e) => setSwitchLang(e.target.value)}
            />
          )}

          {/* DARK MODE */}
          <IconButton
            onClick={toggleTheme}
            sx={{ color: "text.primary", "&:hover": { color: "primary.main" } }}
          >
            {mode === "dark" ? (
              <LightModeOutlinedIcon />
            ) : (
              <DarkModeOutlinedIcon />
            )}
          </IconButton>

          {/* USER MENU */}
          <Tooltip title="Connexion / Inscription">
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

          <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={() => setAnchorElUser(null)}
          >
            <MenuItem
              component={RouterLink}
              to="/login"
              onClick={() => setAnchorElUser(null)}
            >
              Connexion
            </MenuItem>

            <MenuItem
              component={RouterLink}
              to="/register"
              onClick={() => setAnchorElUser(null)}
            >
              Inscription
            </MenuItem>
          </Menu>

          {/* FAVORITES */}
          <IconButton
            sx={{ color: "text.primary", "&:hover": { color: "primary.main" } }}
          >
            <Badge badgeContent={1} color="primary">
              <FavoriteBorderIcon />
            </Badge>
          </IconButton>

          {/* CART */}
          <IconButton
            sx={{ color: "text.primary", "&:hover": { color: "primary.main" } }}
          >
            <Badge badgeContent={1} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>

      {/* DRAWER (MOBILE) */}
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 220, mt: 8 }}>
          {links.map((item) => (
            <List key={item.label}>
              <ListItemButton
                component={RouterLink}
                to={item.path}
                onClick={toggleDrawer(false)}
                sx={{
                  bgcolor: isActive(item.path)
                    ? "primary.main"
                    : "transparent",
                  "&:hover": {
                    bgcolor: "primary.main",
                    "& .MuiListItemText-primary": {
                      color: "#000",
                    },
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  sx={{
                    color: "text.primary",
                    fontWeight: "bold",
                    ml: 2,
                  }}
                />
              </ListItemButton>
            </List>
          ))}
        </Box>

        {/* LANGUAGE IN DRAWER */}
        <List sx={{ mt: 2 }}>
          <ListItemButton sx={{ borderRadius: 2, mx: 1 }}>
            <ListItemText primary="Langue" sx={{ color: "text.primary" }} />
            <LanguageSwitcher
              value={switchLang}
              onChange={(e) => setSwitchLang(e.target.value)}
            />
          </ListItemButton>
        </List>
      </Drawer>
    </AppBar>
  );
}