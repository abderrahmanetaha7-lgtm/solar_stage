import React, { useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Divider,
  IconButton,
  useTheme,
} from "@mui/material";

import { Link } from "react-router-dom";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { toggleFavorite } from "../../features/favorites/favoritesSlice";
import { addToCart } from "../../features/cart/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites?.favorites || []);

  const favoriteIds = useMemo(
    () => new Set(favorites.map((f) => f.id)),
    [favorites],
  );

  const favorite = favoriteIds.has(product.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product));
  };

  const handleAddToCart = () => {
    if (product.stock_quantity <= 0) return;

    dispatch(addToCart(product));
  };

  const { t, i18n } = useTranslation();

  const [imageError, setImageError] = useState(false);

  const theme = useTheme();

  const isDarkMode = theme.palette.mode === "dark";

  if (!product) return null;

  /* ================= LANGUAGE ================= */

  const currentLanguage = i18n.language;

  const name = currentLanguage === "ar" ? product.name_ar : product.name_fr;

  const description =
    currentLanguage === "ar" ? product.description_ar : product.description_fr;

  /* ================= PRODUCT DATA ================= */

  const { id, price = 0, category } = product;

  const firstImage = product?.images?.[0]?.image
    ? `${import.meta.env.VITE_API_URL}/storage/${product.images[0].image}`
    : "https://via.placeholder.com/500x300?text=No+Image";

  const categoryName =
    currentLanguage === "ar" ? category?.name_ar : category?.name_fr;

  const fallbackImage =
    "https://via.placeholder.com/500x300?text=Image+Not+Found";

  const imageSrc = imageError ? fallbackImage : firstImage;

  const formattedPrice =
    typeof price === "number" ? price.toLocaleString() : price;

  const getFavoriteButtonBgColor = () =>
    isDarkMode ? "rgba(30, 30, 30, 0.95)" : "rgba(255, 255, 255, 0.95)";

  const getFavoriteButtonBorder = () =>
    isDarkMode
      ? "1px solid rgba(255, 255, 255, 0.2)"
      : "1px solid rgba(0, 0, 0, 0.08)";

  const getFavoriteIconColor = () => (isDarkMode ? "#e0e0e0" : "#666666");

  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: isDarkMode
          ? "0 8px 24px rgba(0,0,0,0.3)"
          : "0 8px 24px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease-in-out",

        "&:hover": {
          transform: "translateY(-8px)",

          boxShadow: isDarkMode
            ? "0 16px 32px rgba(12, 8, 8, 0.4)"
            : "0 16px 32px rgba(0,0,0,0.12)",
        },

        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        bgcolor: "background.paper",
      }}
    >
      {/* IMAGE */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          paddingTop: "75%",
          overflow: "hidden",
          bgcolor: isDarkMode ? "#1a1a1a" : "#f5f5f5",
          cursor: "pointer",
        }}
      >
        <Box
          component="img"
          src={imageSrc}
          alt={name}
          onError={() => setImageError(true)}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,

            width: "100%",
            height: "100%",

            objectFit: "cover",

            transition: "transform 0.4s ease-in-out",

            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />

        {/* FAVORITE */}
        <IconButton
          onClick={handleToggleFavorite}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,

            bgcolor: getFavoriteButtonBgColor(),

            border: getFavoriteButtonBorder(),

            backdropFilter: "blur(4px)",

            width: 40,
            height: 40,

            "&:hover": {
              bgcolor: isDarkMode
                ? "rgba(50, 50, 50, 1)"
                : "rgba(255, 255, 255, 1)",

              transform: "scale(1.1)",
            },
          }}
        >
          {favorite ? (
            <FavoriteIcon
              sx={{
                color: "#e91e63",
                fontSize: 22,
              }}
            />
          ) : (
            <FavoriteBorderIcon
              sx={{
                color: getFavoriteIconColor(),
                fontSize: 22,
              }}
            />
          )}
        </IconButton>
      </Box>

      {/* CONTENT */}
      <CardContent
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        {/* CATEGORY */}
        <Typography
          variant="caption"
          sx={{
            color: "#2e7d32",

            fontWeight: 700,

            textTransform: "uppercase",

            letterSpacing: "0.5px",

            bgcolor: "rgba(46, 125, 50, 0.1)",

            px: 1,
            py: 0.5,

            borderRadius: 2,

            display: "inline-block",
          }}
        >
          {categoryName}
        </Typography>

        {/* NAME */}
        <Typography
          component={Link}
          to={`/product-detail/${id}`}
          variant="h6"
          fontWeight="bold"
          sx={{
            mt: 1.5,
            mb: 1,

            fontSize: "1.1rem",

            lineHeight: 1.3,

            display: "-webkit-box",

            WebkitLineClamp: 2,

            WebkitBoxOrient: "vertical",

            overflow: "hidden",

            cursor: "pointer",

            color: "text.primary",

            "&:hover": {
              color: "primary.main",
            },

            textDecoration: "none",
          }}
        >
          {name}
        </Typography>

        {/* DESCRIPTION */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: "0.85rem",

            lineHeight: 1.5,

            display: "-webkit-box",

            WebkitLineClamp: 2,

            WebkitBoxOrient: "vertical",

            overflow: "hidden",

            mb: 2,
          }}
        >
          {description}
        </Typography>

        <Divider sx={{ my: 1.5 }} />

        {/* PRICE */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                textDecoration: "line-through",
                fontSize: "0.75rem",
              }}
            >
              {(formattedPrice * 1.2).toLocaleString()}{" "}
              {t("productsPage.currency")}
            </Typography>

            <Typography fontWeight="bold" color="primary">
              {formattedPrice} {t("productsPage.currency")}
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<ShoppingCartIcon />}
            onClick={handleAddToCart}
            disabled={!product.stock_quantity}
            sx={{ gap: 2 }}
          >
            {t("productsPage.add")}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
