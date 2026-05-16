import { useState } from "react";

import {
  Box,
  Card,
  Grid,
  Typography,
  Chip,
  Stack,
  Divider,
  Button,
  IconButton,
} from "@mui/material";

import {
  ArrowBack as ArrowBackIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

import { useNavigate, useParams } from "react-router-dom"; 

import { useProducts } from "../../hooks/useProducts";
import Loading from "../components/Loading";

function getStatus(stock) {
  if (stock <= 0) {
    return {
      label: "Rupture",
      color: "error",
    };
  }

  if (stock <= 5) {
    return {
      label: "Faible",
      color: "warning",
    };
  }

  return {
    label: "Disponible",
    color: "success",
  };
}

export default function ProductDetailsPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { products, loading } = useProducts();

  const product = products.find((p) => p.id === Number(id));

  const [selectedImage, setSelectedImage] = useState(0);

  if (loading) {
    return (
      <Loading/>
    );
  }

  if (!product) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            p: 5,
            borderRadius: 4,
            textAlign: "center",
            maxWidth: 420,
            width: "100%",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
            Produit introuvable
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Le produit demandé n’existe pas ou a été supprimé.
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate("/admin/products")}
          >
            Retour aux produits
          </Button>
        </Card>
      </Box>
    );
  }

  const status = getStatus(product.stock_quantity);

  const currentImage = product.images?.[selectedImage]?.image
    ? `${import.meta.env.VITE_API_URL}/storage/${product.images[selectedImage].image}`
    : "";

  return (
    <Box>
      {/* HEADER */}

      <Box
        sx={{
          position: "relative",
          mb: 4,
        }}
      >
        {/* RETOUR */}

        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/admin/products")}
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
          }}
        >
          Retour aux produits
        </Button>

        {/* TITLE */}

        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            Détails du produit
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Informations complètes du produit
          </Typography>
        </Box>
      </Box>

      {/* MAIN CARD */}

      <Card
        sx={{
          p: 3,
          borderRadius: 4,
        }}
      >
        {/* IMAGE */}

        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 500,
            borderRadius: 4,
            overflow: "hidden",
            mb: 4,
            bgcolor: "#f5f5f5",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          {/* IMAGE */}

          <Box
            component="img"
            src={currentImage}
            alt={product.name_fr}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* LEFT BUTTON */}

          {product.images?.length > 1 && (
            <IconButton
              onClick={() =>
                setSelectedImage((prev) =>
                  prev === 0 ? product.images.length - 1 : prev - 1,
                )
              }
              sx={{
                position: "absolute",
                left: 20,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
                "&:hover": {
                  bgcolor: "white",
                },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
          )}

          {/* RIGHT BUTTON */}

          {product.images?.length > 1 && (
            <IconButton
              onClick={() =>
                setSelectedImage((prev) =>
                  prev === product.images.length - 1 ? 0 : prev + 1,
                )
              }
              sx={{
                position: "absolute",
                right: 20,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
                "&:hover": {
                  bgcolor: "white",
                },
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          )}

          {/* COUNTER */}

          {product.images?.length > 1 && (
            <Box
              sx={{
                position: "absolute",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                px: 2,
                py: 0.5,
                borderRadius: 999,
                bgcolor: "rgba(0,0,0,0.6)",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "white",
                  fontWeight: 600,
                }}
              >
                {selectedImage + 1} / {product.images.length}
              </Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* INFORMATIONS */}

        <Grid container spacing={10}>
          {/* LEFT */}

          <Grid size={{ xs: 12, md: 6 }} >
            <Stack spacing={4}>
              {/* NAME FR */}

              <Box>
                <Typography variant="body2" sx={{ color: "primary.main" }}>
                  Nom du produit (FR)
                </Typography>

                <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>
                  {product.name_fr}
                </Typography>
              </Box>

              {/* DESCRIPTION FR */}

              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1, color: "primary.main" }}
                >
                  Description (FR)
                </Typography>

                <Typography
                  sx={{
                    lineHeight: 1.9,
                  }}
                >
                  {product.description_fr || "Aucune description"}
                </Typography>
              </Box>
            </Stack>
          </Grid>

          {/* RIGHT */}

          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={4}>
              {/* NAME AR */}

              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1, textAlign: "right", color: "primary.main" }}
                >
                  اسم المنتج
                </Typography>

                <Typography
                  variant="h5"
                  fontWeight={700}
                  dir="rtl"
                  sx={{ mt: 1 }}
                >
                  {product.name_ar}
                </Typography>
              </Box>

              {/* DESCRIPTION AR */}

              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1, textAlign: "right", color: "primary.main" }}
                >
                  الوصف
                </Typography>

                <Typography
                  dir="rtl"
                  sx={{
                    lineHeight: 2,
                  }}
                >
                  {product.description_ar || "لا يوجد وصف"}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* BOTTOM INFO */}

        <Grid container spacing={3}>
          {/* CATEGORY */}

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Catégorie
            </Typography>

            <Typography fontWeight={700} sx={{ mt: 1 }}>
              {product.category?.name || "—"}
            </Typography>
          </Grid>

          {/* PRICE */}

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Prix
            </Typography>

            <Typography
              fontWeight={700}
              sx={{
                mt: 1,
              }}
            >
              {product.price} MAD
            </Typography>
          </Grid>

          {/* STOCK */}

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Quantité en stock
            </Typography>

            <Typography fontWeight={700} sx={{ mt: 1 }}>
              {product.stock_quantity}
            </Typography>
          </Grid>

          {/* STATUS */}

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Statut:
              <Chip
                label={status.label}
                color={status.color}
                sx={{
                  fontWeight: 600,
                  ml:2
                }}
              />
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
