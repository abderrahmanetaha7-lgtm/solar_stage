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

import { ArrowForwardIos } from "@mui/icons-material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";

import { addToCart } from "../features/cart/cartSlice";
import { Helmet } from "react-helmet-async";
import Loading from "../admin/components/Loading";

export default function ProductDetail() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { id } = useParams();
  const { products } = useSelector((state) => state.products);

  const product = products.find((p) => p.id === Number(id));

  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const { category } = product;

  const productName =
    currentLanguage === "ar" ? product.name_ar : product.name_fr;

  const productDescription =
    currentLanguage === "ar" ? product.description_ar : product.description_fr;

  const categoryName =
    currentLanguage === "ar" ? category?.name_ar : category?.name_fr;

  /* ================= STATES ================= */

  const [index, setIndex] = useState(0);

  /* ================= LOADING ================= */

  if (!product) {
    return <Loading />;
  }

  /* ================= IMAGES ================= */

  const images =
    product.images?.map(
      (img) => `${import.meta.env.VITE_API_URL}/storage/${img.image}`,
    ) || [];

  const currentImage =
    images[index] || "https://via.placeholder.com/800x600?text=No+Image";

  /* ================= IMAGE NAVIGATION ================= */

  const nextImage = () => {
    setIndex((prev) => (prev + 1 >= images.length ? 0 : prev + 1));
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 < 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      <Helmet>
        <title>
          {currentLanguage === "ar"
            ? `${product.name_ar} | الألواح الشمسية`
            : `${product.name_fr} | Panneaux Solaires`}
        </title>

        <meta
          name="description"
          content={
            currentLanguage === "ar"
              ? product.description_ar
              : product.description_fr
          }
        />

        <meta property="og:title" content={productName} />

        <meta property="og:description" content={productDescription} />

        <meta property="og:image" content={currentImage} />
      </Helmet>
      <Box
        sx={{
          py: 8,
          px: { xs: 2, md: 6 },
        }}
      >
        {/* BACK BUTTON */}

        <IconButton
          component={RouterLink}
          to="/products"
          sx={{
            mb: 4,
            borderRadius: 3,
            px: 1.5,
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          <ArrowBackIcon
            sx={{
              transform:
                i18n.language === "ar" ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />

          <Typography sx={{ ml: 1 }}>{t("product-detail.back")}</Typography>
        </IconButton>

        {/* CONTENT */}

        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={6}
          alignItems="stretch"
          sx={{
            width: "100%",
          }}
        >
          {/* ================= IMAGE SECTION ================= */}
          <Box
            sx={{
              flex: 1,

              width: "100%",

              maxWidth: {
                xs: "100%",
                lg: "50%",
              },

              minWidth: 0,
            }}
          >
            <Box
              sx={{
                position: "relative",

                width: "100%",

                height: {
                  xs: 320,
                  sm: 420,
                  md: 520,
                },

                borderRadius: "28px",

                overflow: "hidden",

                bgcolor: "grey.100",

                boxShadow: "0 20px 40px rgba(0,0,0,0.18)",
              }}
            >
              <img
                src={currentImage}
                alt={productName}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {images.length > 1 && (
                <>
                  <IconButton
                    onClick={prevImage}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: 16,
                      transform: "translateY(-50%)",

                      width: 48,
                      height: 48,

                      bgcolor: "rgba(0,0,0,0.45)",
                      color: "#fff",

                      "&:hover": {
                        bgcolor: "rgba(0,0,0,0.7)",
                      },
                    }}
                  >
                    <ArrowForwardIos
                      sx={{
                        fontSize: 18,
                        transform:
                          i18n.language === "ar"
                            ? "rotate(0deg)"
                            : "rotate(180deg)",
                      }}
                    />
                  </IconButton>

                  <IconButton
                    onClick={nextImage}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      right: 16,
                      transform: "translateY(-50%)",

                      width: 48,
                      height: 48,

                      bgcolor: "rgba(0,0,0,0.45)",
                      color: "#fff",

                      "&:hover": {
                        bgcolor: "rgba(0,0,0,0.7)",
                      },
                    }}
                  >
                    <ArrowForwardIos
                      sx={{
                        fontSize: 18,
                        transform:
                          i18n.language === "ar"
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                      }}
                    />
                  </IconButton>
                </>
              )}
            </Box>
          </Box>
          {/* ================= INFO SECTION ================= */}
          <Box
            sx={{
              flex: 1,
              p: 5,
              width: "100%",

              maxWidth: {
                xs: "100%",
                lg: "50%",
              },

              minWidth: 0,

              display: "flex",
              alignItems: "center",
            }}
          >
            <Stack spacing={3}>
              {/* CATEGORY */}

              <Typography
                variant="caption"
                sx={{
                  textTransform: "uppercase",
                  color: "primary.main",
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                {categoryName}
              </Typography>

              {/* TITLE */}

              <Typography variant="h3" fontWeight="bold">
                {productName}
              </Typography>

              {/* DESCRIPTION */}

              <Typography
                color="text.secondary"
                sx={{
                  lineHeight: 1.8,
                  fontSize: "1rem",
                }}
              >
                {productDescription}
              </Typography>

              {/* STOCK */}

              <Chip
                label={
                  product.stock_quantity > 0
                    ? t("product-detail.inStock")
                    : t("product-detail.outOfStock")
                }
                color={product.stock_quantity > 0 ? "success" : "error"}
                sx={{
                  width: "fit-content",
                  fontWeight: 600,
                }}
              />

              {/* DATE */}

              <Typography variant="body2" color="text.secondary">
                {new Date(product.created_at).toLocaleString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>

              <Divider />

              {/* PRICE */}

              <Typography variant="h3" color="primary" fontWeight="bold">
                {product.price} {t("currency")}
              </Typography>

              {/* BUTTONS */}

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => dispatch(addToCart(product))}
                  sx={{
                    borderRadius: 3,
                    px: 5,
                    py: 1.5,
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
                    borderRadius: 3,
                    px: 5,
                    py: 1.5,
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
    </>
  );
}
