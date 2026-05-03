import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NavLinks() {
  const { t } = useTranslation();
  const location = useLocation();

  const links = [
    { label: "nav.home", path: "/" },
    { label: "nav.products", path: "/products" },
    { label: "nav.services", path: "/services" },
    { label: "nav.about", path: "/about" },
    { label: "nav.contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
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
  );
}