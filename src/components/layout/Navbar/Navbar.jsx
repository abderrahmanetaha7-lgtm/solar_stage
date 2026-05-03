import { AppBar, Toolbar, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import MobileDrawer from "./MobileDrawer";
import LanguageSwitcher from "./LanguageSwitcher";

import logo from "../../../assets/images/logo.png";

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

        {!isMobile && <NavLinks />}

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {!isMobile && <LanguageSwitcher />}
          <UserMenu />
        </Box>
      </Toolbar>

      <MobileDrawer open={openDrawer} toggleDrawer={toggleDrawer} />
    </AppBar>
  );
}