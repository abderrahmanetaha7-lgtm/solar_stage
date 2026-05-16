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
  Skeleton,
  Typography,
} from "@mui/material";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import { toggleTheme } from "../../../features/theme/themeSlice";
import { useLogout } from "../../../hooks/useLogout";

export default function UserMenu() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const logoutUser = useLogout();

  // ================= AUTH =================

  const { user, loading, checkingAuth } = useSelector((state) => state.auth);

  const avatarUrl = user?.avatar_url || "";

  // ================= THEME =================

  const mode = useSelector((state) => state.theme.mode);

  // ================= CART =================

  const cartItems = useSelector((state) => state.cart.cart);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // ================= FAVORITES =================

  const favorites = useSelector((state) => state.favorites.favorites);

  // ================= MENUS =================

  const [anchorElProfile, setAnchorElProfile] = useState(null);

  const [anchorElAuth, setAnchorElAuth] = useState(null);

  const openProfileMenu = Boolean(anchorElProfile);

  const openAuthMenu = Boolean(anchorElAuth);

  // ================= HANDLERS =================

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

  return (
    <>
      {/* ================= AUTH / AVATAR ================= */}

      {!isMobile && (
        <>
          {/* ===== LOADING ===== */}

          {(checkingAuth || loading) && (
            <Skeleton
              variant="circular"
              width={35}
              height={35}
              animation="wave"
            />
          )}

          {/* ===== USER LOGGED ===== */}

          {!checkingAuth && !loading && user && (
            <>
              <Avatar
                src={avatarUrl}
                onClick={handleProfileOpen}
                sx={{
                  bgcolor: "orange",
                  width: 35,
                  height: 35,
                  cursor: "pointer",
                }}
              >
                {!user?.avatar_url && user?.name?.charAt(0)?.toUpperCase()}
              </Avatar>

              <Menu
                anchorEl={anchorElProfile}
                open={openProfileMenu}
                onClose={handleProfileClose}
              >
                {user?.role === "admin" ? (
                  <MenuItem
                    component={RouterLink}
                    to="/admin"
                    onClick={handleProfileClose}
                    sx={{
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  >
                    Dashboard
                  </MenuItem>
                ) : (
                  <>
                    <MenuItem
                      component={RouterLink}
                      to="/account"
                      onClick={handleProfileClose}
                      sx={{
                        "&:hover": {
                          color: "primary.main",
                        },
                      }}
                    >
                      {t("profile.Account")}
                    </MenuItem>

                    <MenuItem
                      component={RouterLink}
                      to="/orders"
                      onClick={handleProfileClose}
                      sx={{
                        "&:hover": {
                          color: "primary.main",
                        },
                      }}
                    >
                      {t("profile.Orders")}
                    </MenuItem>
                  </>
                )}

                <Divider />

                <MenuItem
                  onClick={async () => {
                    setAnchorElProfile(null);

                    await logoutUser();
                  }}
                  sx={{ color: "red" }}
                >
                  {t("profile.Logout")}
                </MenuItem>
              </Menu>
            </>
          )}

          {/* ===== GUEST ===== */}

          {!checkingAuth && !loading && !user && (
            <>
              <Tooltip title="Account">
                <IconButton
                  onClick={handleAuthOpen}
                  sx={{
                    color: "text.primary",
                    "&:hover": {
                      color: "primary.main",
                    },
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
                  sx={{ 
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  {t("nav.login")}
                </MenuItem>

                <MenuItem
                  component={RouterLink}
                  to="/register"
                  onClick={handleAuthClose}
                  sx={{
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  {t("nav.register")}
                </MenuItem>
              </Menu>
            </>
          )}
        </>
      )}

      {/* ================= THEME ================= */}

      <IconButton
        onClick={() => dispatch(toggleTheme())}
        sx={{
          color: "text.primary",
        }}
      >
        {mode === "dark" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
      </IconButton>

      {/* ================= FAVORITES ================= */}

      <IconButton
        component={RouterLink}
        to="/favorites"
        sx={{
          color: "text.primary",
          "&:hover": {
            color: "primary.main",
          },
        }}
      >
        <Badge badgeContent={favorites.length} color="primary">
          <FavoriteBorderIcon />
        </Badge>
      </IconButton>

      {/* ================= CART ================= */}

      <IconButton
        component={RouterLink}
        to="/shopping-cart"
        sx={{
          color: "text.primary",
          "&:hover": {
            color: "primary.main",
          },
        }}
      >
        <Badge badgeContent={totalItems} color="primary">
          <ShoppingCartOutlinedIcon />
        </Badge>
      </IconButton>
    </>
  );
}
