import React from "react";
import { Box, Typography, Grid, useMediaQuery, useTheme } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useData } from "../context/AuthContext";
import ProductCard from "../components/Products/ProductCard";
import { useTranslation } from "react-i18next";

export default function Favorites({ handleAddToCart }) {
  const { favorites } = useData();
  const { t } = useTranslation();

  const hasFavorites = favorites.length > 0;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Screen < 600px
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // Screen between 600px and 960px

  const getGridColumns = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 4;
  };

  return (
    <Box sx={{ minHeight: "100vh", p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 7 }}>
        <Typography variant="h5" fontWeight="bold">
          {t("favorite.title")} 
        </Typography> 
      </Box>
      {!hasFavorites ? (
        <Box
          sx={{
            minHeight: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <FavoriteBorderIcon sx={{ fontSize: 80, color: "gray", mb: 2 }} />

          <Typography variant="h6" color="text.secondary">
            {t("favorite.no-favorite")}
          </Typography>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              mt: 4,
              width: "100%",
              display: "grid",
              gridTemplateColumns: `repeat(${getGridColumns()}, 1fr)`,
              gap: { xs: 2, sm: 3, md: 4 },
            }}
          >
            {favorites.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}
