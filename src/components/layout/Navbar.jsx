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
  InputLabel,
  Select,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import logo from "../../assets/images/logo.png";
import { useData } from "../../context/AuthContext";

export default function Navbar() {
  const { mode, toggleTheme } = useData();
  const links = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Services", path: "/services" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const theme = useTheme();
  const LanguageSwitcher = ({ value, onChange }) => (
    <FormControl size="small">
      <Select value={value} onChange={onChange} sx={{ minWidth: 80 }}>
        <MenuItem value="FR">FR</MenuItem>
        <MenuItem value="AR">AR</MenuItem>
      </Select>
    </FormControl>
  );
  const [switchLang, setSwitchLang] = useState("FR");
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (state) => () => setOpenDrawer(state);

  return (
    <AppBar sx={{ bgcolor: "background.default", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {isMobile && (
            <IconButton
              onClick={toggleDrawer(true)}
              sx={{ color: "text.primary" }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <img src={logo} alt="Logo" style={{ height: 45 }} />
        </Box>

        {!isMobile && (
          <Box sx={{ display: "flex", gap: 1 }}>
            {links.map((item) => (
              <List key={item.label}>
                <ListItemButton component={RouterLink} to={item.path}>
                  <ListItemText
                    primary={item.label}
                    sx={{
                      textAlign: "center",
                      color: "text.primary",
                      fontWeight: "bold",
                      "&:hover": { color: "primary.main" },
                    }}
                  />
                </ListItemButton>
              </List>
            ))}
          </Box>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {!isMobile && (
            <LanguageSwitcher
              value={switchLang}
              onChange={(e) => setSwitchLang(e.target.value)}
            />
          )}
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
          {/* <IconButton
            sx={{ color: "text.primary", "&:hover": { color: "primary.main" } }}
          >
            <SearchIcon />    
          </IconButton>  */}
          <Tooltip title="Login/Register">
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
            <MenuItem>
              <Typography sx={{ "&:hover": { color: "primary.main" } }}>
                Login
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography sx={{ "&:hover": { color: "primary.main" } }}>
                Register
              </Typography>
            </MenuItem>
          </Menu>
          <IconButton
            sx={{ color: "text.primary", "&:hover": { color: "primary.main" } }}
          >
            <Badge badgeContent={1} color="primary">
              <FavoriteBorderIcon />
            </Badge>
          </IconButton>
          <IconButton
            sx={{ color: "text.primary", "&:hover": { color: "primary.main" } }}
          >
            <Badge badgeContent={1} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>

      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 200, mt: 6 }}>
          {links.map((item) => (
            <List key={item.label}>
              <ListItemButton
                component={RouterLink}
                to={item.path}
                onClick={toggleDrawer(false)}
                sx={{
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
        <List sx={{ mt: 2 }}>
          <ListItemButton
            sx={{
              borderRadius: 2,
              mx: 1,
            }}
          >
            <ListItemText primary="Language" sx={{ color: "text.primary" }} />
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
