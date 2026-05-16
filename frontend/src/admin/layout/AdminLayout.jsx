import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar";

export default function AdminLayout() {
  const isMobile = useMediaQuery("(max-width:900px)");
  const [open, setOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box
      display="flex"
      dir="ltr"
      sx={{
        direction: "ltr",
      }}
    >
      {/* SIDEBAR */}
      <Sidebar open={open} setOpen={setOpen} isMobile={isMobile} />

      {/* CONTENT */}
      <Box
        sx={{
          flexGrow: 1,
          transition: "margin 0.3s ease",
          ml: open && !isMobile ? "240px" : "0px",
          p: 2,
        }}
      >
        <Topbar openMenu={open} toggleSidebar={toggleSidebar} />
        <Outlet />
      </Box>
    </Box>
  );
}
