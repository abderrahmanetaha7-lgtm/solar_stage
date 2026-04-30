import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
  Chip,
  Divider,
} from "@mui/material";

import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function ProductDetail({ onAddToCart }) {
  const navigate = useNavigate();
  const { products } = useProducts();
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  const product = products.find((p) => p.id == Number(id));
  const [index, setIndex] = useState(0);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  const images = Array.isArray(product.image) ? product.image : [product.image];

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Box sx={{ p: 4, mt: 5 }}>
      {/* BACK BUTTON */}
      <IconButton
      component={RouterLink}
      to="/products"
        sx={{
          borderRadius: 2,
          px: 1.5,
          "&:hover": { color: "primary.main" },
        }}
      >
        <ArrowBackIcon
          sx={{
            transform:
              i18n.language === "ar" ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
        <Typography sx={{ ml: 1, border: "none", fontSize: "0.85rem" }}>
          {t("product-detail.back")}
        </Typography>
      </IconButton>

      <Stack direction={{ xs: "column", md: "row" }} spacing={5} sx={{ mt: 1 }}>
        {/* IMAGE */}
        <Box sx={{ position: "relative", flex: 1 }}>
          <Box
            sx={{
              width: "100%",
              height: 400,
              overflow: "hidden",
              borderRadius: "20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={images[index]}
              alt="product"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>

          <IconButton
            onClick={prevImage}
            sx={{
              position: "absolute",
              top: "50%",
              left: 10,
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.4)",
              color: "#fff",
            }}
          >
            <ArrowForwardIos
              sx={{
                transform:
                  i18n.language === "ar" ? "rotate(0deg)" : "rotate(180deg)",
              }}
            />
          </IconButton>

          <IconButton
            onClick={nextImage}
            sx={{
              position: "absolute",
              top: "50%",
              right: 10,
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.4)",
              color: "#fff",
            }}
          >
            <ArrowForwardIos
              sx={{
                transform:
                  i18n.language === "ar" ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </IconButton>
        </Box>

        {/* INFO */}
        <Box sx={{ flex: 1 }}>
          <Stack spacing={2.5}>
            {/* TOP LINE (PRO) */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Chip
                label={`${product.efficiency} % ${t("product-detail.efficiency")}`}
                color="success"
              />

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "0.8rem" }}
              >
                {product.createdAt}
              </Typography>
            </Box>

            {/* CATEGORY */}
            <Typography
              variant="caption"
              sx={{
                textTransform: "uppercase",
                color: "primary.main",
                fontWeight: "bold",
                letterSpacing: 1,
              }}
            >
              {product.category}
            </Typography>

            {/* TITLE */}
            <Typography variant="h4" fontWeight="bold">
              {product.name}
            </Typography>

            {/* DESCRIPTION */}
            <Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>
              {product.description}
            </Typography>

            {/* DISPONIBILITY */}
            <Chip
              label={
                product.disponibility
                  ? t("product-detail.inStock")
                  : t("product-detail.outOfStock")
              }
              color={product.disponibility ? "success" : "error"}
              sx={{ width: "fit-content" }}
            />

            <Divider />

            {/* PRICE */}
            <Typography variant="h4" color="primary" fontWeight="bold">
              {product.price} {t("product-detail.currency")}
            </Typography>

            {/* BUTTONS */}
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                size="large"
                onClick={() => onAddToCart(product.id)}
                sx={{
                  px: 4,
                  borderRadius: 3,
                  textTransform: "none",
                }}
              >
                {t("product-detail.addToCart")}
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/contact")}
                sx={{
                  px: 4,
                  borderRadius: 3,
                  textTransform: "none",
                }}
              >
                {t("product-detail.request")}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
