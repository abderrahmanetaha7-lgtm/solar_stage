import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Box,
  alpha,
  styled,
} from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import {
  Search as SearchIcon,
  Notifications as BellIcon,
} from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export function Topbar({ openMenu, toggleSidebar }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleMenuClose();
    // Add sign out logic here
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        zIndex: 1300,
        height: 64,
        backgroundColor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
        backdropFilter: "blur(8px)",
        mb: 3,
      }}
    >
      <Toolbar sx={{ height: 64, minHeight: 64, px: { xs: 2, md: 3 } }}>
        <Box
          sx={{
            height: 64,
            display: "flex",
            alignItems: "center",
          }}
        >
          <MenuOpenIcon
            onClick={toggleSidebar}
            sx={{
              transform: openMenu ? "rotate(0deg)" : "rotate(180deg)",
              transition: "transform 0.3s ease",
              cursor: "pointer",
            }}
          />
        </Box>
        <Search sx={{ flex: 1, maxWidth: 400 }}>
          <SearchIconWrapper>
            <SearchIcon sx={{ color: "text.secondary" }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search products, orders, users..."
            inputProps={{ "aria-label": "search" }}
            sx={{
              backgroundColor: (theme) =>
                alpha(theme.palette.text.primary, 0.05),
              borderRadius: 2,
              width: "100%",
            }}
          />
        </Search>

        <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            onClick={handleMenuClick}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              p: 0.5,
              borderRadius: "50%",
              cursor: "pointer",
              transition: "background-color 0.2s",
              "&:hover": {
                backgroundColor: (theme) =>
                  alpha(theme.palette.text.primary, 0.05),
              },
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: "primary.main",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}
            >
              AM
            </Avatar>
            <Box
              sx={{ display: { xs: "none", md: "block" }, textAlign: "left" }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, lineHeight: 1.2 }}
              >
                ahmed
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", lineHeight: 1.2 }}
              >
                Admin
              </Typography>
            </Box>
          </Box>

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
                width: 192,
                borderRadius: 1,
              },
            }}
          >
            <MenuItem onClick={handleSignOut} sx={{ color: "error.main" }}>
              Sign out
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
