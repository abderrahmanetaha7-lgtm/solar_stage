import React from "react";

import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Box,
  alpha,
  Divider,
} from "@mui/material";

import {
  LightModeOutlined,
  DarkModeOutlined,
  MenuOpen,
  Logout,
  Language,
  PersonOutlineOutlined,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { toggleTheme } from "../../features/theme/themeSlice";

import { logout } from "../../features/auth/authSlice";

export default function Topbar({ openMenu, toggleSidebar }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  /* ================= REDUX ================= */

  const user = useSelector((state) => state.auth.user);

  const mode = useSelector((state) => state.theme.mode);

  /* ================= MENU ================= */

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  /* ================= LOGOUT ================= */

  const handleLogout = async () => {
    handleMenuClose();

    await dispatch(logout());

    navigate("/login");
  };

  /* ================= AVATAR ================= */

  const avatarUrl = user?.avatar_url || "";

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        zIndex: 1300,
        mb:2,
        height: 60,
        justifyContent: "center",
        backgroundColor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        backdropFilter: "blur(12px)",
      }}
    >
      <Toolbar
        sx={{
          px: {
            xs: 2,
            md: 3,
          },
        }}
      >
        {/* ================= LEFT ================= */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* TOGGLE */}

          <IconButton onClick={toggleSidebar}>
            <MenuOpen
              sx={{
                transition: "0.3s",

                transform: openMenu ? "rotate(0deg)" : "rotate(180deg)",
              }}
            />
          </IconButton>

          {/* LOGO */}

          <Typography
            variant="h6"
            fontWeight={800}
            sx={{
              letterSpacing: 1,

              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            SOLAR ADMIN
          </Typography>
        </Box>

        {/* ================= RIGHT ================= */}

        <Box
          sx={{
            ml: "auto",

            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          {/* THEME */}

          <IconButton
            onClick={() => dispatch(toggleTheme())}
            sx={{
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
          </IconButton>

          {/* PROFILE */}

          <Box
            onClick={handleMenuClick}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,

              px: 1.2,
              py: 0.7,

              borderRadius: 3,

              cursor: "pointer",

              transition: "0.2s",

              "&:hover": {
                backgroundColor: (theme) =>
                  alpha(theme.palette.text.primary, 0.05),
              },
            }}
          >
            {/* AVATAR */}

            <Avatar
              src={avatarUrl}
              sx={{
                width: 42,
                height: 42,

                bgcolor: "primary.main",

                fontWeight: 700,
              }}
            >
              {!avatarUrl && user?.name?.charAt(0)?.toUpperCase()}
            </Avatar>

            {/* INFO */}

            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            >
              {/* NAME */}

              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                {user?.name || "Admin"}
              </Typography>

              {/* ROLE */}

              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  textTransform: "capitalize",
                }}
              >
                {user?.role || "Administrator"}
              </Typography>
            </Box>
          </Box>

          {/* MENU */}

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              sx: {
                mt: 1.5,
                width: 230,
                borderRadius: 3,
                p: 1,
              },
            }}
          >
            {/* USER HEADER */}

            <Box
              sx={{
                px: 2,
                py: 1.5,

                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Avatar
                src={avatarUrl}
                sx={{
                  width: 45,
                  height: 45,
                }}
              >
                {!avatarUrl && user?.name?.charAt(0)?.toUpperCase()}
              </Avatar>

              <Box>
                <Typography variant="body2" fontWeight={700}>
                  {user?.name}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  {user?.email}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 1 }} />

            {/* PROFILE */}

            <MenuItem
              onClick={() => {
                navigate("/admin/profile");

                handleMenuClose();
              }}
              sx={{
                gap: 1.5,
                borderRadius: 2,
              }}
            >
              <PersonOutlineOutlined fontSize="small" />
              Profil
            </MenuItem>

            {/* WEBSITE */}

            <MenuItem
              onClick={() => {
                navigate("/");

                handleMenuClose();
              }}
              sx={{
                gap: 1.5,
                borderRadius: 2,
              }}
            >
              <Language fontSize="small" />
              Voir le site
            </MenuItem>

            <Divider sx={{ my: 1 }} />

            {/* LOGOUT */}

            <MenuItem
              onClick={handleLogout}
              sx={{
                gap: 1.5,
                borderRadius: 2,
                color: "error.main",
              }}
            >
              <Logout fontSize="small" />
              Déconnexion
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
