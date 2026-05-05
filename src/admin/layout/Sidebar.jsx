import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
} from "@mui/material";

import {
  Dashboard,
  Inventory,
  ShoppingCart,
  People,
  Storage,
  BarChart,
  Settings,
} from "@mui/icons-material";

const drawerWidth = 240;

const items = [
  { title: "Dashboard", url: "/admin", icon: <Dashboard /> },
  { title: "Products", url: "/admin/products", icon: <Inventory /> },
  { title: "Orders", url: "/admin/orders", icon: <ShoppingCart /> },
  { title: "Users", url: "/admin/users", icon: <People /> },
  { title: "Inventory", url: "/admin/inventory", icon: <Storage /> },
  { title: "Analytics", url: "/admin/analytics", icon: <BarChart /> },
  { title: "Settings", url: "/admin/settings", icon: <Settings /> },
];

export default function Sidebar({ open, setOpen, isMobile }) {
  const location = useLocation();

  const drawerContent = (
    <>
      {/* HEADER */}
      <Toolbar sx={{ borderBottom: "1px solid #1f2430" }}>
        <Link to="/admin" style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="logo" style={{ width: 50 }} />
        </Link>
      </Toolbar>

      {/* MENU */}
      <Box sx={{ px: 1, mt: 2 }}>
        <List>
          {items.map((item) => {
            const active = location.pathname === item.url;

            return (
              <ListItemButton
                key={item.title}
                component={Link}
                to={item.url}
                selected={active}
                onClick={() => isMobile && setOpen(false)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  "&.Mui-selected": {
                    backgroundColor: "#1f2430",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#fff", minWidth: 36 }}>
                  {item.icon}
                </ListItemIcon>

                <ListItemText primary={item.title} />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </>
  );

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          backgroundColor: "#0f1115",
          color: "#fff",
          borderRight: "1px solid #1f2430",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}
