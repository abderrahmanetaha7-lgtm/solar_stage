import {
  AppBar,
  Toolbar,
  Typography,
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
} from "@mui/material";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/images/logo.png";

import { Link as RouterLink } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function Navbar() {
  const links = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Services", path: "/services" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (state) => () => {
    setOpenDrawer(state);
  };

  return (
    <AppBar sx={{ background: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* LEFT: Menu Icon + Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {isMobile && (
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon sx={{ color: "black" }} />
            </IconButton>
          )}

          <img src={logo} alt="Logo" style={{ height: 40 }} />
        </Box>

        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {links.map((item) => (
              <List key={item.label}>
                <ListItemButton component={RouterLink} to={item.path}>
                  <ListItemText
                    primary={item.label}
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      "&:hover": { color: "#1A6B3A" },
                      textAlign: "center",
                    }}
                  />
                </ListItemButton>
              </List>
            ))}
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, md: 1 },
          }}
        >
          <IconButton sx={{ color: "black", "&:hover": { color: "#bea555" } }}>
            <LightModeOutlinedIcon />
            
            {/* <DarkModeOutlinedIcon /> */}
          </IconButton>

          <IconButton sx={{ color: "black", "&:hover": { color: "#bea555" } }}>
            <SearchIcon />
          </IconButton>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Login/Register">
              <IconButton onClick={handleOpenUserMenu}>
                <PersonOutlineOutlinedIcon
                
                  sx={{
                    color: "black",
                    "&:hover": { color: "#bea555" },
                  }}
                />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "30px" }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography sx={{ "&:hover": { color: "#bea555" } }}>
                  Login
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography sx={{ "&:hover": { color: "#bea555" } }}>
                  Register
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          <IconButton sx={{ color: "black", "&:hover": { color: "#bea555" } }}>
            <Badge badgeContent={1} color="primary">
              <FavoriteBorderIcon />
            </Badge>
          </IconButton>

          <IconButton sx={{ color: "black", "&:hover": { color: "#bea555" } }}>
            <Badge badgeContent={1} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>

      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 150, mt: 6 }}>
          {links.map((item) => (
            <List key={item.label} sx={{ py: 0.5 }}>
              <ListItemButton
                component={RouterLink}
                to={item.path}
                onClick={toggleDrawer(false)}
                sx={{ "&:hover": { bgcolor: "#bea555" } }}
              >
                <ListItemText
                  primary={item.label}
                  sx={{
                    color: "black",
                    fontWeight: "bold",

                    ml: 2,
                    m: 0,
                  }}
                />
              </ListItemButton>
            </List>
          ))}
        </Box>
      </Drawer>
    </AppBar>
  );
}
