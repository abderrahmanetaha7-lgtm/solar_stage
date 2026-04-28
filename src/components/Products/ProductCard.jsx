import React, { useState } from "react";
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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useTranslation } from "react-i18next";

const ProductCard = ({ product, onAddToCart }) => {
  const { t } = useTranslation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // Default fallback values
  const {
    id,
    name = "Nom du produit",
    price = 0,
    image = "https://via.placeholder.com/500x300?text=No+Image",
    category = "GENERAL",
    efficiency = "0%",
    description = "Aucune description disponible",
  } = product;

  const fallbackImage =
    "https://via.placeholder.com/500x300?text=Image+Not+Found";
  const imageSrc = imageError ? fallbackImage : image;

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const formattedPrice =
    typeof price === "number" ? price.toLocaleString() : price;

  const getFavoriteButtonBgColor = () => {
    if (isDarkMode) {
      return "rgba(30, 30, 30, 0.95)";
    }
    return "rgba(255, 255, 255, 0.95)";
  };

  const getFavoriteButtonBorder = () => {
    if (isDarkMode) {
      return "1px solid rgba(255, 255, 255, 0.2)";
    }
    return "1px solid rgba(0, 0, 0, 0.08)";
  };

  const getFavoriteIconColor = () => {
    if (isDarkMode) {
      return "#e0e0e0";
    }
    return "#666666"; // رمادي غامق لللايت مود
  };

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
            ? "0 16px 32px rgba(0,0,0,0.4)"
            : "0 16px 32px rgba(0,0,0,0.12)",
        },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        bgcolor: "background.paper", // يستخدم لون خلفية البطاقة من الثيم
      }}
    >
      {/* Image Container - حاوية الصورة المحسنة */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          paddingTop: "75%", // نسبة 4:3
          overflow: "hidden",
          bgcolor: isDarkMode ? "#1a1a1a" : "#f5f5f5",
          cursor: "pointer",
        }}
      >
        <Box
          component="img"
          src={imageSrc}
          alt={name}
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
          onError={() => setImageError(true)}
        />

        <Chip
          icon={<FlashOnIcon sx={{ fontSize: 16, color: "#fff" }} />}
          label={efficiency}
          size="small"
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            bgcolor: "rgba(46, 125, 50, 0.95)",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "0.75rem",
            backdropFilter: "blur(4px)",
            "& .MuiChip-icon": {
              color: "#fff",
            },
          }}
        />

        <IconButton
          onClick={handleFavoriteClick}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            bgcolor: getFavoriteButtonBgColor(),
            border: getFavoriteButtonBorder(),
            backdropFilter: "blur(4px)",
            width: 40,
            height: 40,
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: isDarkMode
                ? "rgba(50, 50, 50, 1)"
                : "rgba(255, 255, 255, 1)",
              transform: "scale(1.1)",
            },
          }}
        >
          {isFavorite ? (
            <FavoriteIcon sx={{ color: "#e91e63", fontSize: 22 }} />
          ) : (
            <FavoriteBorderIcon
              sx={{ color: getFavoriteIconColor(), fontSize: 22 }}
            />
          )}
        </IconButton>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
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
          {category}
        </Typography>

        {/* اسم المنتج */}
        <Typography
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
            color: "text.primary",
          }}
        >
          {name}
        </Typography>

        {/* الوصف */}
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

        {/* السعر والزر */}
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
              sx={{ textDecoration: "line-through", fontSize: "0.75rem" }}
            >
              {(formattedPrice * 1.2).toLocaleString()} {" "}
              {t("productsPage.currency")}
            </Typography>
            <Typography variant="p" fontWeight="bold" color="primary">
              {formattedPrice} {" "} {t("productsPage.currency")}
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="medium"
            startIcon={<ShoppingCartIcon />}
            onClick={() => onAddToCart(id)}
            sx={{
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              boxShadow: "none",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)",
              },
            }}
          >
            {t("productsPage.add")}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
